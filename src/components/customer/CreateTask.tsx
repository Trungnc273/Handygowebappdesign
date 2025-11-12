import { useState } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Textarea } from '../ui/textarea';
import { Calendar } from '../ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Home, Package, Wrench, GraduationCap, Car, ShoppingBag, MapPin, Calendar as CalendarIcon, Clock, DollarSign, Upload, ChevronRight, Check } from 'lucide-react';

interface Props {
  onNavigate: (page: any) => void;
}

// Simple date formatter
const format = (date: Date, formatStr: string) => {
  const months = ['Th1', 'Th2', 'Th3', 'Th4', 'Th5', 'Th6', 'Th7', 'Th8', 'Th9', 'Th10', 'Th11', 'Th12'];
  const month = months[date.getMonth()];
  const day = date.getDate().toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day} ${month}, ${year}`;
};

const services = [
  { icon: Home, title: 'Dọn dẹp', color: 'from-blue-500 to-blue-600' },
  { icon: Package, title: 'Giao hàng', color: 'from-purple-500 to-purple-600' },
  { icon: Wrench, title: 'Sửa chữa', color: 'from-orange-500 to-orange-600' },
  { icon: GraduationCap, title: 'Dạy kèm', color: 'from-green-500 to-green-600' },
  { icon: Car, title: 'Vận chuyển', color: 'from-red-500 to-red-600' },
  { icon: ShoppingBag, title: 'Mua sắm', color: 'from-pink-500 to-pink-600' },
];

export function CreateTask({ onNavigate }: Props) {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedService, setSelectedService] = useState('Cần giúp đỡ');
  const [date, setDate] = useState<Date>();
  const [files, setFiles] = useState<File[]>([]);

  const steps = [
    { number: 1, title: 'Chi tiết', description: 'Thêm thông tin yêu cầu' },
    { number: 2, title: 'Lịch trình', description: 'Chọn ngày và giờ' },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-center">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                    step.number <= currentStep
                      ? 'bg-gradient-to-br from-[#00BFA6] to-[#00D4B8] text-white shadow-lg'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {step.number < currentStep ? (
                    <Check className="w-6 h-6" />
                  ) : (
                    <span>{step.number}</span>
                  )}
                </div>
                <div className="mt-2 text-center">
                  <p className={step.number <= currentStep ? 'text-[#00BFA6]' : 'text-gray-500'}>
                    {step.title}
                  </p>
                  <p className="text-xs text-gray-500">{step.description}</p>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`w-24 h-1 mx-4 rounded-full mb-12 ${
                    step.number < currentStep ? 'bg-[#00BFA6]' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step 1: Task Details */}
      {currentStep === 1 && (
        <Card className="p-8 rounded-3xl border-0 shadow-xl">
          <div className="mb-8">
            <h2 className="text-3xl mb-2">Tạo yêu cầu hỗ trợ</h2>
            <p className="text-gray-600">Cho chúng tôi biết về những gì bạn cần giúp đỡ</p>
          </div>

          <div className="space-y-6">
            {/* Title */}
            <div>
              <Label>Tiêu đề yêu cầu</Label>
              <Input
                placeholder="Ví dụ: Cần người dọn dẹp nhà cửa"
                className="mt-2 rounded-xl"
              />
            </div>

            {/* Description */}
            <div>
              <Label>Mô tả công việc</Label>
              <Textarea
                placeholder="Mô tả chi tiết những gì bạn cần hỗ trợ..."
                className="mt-2 rounded-xl min-h-32"
              />
            </div>

            {/* Address */}
            <div>
              <Label>Địa chỉ</Label>
              <div className="relative mt-2">
                <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <Input
                  placeholder="Nhập địa chỉ của bạn"
                  className="pl-10 rounded-xl"
                />
              </div>
              <div className="mt-3 h-48 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <MapPin className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                  <p>Xem bản đồ</p>
                </div>
              </div>
            </div>

            {/* Budget */}
            <div>
              <Label>Ngân sách dự kiến</Label>
              <div className="relative mt-2">
                <DollarSign className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <Input
                  type="number"
                  placeholder="Nhập ngân sách dự kiến"
                  className="pl-10 rounded-xl"
                />
              </div>
            </div>

            {/* Photos */}
            <div>
              <Label>Upload ảnh minh họa (Tùy chọn)</Label>
              <div className="mt-2 border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center cursor-pointer hover:border-[#00BFA6] transition-colors">
                <Upload className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                <p className="text-gray-600">Nhấp để tải lên hoặc kéo thả</p>
                <p className="text-sm text-gray-500 mt-1">PNG, JPG tối đa 10MB</p>
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-8">
            <Button
              onClick={() => setCurrentStep(2)}
              className="bg-[#00BFA6] hover:bg-[#00A88F] text-white rounded-xl px-8"
            >
              Tiếp tục
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </Card>
      )}

      {/* Step 2: Schedule */}
      {currentStep === 2 && (
        <Card className="p-8 rounded-3xl border-0 shadow-xl">
          <h2 className="text-3xl mb-2">Thời gian mong muốn</h2>
          <p className="text-gray-600 mb-8">Bạn cần hỗ trợ khi nào?</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Calendar */}
            <div>
              <Label>Chọn ngày</Label>
              <div className="mt-2 flex justify-center">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-2xl border shadow-md"
                />
              </div>
            </div>

            {/* Time and Summary */}
            <div className="space-y-6">
              <div>
                <Label>Chọn giờ</Label>
                <Select>
                  <SelectTrigger className="mt-2 rounded-xl">
                    <SelectValue placeholder="Chọn khung giờ" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="09:00">9:00 Sáng</SelectItem>
                    <SelectItem value="10:00">10:00 Sáng</SelectItem>
                    <SelectItem value="11:00">11:00 Sáng</SelectItem>
                    <SelectItem value="14:00">2:00 Chiều</SelectItem>
                    <SelectItem value="15:00">3:00 Chiều</SelectItem>
                    <SelectItem value="16:00">4:00 Chiều</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Summary Card */}
              <div className="bg-gradient-to-br from-[#00BFA6]/10 to-[#00D4B8]/10 rounded-2xl p-6">
                <h3 className="mb-4">Tóm tắt yêu cầu</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Loại:</span>
                    <Badge className="bg-orange-100 text-orange-700 rounded-lg">
                      {selectedService}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Ngày:</span>
                    <span>{date ? format(date, 'MMM dd, yyyy') : 'Chưa chọn'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Ngân sách ước tính:</span>
                    <span>100.000₫</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <p className="text-sm text-blue-800">
                  💡 Mẹo: Đăng bài sớm để được nhiều người làm việc phản hồi hơn!
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={() => setCurrentStep(1)}
              className="rounded-xl px-8"
            >
              Quay lại
            </Button>
            <Button
              onClick={() => onNavigate('matching')}
              className="bg-[#00BFA6] hover:bg-[#00A88F] text-white rounded-xl px-8"
            >
              Đăng bài
              <Check className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}