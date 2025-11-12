import { useState } from 'react';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Search, Eye, Loader2, MessageSquare } from 'lucide-react';

const mockTickets = [
  { 
    id: 'T-1001', 
    type: 'Vấn đề thanh toán', 
    customer: 'Nguyễn Văn A', 
    worker: 'Trần Thị B', 
    status: 'new', 
    priority: 'high', 
    date: '26/10/2025',
    time: '10:30 AM',
    messages: 3
  },
  { 
    id: 'T-1002', 
    type: 'Chất lượng dịch vụ', 
    customer: 'Lê Văn C', 
    worker: 'Phạm Thị D', 
    status: 'in-progress', 
    priority: 'medium', 
    date: '25/10/2025',
    time: '2:15 PM',
    messages: 8
  },
  { 
    id: 'T-1003', 
    type: 'Lịch hẹn', 
    customer: 'Hoàng Văn E', 
    worker: 'Võ Thị F', 
    status: 'in-progress', 
    priority: 'low', 
    date: '25/10/2025',
    time: '4:45 PM',
    messages: 5
  },
  { 
    id: 'T-1004', 
    type: 'Truy cập tài khoản', 
    customer: 'Đỗ Thị G', 
    worker: '-', 
    status: 'closed', 
    priority: 'medium', 
    date: '24/10/2025',
    time: '11:20 AM',
    messages: 12
  },
  { 
    id: 'T-1005', 
    type: 'Yêu cầu hoàn tiền', 
    customer: 'Trịnh Văn I', 
    worker: 'Bùi Văn H', 
    status: 'new', 
    priority: 'high', 
    date: '26/10/2025',
    time: '9:15 AM',
    messages: 2
  },
];

const statusConfig = {
  new: { label: 'Mới', color: 'bg-blue-100 text-blue-700' },
  'in-progress': { label: 'Đang xử lý', color: 'bg-orange-100 text-orange-700' },
  closed: { label: 'Đã đóng', color: 'bg-green-100 text-green-700' },
};

const priorityConfig = {
  high: { label: 'Cao', color: 'bg-red-100 text-red-700' },
  medium: { label: 'Trung bình', color: 'bg-yellow-100 text-yellow-700' },
  low: { label: 'Thấp', color: 'bg-gray-100 text-gray-700' },
};

interface Props {
  onSelectTicket: (ticketId: string) => void;
}

export function TicketList({ onSelectTicket }: Props) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [loading, setLoading] = useState(false);

  const filteredTickets = mockTickets.filter(ticket => {
    const matchesSearch = ticket.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          ticket.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          ticket.customer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || ticket.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <Card className="p-8 rounded-3xl border-0 shadow-lg">
      <h2 className="text-2xl mb-6">Danh sách yêu cầu hỗ trợ</h2>
      
      {/* Filters */}
      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 w-5 h-5 text-[#6B7280]" />
          <Input
            placeholder="Tìm kiếm yêu cầu..."
            className="pl-10 rounded-xl border-[#E6EEF1]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-48 rounded-xl border-[#E6EEF1]">
            <SelectValue placeholder="Trạng thái" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả trạng thái</SelectItem>
            <SelectItem value="new">Mới</SelectItem>
            <SelectItem value="in-progress">Đang xử lý</SelectItem>
            <SelectItem value="closed">Đã đóng</SelectItem>
          </SelectContent>
        </Select>
        <Select value={priorityFilter} onValueChange={setPriorityFilter}>
          <SelectTrigger className="w-48 rounded-xl border-[#E6EEF1]">
            <SelectValue placeholder="Ưu tiên" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả ưu tiên</SelectItem>
            <SelectItem value="high">Cao</SelectItem>
            <SelectItem value="medium">Trung bình</SelectItem>
            <SelectItem value="low">Thấp</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 text-[#00BFA6] animate-spin" />
        </div>
      ) : filteredTickets.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#F7FBFA] flex items-center justify-center">
            <MessageSquare className="w-8 h-8 text-[#6B7280]" />
          </div>
          <h3 className="text-xl mb-2">Không tìm thấy yêu cầu</h3>
          <p className="text-[#6B7280]">Thử thay đổi bộ lọc hoặc tìm kiếm</p>
        </div>
      ) : (
        <div className="rounded-2xl border border-[#E6EEF1] overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-[#F7FBFA] hover:bg-[#F7FBFA]">
                <TableHead>Mã yêu cầu</TableHead>
                <TableHead>Loại</TableHead>
                <TableHead>Khách hàng</TableHead>
                <TableHead>Người làm việc</TableHead>
                <TableHead>Ưu tiên</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Tin nhắn</TableHead>
                <TableHead>Ngày</TableHead>
                <TableHead>Hành động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTickets.map((ticket) => (
                <TableRow 
                  key={ticket.id} 
                  className="hover:bg-[#F7FBFA] transition-colors cursor-pointer"
                  onClick={() => onSelectTicket(ticket.id)}
                >
                  <TableCell className="font-medium">{ticket.id}</TableCell>
                  <TableCell>{ticket.type}</TableCell>
                  <TableCell>{ticket.customer}</TableCell>
                  <TableCell className="text-[#6B7280]">{ticket.worker}</TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={`rounded-lg ${priorityConfig[ticket.priority as keyof typeof priorityConfig].color}`}
                    >
                      {priorityConfig[ticket.priority as keyof typeof priorityConfig].label}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={`rounded-lg ${statusConfig[ticket.status as keyof typeof statusConfig].color}`}
                    >
                      {statusConfig[ticket.status as keyof typeof statusConfig].label}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-[#6B7280]" />
                      <span>{ticket.messages}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-[#6B7280]">
                    <div>
                      <p>{ticket.date}</p>
                      <p className="text-xs">{ticket.time}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-xl"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectTicket(ticket.id);
                      }}
                    >
                      <Eye className="w-3 h-3 mr-1" />
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
  );
}
