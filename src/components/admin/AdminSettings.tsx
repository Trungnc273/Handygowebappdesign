import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Separator } from '../ui/separator';
import { Switch } from '../ui/switch';
import { toast } from 'sonner';

export function AdminSettings() {
  const handleSave = () => {
    toast.success('Cấu hình đã được lưu thành công');
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl mb-2">Cài đặt hệ thống</h1>
        <p className="text-[#6B7280]">Cấu hình cài đặt nền tảng</p>
      </div>

      <div className="max-w-3xl space-y-6">
        {/* General Settings */}
        <Card className="p-8 rounded-3xl border-0 shadow-lg">
          <h2 className="text-2xl mb-6">Cài đặt chung</h2>
          <div className="space-y-6">
            <div>
              <Label>Tên nền tảng</Label>
              <Input defaultValue="HandyGo" className="mt-2 rounded-xl border-[#E6EEF1]" />
            </div>
            
            <Separator />
            
            <div>
              <Label>Email nền tảng</Label>
              <Input type="email" defaultValue="support@handygo.com" className="mt-2 rounded-xl border-[#E6EEF1]" />
            </div>
            
            <Separator />
            
            <div>
              <Label>Số điện thoại hỗ trợ</Label>
              <Input type="tel" defaultValue="1900 xxxx" className="mt-2 rounded-xl border-[#E6EEF1]" />
            </div>
          </div>
        </Card>

        {/* Commission Settings */}
        <Card className="p-8 rounded-3xl border-0 shadow-lg">
          <h2 className="text-2xl mb-6">Hoa hồng & Phí</h2>
          <div className="space-y-6">
            <div>
              <Label>Tỷ lệ hoa hồng (%)</Label>
              <Input type="number" defaultValue="15" className="mt-2 rounded-xl border-[#E6EEF1]" />
              <p className="text-sm text-[#6B7280] mt-2">Phần trăm hoa hồng từ mỗi giao dịch</p>
            </div>
            
            <Separator />
            
            <div>
              <Label>Số tiền rút tối thiểu (₫)</Label>
              <Input type="number" defaultValue="50000" className="mt-2 rounded-xl border-[#E6EEF1]" />
              <p className="text-sm text-[#6B7280] mt-2">Số tiền tối thiểu người làm việc có thể rút</p>
            </div>
            
            <Separator />
            
            <div>
              <Label>Phí giao dịch (₫)</Label>
              <Input type="number" defaultValue="5000" className="mt-2 rounded-xl border-[#E6EEF1]" />
              <p className="text-sm text-[#6B7280] mt-2">Phí cố định cho mỗi giao dịch</p>
            </div>
          </div>
        </Card>

        {/* Service Area Settings */}
        <Card className="p-8 rounded-3xl border-0 shadow-lg">
          <h2 className="text-2xl mb-6">Khu vực dịch vụ</h2>
          <div className="space-y-6">
            <div>
              <Label>Bán kính khu vực dịch vụ (km)</Label>
              <Input type="number" defaultValue="25" className="mt-2 rounded-xl border-[#E6EEF1]" />
              <p className="text-sm text-[#6B7280] mt-2">Khoảng cách tối đa để ghép nối người làm việc</p>
            </div>
            
            <Separator />
            
            <div>
              <Label>Thời gian phản hồi tối đa (phút)</Label>
              <Input type="number" defaultValue="30" className="mt-2 rounded-xl border-[#E6EEF1]" />
              <p className="text-sm text-[#6B7280] mt-2">Thời gian người làm việc cần chấp nhận công việc</p>
            </div>
          </div>
        </Card>

        {/* Notification Settings */}
        <Card className="p-8 rounded-3xl border-0 shadow-lg">
          <h2 className="text-2xl mb-6">Thông báo</h2>
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-[#F7FBFA] rounded-2xl">
              <div>
                <p className="font-medium">Email thông báo đặt chỗ</p>
                <p className="text-sm text-[#6B7280] mt-1">Gửi email khi có đặt chỗ mới</p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between p-4 bg-[#F7FBFA] rounded-2xl">
              <div>
                <p className="font-medium">SMS xác nhận thanh toán</p>
                <p className="text-sm text-[#6B7280] mt-1">Gửi SMS khi thanh toán hoàn tất</p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between p-4 bg-[#F7FBFA] rounded-2xl">
              <div>
                <p className="font-medium">Push notification</p>
                <p className="text-sm text-[#6B7280] mt-1">Gửi thông báo đẩy cho ứng dụng di động</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </Card>

        {/* Security Settings */}
        <Card className="p-8 rounded-3xl border-0 shadow-lg">
          <h2 className="text-2xl mb-6">Bảo mật</h2>
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-[#F7FBFA] rounded-2xl">
              <div>
                <p className="font-medium">Xác thực hai yếu tố</p>
                <p className="text-sm text-[#6B7280] mt-1">Yêu cầu 2FA cho tài khoản admin</p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between p-4 bg-[#F7FBFA] rounded-2xl">
              <div>
                <p className="font-medium">Kiểm tra lý lịch tự động</p>
                <p className="text-sm text-[#6B7280] mt-1">Tự động xác minh người làm việc mới</p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between p-4 bg-[#F7FBFA] rounded-2xl">
              <div>
                <p className="font-medium">Giới hạn tốc độ API</p>
                <p className="text-sm text-[#6B7280] mt-1">Bật giới hạn tốc độ cho API requests</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end gap-3">
          <Button variant="outline" className="rounded-xl">
            Hủy
          </Button>
          <Button 
            onClick={handleSave}
            className="bg-[#00BFA6] hover:bg-[#00A88F] text-white rounded-xl"
          >
            Lưu thay đổi
          </Button>
        </div>
      </div>
    </div>
  );
}
