import { useState } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Switch } from '../ui/switch';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { TrendingUp, DollarSign, Star, Briefcase, Clock, Award, Calendar, MapPin, ChevronRight, Home } from 'lucide-react';
import { Feed } from '../feed/Feed';
import { JobDetailModal } from './JobDetailModal';
import { toast } from 'sonner@2.0.3';

interface Props {
  onNavigate: (page: any) => void;
}

const todayJobs = [
  { id: 1, service: 'Dọn dẹp nhà cửa', customer: 'John Doe', time: '10:00 SA', location: '1.2 km', pay: 75, status: 'Đã lên lịch' },
  { id: 2, service: 'Lắp ráp nội thất', customer: 'Jane Smith', time: '2:00 CH', location: '2.5 km', pay: 85, status: 'Đã lên lịch' },
];

const stats = [
  { label: 'Thu nhập hôm nay', value: '0₫', icon: DollarSign, color: 'from-green-500 to-emerald-500', change: '+12%' },
  { label: 'Việc hoàn thành', value: '156', icon: Briefcase, color: 'from-blue-500 to-indigo-500', change: '+8' },
  { label: 'Đánh giá trung bình', value: '4.9', icon: Star, color: 'from-yellow-500 to-orange-500', change: '+0.1' },
  { label: 'Giờ hoạt động', value: '124h', icon: Clock, color: 'from-purple-500 to-pink-500', change: '+15h' },
];

export function WorkerDashboard({ onNavigate }: Props) {
  const [isAvailable, setIsAvailable] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedJob, setSelectedJob] = useState<number | null>(null);

  const handleAcceptJob = () => {
    toast.success('Đã nhận việc thành công!', {
      description: 'Công việc đã được thêm vào lịch trình của bạn.'
    });
    setSelectedJob(null);
    onNavigate('current');
  };

  const selectedJobData = todayJobs.find(job => job.id === selectedJob);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
      {/* Welcome Section */}
      <div className="mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl mb-1 sm:mb-2">Chào mừng trở lại, Sarah! 👋</h1>
            <p className="text-gray-600 text-sm sm:text-base">Đây là tổng quan hiệu suất của bạn</p>
          </div>
          <Card className="p-4 rounded-2xl border-0 shadow-lg self-start sm:self-auto">
            <div className="flex items-center gap-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Trạng thái</p>
                <p className={isAvailable ? 'text-green-600' : 'text-gray-600'}>
                  {isAvailable ? 'Sẵn sàng' : 'Ngoại tuyến'}
                </p>
              </div>
              <Switch
                checked={isAvailable}
                onCheckedChange={setIsAvailable}
                className="data-[state=checked]:bg-[#00BFA6]"
              />
            </div>
          </Card>
        </div>
      </div>

      {/* Tabs Navigation */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6 sm:mb-8">
        <TabsList className="grid grid-cols-2 w-full max-w-md rounded-2xl p-1 bg-gray-100">
          <TabsTrigger value="dashboard" className="rounded-xl text-sm sm:text-base">
            <Home className="w-4 h-4 sm:mr-2" />
            <span className="hidden sm:inline">Bảng điều khiển</span>
          </TabsTrigger>
          <TabsTrigger value="feed" className="rounded-xl text-sm sm:text-base">
            <Briefcase className="w-4 h-4 sm:mr-2" />
            <span className="hidden sm:inline">Bảng tin</span>
          </TabsTrigger>
        </TabsList>

        {/* Dashboard Tab */}
        <TabsContent value="dashboard" className="space-y-6 sm:space-y-8 mt-6 sm:mt-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat) => (
          <Card key={stat.label} className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl border-0 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <Badge variant="secondary" className="bg-green-100 text-green-700 rounded-lg text-xs sm:text-sm">
                {stat.change}
              </Badge>
            </div>
            <p className="text-gray-600 text-xs sm:text-sm mb-1">{stat.label}</p>
            <p className="text-2xl sm:text-3xl">{stat.value}</p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {/* Left Column - Today's Schedule */}
        <div className="lg:col-span-2 space-y-6">
          {/* Today's Jobs */}
          <Card className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl border-0 shadow-lg">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-xl sm:text-2xl mb-1">Lịch hôm nay</h2>
                <p className="text-gray-600 text-sm sm:text-base">{todayJobs.length} công việc đang chờ</p>
              </div>
              <Button
                onClick={() => onNavigate('jobs')}
                variant="outline"
                className="rounded-xl"
              >
                Xem tất cả
              </Button>
            </div>

            <div className="space-y-4">
              {todayJobs.map((job) => (
                <div
                  key={job.id}
                  className="p-6 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-100 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => onNavigate('current')}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg mb-1">{job.service}</h3>
                      <p className="text-gray-600">Khách hàng: {job.customer}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl text-[#00BFA6] mb-1">{job.pay}.000₫</p>
                      <Badge className="bg-yellow-100 text-yellow-700 rounded-lg">
                        {job.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{job.time}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>Cách {job.location}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedJob(job.id);
                      }}
                      className="flex-1 bg-[#00BFA6] hover:bg-[#00A88F] text-white rounded-xl"
                    >
                      Xem chi tiết
                    </Button>
                    <Button variant="outline" className="rounded-xl">
                      Chỉ đường
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Quick Actions */}
          <Card className="p-6 rounded-3xl border-0 shadow-lg bg-gradient-to-br from-[#00BFA6] to-[#00D4B8] text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl mb-2">Công việc mới có sẵn</h3>
                <p className="opacity-90">5 công việc mới phù hợp với kỹ năng của bạn</p>
              </div>
              <Button
                onClick={() => onNavigate('jobs')}
                className="bg-white text-[#00BFA6] hover:bg-gray-100 rounded-xl"
              >
                Duyệt công việc
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </Card>
        </div>

        {/* Right Column - Profile & Achievements */}
        <div className="space-y-6">
          {/* Profile Card */}
          <Card className="p-6 rounded-3xl border-0 shadow-lg">
            <div className="text-center mb-6">
              <Avatar className="w-24 h-24 mx-auto mb-4 rounded-3xl">
                <AvatarImage src="https://images.unsplash.com/photo-1665436035665-d7dad9086ee2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b3JrZXIlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjEzOTQ1NTR8MA&ixlib=rb-4.1.0&q=80&w=1080" />
                <AvatarFallback className="rounded-3xl bg-gradient-to-br from-[#00BFA6] to-[#00D4B8] text-white text-3xl">
                  SJ
                </AvatarFallback>
              </Avatar>
              <h3 className="text-xl mb-1">Sarah Johnson</h3>
              <Badge className="bg-blue-100 text-blue-700 rounded-lg">
                ✓ Chuyên nghiệp đã xác minh
              </Badge>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Tỷ lệ thành công</span>
                <span className="font-medium">98%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Thời gian phản hồi</span>
                <span className="font-medium">2 phút</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Thành viên từ</span>
                <span className="font-medium">Tháng 1/2024</span>
              </div>
            </div>

            <Button
              onClick={() => onNavigate('profile')}
              variant="outline"
              className="w-full mt-6 rounded-xl"
            >
              Xem hồ sơ đầy đủ
            </Button>
          </Card>

          {/* Achievements */}
          <Card className="p-6 rounded-3xl border-0 shadow-lg bg-gradient-to-br from-yellow-50 to-orange-50">
            <div className="flex items-center gap-2 mb-4">
              <Award className="w-6 h-6 text-yellow-600" />
              <h3 className="text-lg">Thành tích</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-white rounded-xl">
                <div className="text-2xl">🏆</div>
                <div className="flex-1">
                  <p className="font-medium">Người làm việc xuất sắc</p>
                  <p className="text-xs text-gray-600">Tháng này</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white rounded-xl">
                <div className="text-2xl">⭐</div>
                <div className="flex-1">
                  <p className="font-medium">Đánh giá 5 sao</p>
                  <p className="text-xs text-gray-600">50 việc gần nhất</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white rounded-xl">
                <div className="text-2xl">🎯</div>
                <div className="flex-1">
                  <p className="font-medium">Cột mốc 100 công việc</p>
                  <p className="text-xs text-gray-600">Đã hoàn thành</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Earnings Preview */}
          <Card className="p-6 rounded-3xl border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50">
            <h3 className="mb-4">Thu nhập tuần này</h3>
            <div className="text-4xl text-green-600 mb-2">847.000₫</div>
            <div className="flex items-center gap-2 text-sm text-green-700">
              <TrendingUp className="w-4 h-4" />
              <span>+23% so với tuần trước</span>
            </div>
            <Button
              onClick={() => onNavigate('earnings')}
              className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white rounded-xl"
            >
              Xem thu nhập
            </Button>
          </Card>
        </div>
      </div>
        </TabsContent>

        {/* Feed Tab */}
        <TabsContent value="feed" className="mt-8">
          <Feed
            isWorker={true}
            userName="Sarah Johnson"
            userAvatar="https://images.unsplash.com/photo-1665436035665-d7dad9086ee2?w=100"
            userType="worker"
          />
        </TabsContent>
      </Tabs>

      {/* Job Detail Modal */}
      {selectedJobData && (
        <JobDetailModal
          open={selectedJob !== null}
          onOpenChange={(open) => !open && setSelectedJob(null)}
          job={{
            id: selectedJobData.id,
            service: selectedJobData.service,
            customer: selectedJobData.customer,
            date: 'Ngày 28 tháng 10, 2025',
            time: selectedJobData.time,
            duration: '2-3 giờ',
            location: '123 Đường Chính, Quận 1',
            distance: selectedJobData.location,
            pay: selectedJobData.pay,
            description: 'Cần dọn dẹp kỹ căn hộ 3 phòng ngủ bao gồm nhà bếp và phòng tắm.'
          }}
          onAccept={handleAcceptJob}
        />
      )}
    </div>
  );
}
