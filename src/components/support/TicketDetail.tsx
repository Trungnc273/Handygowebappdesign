import { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Separator } from '../ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { ArrowLeft, Send, Paperclip, User, Briefcase, DollarSign, Calendar, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

interface Props {
  ticketId: string;
  onBack: () => void;
}

const mockTicketData = {
  'T-1001': {
    id: 'T-1001',
    type: 'Vấn đề thanh toán',
    customer: { name: 'Nguyễn Văn A', email: 'nguyenvana@email.com', phone: '0901234567' },
    worker: { name: 'Trần Thị B', email: 'tranthib@email.com', phone: '0901234568' },
    status: 'new',
    priority: 'high',
    createdAt: '26/10/2025 10:30 AM',
    jobId: 'JOB-1001',
    amount: '142.500₫',
    messages: [
      { 
        id: 1, 
        sender: 'customer', 
        name: 'Nguyễn Văn A', 
        text: 'Tôi đã thanh toán nhưng công việc vẫn hiển thị là chưa thanh toán. Xin vui lòng kiểm tra.', 
        time: '26/10/2025 10:30 AM',
        attachments: []
      },
      { 
        id: 2, 
        sender: 'system', 
        text: 'Yêu cầu đã được chuyển đến bộ phận hỗ trợ', 
        time: '26/10/2025 10:31 AM' 
      },
    ],
  },
};

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

export function TicketDetail({ ticketId, onBack }: Props) {
  const ticket = mockTicketData[ticketId as keyof typeof mockTicketData];
  const [replyText, setReplyText] = useState('');
  const [status, setStatus] = useState(ticket.status);
  const [priority, setPriority] = useState(ticket.priority);

  const handleSendReply = () => {
    if (!replyText.trim()) return;
    toast.success('Phản hồi đã được gửi');
    setReplyText('');
  };

  const handleUpdateStatus = (newStatus: string) => {
    setStatus(newStatus);
    toast.success(`Trạng thái đã được cập nhật: ${statusConfig[newStatus as keyof typeof statusConfig].label}`);
  };

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Button 
        variant="outline" 
        onClick={onBack}
        className="rounded-xl"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Quay lại danh sách
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Message Thread */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header */}
          <Card className="p-6 rounded-3xl border-0 shadow-lg">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-2xl mb-2">{ticket.type}</h2>
                <p className="text-[#6B7280]">Mã yêu cầu: {ticket.id}</p>
              </div>
              <div className="flex gap-2">
                <Badge variant="secondary" className={`rounded-lg ${priorityConfig[priority as keyof typeof priorityConfig].color}`}>
                  {priorityConfig[priority as keyof typeof priorityConfig].label}
                </Badge>
                <Badge variant="secondary" className={`rounded-lg ${statusConfig[status as keyof typeof statusConfig].color}`}>
                  {statusConfig[status as keyof typeof statusConfig].label}
                </Badge>
              </div>
            </div>
            <Separator />
            <div className="mt-4 flex items-center gap-4 text-sm text-[#6B7280]">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>Tạo lúc: {ticket.createdAt}</span>
              </div>
              {ticket.jobId && (
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4" />
                  <span>Công việc: {ticket.jobId}</span>
                </div>
              )}
            </div>
          </Card>

          {/* Messages */}
          <Card className="p-6 rounded-3xl border-0 shadow-lg">
            <h3 className="text-xl mb-6">Lịch sử tin nhắn</h3>
            <div className="space-y-4 mb-6 max-h-[500px] overflow-y-auto">
              {ticket.messages.map((message) => (
                <div key={message.id}>
                  {message.sender === 'system' ? (
                    <div className="flex justify-center">
                      <div className="bg-[#F7FBFA] text-[#6B7280] text-sm px-4 py-2 rounded-xl">
                        {message.text}
                      </div>
                    </div>
                  ) : (
                    <div className={`flex gap-3 ${message.sender === 'support' ? 'flex-row-reverse' : ''}`}>
                      <Avatar className="w-10 h-10 rounded-xl">
                        <AvatarFallback className={`rounded-xl ${
                          message.sender === 'customer' 
                            ? 'bg-gradient-to-br from-blue-500 to-indigo-500' 
                            : 'bg-gradient-to-br from-[#00BFA6] to-[#00D4B8]'
                        } text-white`}>
                          {message.name?.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className={`flex-1 ${message.sender === 'support' ? 'items-end' : ''}`}>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-sm">{message.name}</span>
                          <span className="text-xs text-[#6B7280]">{message.time}</span>
                        </div>
                        <div className={`p-4 rounded-2xl ${
                          message.sender === 'customer' 
                            ? 'bg-[#F7FBFA]' 
                            : 'bg-gradient-to-br from-[#00BFA6] to-[#00D4B8] text-white'
                        }`}>
                          <p className="text-sm">{message.text}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <Separator className="my-6" />

            {/* Reply Box */}
            <div className="space-y-3">
              <Textarea 
                placeholder="Nhập phản hồi của bạn..."
                className="rounded-xl border-[#E6EEF1] min-h-[120px]"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
              />
              <div className="flex items-center justify-between">
                <Button variant="outline" className="rounded-xl">
                  <Paperclip className="w-4 h-4 mr-2" />
                  Đính kèm file
                </Button>
                <Button 
                  onClick={handleSendReply}
                  className="bg-[#00BFA6] hover:bg-[#00A88F] text-white rounded-xl"
                  disabled={!replyText.trim()}
                >
                  <Send className="w-4 h-4 mr-2" />
                  Gửi phản hồi
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Right: Metadata Panel */}
        <div className="space-y-6">
          {/* Actions */}
          <Card className="p-6 rounded-3xl border-0 shadow-lg">
            <h3 className="text-xl mb-4">Hành động</h3>
            <div className="space-y-3">
              <div>
                <label className="text-sm text-[#6B7280] mb-2 block">Trạng thái</label>
                <Select value={status} onValueChange={handleUpdateStatus}>
                  <SelectTrigger className="rounded-xl border-[#E6EEF1]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">Mới</SelectItem>
                    <SelectItem value="in-progress">Đang xử lý</SelectItem>
                    <SelectItem value="closed">Đã đóng</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm text-[#6B7280] mb-2 block">Ưu tiên</label>
                <Select value={priority} onValueChange={setPriority}>
                  <SelectTrigger className="rounded-xl border-[#E6EEF1]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">Cao</SelectItem>
                    <SelectItem value="medium">Trung bình</SelectItem>
                    <SelectItem value="low">Thấp</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              <Button 
                className="w-full bg-green-600 hover:bg-green-700 text-white rounded-xl"
                onClick={() => handleUpdateStatus('closed')}
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Đánh dấu đã giải quyết
              </Button>
            </div>
          </Card>

          {/* Customer Info */}
          <Card className="p-6 rounded-3xl border-0 shadow-lg">
            <h3 className="text-xl mb-4">Khách hàng</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Avatar className="w-12 h-12 rounded-xl">
                  <AvatarFallback className="rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 text-white">
                    {ticket.customer.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{ticket.customer.name}</p>
                  <p className="text-sm text-[#6B7280]">{ticket.customer.email}</p>
                </div>
              </div>
              <Separator />
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-[#6B7280]" />
                  <span className="text-[#6B7280]">Điện thoại:</span>
                  <span className="font-medium">{ticket.customer.phone}</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Worker Info */}
          <Card className="p-6 rounded-3xl border-0 shadow-lg">
            <h3 className="text-xl mb-4">Người làm việc</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Avatar className="w-12 h-12 rounded-xl">
                  <AvatarFallback className="rounded-xl bg-gradient-to-br from-[#00BFA6] to-[#00D4B8] text-white">
                    {ticket.worker.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{ticket.worker.name}</p>
                  <p className="text-sm text-[#6B7280]">{ticket.worker.email}</p>
                </div>
              </div>
              <Separator />
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-[#6B7280]" />
                  <span className="text-[#6B7280]">Điện thoại:</span>
                  <span className="font-medium">{ticket.worker.phone}</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Job Details */}
          {ticket.jobId && (
            <Card className="p-6 rounded-3xl border-0 shadow-lg">
              <h3 className="text-xl mb-4">Chi tiết công việc</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-[#6B7280]">Mã công việc:</span>
                  <span className="font-medium text-[#00BFA6]">{ticket.jobId}</span>
                </div>
                {ticket.amount && (
                  <div className="flex items-center justify-between">
                    <span className="text-[#6B7280]">Số tiền:</span>
                    <span className="font-medium">{ticket.amount}</span>
                  </div>
                )}
                <Separator />
                <Button variant="outline" className="w-full rounded-xl">
                  Xem chi tiết công việc
                </Button>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
