import { useState } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Separator } from '../ui/separator';
import { Check, Wallet, CreditCard, Smartphone, DollarSign, MapPin, Calendar, Clock, Shield } from 'lucide-react';

interface Props {
  onNavigate: (page: any) => void;
}

const paymentMethods = [
  { id: 'wallet', name: 'Ví HandyGo', icon: Wallet, balance: '150.000đ', recommended: true },
  { id: 'momo', name: 'MoMo', icon: Smartphone, balance: null },
  { id: 'zalopay', name: 'ZaloPay', icon: CreditCard, balance: null },
  { id: 'cash', name: 'Tiền mặt', icon: DollarSign, balance: null },
];

export function PaymentConfirmation({ onNavigate }: Props) {
  const [selectedPayment, setSelectedPayment] = useState('wallet');
  const [processing, setProcessing] = useState(false);

  const handlePayment = () => {
    setProcessing(true);
    setTimeout(() => {
      onNavigate('tracking');
    }, 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl mb-2">Xác nhận thanh toán</h1>
        <p className="text-gray-600">Xem lại đặt chỗ của bạn và hoàn tất thanh toán</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Payment Methods */}
        <div className="lg:col-span-2 space-y-6">
          {/* Payment Methods */}
          <Card className="p-6 rounded-3xl border-0 shadow-lg">
            <h2 className="text-2xl mb-6">Chọn phương thức thanh toán</h2>
            <div className="space-y-3">
              {paymentMethods.map((method) => (
                <div
                  key={method.id}
                  onClick={() => setSelectedPayment(method.id)}
                  className={`p-4 rounded-2xl cursor-pointer transition-all ${
                    selectedPayment === method.id
                      ? 'bg-[#00BFA6]/10 ring-2 ring-[#00BFA6]'
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        selectedPayment === method.id ? 'bg-[#00BFA6] text-white' : 'bg-white'
                      }`}>
                        <method.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{method.name}</span>
                          {method.recommended && (
                            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-lg">
                              Khuyến nghị
                            </span>
                          )}
                        </div>
                        {method.balance && (
                          <p className="text-sm text-gray-600">Số dư: {method.balance}</p>
                        )}
                      </div>
                    </div>
                    {selectedPayment === method.id && (
                      <Check className="w-6 h-6 text-[#00BFA6]" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Security Notice */}
          <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-2xl">
            <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <p className="text-sm text-blue-900">
                <strong>Thanh toán an toàn:</strong> Thanh toán của bạn được bảo vệ và chỉ được chuyển cho người làm việc sau khi hoàn thành công việc. Bạn có thể yêu cầu hoàn tiền nếu không hài lòng.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column - Order Summary */}
        <div className="space-y-6">
          {/* Worker Info */}
          <Card className="p-6 rounded-3xl border-0 shadow-lg">
            <h3 className="mb-4">Người làm việc của bạn</h3>
            <div className="flex items-center gap-3 mb-4">
              <Avatar className="w-14 h-14 rounded-xl">
                <AvatarImage src="https://images.unsplash.com/photo-1665436035665-d7dad9086ee2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b3JrZXIlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjEzOTQ1NTR8MA&ixlib=rb-4.1.0&q=80&w=1080" />
                <AvatarFallback className="rounded-xl bg-gradient-to-br from-[#00BFA6] to-[#00D4B8] text-white">
                  SJ
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">Sarah Johnson</p>
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <span className="text-yellow-500">★</span>
                  <span>4.9 (156 đánh giá)</span>
                </div>
              </div>
            </div>
            <Separator className="my-4" />
            
            {/* Task Details */}
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <Calendar className="w-4 h-4 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-gray-600">Ngày</p>
                  <p className="font-medium">28 Tháng 10, 2025</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-gray-600">Giờ</p>
                  <p className="font-medium">10:00 Sáng - 12:00 Trưa</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-gray-600">Địa điểm</p>
                  <p className="font-medium">123 Đường Chính, Căn hộ 4B</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Price Summary */}
          <Card className="p-6 rounded-3xl border-0 shadow-lg bg-gradient-to-br from-gray-50 to-white">
            <h3 className="mb-4">Tóm tắt thanh toán</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Phí dịch vụ (2 giờ)</span>
                <span>150.000đ</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Phí nền tảng</span>
                <span>7.500đ</span>
              </div>
              <div className="flex items-center justify-between text-green-600">
                <span>Giảm giá lần đầu</span>
                <span>-15.000đ</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between text-lg">
                <span>Tổng cộng</span>
                <span className="text-[#00BFA6]">142.500đ</span>
              </div>
            </div>

            <Button
              onClick={handlePayment}
              disabled={processing}
              className="w-full mt-6 bg-[#00BFA6] hover:bg-[#00A88F] text-white rounded-xl py-6 text-lg"
            >
              {processing ? (
                <>Đang xử lý...</>
              ) : (
                <>
                  <Check className="w-5 h-5 mr-2" />
                  Thanh toán ngay
                </>
              )}
            </Button>

            <p className="text-xs text-gray-500 text-center mt-3">
              Bằng cách tiếp tục, bạn đồng ý với Điều khoản dịch vụ của chúng tôi
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
