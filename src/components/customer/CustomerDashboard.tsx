import { useState } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Search, Sparkles, Home, Package, Wrench, GraduationCap, Car, ShoppingBag, MapPin, Clock, TrendingUp, Star, Briefcase } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Feed } from '../feed/Feed';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

interface Props {
  onNavigate: (page: any) => void;
}

const services = [
  {
    icon: Home,
    title: 'Dọn dẹp',
    description: 'Dọn dẹp nhà chuyên nghiệp',
    color: 'from-blue-500 to-blue-600',
    image: 'https://images.unsplash.com/photo-1758599669406-d5179ccefcb9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZW9wbGUlMjBoZWxwaW5nJTIwY2xlYW5pbmd8ZW58MXx8fHwxNzYxNDg3MzE4fDA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    icon: Package,
    title: 'Giao hàng',
    description: 'Giao hàng nhanh và đáng tin cậy',
    color: 'from-purple-500 to-purple-600',
    image: 'https://images.unsplash.com/photo-1758523670564-d1d6a734dc0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob21lJTIwZGVsaXZlcnklMjBzZXJ2aWNlfGVufDF8fHx8MTc2MTQ4NzMxOXww&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    icon: Wrench,
    title: 'Sửa chữa',
    description: 'Sửa chữa nhà cửa và thiết bị',
    color: 'from-orange-500 to-orange-600',
    image: 'https://images.unsplash.com/photo-1751486403850-fae53b6ab0e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXBhaXIlMjB3b3JrJTIwdG9vbHN8ZW58MXx8fHwxNzYxNDg3MzE5fDA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    icon: GraduationCap,
    title: 'Dạy kèm',
    description: 'Dịch vụ dạy kèm cá nhân',
    color: 'from-green-500 to-green-600',
    image: 'https://images.unsplash.com/photo-1629360021730-3d258452c425?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0dXRvcmluZyUyMGVkdWNhdGlvbnxlbnwxfHx8fDE3NjE0ODczMTl8MA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    icon: Car,
    title: 'Vận chuyển',
    description: 'Hỗ trợ chuyển nhà và vận chuyển',
    color: 'from-red-500 to-red-600',
    image: ''
  },
  {
    icon: ShoppingBag,
    title: 'Mua sắm',
    description: 'Trợ lý mua sắm cá nhân',
    color: 'from-pink-500 to-pink-600',
    image: ''
  }
];

const recentTasks = [
  { id: 1, service: 'Dọn dẹp nhà cửa', worker: 'Sarah Johnson', status: 'Hoàn thành', date: '2 ngày trước', rating: 5 },
  { id: 2, service: 'Lắp ráp đồ nội thất', worker: 'Mike Chen', status: 'Đang thực hiện', date: 'Hôm nay', rating: null },
];

const suggestedHelpers = [
  { name: 'Sarah Johnson', avatar: 'https://images.unsplash.com/photo-1665436035665-d7dad9086ee2?w=100', rating: 4.9, jobs: 156, service: 'Dọn dẹp' },
  { name: 'Mike Chen', rating: 4.8, jobs: 89, service: 'Sửa chữa' },
  { name: 'Emma Davis', rating: 4.7, jobs: 123, service: 'Gia sư' },
];

const trendingServices = [
  { name: 'Dọn dẹp nhà cửa', trend: '+23%', requests: 156 },
  { name: 'Giao hàng nhanh', trend: '+18%', requests: 98 },
  { name: 'Sửa chữa điện', trend: '+12%', requests: 67 },
];

export function CustomerDashboard({ onNavigate }: Props) {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#00BFA6] to-[#00D4B8] rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 mb-6 sm:mb-8 text-white shadow-lg">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
            <span className="text-xs sm:text-sm opacity-90">Chào mừng trở lại!</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl mb-3 sm:mb-4">Tìm kiếm hỗ trợ cho công việc hàng ngày</h1>
          <p className="text-sm sm:text-base lg:text-lg opacity-90 mb-6 sm:mb-8">
            Kết nối với những người làm việc đáng tin cậy trong khu vực của bạn để dọn dẹp, giao hàng, sửa chữa và nhiều hơn nữa.
          </p>
          
          {/* Search Bar */}
          <div className="bg-white rounded-2xl p-2 flex flex-col sm:flex-row gap-2 shadow-xl">
            <div className="flex-1 flex items-center gap-3 px-4 py-2 sm:py-0">
              <Search className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              <Input
                placeholder="Bạn cần dịch vụ gì?"
                className="border-0 focus-visible:ring-0 p-0"
              />
            </div>
            <div className="flex items-center gap-3 px-4 py-2 sm:py-0 sm:border-l border-gray-200">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              <Input
                placeholder="Địa điểm"
                className="border-0 focus-visible:ring-0 p-0 sm:w-40"
              />
            </div>
            <Button
              onClick={() => onNavigate('create')}
              className="bg-[#00BFA6] hover:bg-[#00A88F] text-white rounded-xl px-6 sm:px-8"
            >
              Đặt dịch vụ
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6 sm:mb-8">
        <TabsList className="grid grid-cols-2 w-full max-w-md rounded-2xl p-1 bg-gray-100">
          <TabsTrigger value="overview" className="rounded-xl text-sm sm:text-base">
            <Home className="w-4 h-4 sm:mr-2" />
            <span className="hidden sm:inline">Tổng quan</span>
          </TabsTrigger>
          <TabsTrigger value="feed" className="rounded-xl text-sm sm:text-base">
            <Briefcase className="w-4 h-4 sm:mr-2" />
            <span className="hidden sm:inline">Bảng tin</span>
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-8 sm:space-y-12 mt-6 sm:mt-8">
          {/* Service Categories */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-xl sm:text-2xl mb-1 sm:mb-2">Dịch vụ phổ biến</h2>
                <p className="text-gray-600 text-sm sm:text-base">Chọn từ các dịch vụ được yêu cầu nhiều nhất</p>
              </div>
              <Button variant="outline" className="rounded-xl self-start sm:self-auto">Xem tất cả</Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <Card
                  key={service.title}
                  className="group cursor-pointer hover:shadow-xl transition-all duration-300 overflow-hidden rounded-2xl border-0 shadow-md"
                  onClick={() => onNavigate('create')}
                >
                  <div className="relative h-48 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-50">
                    {service.image && (
                      <ImageWithFallback
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    )}
                    <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-20 group-hover:opacity-30 transition-opacity`} />
                    <div className={`absolute top-4 right-4 w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center shadow-lg`}>
                      <service.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl mb-2">{service.title}</h3>
                    <p className="text-gray-600">{service.description}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Active Jobs - Các công việc đang tìm người */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-xl sm:text-2xl mb-1 sm:mb-2">Các công việc đang tìm người</h2>
                <p className="text-gray-600 text-sm sm:text-base">Các yêu cầu công việc đang chờ người làm nhận</p>
              </div>
              <Button
                variant="outline"
                className="rounded-xl self-start sm:self-auto"
                onClick={() => onNavigate('tracking')}
              >
                Xem tất cả
              </Button>
            </div>

            <div className="space-y-4">
              {recentTasks.map((task) => (
                <Card key={task.id} className="p-4 sm:p-6 rounded-2xl border-0 shadow-md hover:shadow-lg transition-shadow">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-start gap-3 sm:gap-4">
                      <Avatar className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl">
                        <AvatarFallback className="rounded-xl bg-gradient-to-br from-[#00BFA6] to-[#00D4B8] text-white">
                          JD
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <h3 className="mb-1 text-sm sm:text-base">{task.service}</h3>
                        <Badge className="bg-blue-100 text-blue-700 rounded-lg mb-2">
                          Đang tìm người
                        </Badge>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-xs sm:text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                            123 Đường Chính, Quận 1
                          </span>
                          <span>• Ngân sách: 100.000₫</span>
                        </div>
                      </div>
                    </div>
                    <Button 
                      className="w-full bg-[#00BFA6] hover:bg-[#00A88F] text-white rounded-xl text-xs sm:text-sm"
                      onClick={() => onNavigate('tracking')}
                    >
                      Xem chi tiết
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <Card className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl border-0 shadow-lg bg-gradient-to-r from-gray-50 to-white">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl mb-1 sm:mb-2">Cần giúp đỡ ngay bây giờ?</h2>
                <p className="text-gray-600 text-sm sm:text-base">Đặt dịch vụ chỉ với vài cú click</p>
              </div>
              <Button
                onClick={() => onNavigate('create')}
                className="bg-[#00BFA6] hover:bg-[#00A88F] text-white rounded-xl px-6 py-4 sm:px-8 sm:py-6 text-base sm:text-lg self-start sm:self-auto"
              >
                Đặt dịch vụ ngay
              </Button>
            </div>
          </Card>
        </TabsContent>

        {/* Feed Tab */}
        <TabsContent value="feed" className="mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Feed */}
            <div className="lg:col-span-2">
              <Feed
                isWorker={false}
                userName="John Doe"
                userType="customer"
              />
            </div>

            {/* Right Sidebar */}
            <div className="space-y-6">
              {/* Suggested Helpers */}
              <Card className="p-6 rounded-3xl border-0 shadow-lg">
                <h3 className="mb-4">Người giúp việc đề xuất</h3>
                <div className="space-y-4">
                  {suggestedHelpers.map((helper, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Avatar className="w-12 h-12 rounded-2xl">
                        {helper.avatar && <AvatarImage src={helper.avatar} />}
                        <AvatarFallback className="rounded-2xl bg-gradient-to-br from-[#00BFA6] to-[#00D4B8] text-white">
                          {helper.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-medium">{helper.name}</p>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                          <span>{helper.rating}</span>
                          <span>• {helper.jobs} việc</span>
                        </div>
                      </div>
                      <Button size="sm" variant="outline" className="rounded-xl">
                        Xem
                      </Button>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Trending Services */}
              <Card className="p-6 rounded-3xl border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  <h3>Dịch vụ xu hướng</h3>
                </div>
                <div className="space-y-3">
                  {trendingServices.map((service, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-white rounded-xl">
                      <div>
                        <p className="font-medium">{service.name}</p>
                        <p className="text-sm text-gray-600">{service.requests} yêu cầu</p>
                      </div>
                      <Badge className="bg-green-100 text-green-700 rounded-lg">
                        {service.trend}
                      </Badge>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Wallet Summary */}
              <Card className="p-6 rounded-3xl border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50">
                <h3 className="mb-4">Ví của tôi</h3>
                <div className="text-center py-4">
                  <p className="text-sm text-gray-600 mb-2">Số dư khả dụng</p>
                  <p className="text-4xl text-green-600 mb-4">500.000₫</p>
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white rounded-xl">
                    Nạp tiền
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
