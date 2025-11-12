import { useState } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Textarea } from '../ui/textarea';
import { Progress } from '../ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Label } from '../ui/label';
import { MessageCircle, Phone, Navigation, MapPin, Clock, Check, Play, Pause, Flag, Star } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface Props {
  onNavigate: (page: any) => void;
}

export function CurrentJob({ onNavigate }: Props) {
  const [jobStatus, setJobStatus] = useState<'going' | 'arrived' | 'working' | 'completed'>('working');
  const [notes, setNotes] = useState('Bắt đầu với phòng khách như đã thảo luận. Nhà bếp sẽ là bước tiếp theo.');
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [ratingComment, setRatingComment] = useState('');

  const progress = jobStatus === 'going' ? 25 : jobStatus === 'arrived' ? 40 : jobStatus === 'working' ? 70 : 100;

  const handleComplete = () => {
    setShowRatingModal(true);
  };

  const handleSubmitRating = () => {
    if (rating === 0) {
      toast.error('Vui lòng chọn số sao đánh giá');
      return;
    }
    
    toast.success('Đánh giá đã được gửi!', {
      description: 'Cảm ơn bạn đã hoàn thành công việc'
    });
    
    setShowRatingModal(false);
    setJobStatus('completed');
    
    setTimeout(() => {
      onNavigate('dashboard');
    }, 2000);
  };

  if (jobStatus === 'completed') {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16">
        <Card className="p-12 rounded-3xl border-0 shadow-xl text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
            <Check className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl mb-4">Công việc hoàn thành! 🎉</h2>
          <p className="text-gray-600 text-lg mb-6">
            Làm tốt lắm! Thanh toán sẽ được xử lý trong thời gian ngắn.
          </p>
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-green-100 text-green-700 rounded-xl">
            <span className="text-2xl">142.500₫</span>
            <span>đã kiếm được</span>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-green-600">Công việc đang hoạt động</span>
        </div>
        <h1 className="text-4xl mb-2">Công việc hiện tại</h1>
        <p className="text-gray-600">Dịch vụ dọn dẹp nhà cửa</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Map */}
          <Card className="p-0 rounded-3xl border-0 shadow-lg overflow-hidden">
            <div className="h-80 bg-gray-100 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-600">Địa điểm công việc</p>
                  <p className="text-sm text-gray-500">123 Đường Chính, Căn hộ 4B</p>
                </div>
              </div>
              <Button className="absolute bottom-4 right-4 bg-white text-[#00BFA6] hover:bg-gray-100 rounded-xl shadow-lg">
                <Navigation className="w-5 h-5 mr-2" />
                Chỉ đường
              </Button>
            </div>
          </Card>

          {/* Status Controls */}
          <Card className="p-8 rounded-3xl border-0 shadow-lg">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-2xl">Tiến độ công việc</h2>
                <span className="text-lg text-gray-600">{progress}%</span>
              </div>
              <Progress value={progress} className="h-4" />
            </div>

            {/* Status Buttons */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <Button
                onClick={() => setJobStatus('going')}
                variant={jobStatus === 'going' ? 'default' : 'outline'}
                className={`rounded-xl py-6 ${jobStatus === 'going' ? 'bg-blue-500 hover:bg-blue-600' : ''}`}
              >
                <Navigation className="w-5 h-5 mr-2" />
                Đang trên đường
              </Button>
              <Button
                onClick={() => setJobStatus('arrived')}
                variant={jobStatus === 'arrived' ? 'default' : 'outline'}
                className={`rounded-xl py-6 ${jobStatus === 'arrived' ? 'bg-orange-500 hover:bg-orange-600' : ''}`}
              >
                <MapPin className="w-5 h-5 mr-2" />
                Đã đến nơi
              </Button>
              <Button
                onClick={() => setJobStatus('working')}
                variant={jobStatus === 'working' ? 'default' : 'outline'}
                className={`rounded-xl py-6 ${jobStatus === 'working' ? 'bg-[#00BFA6] hover:bg-[#00A88F]' : ''}`}
              >
                <Play className="w-5 h-5 mr-2" />
                Đang làm việc
              </Button>
              <Button
                onClick={handleComplete}
                variant="outline"
                className="rounded-xl py-6 border-green-500 text-green-700 hover:bg-green-50"
              >
                <Check className="w-5 h-5 mr-2" />
                Hoàn thành việc
              </Button>
            </div>

            {/* Timer */}
            <div className="flex items-center justify-center gap-4 p-6 bg-gradient-to-br from-gray-50 to-white rounded-2xl">
              <Clock className="w-8 h-8 text-[#00BFA6]" />
              <div className="text-center">
                <p className="text-sm text-gray-600">Thời gian đã trôi qua</p>
                <p className="text-3xl">1:23:45</p>
              </div>
            </div>
          </Card>

          {/* Notes */}
          <Card className="p-8 rounded-3xl border-0 shadow-lg">
            <h2 className="text-2xl mb-4">Ghi chú công việc</h2>
            <p className="text-gray-600 mb-4">Cập nhật khách hàng về tiến độ của bạn</p>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Thêm ghi chú về tiến độ công việc..."
              className="min-h-32 rounded-2xl mb-4"
            />
            <Button className="bg-[#00BFA6] hover:bg-[#00A88F] text-white rounded-xl">
              Cập nhật ghi chú
            </Button>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Customer Info */}
          <Card className="p-6 rounded-3xl border-0 shadow-lg">
            <h3 className="mb-4">Khách hàng</h3>
            <div className="text-center mb-6">
              <Avatar className="w-20 h-20 mx-auto mb-3 rounded-2xl">
                <AvatarImage src="" />
                <AvatarFallback className="rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-500 text-white text-xl">
                  JD
                </AvatarFallback>
              </Avatar>
              <h4 className="text-lg mb-1">John Doe</h4>
              <p className="text-sm text-gray-600">Khách hàng lần đầu</p>
            </div>

            <div className="space-y-3">
              <Button className="w-full bg-[#00BFA6] hover:bg-[#00A88F] text-white rounded-xl">
                <MessageCircle className="w-5 h-5 mr-2" />
                Gửi tin nhắn
              </Button>
              <Button variant="outline" className="w-full rounded-xl">
                <Phone className="w-5 h-5 mr-2" />
                Gọi khách hàng
              </Button>
            </div>
          </Card>

          {/* Job Details */}
          <Card className="p-6 rounded-3xl border-0 shadow-lg">
            <h3 className="mb-4">Chi tiết công việc</h3>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-gray-600 mb-1">Dịch vụ</p>
                <p className="font-medium">Dọn dẹp nhà cửa</p>
              </div>
              <div>
                <p className="text-gray-600 mb-1">Thời lượng</p>
                <p className="font-medium">2 giờ</p>
              </div>
              <div>
                <p className="text-gray-600 mb-1">Giờ bắt đầu</p>
                <p className="font-medium">10:00 SA</p>
              </div>
              <div>
                <p className="text-gray-600 mb-1">Địa điểm</p>
                <p className="font-medium">123 Đường Chính, Căn hộ 4B</p>
              </div>
              <div>
                <p className="text-gray-600 mb-1">Thanh toán</p>
                <p className="text-2xl text-[#00BFA6] mt-1">142.500₫</p>
              </div>
            </div>
          </Card>

          {/* Task Checklist */}
          <Card className="p-6 rounded-3xl border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50">
            <h3 className="mb-4">Danh sách công việc</h3>
            <div className="space-y-2">
              {[
                { task: 'Phòng khách', completed: true },
                { task: 'Nhà bếp', completed: true },
                { task: 'Phòng tắm', completed: false },
                { task: 'Phòng ngủ', completed: false },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-white rounded-xl">
                  <div className={`w-5 h-5 rounded-md flex items-center justify-center ${
                    item.completed ? 'bg-green-500' : 'bg-gray-200'
                  }`}>
                    {item.completed && <Check className="w-4 h-4 text-white" />}
                  </div>
                  <span className={item.completed ? 'line-through text-gray-500' : ''}>
                    {item.task}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          {/* Report Issue */}
          <Card className="p-6 rounded-3xl border-0 shadow-lg bg-gradient-to-br from-red-50 to-pink-50">
            <h3 className="mb-3">Cần trợ giúp?</h3>
            <p className="text-sm text-gray-700 mb-4">
              Báo cáo bất kỳ vấn đề nào hoặc liên hệ hỗ trợ
            </p>
            <Button variant="outline" className="w-full rounded-xl border-red-300 text-red-700 hover:bg-red-100">
              <Flag className="w-4 h-4 mr-2" />
              Báo cáo vấn đề
            </Button>
          </Card>
        </div>
      </div>

      {/* Rating Modal */}
      <Dialog open={showRatingModal} onOpenChange={setShowRatingModal}>
        <DialogContent className="rounded-3xl max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl">Đánh giá khách hàng</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6 mt-4">
            {/* Customer Info */}
            <div className="text-center">
              <Avatar className="w-20 h-20 mx-auto mb-3 rounded-2xl">
                <AvatarFallback className="rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-500 text-white text-xl">
                  JD
                </AvatarFallback>
              </Avatar>
              <h4 className="text-lg">John Doe</h4>
              <p className="text-sm text-gray-600">Khách hàng</p>
            </div>

            {/* Star Rating */}
            <div>
              <Label className="mb-3 block text-center">Đánh giá của bạn</Label>
              <div className="flex justify-center gap-2 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="transition-transform hover:scale-110"
                  >
                    <Star
                      className={`w-10 h-10 ${
                        star <= (hoverRating || rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
              <p className="text-center text-sm text-gray-600">
                {rating === 0 && 'Chọn số sao'}
                {rating === 1 && 'Rất tệ'}
                {rating === 2 && 'Tệ'}
                {rating === 3 && 'Bình thường'}
                {rating === 4 && 'Tốt'}
                {rating === 5 && 'Xuất sắc'}
              </p>
            </div>

            {/* Comment */}
            <div>
              <Label>Nhận xét về khách hàng (tùy chọn)</Label>
              <Textarea
                value={ratingComment}
                onChange={(e) => setRatingComment(e.target.value)}
                placeholder="Khách hàng thân thiện, giao tiếp rõ ràng..."
                className="mt-2 rounded-xl min-h-24"
              />
            </div>

            {/* Quick Tags */}
            <div>
              <Label className="mb-2 block">Từ khóa nhanh</Label>
              <div className="flex flex-wrap gap-2">
                {['Thân thiện', 'Đúng giờ', 'Giao tiếp tốt', 'Nhiệt tình', 'Chuyên nghiệp'].map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setRatingComment(prev => prev ? `${prev}, ${tag}` : tag)}
                    className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Payment Summary */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600">Thu nhập công việc:</span>
                <span className="text-2xl text-green-600">142.500₫</span>
              </div>
              <p className="text-sm text-gray-600">
                Thanh toán sẽ được xử lý sau khi gửi đánh giá
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setShowRatingModal(false)}
                className="flex-1 rounded-xl"
              >
                Hủy
              </Button>
              <Button
                onClick={handleSubmitRating}
                className="flex-1 bg-[#00BFA6] hover:bg-[#00A88F] text-white rounded-xl"
              >
                Gửi đánh giá
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
