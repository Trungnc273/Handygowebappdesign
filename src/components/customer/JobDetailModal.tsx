import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { MapPin, Phone, MessageCircle, Star, Check, AlertTriangle, Navigation } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface JobDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  job: {
    id: number;
    title: string;
    description: string;
    location: string;
    budget: string;
    status: 'Đang chờ' | 'Đang xử lý' | 'Hoàn thành' | 'Hủy';
    images?: string[];
    worker?: {
      name: string;
      avatar?: string;
      rating: number;
      phone?: string;
    };
    timeline?: Array<{
      step: string;
      status: 'completed' | 'current' | 'pending';
      time?: string;
    }>;
  };
}

export function JobDetailModal({ open, onOpenChange, job }: JobDetailModalProps) {
  const [showReportDialog, setShowReportDialog] = useState(false);

  const statusColors = {
    'Đang chờ': 'bg-yellow-100 text-yellow-700',
    'Đang xử lý': 'bg-blue-100 text-blue-700',
    'Hoàn thành': 'bg-green-100 text-green-700',
    'Hủy': 'bg-red-100 text-red-700'
  };

  const defaultTimeline = [
    { step: 'Đã đăng', status: 'completed' as const, time: '10:00 Sáng' },
    { step: 'Đang xử lý', status: 'current' as const, time: '10:30 Sáng' },
    { step: 'Hoàn tất', status: 'pending' as const }
  ];

  const timeline = job.timeline || defaultTimeline;

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl">
          <DialogHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <DialogTitle className="text-2xl mb-2">{job.title}</DialogTitle>
                <Badge className={`${statusColors[job.status]} rounded-lg`}>
                  {job.status}
                </Badge>
              </div>
            </div>
          </DialogHeader>

          <div className="space-y-6 mt-4">
            {/* Request Description */}
            <div>
              <h3 className="mb-2">Mô tả yêu cầu</h3>
              <p className="text-gray-700">{job.description}</p>
            </div>

            {/* Attached Photos */}
            {job.images && job.images.length > 0 && (
              <div>
                <h3 className="mb-3">Hình ảnh đính kèm</h3>
                <div className="grid grid-cols-3 gap-3">
                  {job.images.map((image, index) => (
                    <div key={index} className="aspect-square rounded-xl overflow-hidden bg-gray-100">
                      <ImageWithFallback
                        src={image}
                        alt={`Ảnh ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Location Map */}
            <div>
              <h3 className="mb-3">Địa điểm</h3>
              <div className="flex items-center gap-2 mb-3 text-gray-700">
                <MapPin className="w-4 h-4" />
                <span>{job.location}</span>
              </div>
              <div className="h-48 bg-gray-100 rounded-2xl flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <Navigation className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                  <p>Xem bản đồ</p>
                </div>
              </div>
            </div>

            {/* Status Timeline */}
            <div>
              <h3 className="mb-4">Tiến trình công việc</h3>
              <div className="space-y-3">
                {timeline.map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="relative">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                          item.status === 'completed'
                            ? 'bg-gradient-to-br from-[#00BFA6] to-[#00D4B8] text-white shadow-lg'
                            : item.status === 'current'
                            ? 'bg-blue-100 text-blue-600 ring-4 ring-blue-50'
                            : 'bg-gray-100 text-gray-400'
                        }`}
                      >
                        {item.status === 'completed' ? (
                          <Check className="w-5 h-5" />
                        ) : (
                          <span>{index + 1}</span>
                        )}
                      </div>
                      {index < timeline.length - 1 && (
                        <div
                          className={`absolute left-5 top-10 w-0.5 h-8 ${
                            item.status === 'completed' ? 'bg-[#00BFA6]' : 'bg-gray-200'
                          }`}
                        />
                      )}
                    </div>
                    <div className="flex-1 pt-2">
                      <div className="flex items-center justify-between">
                        <p className={item.status === 'current' ? 'font-medium' : ''}>{item.step}</p>
                        {item.time && <span className="text-sm text-gray-500">{item.time}</span>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Assigned Worker Info */}
            {job.worker && (
              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="mb-4">Người làm việc được phân công</h3>
                <div className="flex items-center gap-4 mb-4">
                  <Avatar className="w-16 h-16 rounded-2xl">
                    {job.worker.avatar && <AvatarImage src={job.worker.avatar} />}
                    <AvatarFallback className="rounded-2xl bg-gradient-to-br from-[#00BFA6] to-[#00D4B8] text-white">
                      {job.worker.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-lg mb-1">{job.worker.name}</p>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="text-sm text-gray-600">{job.worker.rating} đánh giá</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button className="flex-1 bg-[#00BFA6] hover:bg-[#00A88F] text-white rounded-xl">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Chat
                  </Button>
                  <Button variant="outline" className="flex-1 rounded-xl">
                    <Phone className="w-4 h-4 mr-2" />
                    Gọi
                  </Button>
                </div>
              </div>
            )}

            {/* Budget */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6">
              <p className="text-sm text-gray-600 mb-1">Ngân sách dự kiến</p>
              <p className="text-3xl text-green-600">{job.budget}</p>
            </div>

            {/* Report Issue Button */}
            <Button
              variant="outline"
              onClick={() => setShowReportDialog(true)}
              className="w-full rounded-xl border-red-300 text-red-700 hover:bg-red-50"
            >
              <AlertTriangle className="w-4 h-4 mr-2" />
              Báo cáo sự cố
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Report Dialog */}
      <Dialog open={showReportDialog} onOpenChange={setShowReportDialog}>
        <DialogContent className="rounded-3xl">
          <DialogHeader>
            <DialogTitle>Báo cáo sự cố</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-gray-600">
              Vui lòng mô tả vấn đề bạn gặp phải. Đội ngũ hỗ trợ của chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.
            </p>
            <Button className="w-full bg-[#00BFA6] hover:bg-[#00A88F] text-white rounded-xl">
              Gửi báo cáo
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
