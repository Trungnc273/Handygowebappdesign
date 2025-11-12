import { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Search, DollarSign, TrendingUp, Download, CreditCard, Wallet, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const paymentStats = [
  { label: 'Tổng doanh thu tháng này', value: '284.590.000₫', icon: DollarSign, color: 'from-green-500 to-emerald-500', change: '+23%', trend: 'up' },
  { label: 'Giao dịch hôm nay', value: '45', icon: CreditCard, color: 'from-blue-500 to-indigo-500', change: '+12', trend: 'up' },
  { label: 'Chờ thanh toán', value: '12.340.000₫', icon: Wallet, color: 'from-yellow-500 to-orange-500', change: '8 giao dịch', trend: 'neutral' },
  { label: 'Đã hoàn tiền', value: '2.150.000₫', icon: TrendingUp, color: 'from-purple-500 to-pink-500', change: '5 giao dịch', trend: 'neutral' },
];

const mockPayments = [
  { 
    id: 'PAY-2001', 
    jobId: 'JOB-1001',
    customer: 'Nguyễn Văn A',
    worker: 'Trần Thị B',
    amount: '142.500₫',
    commission: '21.375₫',
    netAmount: '121.125₫',
    method: 'card',
    status: 'completed',
    date: '26/10/2025',
    time: '10:30 AM',
    transactionId: 'TXN-1234567890'
  },
  { 
    id: 'PAY-2002', 
    jobId: 'JOB-1002',
    customer: 'Lê Văn C',
    worker: 'Phạm Thị D',
    amount: '85.000₫',
    commission: '12.750₫',
    netAmount: '72.250₫',
    method: 'wallet',
    status: 'pending',
    date: '27/10/2025',
    time: '2:15 PM',
    transactionId: 'TXN-1234567891'
  },
  { 
    id: 'PAY-2003', 
    jobId: 'JOB-1003',
    customer: 'Hoàng Văn E',
    worker: 'Võ Thị F',
    amount: '120.000₫',
    commission: '18.000₫',
    netAmount: '102.000₫',
    method: 'cash',
    status: 'completed',
    date: '26/10/2025',
    time: '8:45 AM',
    transactionId: 'TXN-1234567892'
  },
  { 
    id: 'PAY-2004', 
    jobId: 'JOB-1004',
    customer: 'Đỗ Thị G',
    worker: 'Bùi Văn H',
    amount: '200.000₫',
    commission: '30.000₫',
    netAmount: '170.000₫',
    method: 'card',
    status: 'completed',
    date: '25/10/2025',
    time: '4:20 PM',
    transactionId: 'TXN-1234567893'
  },
  { 
    id: 'PAY-2005', 
    jobId: 'JOB-1005',
    customer: 'Trịnh Văn I',
    worker: 'Lý Thị K',
    amount: '50.000₫',
    commission: '7.500₫',
    netAmount: '42.500₫',
    method: 'wallet',
    status: 'refunded',
    date: '24/10/2025',
    time: '11:10 AM',
    transactionId: 'TXN-1234567894'
  },
];

const statusConfig = {
  completed: { label: 'Hoàn thành', color: 'bg-green-100 text-green-700' },
  pending: { label: 'Chờ xử lý', color: 'bg-yellow-100 text-yellow-700' },
  refunded: { label: 'Đã hoàn tiền', color: 'bg-gray-100 text-gray-700' },
  failed: { label: 'Thất bại', color: 'bg-red-100 text-red-700' },
};

const methodConfig = {
  card: { label: 'Thẻ', icon: CreditCard },
  wallet: { label: 'Ví', icon: Wallet },
  cash: { label: 'Tiền mặt', icon: DollarSign },
};

export function PaymentManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredPayments = mockPayments.filter(payment => {
    const matchesSearch = payment.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          payment.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          payment.transactionId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || payment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl mb-2">Quản lý thanh toán</h1>
            <p className="text-[#6B7280]">Theo dõi giao dịch và doanh thu</p>
          </div>
          <Button className="bg-[#00BFA6] hover:bg-[#00A88F] text-white rounded-xl">
            <Download className="w-4 h-4 mr-2" />
            Xuất báo cáo
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {paymentStats.map((stat) => (
          <Card key={stat.label} className="p-6 rounded-3xl border-0 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              {stat.trend === 'up' && (
                <div className="flex items-center gap-1 text-green-600">
                  <ArrowUpRight className="w-4 h-4" />
                  <span className="text-sm">{stat.change}</span>
                </div>
              )}
              {stat.trend === 'down' && (
                <div className="flex items-center gap-1 text-red-600">
                  <ArrowDownRight className="w-4 h-4" />
                  <span className="text-sm">{stat.change}</span>
                </div>
              )}
              {stat.trend === 'neutral' && (
                <span className="text-sm text-[#6B7280]">{stat.change}</span>
              )}
            </div>
            <p className="text-[#6B7280] text-sm mb-1">{stat.label}</p>
            <p className="text-3xl">{stat.value}</p>
          </Card>
        ))}
      </div>

      {/* Revenue Chart */}
      <Card className="p-8 rounded-3xl border-0 shadow-lg mb-8">
        <h2 className="text-2xl mb-6">Doanh thu 7 ngày qua</h2>
        <div className="h-64 flex items-end justify-between gap-4">
          {['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map((day, i) => {
            const height = [55, 70, 48, 82, 65, 45, 60][i];
            const amount = [32, 42, 28, 48, 38, 26, 35][i];
            return (
              <div key={day} className="flex-1 flex flex-col items-center group">
                <div className="relative w-full">
                  <div 
                    className="w-full bg-gradient-to-t from-[#00BFA6] to-[#00D4B8] rounded-t-xl transition-all duration-300 hover:from-[#00D4B8] hover:to-[#2ED47A] cursor-pointer" 
                    style={{ height: `${height * 2}px` }}
                  />
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-[#1E293B] text-white text-xs px-2 py-1 rounded-lg whitespace-nowrap">
                      {amount}M₫
                    </div>
                  </div>
                </div>
                <p className="text-sm text-[#6B7280] mt-2">{day}</p>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Payments Table */}
      <Card className="p-8 rounded-3xl border-0 shadow-lg">
        <h2 className="text-2xl mb-6">Giao dịch gần đây</h2>
        
        {/* Filters */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 w-5 h-5 text-[#6B7280]" />
            <Input 
              placeholder="Tìm kiếm giao dịch..." 
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
              <SelectItem value="pending">Chờ xử lý</SelectItem>
              <SelectItem value="refunded">Đã hoàn tiền</SelectItem>
              <SelectItem value="failed">Thất bại</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <div className="rounded-2xl border border-[#E6EEF1] overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-[#F7FBFA] hover:bg-[#F7FBFA]">
                <TableHead>Mã thanh toán</TableHead>
                <TableHead>Mã công việc</TableHead>
                <TableHead>Khách hàng</TableHead>
                <TableHead>Người làm việc</TableHead>
                <TableHead>Phương thức</TableHead>
                <TableHead>Số tiền</TableHead>
                <TableHead>Hoa hồng</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Ngày</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayments.map((payment) => (
                <TableRow key={payment.id} className="hover:bg-[#F7FBFA] transition-colors">
                  <TableCell className="font-medium">{payment.id}</TableCell>
                  <TableCell className="text-[#00BFA6]">{payment.jobId}</TableCell>
                  <TableCell>{payment.customer}</TableCell>
                  <TableCell>{payment.worker}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {(() => {
                        const MethodIcon = methodConfig[payment.method as keyof typeof methodConfig].icon;
                        return <MethodIcon className="w-4 h-4 text-[#6B7280]" />;
                      })()}
                      <span>{methodConfig[payment.method as keyof typeof methodConfig].label}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{payment.amount}</TableCell>
                  <TableCell className="text-[#6B7280]">{payment.commission}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={`rounded-lg ${statusConfig[payment.status as keyof typeof statusConfig].color}`}>
                      {statusConfig[payment.status as keyof typeof statusConfig].label}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-[#6B7280]">
                    <div>
                      <p>{payment.date}</p>
                      <p className="text-xs">{payment.time}</p>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
