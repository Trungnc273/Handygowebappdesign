import { useState } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { MapPin, Clock, DollarSign, User, Calendar, Check, X } from 'lucide-react';
import { JobDetailModal } from './JobDetailModal';
import { toast } from 'sonner@2.0.3';

interface Props {
  onNavigate: (page: any) => void;
}

const availableJobs = [
  {
    id: 1,
    service: 'Dọn dẹp nhà cửa sâu',
    customer: 'John Doe',
    date: 'Ngày 28 tháng 10, 2025',
    time: '2:00 CH',
    duration: '3 giờ',
    location: '123 Đường Chính',
    distance: '1.2 km',
    pay: 120,
    description: 'Cần dọn dẹp kỹ căn hộ 3 phòng ngủ bao gồm nhà bếp và phòng tắm.',
    urgent: false,
  },
  {
    id: 2,
    service: 'Lắp ráp nội thất',
    customer: 'Jane Smith',
    date: 'Ngày 28 tháng 10, 2025',
    time: '10:00 SA',
    duration: '2 giờ',
    location: '456 Đại lộ Oak',
    distance: '0.8 km',
    pay: 85,
    description: 'Lắp ráp nội thất IKEA - bàn làm việc và kệ sách.',
    urgent: true,
  },
  {
    id: 3,
    service: 'Chăm sóc vườn',
    customer: 'Mike Wilson',
    date: 'Ngày 29 tháng 10, 2025',
    time: '9:00 SA',
    duration: '4 giờ',
    location: '789 Đường Công Viên',
    distance: '3.2 km',
    pay: 150,
    description: 'Cắt cỏ, tỉa cây bụi và dọn dẹp vườn cơ bản.',
    urgent: false,
  },
  {
    id: 4,
    service: 'Lau kính cửa sổ',
    customer: 'Emily Brown',
    date: 'Ngày 29 tháng 10, 2025',
    time: '1:00 CH',
    duration: '2 giờ',
    location: '321 Đường Hill',
    distance: '2.1 km',
    pay: 90,
    description: 'Lau kính cửa sổ trong và ngoài cho nhà 2 tầng.',
    urgent: false,
  },
];

export function JobList({ onNavigate }: Props) {
  const [selectedJob, setSelectedJob] = useState<number | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const handleAccept = (jobId: number) => {
    toast.success('Đã nhận việc thành công!', {
      description: 'Công việc đã được thêm vào lịch trình của bạn.'
    });
    setShowDetailModal(false);
    setSelectedJob(null);
    onNavigate('current');
  };

  const selectedJobData = availableJobs.find(j => j.id === selectedJob);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl mb-2">Công việc có sẵn</h1>
        <p className="text-gray-600">Tìm và nhận công việc phù hợp với kỹ năng của bạn</p>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 mb-8">
        <Select defaultValue="all">
          <SelectTrigger className="w-48 rounded-xl">
            <SelectValue placeholder="Loại dịch vụ" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả dịch vụ</SelectItem>
            <SelectItem value="cleaning">Dọn dẹp</SelectItem>
            <SelectItem value="delivery">Giao hàng</SelectItem>
            <SelectItem value="repair">Sửa chữa</SelectItem>
            <SelectItem value="tutoring">Gia sư</SelectItem>
          </SelectContent>
        </Select>

        <Select defaultValue="distance">
          <SelectTrigger className="w-48 rounded-xl">
            <SelectValue placeholder="Sắp xếp theo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="distance">Gần nhất trước</SelectItem>
            <SelectItem value="pay">Lương cao nhất</SelectItem>
            <SelectItem value="time">Sớm nhất</SelectItem>
          </SelectContent>
        </Select>

        <Select defaultValue="5">
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
        
        <Badge variant="secondary" className="px-4 py-2 rounded-xl">
          {availableJobs.length} công việc có sẵn
        </Badge>
      </div>

      {/* Jobs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {availableJobs.map((job) => (
          <Card
            key={job.id}
            className={`p-6 rounded-3xl border-0 shadow-lg hover:shadow-xl transition-all cursor-pointer ${
              selectedJob === job.id ? 'ring-2 ring-[#00BFA6]' : ''
            }`}
            onClick={() => setSelectedJob(job.id)}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-xl">{job.service}</h3>
                  {job.urgent && (
                    <Badge className="bg-red-100 text-red-700 rounded-lg">
                      Khẩn cấp
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <User className="w-4 h-4" />
                  <span>{job.customer}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl text-[#00BFA6]">{job.pay}.000₫</div>
                <p className="text-sm text-gray-600">{job.duration}</p>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-700 mb-4 line-clamp-2">{job.description}</p>

            {/* Details */}
            <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>{job.date}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="w-4 h-4" />
                <span>{job.time}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>Cách {job.distance}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedJob(job.id);
                  setShowDetailModal(true);
                }}
                className="flex-1 bg-[#00BFA6] hover:bg-[#00A88F] text-white rounded-xl"
              >
                Xem chi tiết
              </Button>
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  toast.info('Đã từ chối công việc');
                }}
                variant="outline"
                className="rounded-xl"
              >
                <X className="w-4 h-4 mr-2" />
                Từ chối
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Job Detail Modal */}
      {selectedJobData && (
        <JobDetailModal
          open={showDetailModal}
          onOpenChange={setShowDetailModal}
          job={selectedJobData}
          onAccept={() => handleAccept(selectedJobData.id)}
        />
      )}
    </div>
  );
}
