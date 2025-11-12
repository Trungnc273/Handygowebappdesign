import { useState } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { Switch } from '../ui/switch';
import { Separator } from '../ui/separator';
import { User, Star, MapPin, Phone, Mail, Edit2, Award, Check, Clock } from 'lucide-react';

interface Props {
  onNavigate: (page: any) => void;
}

const skills = ['Dọn dẹp', 'Dọn sâu', 'Thân thiện môi trường', 'Thân thiện thú cưng', 'Tổ chức'];
const reviews = [
  { id: 1, customer: 'John Doe', rating: 5, comment: 'Dịch vụ xuất sắc! Rất kỹ lưỡng và chuyên nghiệp.', date: 'Ngày 24/10/2025' },
  { id: 2, customer: 'Jane Smith', rating: 5, comment: 'Sarah đã làm việc tuyệt vời. Rất đáng giới thiệu!', date: 'Ngày 20/10/2025' },
  { id: 3, customer: 'Mike Wilson', rating: 4, comment: 'Công việc tốt, đến đúng giờ.', date: 'Ngày 15/10/2025' },
];

export function WorkerProfile({ onNavigate }: Props) {
  const [editMode, setEditMode] = useState(false);
  const [isAvailable, setIsAvailable] = useState(true);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl mb-2">Hồ sơ của tôi</h1>
        <p className="text-gray-600">Quản lý hồ sơ chuyên nghiệp và cài đặt của bạn</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="space-y-6">
          <Card className="p-6 rounded-3xl border-0 shadow-lg">
            <div className="text-center">
              <Avatar className="w-32 h-32 mx-auto mb-4 rounded-3xl">
                <AvatarImage src="https://images.unsplash.com/photo-1665436035665-d7dad9086ee2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b3JrZXIlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjEzOTQ1NTR8MA&ixlib=rb-4.1.0&q=80&w=1080" />
                <AvatarFallback className="rounded-3xl bg-gradient-to-br from-[#00BFA6] to-[#00D4B8] text-white text-4xl">
                  SJ
                </AvatarFallback>
              </Avatar>
              <h2 className="text-2xl mb-2">Sarah Johnson</h2>
              <div className="flex items-center justify-center gap-2 mb-4">
                <Badge className="bg-blue-100 text-blue-700 rounded-lg">
                  <Check className="w-3 h-3 mr-1" />
                  Đã xác minh
                </Badge>
                <Badge className="bg-yellow-100 text-yellow-700 rounded-lg">
                  ⭐ Được đánh giá cao
                </Badge>
              </div>
              <Button variant="outline" className="w-full rounded-xl mb-3">
                <Edit2 className="w-4 h-4 mr-2" />
                Tải lên ảnh
              </Button>
            </div>

            <Separator className="my-6" />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Sẵn sàng làm việc</span>
                <Switch
                  checked={isAvailable}
                  onCheckedChange={setIsAvailable}
                  className="data-[state=checked]:bg-[#00BFA6]"
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Đánh giá</span>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span>4.9 (156)</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Việc hoàn thành</span>
                <span className="font-medium">156</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Tỷ lệ thành công</span>
                <span className="font-medium">98%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Thời gian phản hồi</span>
                <span className="font-medium">2 phút</span>
              </div>
            </div>
          </Card>

          {/* Achievements */}
          <Card className="p-6 rounded-3xl border-0 shadow-lg bg-gradient-to-br from-yellow-50 to-orange-50">
            <div className="flex items-center gap-2 mb-4">
              <Award className="w-6 h-6 text-yellow-600" />
              <h3 className="text-lg">Huy hiệu & Thành tích</h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center p-3 bg-white rounded-xl">
                <div className="text-3xl mb-1">🏆</div>
                <p className="text-xs">Xuất sắc nhất</p>
              </div>
              <div className="text-center p-3 bg-white rounded-xl">
                <div className="text-3xl mb-1">⭐</div>
                <p className="text-xs">Chuyên gia 5 sao</p>
              </div>
              <div className="text-center p-3 bg-white rounded-xl">
                <div className="text-3xl mb-1">🎯</div>
                <p className="text-xs">100+ việc</p>
              </div>
              <div className="text-center p-3 bg-white rounded-xl">
                <div className="text-3xl mb-1">⚡</div>
                <p className="text-xs">Phản hồi nhanh</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Info */}
          <Card className="p-8 rounded-3xl border-0 shadow-lg">
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
                  defaultValue="Sarah Johnson"
                  disabled={!editMode}
                  className="mt-2 rounded-xl"
                />
              </div>
              <div>
                <Label>Địa chỉ email</Label>
                <div className="relative mt-2">
                  <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <Input
                    defaultValue="sarah.johnson@email.com"
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
                    defaultValue="+84 (555) 987-6543"
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
                    defaultValue="Hồ Chí Minh, Việt Nam"
                    disabled={!editMode}
                    className="pl-10 rounded-xl"
                  />
                </div>
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

          {/* Skills & Services */}
          <Card className="p-8 rounded-3xl border-0 shadow-lg">
            <h2 className="text-2xl mb-4">Kỹ năng & Dịch vụ</h2>
            <p className="text-gray-600 mb-6">Các dịch vụ bạn cung cấp cho khách hàng</p>
            <div className="flex flex-wrap gap-3 mb-6">
              {skills.map((skill) => (
                <Badge key={skill} variant="secondary" className="px-4 py-2 rounded-xl">
                  {skill}
                  {editMode && <span className="ml-2 cursor-pointer">×</span>}
                </Badge>
              ))}
              {editMode && (
                <Button variant="outline" size="sm" className="rounded-xl">
                  + Thêm kỹ năng
                </Button>
              )}
            </div>

            <div>
              <Label>Giới thiệu bản thân</Label>
              <Textarea
                defaultValue="Chuyên gia dọn dẹp chuyên nghiệp với hơn 5 năm kinh nghiệm. Cam kết cung cấp dịch vụ dọn dẹp thân thiện với môi trường và kỹ lưỡng. Thân thiện với thú cưng và linh hoạt với lịch trình."
                disabled={!editMode}
                className="mt-2 rounded-2xl min-h-32"
              />
            </div>
          </Card>

          {/* Working Area */}
          <Card className="p-8 rounded-3xl border-0 shadow-lg">
            <h2 className="text-2xl mb-4">Khu vực làm việc</h2>
            <p className="text-gray-600 mb-4">Các khu vực bạn cung cấp dịch vụ</p>
            <div className="h-64 bg-gray-100 rounded-2xl flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                <p className="text-gray-600">Bản đồ khu vực dịch vụ</p>
                <p className="text-sm text-gray-500">Bán kính 5 km từ vị trí của bạn</p>
              </div>
            </div>
          </Card>

          {/* Reviews */}
          <Card className="p-8 rounded-3xl border-0 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl mb-1">Đánh giá từ khách hàng</h2>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                    ))}
                  </div>
                  <span className="text-gray-600">Trung bình 4.9 từ 156 đánh giá</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {reviews.map((review) => (
                <div key={review.id} className="p-6 bg-gray-50 rounded-2xl">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-medium mb-1">{review.customer}</p>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: review.rating }).map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        ))}
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">{review.date}</span>
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
