import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';
import { Download, TrendingUp, TrendingDown, Users, DollarSign, Briefcase, Star } from 'lucide-react';

const revenueData = {
  current: 284590000,
  previous: 231250000,
  growth: 23.1,
  monthly: [
    { month: 'T1', value: 42000000 },
    { month: 'T2', value: 48000000 },
    { month: 'T3', value: 45000000 },
    { month: 'T4', value: 58000000 },
    { month: 'T5', value: 54000000 },
    { month: 'T6', value: 62000000 },
  ]
};

const userGrowthData = {
  totalUsers: 12847,
  newThisMonth: 1547,
  growth: 13.7,
  monthly: [
    { month: 'T1', customers: 850, workers: 120 },
    { month: 'T2', customers: 920, workers: 145 },
    { month: 'T3', customers: 780, workers: 98 },
    { month: 'T4', customers: 1100, workers: 178 },
    { month: 'T5', customers: 980, workers: 156 },
    { month: 'T6', customers: 1200, workers: 189 },
  ]
};

const topWorkers = [
  { name: 'Trần Thị B', rating: 4.9, jobs: 234, earnings: '45.6M₫' },
  { name: 'Võ Thị F', rating: 4.8, jobs: 198, earnings: '38.2M₫' },
  { name: 'Bùi Văn H', rating: 4.8, jobs: 176, earnings: '34.8M₫' },
  { name: 'Lý Thị K', rating: 4.7, jobs: 165, earnings: '31.5M₫' },
  { name: 'Phạm Thị D', rating: 4.6, jobs: 145, earnings: '28.3M₫' },
];

const complaintsTrends = [
  { category: 'Chất lượng dịch vụ', count: 12, trend: -8, resolved: 10 },
  { category: 'Thanh toán', count: 8, trend: -15, resolved: 7 },
  { category: 'Lịch hẹn', count: 5, trend: 0, resolved: 4 },
  { category: 'Giao tiếp', count: 3, trend: -25, resolved: 3 },
];

export function Reports() {
  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl mb-2">Báo cáo & Phân tích</h1>
            <p className="text-[#6B7280]">Xem phân tích và thông tin chi tiết</p>
          </div>
          <Button className="bg-[#00BFA6] hover:bg-[#00A88F] text-white rounded-xl">
            <Download className="w-4 h-4 mr-2" />
            Xuất Excel
          </Button>
        </div>
      </div>

      <Tabs defaultValue="revenue" className="space-y-6">
        <TabsList className="grid grid-cols-4 w-full max-w-2xl rounded-2xl p-1 bg-[#F7FBFA]">
          <TabsTrigger value="revenue" className="rounded-xl">Doanh thu</TabsTrigger>
          <TabsTrigger value="users" className="rounded-xl">Người dùng</TabsTrigger>
          <TabsTrigger value="workers" className="rounded-xl">Hiệu suất</TabsTrigger>
          <TabsTrigger value="complaints" className="rounded-xl">Khiếu nại</TabsTrigger>
        </TabsList>

        {/* Revenue Tab */}
        <TabsContent value="revenue" className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 rounded-3xl border-0 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <div className="flex items-center gap-1 text-green-600">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm">+{revenueData.growth}%</span>
                </div>
              </div>
              <p className="text-[#6B7280] text-sm mb-1">Doanh thu tháng này</p>
              <p className="text-3xl">{(revenueData.current / 1000000).toFixed(1)}M₫</p>
            </Card>

            <Card className="p-6 rounded-3xl border-0 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
              </div>
              <p className="text-[#6B7280] text-sm mb-1">Tổng công việc</p>
              <p className="text-3xl">1,547</p>
            </Card>

            <Card className="p-6 rounded-3xl border-0 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
              </div>
              <p className="text-[#6B7280] text-sm mb-1">TB mỗi giao dịch</p>
              <p className="text-3xl">184k₫</p>
            </Card>
          </div>

          {/* Revenue Chart */}
          <Card className="p-8 rounded-3xl border-0 shadow-lg">
            <h2 className="text-2xl mb-6">Doanh thu theo tháng</h2>
            <div className="h-80 flex items-end justify-between gap-6">
              {revenueData.monthly.map((item, i) => {
                const height = (item.value / 65000000) * 100;
                return (
                  <div key={item.month} className="flex-1 flex flex-col items-center group">
                    <div className="relative w-full">
                      <div 
                        className="w-full bg-gradient-to-t from-[#00BFA6] to-[#00D4B8] rounded-t-xl transition-all duration-300 hover:from-[#00D4B8] hover:to-[#2ED47A] cursor-pointer" 
                        style={{ height: `${height * 3}px` }}
                      />
                      <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="bg-[#1E293B] text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap">
                          {(item.value / 1000000).toFixed(0)}M₫
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-[#6B7280] mt-3">{item.month}</p>
                  </div>
                );
              })}
            </div>
          </Card>
        </TabsContent>

        {/* User Growth Tab */}
        <TabsContent value="users" className="space-y-6">
          {/* Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 rounded-3xl border-0 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div className="flex items-center gap-1 text-green-600">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm">+{userGrowthData.growth}%</span>
                </div>
              </div>
              <p className="text-[#6B7280] text-sm mb-1">Tổng người dùng</p>
              <p className="text-3xl">{userGrowthData.totalUsers.toLocaleString()}</p>
            </Card>

            <Card className="p-6 rounded-3xl border-0 shadow-lg">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <p className="text-[#6B7280] text-sm mb-1">Người dùng mới tháng này</p>
              <p className="text-3xl">{userGrowthData.newThisMonth.toLocaleString()}</p>
            </Card>

            <Card className="p-6 rounded-3xl border-0 shadow-lg">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-4">
                <Star className="w-6 h-6 text-white" />
              </div>
              <p className="text-[#6B7280] text-sm mb-1">Tỷ lệ giữ chân</p>
              <p className="text-3xl">87%</p>
            </Card>
          </div>

          {/* Growth Chart */}
          <Card className="p-8 rounded-3xl border-0 shadow-lg">
            <h2 className="text-2xl mb-6">Tăng trưởng người dùng</h2>
            <div className="h-80 flex items-end justify-between gap-6">
              {userGrowthData.monthly.map((item) => {
                const customerHeight = (item.customers / 1300) * 100;
                const workerHeight = (item.workers / 1300) * 100;
                return (
                  <div key={item.month} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full flex items-end gap-2">
                      <div 
                        className="flex-1 bg-gradient-to-t from-blue-500 to-indigo-500 rounded-t-xl transition-all duration-300 hover:opacity-80 cursor-pointer"
                        style={{ height: `${customerHeight * 2.5}px` }}
                        title={`Khách hàng: ${item.customers}`}
                      />
                      <div 
                        className="flex-1 bg-gradient-to-t from-[#00BFA6] to-[#00D4B8] rounded-t-xl transition-all duration-300 hover:opacity-80 cursor-pointer"
                        style={{ height: `${workerHeight * 2.5}px` }}
                        title={`Người làm việc: ${item.workers}`}
                      />
                    </div>
                    <p className="text-sm text-[#6B7280] mt-2">{item.month}</p>
                  </div>
                );
              })}
            </div>
            <div className="flex items-center justify-center gap-6 mt-6">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-gradient-to-br from-blue-500 to-indigo-500" />
                <span className="text-sm text-[#6B7280]">Khách hàng</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-gradient-to-br from-[#00BFA6] to-[#00D4B8]" />
                <span className="text-sm text-[#6B7280]">Người làm việc</span>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Worker Performance Tab */}
        <TabsContent value="workers" className="space-y-6">
          <Card className="p-8 rounded-3xl border-0 shadow-lg">
            <h2 className="text-2xl mb-6">Top người làm việc</h2>
            <div className="space-y-4">
              {topWorkers.map((worker, idx) => (
                <div key={idx} className="flex items-center gap-4 p-4 bg-[#F7FBFA] rounded-2xl hover:shadow-md transition-all">
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-[#00BFA6] to-[#00D4B8] text-white">
                    {idx + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{worker.name}</p>
                    <div className="flex items-center gap-4 text-sm text-[#6B7280] mt-1">
                      <span className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                        {worker.rating}
                      </span>
                      <span>{worker.jobs} công việc</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-[#00BFA6]">{worker.earnings}</p>
                    <p className="text-xs text-[#6B7280]">Thu nhập</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Complaints Tab */}
        <TabsContent value="complaints" className="space-y-6">
          <Card className="p-8 rounded-3xl border-0 shadow-lg">
            <h2 className="text-2xl mb-6">Xu hướng khiếu nại</h2>
            <div className="space-y-4">
              {complaintsTrends.map((item, idx) => (
                <div key={idx} className="p-4 bg-[#F7FBFA] rounded-2xl">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <h3 className="font-medium">{item.category}</h3>
                      {item.trend !== 0 && (
                        <Badge className={`rounded-lg ${
                          item.trend < 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                          {item.trend < 0 ? <TrendingDown className="w-3 h-3 mr-1 inline" /> : <TrendingUp className="w-3 h-3 mr-1 inline" />}
                          {Math.abs(item.trend)}%
                        </Badge>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{item.count} khiếu nại</p>
                      <p className="text-xs text-[#6B7280]">{item.resolved} đã giải quyết</p>
                    </div>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"
                      style={{ width: `${(item.resolved / item.count) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
