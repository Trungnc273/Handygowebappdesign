import { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '../ui/alert-dialog';
import { Plus, Edit2, Trash2, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const mockServices = [
  { 
    id: 1, 
    name: 'Dọn dẹp', 
    icon: '🧹', 
    priceMin: 50000, 
    priceMax: 150000, 
    duration: '1-3 giờ',
    description: 'Dọn dẹp nhà chuyên nghiệp, bao gồm hút bụi, lau nhà, và sắp xếp',
    skills: ['Dọn dẹp tổng quát', 'Vệ sinh sâu', 'Tổ chức'],
    active: true,
    bookings: 456
  },
  { 
    id: 2, 
    name: 'Giao hàng', 
    icon: '📦', 
    priceMin: 30000, 
    priceMax: 80000, 
    duration: '0.5-2 giờ',
    description: 'Giao hàng nhanh và đáng tin cậy trong khu vực',
    skills: ['Giao hàng nhanh', 'Xe máy', 'Xe tải'],
    active: true,
    bookings: 324
  },
  { 
    id: 3, 
    name: 'Sửa chữa', 
    icon: '🔧', 
    priceMin: 60000, 
    priceMax: 120000, 
    duration: '1-4 giờ',
    description: 'Sửa chữa điện, nước, đồ nội thất và thiết bị gia dụng',
    skills: ['Điện', 'Nước', 'Nội thất'],
    active: true,
    bookings: 289
  },
  { 
    id: 4, 
    name: 'Gia sư', 
    icon: '📚', 
    priceMin: 40000, 
    priceMax: 100000, 
    duration: '1-2 giờ',
    description: 'Dịch vụ dạy kèm cá nhân cho mọi lứa tuổi',
    skills: ['Toán', 'Tiếng Anh', 'Vật lý'],
    active: true,
    bookings: 234
  },
  { 
    id: 5, 
    name: 'Vận chuyển', 
    icon: '🚗', 
    priceMin: 45000, 
    priceMax: 90000, 
    duration: '1-4 giờ',
    description: 'Hỗ trợ chuyển nhà và vận chuyển đồ đạc',
    skills: ['Xe tải', 'Bốc vác', 'Chuyển nhà'],
    active: true,
    bookings: 178
  },
  { 
    id: 6, 
    name: 'Mua sắm', 
    icon: '🛒', 
    priceMin: 35000, 
    priceMax: 70000, 
    duration: '0.5-2 giờ',
    description: 'Trợ lý mua sắm cá nhân',
    skills: ['Mua sắm tạp hóa', 'Giao hàng'],
    active: false,
    bookings: 89
  },
];

export function ServiceManagement() {
  const [services, setServices] = useState(mockServices);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price) + '₫';
  };

  const handleSaveService = () => {
    setLoading(true);
    setTimeout(() => {
      toast.success(`Đã ${selectedService?.id ? 'cập nhật' : 'thêm'} dịch vụ thành công`);
      setEditDialogOpen(false);
      setLoading(false);
      setSelectedService(null);
    }, 1000);
  };

  const handleDeleteService = () => {
    setLoading(true);
    setTimeout(() => {
      toast.success(`Đã xóa dịch vụ ${selectedService.name}`);
      setServices(services.filter(s => s.id !== selectedService.id));
      setDeleteDialogOpen(false);
      setLoading(false);
      setSelectedService(null);
    }, 1000);
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl mb-2">Danh mục dịch vụ</h1>
            <p className="text-[#6B7280]">Cấu hình dịch vụ có sẵn</p>
          </div>
          <Button 
            className="bg-[#00BFA6] hover:bg-[#00A88F] text-white rounded-xl"
            onClick={() => {
              setSelectedService({});
              setEditDialogOpen(true);
            }}
          >
            <Plus className="w-4 h-4 mr-2" />
            Thêm dịch vụ
          </Button>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <Card 
            key={service.id} 
            className="p-6 rounded-3xl border-0 shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="text-5xl">{service.icon}</div>
              <Badge
                variant="secondary"
                className={`rounded-lg ${
                  service.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                }`}
              >
                {service.active ? 'Hoạt động' : 'Tạm ngưng'}
              </Badge>
            </div>
            
            <h3 className="text-xl mb-2">{service.name}</h3>
            <p className="text-[#6B7280] text-sm mb-3 line-clamp-2">{service.description}</p>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#6B7280]">Giá:</span>
                <span className="font-medium text-[#00BFA6]">
                  {formatPrice(service.priceMin)} - {formatPrice(service.priceMax)}/giờ
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#6B7280]">Thời gian:</span>
                <span className="font-medium">{service.duration}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#6B7280]">Đặt chỗ:</span>
                <span className="font-medium">{service.bookings}</span>
              </div>
            </div>

            {/* Skills */}
            <div className="flex flex-wrap gap-2 mb-4">
              {service.skills.slice(0, 2).map((skill, idx) => (
                <Badge key={idx} variant="secondary" className="rounded-lg text-xs bg-[#F7FBFA] text-[#6B7280]">
                  {skill}
                </Badge>
              ))}
              {service.skills.length > 2 && (
                <Badge variant="secondary" className="rounded-lg text-xs bg-[#F7FBFA] text-[#6B7280]">
                  +{service.skills.length - 2}
                </Badge>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1 rounded-xl group-hover:border-[#00BFA6] group-hover:text-[#00BFA6] transition-colors"
                onClick={() => {
                  setSelectedService(service);
                  setEditDialogOpen(true);
                }}
              >
                <Edit2 className="w-3 h-3 mr-2" />
                Chỉnh sửa
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="rounded-xl text-red-600 hover:bg-red-50 hover:border-red-300"
                onClick={() => {
                  setSelectedService(service);
                  setDeleteDialogOpen(true);
                }}
              >
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Edit/Add Service Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px] rounded-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {selectedService?.id ? 'Chỉnh sửa dịch vụ' : 'Thêm dịch vụ mới'}
            </DialogTitle>
            <DialogDescription>
              {selectedService?.id 
                ? `Cập nhật thông tin cho dịch vụ ${selectedService.name}`
                : 'Điền thông tin cho dịch vụ mới'}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Service Name */}
            <div>
              <Label>Tên dịch vụ *</Label>
              <Input 
                placeholder="VD: Dọn dẹp nhà cửa" 
                className="mt-2 rounded-xl border-[#E6EEF1]"
                defaultValue={selectedService?.name || ''}
              />
            </div>

            {/* Icon */}
            <div>
              <Label>Biểu tượng *</Label>
              <Input 
                placeholder="VD: 🧹" 
                className="mt-2 rounded-xl border-[#E6EEF1]"
                defaultValue={selectedService?.icon || ''}
              />
            </div>

            {/* Description */}
            <div>
              <Label>Mô tả</Label>
              <Textarea 
                placeholder="Mô tả ngắn gọn về dịch vụ..."
                className="mt-2 rounded-xl border-[#E6EEF1] min-h-[100px]"
                defaultValue={selectedService?.description || ''}
              />
            </div>

            {/* Price Range */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Giá tối thiểu (₫/giờ) *</Label>
                <Input 
                  type="number" 
                  placeholder="50000"
                  className="mt-2 rounded-xl border-[#E6EEF1]"
                  defaultValue={selectedService?.priceMin || ''}
                />
              </div>
              <div>
                <Label>Giá tối đa (₫/giờ) *</Label>
                <Input 
                  type="number" 
                  placeholder="150000"
                  className="mt-2 rounded-xl border-[#E6EEF1]"
                  defaultValue={selectedService?.priceMax || ''}
                />
              </div>
            </div>

            {/* Duration */}
            <div>
              <Label>Thời gian thực hiện</Label>
              <Input 
                placeholder="VD: 1-3 giờ"
                className="mt-2 rounded-xl border-[#E6EEF1]"
                defaultValue={selectedService?.duration || ''}
              />
            </div>

            {/* Skills */}
            <div>
              <Label>Kỹ năng yêu cầu</Label>
              <Input 
                placeholder="Nhập kỹ năng, phân cách bằng dấu phẩy"
                className="mt-2 rounded-xl border-[#E6EEF1]"
                defaultValue={selectedService?.skills?.join(', ') || ''}
              />
            </div>

            {/* Status */}
            <div className="flex items-center gap-3 p-4 bg-[#F7FBFA] rounded-2xl">
              <input 
                type="checkbox" 
                id="active"
                className="w-5 h-5 rounded border-[#E6EEF1] text-[#00BFA6] focus:ring-[#00BFA6]"
                defaultChecked={selectedService?.active ?? true}
              />
              <Label htmlFor="active" className="cursor-pointer">
                Kích hoạt dịch vụ này
              </Label>
            </div>
          </div>

          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setEditDialogOpen(false)}
              className="rounded-xl"
              disabled={loading}
            >
              Hủy
            </Button>
            <Button 
              onClick={handleSaveService}
              className="bg-[#00BFA6] hover:bg-[#00A88F] text-white rounded-xl"
              disabled={loading}
            >
              {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              {selectedService?.id ? 'Cập nhật' : 'Thêm dịch vụ'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="rounded-3xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Xác nhận xóa</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc chắn muốn xóa dịch vụ <strong>{selectedService?.name}</strong>? 
              Hành động này không thể hoàn tác.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-xl" disabled={loading}>
              Hủy
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteService}
              className="bg-red-600 hover:bg-red-700 text-white rounded-xl"
              disabled={loading}
            >
              {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Xóa dịch vụ
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
