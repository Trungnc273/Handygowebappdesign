import { useState } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { User, Wallet, History, HeadphonesIcon, Edit2, Star, MapPin, Phone, Mail, CreditCard, DollarSign, Calendar, LogOut, FileText } from 'lucide-react';
import { PostCard, Post } from '../feed/PostCard';

interface Props {
  onNavigate: (page: any) => void;
}

const completedTasks = [
  { id: 1, service: 'Dọn dẹp nhà cửa', worker: 'Sarah Johnson', date: '24/10/2025', amount: '142.500đ', status: 'Hoàn thành', rating: 5 },
  { id: 2, service: 'Lắp ráp đồ nội thất', worker: 'Mike Chen', date: '20/10/2025', amount: '85.000đ', status: 'Hoàn thành', rating: 4 },
  { id: 3, service: 'Bảo trì vườn', worker: 'Emma Davis', date: '15/10/2025', amount: '120.000đ', status: 'Hoàn thành', rating: 5 },
];

const transactions = [
  { id: 1, type: 'Thanh toán', description: 'Dịch vụ dọn dẹp nhà cửa', amount: -142.50, date: '24/10/2025' },
  { id: 2, type: 'Hoàn tiền', description: 'Dịch vụ đã hủy', amount: 50.00, date: '22/10/2025' },
  { id: 3, type: 'Nạp tiền', description: 'Nạp ví', amount: 200.00, date: '20/10/2025' },
];

const myPosts: Post[] = [
  {
    id: '1',
    userId: 'current-user',
    userName: 'John Doe',
    userType: 'customer',
    location: 'Quận 1, TP.HCM',
    timeAgo: '2 ngày trước',
    type: 'request',
    serviceCategory: 'Dọn dẹp',
    budget: '150.000₫ - 200.000₫',
    content: 'Mình cần tìm người giúp dọn dẹp nhà cửa cho căn hộ 3 phòng ngủ. Yêu cầu kinh nghiệm và mang theo dụng cụ dọn dẹp.',
    images: ['https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400'],
    likes: 12,
    comments: 5,
    shares: 2
  }
];

export function CustomerProfile({ onNavigate }: Props) {
  const [editMode, setEditMode] = useState(false);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl mb-2">Hồ sơ của tôi</h1>
        <p className="text-gray-600">Quản lý tài khoản và xem hoạt động của bạn</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid grid-cols-5 w-full max-w-3xl rounded-2xl p-1 bg-gray-100">
          <TabsTrigger value="profile" className="rounded-xl">
            <User className="w-4 h-4 mr-2" />
            Hồ sơ
          </TabsTrigger>
          <TabsTrigger value="history" className="rounded-xl">
            <History className="w-4 h-4 mr-2" />
            Lịch sử
          </TabsTrigger>
          <TabsTrigger value="posts" className="rounded-xl">
            <FileText className="w-4 h-4 mr-2" />
            Bài đăng
          </TabsTrigger>
          <TabsTrigger value="wallet" className="rounded-xl">
            <Wallet className="w-4 h-4 mr-2" />
            Ví
          </TabsTrigger>
          <TabsTrigger value="support" className="rounded-xl">
            <HeadphonesIcon className="w-4 h-4 mr-2" />
            Hỗ trợ
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profile Card */}
            <Card className="lg:col-span-1 p-6 rounded-3xl border-0 shadow-lg">
              <div className="text-center">
                <Avatar className="w-32 h-32 mx-auto mb-4 rounded-3xl">
                  <AvatarImage src="" />
                  <AvatarFallback className="rounded-3xl bg-gradient-to-br from-[#00BFA6] to-[#00D4B8] text-white text-4xl">
                    JD
                  </AvatarFallback>
                </Avatar>
                <h2 className="text-2xl mb-1">Nguyễn Văn A</h2>
                <p className="text-gray-600 mb-4">Thành viên từ 10/2025</p>
                <Button variant="outline" className="w-full rounded-xl">
                  <Edit2 className="w-4 h-4 mr-2" />
                  Tải ảnh lên
                </Button>
              </div>

              <Separator className="my-6" />

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Tổng công việc</span>
                  <Badge variant="secondary" className="rounded-lg">12 hoàn thành</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Đánh giá trung bình</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span>4.8</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Tổng chi tiêu</span>
                  <span className="font-medium">1.247.500đ</span>
                </div>
              </div>
            </Card>

            {/* Personal Information */}
            <Card className="lg:col-span-2 p-8 rounded-3xl border-0 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl">Thông tin cá nhân</h2>
                <Button
                  variant="outline"
                  onClick={() => setEditMode(!editMode)}
                  className="rounded-xl"
                >
                  <Edit2 className="w-4 h-4 mr-2" />
                  {editMode ? 'Hủy' : 'Chỉnh sửa'}
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label>Họ và tên</Label>
                  <Input
                    defaultValue="Nguyễn Văn A"
                    disabled={!editMode}
                    className="mt-2 rounded-xl"
                  />
                </div>
                <div>
                  <Label>Địa chỉ email</Label>
                  <div className="relative mt-2">
                    <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <Input
                      defaultValue="nguyenvana@email.com"
                      disabled={!editMode}
                      className="pl-10 rounded-xl"
                    />
                  </div>
                </div>
                <div>
                  <Label>Số điện thoại</Label>
                  <div className="relative mt-2">
                    <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <Input
                      defaultValue="+84 123-456-789"
                      disabled={!editMode}
                      className="pl-10 rounded-xl"
                    />
                  </div>
                </div>
                <div>
                  <Label>Thành phố</Label>
                  <div className="relative mt-2">
                    <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <Input
                      defaultValue="Hồ Chí Minh"
                      disabled={!editMode}
                      className="pl-10 rounded-xl"
                    />
                  </div>
                </div>
                <div className="md:col-span-2">
                  <Label>Địa chỉ nhà</Label>
                  <Input
                    defaultValue="123 Đường Chính, Căn hộ 4B"
                    disabled={!editMode}
                    className="mt-2 rounded-xl"
                  />
                </div>
              </div>

              {editMode && (
                <div className="flex justify-end gap-3 mt-6">
                  <Button variant="outline" onClick={() => setEditMode(false)} className="rounded-xl">
                    Hủy
                  </Button>
                  <Button className="bg-[#00BFA6] hover:bg-[#00A88F] text-white rounded-xl">
                    Lưu thay đổi
                  </Button>
                </div>
              )}
            </Card>
          </div>

          {/* Logout */}
          <Card className="p-6 rounded-3xl border-0 shadow-lg bg-gradient-to-br from-red-50 to-pink-50">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="mb-1">Đăng xuất</h3>
                <p className="text-sm text-gray-600">Thoát khỏi tài khoản của bạn</p>
              </div>
              <Button variant="outline" className="rounded-xl border-red-300 text-red-700 hover:bg-red-100">
                <LogOut className="w-4 h-4 mr-2" />
                Đăng xuất
              </Button>
            </div>
          </Card>
        </TabsContent>

        {/* My Posts Tab */}
        <TabsContent value="posts">
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl mb-1">Bài đăng của tôi</h2>
                <p className="text-gray-600">Quản lý tất cả bài đăng của bạn trên feed</p>
              </div>
              <Badge variant="secondary" className="px-4 py-2 rounded-xl">
                {myPosts.length} bài đăng
              </Badge>
            </div>

            {myPosts.length === 0 ? (
              <Card className="p-12 rounded-3xl border-0 shadow-lg text-center">
                <FileText className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <h3 className="text-xl mb-2">Chưa có bài đăng nào</h3>
                <p className="text-gray-600 mb-6">Bạn chưa tạo bài đăng nào trên feed</p>
                <Button className="bg-[#00BFA6] hover:bg-[#00A88F] text-white rounded-xl">
                  Tạo bài đăng đầu tiên
                </Button>
              </Card>
            ) : (
              myPosts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  showActions={true}
                  isWorker={false}
                />
              ))
            )}
          </div>
        </TabsContent>

        {/* History Tab */}
        <TabsContent value="history">
          <Card className="p-8 rounded-3xl border-0 shadow-lg">
            <h2 className="text-2xl mb-6">Lịch sử công việc</h2>
            <div className="space-y-4">
              {completedTasks.map((task) => (
                <div key={task.id} className="p-6 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg">{task.service}</h3>
                        <Badge className="bg-green-100 text-green-700 rounded-lg">
                          {task.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-6 text-sm text-gray-600">
                        <span>Người làm việc: {task.worker}</span>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {task.date}
                        </div>
                        <div className="flex items-center gap-1">
                          {Array.from({ length: task.rating }).map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-medium">{task.amount}</p>
                      <Button variant="outline" className="mt-2 rounded-xl" size="sm">
                        Xem chi tiết
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Wallet Tab */}
        <TabsContent value="wallet" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Balance Card */}
            <Card className="p-8 rounded-3xl border-0 shadow-lg bg-gradient-to-br from-[#00BFA6] to-[#00D4B8] text-white">
              <div className="flex items-center gap-2 mb-4">
                <Wallet className="w-6 h-6" />
                <span>Ví HandyGo</span>
              </div>
              <p className="text-sm opacity-90 mb-2">Số dư khả dụng</p>
              <p className="text-5xl mb-6">327.500đ</p>
              <div className="flex gap-3">
                <Button className="flex-1 bg-white text-[#00BFA6] hover:bg-gray-100 rounded-xl">
                  Nạp tiền
                </Button>
                <Button variant="outline" className="flex-1 border-white text-white hover:bg-white/10 rounded-xl">
                  Rút tiền
                </Button>
              </div>
            </Card>

            {/* Payment Methods */}
            <Card className="p-8 rounded-3xl border-0 shadow-lg">
              <h3 className="text-xl mb-4">Phương thức thanh toán</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                      <CreditCard className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">•••• 4242</p>
                      <p className="text-sm text-gray-600">Hết hạn 12/26</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="rounded-lg">Chính</Badge>
                </div>
                <Button variant="outline" className="w-full rounded-xl">
                  Thêm phương thức thanh toán
                </Button>
              </div>
            </Card>
          </div>

          {/* Transactions */}
          <Card className="p-8 rounded-3xl border-0 shadow-lg">
            <h2 className="text-2xl mb-6">Giao dịch gần đây</h2>
            <div className="space-y-3">
              {transactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      transaction.amount > 0 ? 'bg-green-100' : 'bg-gray-100'
                    }`}>
                      <DollarSign className={`w-5 h-5 ${
                        transaction.amount > 0 ? 'text-green-600' : 'text-gray-600'
                      }`} />
                    </div>
                    <div>
                      <p className="font-medium">{transaction.description}</p>
                      <p className="text-sm text-gray-600">{transaction.date}</p>
                    </div>
                  </div>
                  <p className={`text-lg font-medium ${
                    transaction.amount > 0 ? 'text-green-600' : 'text-gray-900'
                  }`}>
                    {transaction.amount > 0 ? '+' : ''}{Math.abs(transaction.amount * 1000).toFixed(0)}đ
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Support Tab */}
        <TabsContent value="support">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-8 rounded-3xl border-0 shadow-lg">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[#00BFA6]/10 flex items-center justify-center">
                  <HeadphonesIcon className="w-8 h-8 text-[#00BFA6]" />
                </div>
                <h3 className="text-xl mb-2">Liên hệ hỗ trợ</h3>
                <p className="text-gray-600 mb-6">Đội ngũ của chúng tôi luôn sẵn sàng hỗ trợ bạn 24/7</p>
                <Button className="w-full bg-[#00BFA6] hover:bg-[#00A88F] text-white rounded-xl">
                  Bắt đầu chat
                </Button>
              </div>
            </Card>

            <Card className="p-8 rounded-3xl border-0 shadow-lg">
              <h3 className="text-xl mb-4">Trợ giúp nhanh</h3>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start rounded-xl">
                  Cách đặt dịch vụ
                </Button>
                <Button variant="outline" className="w-full justify-start rounded-xl">
                  Chính sách thanh toán & hoàn tiền
                </Button>
                <Button variant="outline" className="w-full justify-start rounded-xl">
                  Hướng dẫn an toàn
                </Button>
                <Button variant="outline" className="w-full justify-start rounded-xl">
                  Câu hỏi thường gặp
                </Button>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
