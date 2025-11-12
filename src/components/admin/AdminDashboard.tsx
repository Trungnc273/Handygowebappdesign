import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { 
  Users, 
  DollarSign, 
  Briefcase, 
  AlertCircle, 
  TrendingUp, 
  ArrowRight 
} from 'lucide-react';

interface Props {
  onNavigate: (section: string) => void;
}

const stats = [
  { 
    label: 'Tổng người dùng', 
    value: '12,847', 
    icon: Users, 
    color: 'from-blue-500 to-indigo-500', 
    change: '+12%',
    trend: 'up',
    link: 'users'
  },
  { 
    label: 'Tổng doanh thu', 
    value: '284.590.000₫', 
    icon: DollarSign, 
    color: 'from-green-500 to-emerald-500', 
    change: '+23%',
    trend: 'up',
    link: 'payments'
  },
  { 
    label: 'Công việc đang hoạt động', 
    value: '156', 
    icon: Briefcase, 
    color: 'from-purple-500 to-pink-500', 
    change: '+8%',
    trend: 'up',
    link: 'tasks'
  },
  { 
    label: 'Tranh chấp', 
    value: '12', 
    icon: AlertCircle, 
    color: 'from-red-500 to-orange-500', 
    change: '-15%',
    trend: 'down',
    link: 'tasks'
  },
];

const recentActivities = [
  { action: 'Đăng ký người dùng mới', user: 'Nguyễn Văn A', time: '2 phút trước', type: 'signup' },
  { action: 'Công việc hoàn thành', user: 'Trần Thị B', time: '15 phút trước', type: 'job' },
  { action: 'Thanh toán đã xử lý', user: 'Lê Văn C', time: '1 giờ trước', type: 'payment' },
  { action: 'Yêu cầu dịch vụ mới', user: 'Phạm Thị D', time: '2 giờ trước', type: 'request' },
  { action: 'Đánh giá 5 sao', user: 'Hoàng Văn E', time: '3 giờ trước', type: 'review' },
];

export function AdminDashboard({ onNavigate }: Props) {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl mb-1 sm:mb-2">Tổng quan bảng điều khiển</h1>
        <p className="text-[#6B7280] text-sm sm:text-base">Theo dõi hiệu suất nền tảng và chỉ số chính</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {stats.map((stat) => (
          <Card 
            key={stat.label} 
            className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
            onClick={() => onNavigate(stat.link)}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <Badge 
                variant="secondary" 
                className={`rounded-lg text-xs sm:text-sm ${
                  stat.trend === 'up' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}
              >
                {stat.change}
              </Badge>
            </div>
            <p className="text-[#6B7280] text-xs sm:text-sm mb-1">{stat.label}</p>
            <div className="flex items-center justify-between">
              <p className="text-xl sm:text-2xl lg:text-3xl truncate">{stat.value}</p>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#6B7280] opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 ml-2" />
            </div>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Monthly Revenue Chart */}
        <Card className="p-8 rounded-3xl border-0 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl">Doanh thu hàng tháng</h2>
            <Button variant="outline" size="sm" className="rounded-xl">
              <TrendingUp className="w-4 h-4 mr-2" />
              Chi tiết
            </Button>
          </div>
          <div className="h-64 flex items-end justify-between gap-3">
            {['T1', 'T2', 'T3', 'T4', 'T5', 'T6'].map((month, i) => {
              const height = [45, 52, 48, 65, 58, 70][i];
              const amount = [42, 48, 45, 58, 54, 62][i];
              return (
                <div key={month} className="flex-1 flex flex-col items-center group">
                  <div className="relative w-full">
                    <div 
                      className="w-full bg-gradient-to-t from-[#00BFA6] to-[#00D4B8] rounded-t-xl transition-all duration-300 hover:from-[#00D4B8] hover:to-[#2ED47A] cursor-pointer" 
                      style={{ height: `${height * 2.8}px` }}
                    />
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="bg-[#1E293B] text-white text-xs px-2 py-1 rounded-lg whitespace-nowrap">
                        {amount}M₫
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-[#6B7280] mt-2">{month}</p>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Job Trends */}
        <Card className="p-8 rounded-3xl border-0 shadow-lg">
          <h2 className="text-2xl mb-6">Xu hướng công việc</h2>
          <div className="space-y-4">
            {[
              { service: 'Dọn dẹp', count: 456, change: '+12%', color: 'from-blue-500 to-blue-600' },
              { service: 'Giao hàng', count: 324, change: '+8%', color: 'from-purple-500 to-purple-600' },
              { service: 'Sửa chữa', count: 289, change: '+15%', color: 'from-orange-500 to-orange-600' },
              { service: 'Gia sư', count: 234, change: '+5%', color: 'from-green-500 to-green-600' },
            ].map((item) => (
              <div key={item.service} className="group cursor-pointer">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-[#6B7280] group-hover:text-[#00BFA6] transition-colors">
                    {item.service}
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="font-medium">{item.count}</span>
                    <Badge variant="secondary" className="bg-green-100 text-green-700 rounded-lg text-xs">
                      {item.change}
                    </Badge>
                  </div>
                </div>
                <div className="h-3 bg-[#F7FBFA] rounded-full overflow-hidden">
                  <div 
                    className={`h-full bg-gradient-to-r ${item.color} rounded-full transition-all duration-500 group-hover:w-full`}
                    style={{ width: `${(item.count / 500) * 100}%` }} 
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="p-8 rounded-3xl border-0 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl">Hoạt động gần đây</h2>
          <Button variant="outline" size="sm" className="rounded-xl">
            Xem tất cả
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
        <div className="space-y-4">
          {recentActivities.map((activity, i) => (
            <div 
              key={i} 
              className="flex items-center justify-between p-4 bg-[#F7FBFA] rounded-xl hover:shadow-md transition-all duration-200 cursor-pointer group"
            >
              <div className="flex items-center gap-4">
                <Avatar className="w-10 h-10 rounded-xl">
                  <AvatarFallback className="rounded-xl bg-gradient-to-br from-[#00BFA6] to-[#00D4B8] text-white">
                    {activity.user.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium group-hover:text-[#00BFA6] transition-colors">
                    {activity.action}
                  </p>
                  <p className="text-sm text-[#6B7280]">{activity.user}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-[#6B7280]">{activity.time}</span>
                <ArrowRight className="w-4 h-4 text-[#6B7280] opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
