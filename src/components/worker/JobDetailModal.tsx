import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Alert, AlertDescription } from '../ui/alert';
import { MapPin, Phone, MessageCircle, User, Calendar, Clock, DollarSign, Navigation, MessageSquare } from 'lucide-react';

interface JobDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  job: {
    id: number;
    service: string;
    customer: string;
    date: string;
    time: string;
    duration: string;
    location: string;
    distance: string;
    pay: number;
    description: string;
  };
  onAccept?: () => void;
}

export function JobDetailModal({ open, onOpenChange, job, onAccept }: JobDetailModalProps) {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showContactOptions, setShowContactOptions] = useState(false);

  const handleAccept = () => {
    setShowConfirmDialog(false);
    onOpenChange(false);
    if (onAccept) onAccept();
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">{job.service}</DialogTitle>
          </DialogHeader>

          <div className="space-y-6 mt-4">
            {/* Customer Info */}
            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="mb-4">Thông tin khách hàng</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Tên khách hàng</p>
                    <p>{job.customer}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Địa chỉ</p>
                    <p>{job.location}</p>
                    <p className="text-sm text-gray-500">Cách {job.distance} từ vị trí của bạn</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Job Details */}
            <div>
              <h3 className="mb-4">Chi tiết công việc</h3>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                  <Calendar className="w-5 h-5 text-[#00BFA6]" />
                  <div>
                    <p className="text-sm text-gray-600">Ngày</p>
                    <p>{job.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                  <Clock className="w-5 h-5 text-[#00BFA6]" />
                  <div>
                    <p className="text-sm text-gray-600">Giờ</p>
                    <p>{job.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                  <Clock className="w-5 h-5 text-[#00BFA6]" />
                  <div>
                    <p className="text-sm text-gray-600">Thời lượng</p>
                    <p>{job.duration}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
                  <DollarSign className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-sm text-gray-600">Thanh toán</p>
                    <p className="text-xl text-green-600">{job.pay}.000₫</p>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-sm text-gray-600 mb-2">Mô tả công việc</p>
                <p className="text-gray-700">{job.description}</p>
              </div>
            </div>

            {/* Map Preview */}
            <div>
              <h3 className="mb-3">Bản đồ và chỉ đường</h3>
              <div className="h-48 bg-gray-100 rounded-2xl flex items-center justify-center mb-3">
                <div className="text-center text-gray-500">
                  <Navigation className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                  <p>Xem bản đồ</p>
                </div>
              </div>
              <Button variant="outline" className="w-full rounded-xl">
                <Navigation className="w-4 h-4 mr-2" />
                Chỉ đường
              </Button>
            </div>

            {/* Contact Options */}
            <div>
              <Button
                onClick={() => setShowContactOptions(!showContactOptions)}
                variant="outline"
                className="w-full rounded-xl mb-3"
              >
                <Phone className="w-4 h-4 mr-2" />
                Liên hệ khách hàng
              </Button>
              
              {showContactOptions && (
                <Alert className="border-[#00BFA6] bg-[#00BFA6]/5 rounded-xl">
                  <AlertDescription>
                    <p className="mb-3 text-gray-700">Chọn phương thức liên hệ:</p>
                    <div className="space-y-2">
                      <Button className="w-full bg-[#00BFA6] hover:bg-[#00A88F] text-white rounded-xl justify-start">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Chat trong ứng dụng
                      </Button>
                      <Button variant="outline" className="w-full rounded-xl justify-start">
                        <Phone className="w-4 h-4 mr-2" />
                        Gọi điện
                      </Button>
                      <Button variant="outline" className="w-full rounded-xl justify-start">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Nhắn Zalo
                      </Button>
                    </div>
                  </AlertDescription>
                </Alert>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                onClick={() => setShowConfirmDialog(true)}
                className="flex-1 bg-gradient-to-r from-[#00BFA6] to-[#00D4B8] hover:from-[#00A88F] hover:to-[#00BFA6] text-white rounded-xl py-6 text-lg"
              >
                Nhận việc
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent className="rounded-3xl">
          <DialogHeader>
            <DialogTitle>Xác nhận nhận việc</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-gray-600">
              Bạn chắc chắn muốn nhận công việc này?
            </p>
            <div className="bg-gray-50 rounded-xl p-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Dịch vụ:</span>
                <span>{job.service}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Khách hàng:</span>
                <span>{job.customer}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Thời gian:</span>
                <span>{job.date} • {job.time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Thanh toán:</span>
                <span className="text-green-600">{job.pay}.000₫</span>
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setShowConfirmDialog(false)}
                className="flex-1 rounded-xl"
              >
                Hủy
              </Button>
              <Button
                onClick={handleAccept}
                className="flex-1 bg-[#00BFA6] hover:bg-[#00A88F] text-white rounded-xl"
              >
                Xác nhận
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
