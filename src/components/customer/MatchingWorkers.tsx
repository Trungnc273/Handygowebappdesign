import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Star, MapPin, DollarSign, Award, Clock, Loader2, Check } from 'lucide-react';

interface Props {
  onNavigate: (page: any) => void;
}

const workers = [
  {
    id: 1,
    name: 'Sarah Johnson',
    rating: 4.9,
    reviews: 156,
    distance: '1.2 km',
    price: 75,
    skills: ['Dọn dẹp', 'Vệ sinh sâu', 'Thân thiện môi trường'],
    verified: true,
    completedJobs: 234,
    image: 'https://images.unsplash.com/photo-1665436035665-d7dad9086ee2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b3JrZXIlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjEzOTQ1NTR8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 2,
    name: 'Mike Chen',
    rating: 4.8,
    reviews: 203,
    distance: '2.5 km',
    price: 65,
    skills: ['Dọn dẹp', 'Tổ chức'],
    verified: true,
    completedJobs: 312,
    image: '',
  },
  {
    id: 3,
    name: 'Emma Davis',
    rating: 5.0,
    reviews: 89,
    distance: '0.8 km',
    price: 85,
    skills: ['Dọn dẹp', 'Dịch vụ cao cấp'],
    verified: true,
    completedJobs: 145,
    image: '',
  },
];

export function MatchingWorkers({ onNavigate }: Props) {
  const [loading, setLoading] = useState(true);
  const [selectedWorker, setSelectedWorker] = useState<number | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16">
        <Card className="p-16 rounded-3xl border-0 shadow-xl text-center">
          <div className="flex flex-col items-center">
            <div className="relative mb-8">
              <Loader2 className="w-20 h-20 text-[#00BFA6] animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-[#00BFA6]/20" />
              </div>
            </div>
            <h2 className="text-3xl mb-4">Đang tìm người làm việc tốt nhất cho bạn...</h2>
            <p className="text-gray-600 max-w-md">
              Chúng tôi đang tìm kiếm trong mạng lưới các chuyên gia đã xác minh trong khu vực của bạn
            </p>
            <div className="mt-8 flex items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-xl">
                <Check className="w-5 h-5" />
                <span>Chỉ người làm việc đã xác minh</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-xl">
                <MapPin className="w-5 h-5" />
                <span>Gần vị trí của bạn</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
            <Check className="w-6 h-6 text-green-600" />
          </div>
          <span className="text-green-600">Chúng tôi đã tìm thấy 3 người giúp việc tuyệt vời gần bạn!</span>
        </div>
        <h1 className="text-4xl mb-2">Chọn người làm việc</h1>
        <p className="text-gray-600">Tất cả người làm việc đều đã được xác minh và kiểm tra lý lịch</p>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 mb-8">
        <Select defaultValue="rating">
          <SelectTrigger className="w-48 rounded-xl">
            <SelectValue placeholder="Sắp xếp theo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="rating">Đánh giá cao nhất</SelectItem>
            <SelectItem value="distance">Gần nhất</SelectItem>
            <SelectItem value="price-low">Giá: Thấp đến cao</SelectItem>
            <SelectItem value="price-high">Giá: Cao đến thấp</SelectItem>
          </SelectContent>
        </Select>

        <Select defaultValue="all">
          <SelectTrigger className="w-48 rounded-xl">
            <SelectValue placeholder="Khoảng cách" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Mọi khoảng cách</SelectItem>
            <SelectItem value="1">Trong vòng 1 km</SelectItem>
            <SelectItem value="3">Trong vòng 3 km</SelectItem>
            <SelectItem value="5">Trong vòng 5 km</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex-1" />
        
        <Badge variant="outline" className="px-4 py-2 rounded-xl">
          {workers.length} người làm việc có sẵn
        </Badge>
      </div>

      {/* Workers List */}
      <div className="space-y-6">
        {workers.map((worker) => (
          <Card
            key={worker.id}
            className={`p-6 rounded-3xl border-0 shadow-md hover:shadow-xl transition-all ${
              selectedWorker === worker.id ? 'ring-2 ring-[#00BFA6]' : ''
            }`}
          >
            <div className="flex items-start gap-6">
              {/* Avatar */}
              <div className="relative">
                <Avatar className="w-24 h-24 rounded-2xl">
                  <AvatarImage src={worker.image} />
                  <AvatarFallback className="rounded-2xl bg-gradient-to-br from-[#00BFA6] to-[#00D4B8] text-white text-2xl">
                    {worker.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                {worker.verified && (
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-2xl mb-2">{worker.name}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <span className="text-gray-900">{worker.rating}</span>
                        <span>({worker.reviews} đánh giá)</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>Cách {worker.distance}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Award className="w-4 h-4" />
                        <span>{worker.completedJobs} công việc hoàn thành</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl text-[#00BFA6]">{worker.price}$</div>
                    <p className="text-sm text-gray-500">mỗi giờ</p>
                  </div>
                </div>

                {/* Skills */}
                <div className="flex items-center gap-2 mb-4">
                  {worker.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="rounded-lg">
                      {skill}
                    </Badge>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3">
                  <Button
                    onClick={() => setSelectedWorker(worker.id)}
                    className={`flex-1 rounded-xl ${
                      selectedWorker === worker.id
                        ? 'bg-[#00BFA6] hover:bg-[#00A88F] text-white'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    {selectedWorker === worker.id ? (
                      <>
                        <Check className="w-5 h-5 mr-2" />
                        Đã chọn
                      </>
                    ) : (
                      'Chọn người này'
                    )}
                  </Button>
                  <Button variant="outline" className="rounded-xl">
                    Xem hồ sơ
                  </Button>
                  <Button variant="outline" className="rounded-xl">
                    Nhắn tin
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Continue Button */}
      {selectedWorker && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Người làm việc đã chọn</p>
              <p className="text-lg">
                {workers.find(w => w.id === selectedWorker)?.name}
              </p>
            </div>
            <Button
              onClick={() => onNavigate('payment')}
              className="bg-[#00BFA6] hover:bg-[#00A88F] text-white rounded-xl px-8 py-6 text-lg"
            >
              Tiếp tục thanh toán
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
