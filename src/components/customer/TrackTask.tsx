import { useState } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Progress } from '../ui/progress';
import { Badge } from '../ui/badge';
import { MessageCircle, Phone, MapPin, Clock, Check, Navigation, AlertTriangle, Star } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';

interface Props {
  onNavigate: (page: any) => void;
}

const statusSteps = [
  { id: 1, label: 'Đặt chỗ đã xác nhận', time: '9:30 Sáng', completed: true },
  { id: 2, label: 'Người làm việc đã chấp nhận', time: '9:35 Sáng', completed: true },
  { id: 3, label: 'Đang trên đường', time: '9:50 Sáng', completed: true },
  { id: 4, label: 'Đang thực hiện', time: '10:00 Sáng', completed: false, current: true },
  { id: 5, label: 'Hoàn thành', time: '-', completed: false },
];

export function TrackTask({ onNavigate }: Props) {
  const currentProgress = 60;
  const [showReportDialog, setShowReportDialog] = useState(false);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-green-600">Theo dõi trực tiếp</span>
        </div>
        <h1 className="text-4xl mb-2">Theo dõi công việc</h1>
        <p className="text-gray-600">Giám sát dịch vụ của bạn theo thời gian thực</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Map and Timeline */}
        <div className="lg:col-span-2 space-y-6">
          {/* Map */}
          <Card className="p-0 rounded-3xl border-0 shadow-lg overflow-hidden">
            <div className="h-96 bg-gray-100 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-600">Bản đồ vị trí trực tiếp</p>
                  <p className="text-sm text-gray-500">Người làm việc cách bạn 0.3 km</p>
                </div>
              </div>
              {/* Status Badge */}
              <div className="absolute top-4 left-4 bg-white rounded-2xl px-4 py-3 shadow-lg">
                <div className="flex items-center gap-2">
                  <Navigation className="w-5 h-5 text-[#00BFA6]" />
                  <div>
                    <p className="text-xs text-gray-600">Hoàn thành dự kiến</p>
                    <p className="font-medium">11:30 Sáng</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Status Timeline */}
          <Card className="p-6 rounded-3xl border-0 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl">Trạng thái công việc</h2>
              <div className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-xl">
                <Clock className="w-4 h-4" />
                <span>Đang thực hiện</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Tiến độ tổng thể</span>
                <span className="text-sm font-medium">{currentProgress}%</span>
              </div>
              <Progress value={currentProgress} className="h-3" />
            </div>

            {/* Timeline */}
            <div className="space-y-4">
              {statusSteps.map((step, index) => (
                <div key={step.id} className="flex items-start gap-4">
                  <div className="relative">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                        step.completed
                          ? 'bg-gradient-to-br from-[#00BFA6] to-[#00D4B8] text-white shadow-lg'
                          : step.current
                          ? 'bg-blue-100 text-blue-600 ring-4 ring-blue-50'
                          : 'bg-gray-100 text-gray-400'
                      }`}
                    >
                      {step.completed ? (
                        <Check className="w-5 h-5" />
                      ) : (
                        <span>{step.id}</span>
                      )}
                    </div>
                    {index < statusSteps.length - 1 && (
                      <div
                        className={`absolute left-5 top-10 w-0.5 h-8 ${
                          step.completed ? 'bg-[#00BFA6]' : 'bg-gray-200'
                        }`}
                      />
                    )}
                  </div>
                  <div className="flex-1 pt-2">
                    <div className="flex items-center justify-between">
                      <p className={step.current ? 'font-medium' : ''}>{step.label}</p>
                      <span className="text-sm text-gray-500">{step.time}</span>
                    </div>
                    {step.current && (
                      <p className="text-sm text-gray-600 mt-1">
                        Sarah hiện đang làm việc trên công việc của bạn
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Notes */}
          <Card className="p-6 rounded-3xl border-0 shadow-lg bg-gradient-to-br from-yellow-50 to-orange-50">
            <h3 className="mb-3">📝 Ghi chú của người làm việc</h3>
            <p className="text-gray-700">
              "Đang bắt đầu với phòng khách như đã thảo luận. Bếp sẽ là tiếp theo. Mọi thứ đang diễn ra suôn sẻ!"
            </p>
            <p className="text-sm text-gray-500 mt-2">Cập nhật 5 phút trước</p>
          </Card>
        </div>

        {/* Right Column - Worker Info and Actions */}
        <div className="space-y-6">
          {/* Worker Card */}
          <Card className="p-6 rounded-3xl border-0 shadow-lg bg-gradient-to-br from-[#00BFA6]/5 to-[#00D4B8]/5">
            <h3 className="mb-4">Người làm việc được phân công</h3>
            <div className="text-center mb-6">
              <Avatar className="w-24 h-24 mx-auto mb-3 rounded-2xl">
                <AvatarImage src="https://images.unsplash.com/photo-1665436035665-d7dad9086ee2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b3JrZXIlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjEzOTQ1NTR8MA&ixlib=rb-4.1.0&q=80&w=1080" />
                <AvatarFallback className="rounded-2xl bg-gradient-to-br from-[#00BFA6] to-[#00D4B8] text-white text-2xl">
                  SJ
                </AvatarFallback>
              </Avatar>
              <h4 className="text-xl mb-1">Sarah Johnson</h4>
              <div className="flex items-center justify-center gap-1 mb-2">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <span className="text-sm">4.9</span>
                <span className="text-sm text-gray-600">(156 đánh giá)</span>
              </div>
              <Badge className="bg-blue-100 text-blue-700 rounded-lg">
                ✓ Chuyên nghiệp đã xác minh
              </Badge>
            </div>

            <div className="space-y-3">
              <Button className="w-full bg-[#00BFA6] hover:bg-[#00A88F] text-white rounded-xl">
                <MessageCircle className="w-5 h-5 mr-2" />
                Chat
              </Button>
              <Button variant="outline" className="w-full rounded-xl">
                <Phone className="w-5 h-5 mr-2" />
                Gọi
              </Button>
            </div>
          </Card>

          {/* Task Details */}
          <Card className="p-6 rounded-3xl border-0 shadow-lg">
            <h3 className="mb-4">Chi ti��t công việc</h3>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-gray-600 mb-1">Loại dịch vụ</p>
                <p className="font-medium">Dọn dẹp nhà cửa</p>
              </div>
              <div>
                <p className="text-gray-600 mb-1">Ngày & Giờ</p>
                <p className="font-medium">28/10/2025 • 10:00 Sáng</p>
              </div>
              <div>
                <p className="text-gray-600 mb-1">Địa điểm</p>
                <p className="font-medium">123 Đường Chính, Căn hộ 4B</p>
              </div>
              <div>
                <p className="text-gray-600 mb-1">Tổng chi phí</p>
                <p className="font-medium text-[#00BFA6] text-lg">142.500đ</p>
              </div>
            </div>
          </Card>

          {/* Quick Actions */}
          <Card className="p-6 rounded-3xl border-0 shadow-lg bg-gradient-to-br from-red-50 to-pink-50">
            <h3 className="mb-3">Cần hỗ trợ?</h3>
            <p className="text-sm text-gray-700 mb-4">
              Nếu bạn có bất kỳ vấn đề hoặc thắc mắc nào, hãy liên hệ nhóm hỗ trợ của chúng tôi
            </p>
            <Button 
              onClick={() => setShowReportDialog(true)}
              variant="outline" 
              className="w-full rounded-xl border-red-300 text-red-700 hover:bg-red-50"
            >
              <AlertTriangle className="w-4 h-4 mr-2" />
              Báo cáo sự cố
            </Button>
          </Card>

          {/* Complete Button */}
          <Button
            onClick={() => onNavigate('rating')}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-xl py-6 text-lg"
          >
            <Check className="w-5 h-5 mr-2" />
            Đánh dấu hoàn thành
          </Button>
        </div>
      </div>

      {/* Report Dialog */}
      <Dialog open={showReportDialog} onOpenChange={setShowReportDialog}>
        <DialogContent className="rounded-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              Báo cáo sự cố
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-gray-600">
              Vui lòng mô tả vấn đề bạn gặp phải. Đội ngũ hỗ trợ của chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.
            </p>
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
              <p className="text-sm text-yellow-800">
                ⚠️ Báo cáo sẽ được gửi đến đội ngũ hỗ trợ khách hàng và người làm việc liên quan.
              </p>
            </div>
            <Button 
              onClick={() => setShowReportDialog(false)}
              className="w-full bg-red-600 hover:bg-red-700 text-white rounded-xl"
            >
              Gửi báo cáo
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
