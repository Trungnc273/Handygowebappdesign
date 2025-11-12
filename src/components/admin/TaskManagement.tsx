import { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Separator } from '../ui/separator';
import { Search, MapPin, Clock, DollarSign, User, Briefcase, MessageCircle, Loader2 } from 'lucide-react';

const mockTasks = [
  { 
    id: 'JOB-1001', 
    service: 'Dọn dẹp nhà cửa', 
    customer: { name: 'Nguyễn Văn A', phone: '0901234567' },
    worker: { name: 'Trần Thị B', phone: '0901234568', rating: 4.9 },
    status: 'completed', 
    amount: '142.500₫',
    paymentStatus: 'paid',
    date: '26/10/2025',
    time: '10:00 AM',
    location: '123 Đường Lê Lợi, Q.1, TP.HCM',
    duration: '2 giờ',
    notes: 'Dọn dẹp tổng quát, tập trung vào bếp và phòng khách'
  },
  { 
    id: 'JOB-1002', 
    service: 'Lắp ráp nội thất', 
    customer: { name: 'Lê Văn C', phone: '0901234569' },
    worker: { name: 'Phạm Thị D', phone: '0901234570', rating: 4.2 },
    status: 'in-progress', 
    amount: '85.000₫',
    paymentStatus: 'pending',
    date: '27/10/2025',
    time: '2:00 PM',
    location: '456 Đường Nguyễn Huệ, Q.1, TP.HCM',
    duration: '1.5 giờ',
    notes: 'Lắp tủ sách IKEA'
  },
  { 
    id: 'JOB-1003', 
    service: 'Chăm sóc vườn', 
    customer: { name: 'Hoàng Văn E', phone: '0901234571' },
    worker: { name: 'Võ Thị F', phone: '0901234572', rating: 4.7 },
    status: 'scheduled', 
    amount: '120.000₫',
    paymentStatus: 'pending',
    date: '28/10/2025',
    time: '8:00 AM',
    location: '789 Đường Trần Hưng Đạo, Q.5, TP.HCM',
    duration: '3 giờ',
    notes: 'Cắt cỏ và tỉa cây'
  },
  {
    id: 'JOB-1004',
    service: 'Sửa chữa điện',
    customer: { name: 'Đỗ Thị G', phone: '0901234573' },
    worker: { name: 'Bùi Văn H', phone: '0901234574', rating: 4.8 },
    status: 'completed',
    amount: '200.000₫',
    paymentStatus: 'paid',
    date: '25/10/2025',
    time: '4:00 PM',
    location: '321 Đường Cách Mạng Tháng 8, Q.3, TP.HCM',
    duration: '1 giờ',
    notes: 'Sửa ổ cắm và đèn'
  },
  {
    id: 'JOB-1005',
    service: 'Giao hàng',
    customer: { name: 'Trịnh Văn I', phone: '0901234575' },
    worker: { name: 'Lý Thị K', phone: '0901234576', rating: 4.6 },
    status: 'cancelled',
    amount: '50.000₫',
    paymentStatus: 'refunded',
    date: '24/10/2025',
    time: '11:00 AM',
    location: '654 Đường Võ Văn Tần, Q.3, TP.HCM',
    duration: '0.5 giờ',
    notes: 'Khách hàng hủy'
  },
];

const statusConfig = {
  completed: { label: 'Hoàn thành', color: 'bg-green-100 text-green-700' },
  'in-progress': { label: 'Đang thực hiện', color: 'bg-blue-100 text-blue-700' },
  scheduled: { label: 'Đã lên lịch', color: 'bg-yellow-100 text-yellow-700' },
  cancelled: { label: 'Đã hủy', color: 'bg-red-100 text-red-700' },
};

const paymentStatusConfig = {
  paid: { label: 'Đã thanh toán', color: 'bg-green-100 text-green-700' },
  pending: { label: 'Chờ thanh toán', color: 'bg-yellow-100 text-yellow-700' },
  refunded: { label: 'Đã hoàn tiền', color: 'bg-gray-100 text-gray-700' },
};

export function TaskManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const filteredTasks = mockTasks.filter(task => {
    const matchesSearch = task.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          task.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          task.customer.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl mb-2">Quản lý công việc</h1>
        <p className="text-[#6B7280]">Xem và quản lý tất cả đơn đặt dịch vụ</p>
      </div>

      <Card className="p-8 rounded-3xl border-0 shadow-lg">
        {/* Filters */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 w-5 h-5 text-[#6B7280]" />
            <Input 
              placeholder="Tìm kiếm công việc..." 
              className="pl-10 rounded-xl border-[#E6EEF1]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-56 rounded-xl border-[#E6EEF1]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả trạng thái</SelectItem>
              <SelectItem value="completed">Hoàn thành</SelectItem>
              <SelectItem value="in-progress">Đang thực hiện</SelectItem>
              <SelectItem value="scheduled">Đã lên lịch</SelectItem>
              <SelectItem value="cancelled">Đã hủy</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-[#00BFA6] animate-spin" />
          </div>
        ) : filteredTasks.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#F7FBFA] flex items-center justify-center">
              <Briefcase className="w-8 h-8 text-[#6B7280]" />
            </div>
            <h3 className="text-xl mb-2">Không tìm thấy công việc</h3>
            <p className="text-[#6B7280]">Thử thay đổi bộ lọc hoặc tìm kiếm</p>
          </div>
        ) : (
          <div className="rounded-2xl border border-[#E6EEF1] overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-[#F7FBFA] hover:bg-[#F7FBFA]">
                  <TableHead>Mã công việc</TableHead>
                  <TableHead>Dịch vụ</TableHead>
                  <TableHead>Khách hàng</TableHead>
                  <TableHead>Người làm việc</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead>Thanh toán</TableHead>
                  <TableHead>Số tiền</TableHead>
                  <TableHead>Ngày</TableHead>
                  <TableHead>Hành động</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTasks.map((task) => (
                  <TableRow 
                    key={task.id} 
                    className="hover:bg-[#F7FBFA] transition-colors cursor-pointer"
                    onClick={() => {
                      setSelectedTask(task);
                      setDialogOpen(true);
                    }}
                  >
                    <TableCell className="font-medium">{task.id}</TableCell>
                    <TableCell>{task.service}</TableCell>
                    <TableCell>{task.customer.name}</TableCell>
                    <TableCell>{task.worker.name}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={`rounded-lg ${statusConfig[task.status as keyof typeof statusConfig].color}`}>
                        {statusConfig[task.status as keyof typeof statusConfig].label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={`rounded-lg ${paymentStatusConfig[task.paymentStatus as keyof typeof paymentStatusConfig].color}`}>
                        {paymentStatusConfig[task.paymentStatus as keyof typeof paymentStatusConfig].label}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium text-[#00BFA6]">{task.amount}</TableCell>
                    <TableCell className="text-[#6B7280]">{task.date}</TableCell>
                    <TableCell>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="rounded-xl"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedTask(task);
                          setDialogOpen(true);
                        }}
                      >
                        Xem
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </Card>

      {/* Task Detail Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[700px] rounded-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Chi tiết công việc</DialogTitle>
            <DialogDescription>
              Thông tin đầy đủ về công việc {selectedTask?.id}
            </DialogDescription>
          </DialogHeader>
          {selectedTask && (
            <div className="space-y-6">
              {/* Status and Payment */}
              <div className="flex items-center gap-3">
                <Badge variant="secondary" className={`rounded-lg ${statusConfig[selectedTask.status as keyof typeof statusConfig].color}`}>
                  {statusConfig[selectedTask.status as keyof typeof statusConfig].label}
                </Badge>
                <Badge variant="secondary" className={`rounded-lg ${paymentStatusConfig[selectedTask.paymentStatus as keyof typeof paymentStatusConfig].color}`}>
                  {paymentStatusConfig[selectedTask.paymentStatus as keyof typeof paymentStatusConfig].label}
                </Badge>
              </div>

              <Separator />

              {/* Service Info */}
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Briefcase className="w-5 h-5 text-[#00BFA6] mt-1" />
                  <div>
                    <p className="text-sm text-[#6B7280]">Dịch vụ</p>
                    <p className="font-medium">{selectedTask.service}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#00BFA6] mt-1" />
                  <div>
                    <p className="text-sm text-[#6B7280]">Địa điểm</p>
                    <p className="font-medium">{selectedTask.location}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-[#00BFA6] mt-1" />
                    <div>
                      <p className="text-sm text-[#6B7280]">Thời gian</p>
                      <p className="font-medium">{selectedTask.date} • {selectedTask.time}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <DollarSign className="w-5 h-5 text-[#00BFA6] mt-1" />
                    <div>
                      <p className="text-sm text-[#6B7280]">Số tiền</p>
                      <p className="font-medium text-[#00BFA6]">{selectedTask.amount}</p>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Customer Info */}
              <div>
                <p className="text-sm text-[#6B7280] mb-3">Khách hàng</p>
                <div className="flex items-center gap-3 p-4 bg-[#F7FBFA] rounded-2xl">
                  <Avatar className="w-12 h-12 rounded-xl">
                    <AvatarFallback className="rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 text-white">
                      {selectedTask.customer.name.split(' ').map((n: string) => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-medium">{selectedTask.customer.name}</p>
                    <p className="text-sm text-[#6B7280]">{selectedTask.customer.phone}</p>
                  </div>
                  <Button variant="outline" size="sm" className="rounded-xl">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Liên hệ
                  </Button>
                </div>
              </div>

              {/* Worker Info */}
              <div>
                <p className="text-sm text-[#6B7280] mb-3">Người làm việc</p>
                <div className="flex items-center gap-3 p-4 bg-[#F7FBFA] rounded-2xl">
                  <Avatar className="w-12 h-12 rounded-xl">
                    <AvatarFallback className="rounded-xl bg-gradient-to-br from-[#00BFA6] to-[#00D4B8] text-white">
                      {selectedTask.worker.name.split(' ').map((n: string) => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-medium">{selectedTask.worker.name}</p>
                    <div className="flex items-center gap-2 text-sm text-[#6B7280]">
                      <span className="text-yellow-500">★</span>
                      <span>{selectedTask.worker.rating}</span>
                      <span>•</span>
                      <span>{selectedTask.worker.phone}</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="rounded-xl">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Liên hệ
                  </Button>
                </div>
              </div>

              {/* Notes */}
              {selectedTask.notes && (
                <>
                  <Separator />
                  <div>
                    <p className="text-sm text-[#6B7280] mb-2">Ghi chú</p>
                    <p className="p-4 bg-[#F7FBFA] rounded-2xl">{selectedTask.notes}</p>
                  </div>
                </>
              )}

              {/* Map Placeholder */}
              <div>
                <p className="text-sm text-[#6B7280] mb-2">Vị trí trên bản đồ</p>
                <div className="h-48 bg-[#F7FBFA] rounded-2xl flex items-center justify-center border border-[#E6EEF1]">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 mx-auto mb-2 text-[#6B7280]" />
                    <p className="text-[#6B7280]">Xem bản đồ</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
