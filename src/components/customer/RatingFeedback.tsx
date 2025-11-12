import { useState } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { Star, ThumbsUp, Clock, Smile, Award, Flag, Check, Sparkles } from 'lucide-react';

interface Props {
  onNavigate: (page: any) => void;
}

const quickTags = [
  { icon: ThumbsUp, label: 'Thân thiện', color: 'blue' },
  { icon: Clock, label: 'Đúng giờ', color: 'green' },
  { icon: Smile, label: 'Chuyên nghiệp', color: 'purple' },
  { icon: Award, label: 'Chất lượng cao', color: 'orange' },
  { icon: Sparkles, label: 'Vượt mong đợi', color: 'pink' },
];

export function RatingFeedback({ onNavigate }: Props) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => {
      onNavigate('dashboard');
    }, 2000);
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16">
        <Card className="p-12 rounded-3xl border-0 shadow-xl text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
            <Check className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl mb-4">Cảm ơn phản hồi của bạn!</h2>
          <p className="text-gray-600 text-lg mb-6">
            Đánh giá của bạn giúp chúng tôi duy trì chất lượng dịch vụ
          </p>
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-green-100 text-green-700 rounded-xl">
            <Award className="w-5 h-5" />
            <span>Bạn đã nhận được 50 điểm thưởng!</span>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl mb-2">Đánh giá trải nghiệm</h1>
        <p className="text-gray-600">Giúp chúng tôi cải thiện bằng cách chia sẻ phản hồi của bạn</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Rating Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Star Rating */}
          <Card className="p-8 rounded-3xl border-0 shadow-lg text-center">
            <h2 className="text-2xl mb-6">Dịch vụ của bạn thế nào?</h2>
            <div className="flex items-center justify-center gap-3 mb-6">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className={`w-14 h-14 ${
                      star <= (hoverRating || rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>
            {rating > 0 && (
              <p className="text-lg text-gray-600">
                {rating === 5 && '🌟 Xuất sắc!'}
                {rating === 4 && '😊 Tuyệt vời!'}
                {rating === 3 && '👍 Tốt'}
                {rating === 2 && '😐 Khá'}
                {rating === 1 && '😞 Kém'}
              </p>
            )}
          </Card>

          {/* Quick Tags */}
          <Card className="p-8 rounded-3xl border-0 shadow-lg">
            <h2 className="text-2xl mb-4">Bạn thích điều gì?</h2>
            <p className="text-gray-600 mb-6">Chọn tất cả những gì phù hợp</p>
            <div className="flex flex-wrap gap-3">
              {quickTags.map((tag) => (
                <button
                  key={tag.label}
                  onClick={() => toggleTag(tag.label)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-all ${
                    selectedTags.includes(tag.label)
                      ? 'bg-[#00BFA6] text-white shadow-lg scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <tag.icon className="w-5 h-5" />
                  <span>{tag.label}</span>
                  {selectedTags.includes(tag.label) && (
                    <Check className="w-4 h-4" />
                  )}
                </button>
              ))}
            </div>
          </Card>

          {/* Written Feedback */}
          <Card className="p-8 rounded-3xl border-0 shadow-lg">
            <h2 className="text-2xl mb-4">Nhận xét bổ sung</h2>
            <p className="text-gray-600 mb-4">Chia sẻ thêm chi tiết về trải nghiệm của bạn (tùy chọn)</p>
            <Textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Cho chúng tôi biết điều gì đã tốt hoặc cách chúng tôi có thể cải thiện..."
              className="min-h-32 rounded-2xl"
            />
            <p className="text-sm text-gray-500 mt-2">{comment.length} / 500 ký tự</p>
          </Card>

          {/* Report Issue */}
          <button className="w-full p-4 rounded-2xl border-2 border-dashed border-gray-300 hover:border-red-300 hover:bg-red-50 transition-colors text-gray-600 hover:text-red-600">
            <div className="flex items-center justify-center gap-2">
              <Flag className="w-5 h-5" />
              <span>Báo cáo sự cố</span>
            </div>
          </button>

          {/* Submit Button */}
          <Button
            onClick={handleSubmit}
            disabled={rating === 0}
            className="w-full bg-gradient-to-r from-[#00BFA6] to-[#00D4B8] hover:from-[#00A88F] hover:to-[#00BFA6] text-white rounded-2xl py-6 text-lg shadow-lg"
          >
            <Check className="w-5 h-5 mr-2" />
            Gửi đánh giá
          </Button>
        </div>

        {/* Sidebar - Worker Info */}
        <div className="space-y-6">
          <Card className="p-6 rounded-3xl border-0 shadow-lg">
            <h3 className="mb-4">Chi tiết người làm việc</h3>
            <div className="text-center mb-6">
              <Avatar className="w-20 h-20 mx-auto mb-3 rounded-2xl">
                <AvatarImage src="https://images.unsplash.com/photo-1665436035665-d7dad9086ee2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b3JrZXIlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjEzOTQ1NTR8MA&ixlib=rb-4.1.0&q=80&w=1080" />
                <AvatarFallback className="rounded-2xl bg-gradient-to-br from-[#00BFA6] to-[#00D4B8] text-white text-xl">
                  SJ
                </AvatarFallback>
              </Avatar>
              <h4 className="text-lg mb-1">Sarah Johnson</h4>
              <div className="flex items-center justify-center gap-1 text-sm text-gray-600">
                <span className="text-yellow-500">★</span>
                <span>4.9 (156 đánh giá)</span>
              </div>
            </div>

            <div className="space-y-3 text-sm">
              <div>
                <p className="text-gray-600 mb-1">Dịch vụ</p>
                <p className="font-medium">Dọn dẹp nhà cửa</p>
              </div>
              <div>
                <p className="text-gray-600 mb-1">Thời gian hoàn thành</p>
                <p className="font-medium">2 giờ</p>
              </div>
              <div>
                <p className="text-gray-600 mb-1">Ngày</p>
                <p className="font-medium">28/10/2025</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 rounded-3xl border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-blue-500 flex items-center justify-center">
                <Award className="w-6 h-6 text-white" />
              </div>
              <h3 className="mb-2">Nhận phần thưởng</h3>
              <p className="text-sm text-gray-700">
                Để lại đánh giá chi tiết để nhận 50 điểm thưởng!
              </p>
            </div>
          </Card>

          <Card className="p-6 rounded-3xl border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50">
            <h3 className="mb-3">💚 Phản hồi của bạn rất quan trọng</h3>
            <p className="text-sm text-gray-700">
              Đánh giá giúp người làm việc cải thiện và giúp khách hàng khác đưa ra quyết định sáng suốt.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
