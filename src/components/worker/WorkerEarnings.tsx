import { useState } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { TrendingUp, DollarSign, Calendar, Download, Wallet, CreditCard, ArrowUpRight, ArrowDownRight, Plus } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface Props {
  onNavigate: (page: any) => void;
}

const transactions = [
  { id: 1, type: 'Thu nhập', description: 'Dọn dẹp nhà cửa - John Doe', amount: 142500, date: 'Ngày 24/10/2025', status: 'Hoàn thành' },
  { id: 2, type: 'Thu nhập', description: 'Lắp ráp nội thất - Jane Smith', amount: 85000, date: 'Ngày 22/10/2025', status: 'Hoàn thành' },
  { id: 3, type: 'Rút tiền', description: 'Chuyển khoản ngân hàng', amount: -500000, date: 'Ngày 20/10/2025', status: 'Đang xử lý' },
  { id: 4, type: 'Thu nhập', description: 'Chăm sóc vườn - Mike Wilson', amount: 120000, date: 'Ngày 18/10/2025', status: 'Hoàn thành' },
  { id: 5, type: 'Thu nhập', description: 'Lau kính cửa sổ - Emily Brown', amount: 90000, date: 'Ngày 15/10/2025', status: 'Hoàn thành' },
];

const weeklyEarnings = [
  { week: 'Tuần 1', amount: 420000 },
  { week: 'Tuần 2', amount: 580000 },
  { week: 'Tuần 3', amount: 720000 },
  { week: 'Tuần 4', amount: 847000 },
];

export function WorkerEarnings({ onNavigate }: Props) {
  const [showTopUpModal, setShowTopUpModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [topUpAmount, setTopUpAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('momo');

  const handleTopUp = () => {
    if (!topUpAmount || parseFloat(topUpAmount) <= 0) {
      toast.error('Vui lòng nhập số tiền hợp lệ');
      return;
    }
    toast.success('Nạp tiền thành công!', {
      description: `Đã nạp ${parseFloat(topUpAmount).toLocaleString('vi-VN')}₫ vào ví`
    });
    setShowTopUpModal(false);
    setTopUpAmount('');
  };

  const handleWithdraw = () => {
    toast.success('Yêu cầu rút tiền đã được gửi!', {
      description: 'Tiền sẽ được chuyển vào tài khoản của bạn trong 1-2 ngày làm việc'
    });
    setShowWithdrawModal(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl mb-2">Thu nhập & Ví</h1>
        <p className="text-gray-600">Theo dõi thu nhập và quản lý rút tiền</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="p-6 rounded-3xl border-0 shadow-lg bg-gradient-to-br from-[#00BFA6] to-[#00D4B8] text-white">
          <div className="flex items-center gap-2 mb-4">
            <Wallet className="w-6 h-6" />
            <span>Số dư ví</span>
          </div>
          <p className="text-4xl mb-4">1.247.500₫</p>
          <div className="flex gap-2">
            <Button 
              onClick={() => setShowWithdrawModal(true)}
              className="flex-1 bg-white text-[#00BFA6] hover:bg-gray-100 rounded-xl"
            >
              Rút tiền
            </Button>
            <Button 
              onClick={() => setShowTopUpModal(true)}
              className="flex-1 bg-white/20 hover:bg-white/30 text-white rounded-xl"
            >
              <Plus className="w-4 h-4 mr-2" />
              Nạp tiền
            </Button>
          </div>
        </Card>

        <Card className="p-6 rounded-3xl border-0 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <Badge className="bg-green-100 text-green-700 rounded-lg">
              +23%
            </Badge>
          </div>
          <p className="text-gray-600 text-sm mb-1">Tuần này</p>
          <p className="text-3xl">847.500₫</p>
        </Card>

        <Card className="p-6 rounded-3xl border-0 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <Badge className="bg-blue-100 text-blue-700 rounded-lg">
              +12%
            </Badge>
          </div>
          <p className="text-gray-600 text-sm mb-1">Tháng này</p>
          <p className="text-3xl">3.287.000₫</p>
        </Card>

        <Card className="p-6 rounded-3xl border-0 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <Badge className="bg-purple-100 text-purple-700 rounded-lg">
              156 việc
            </Badge>
          </div>
          <p className="text-gray-600 text-sm mb-1">Tổng thu nhập</p>
          <p className="text-3xl">18.450.000₫</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Transactions */}
        <div className="lg:col-span-2">
          <Card className="p-8 rounded-3xl border-0 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl">Lịch sử giao dịch</h2>
              <div className="flex items-center gap-3">
                <Select defaultValue="all">
                  <SelectTrigger className="w-40 rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả thời gian</SelectItem>
                    <SelectItem value="week">Tuần này</SelectItem>
                    <SelectItem value="month">Tháng này</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" className="rounded-xl">
                  <Download className="w-4 h-4 mr-2" />
                  Xuất
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              {transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-2xl transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      transaction.type === 'Thu nhập'
                        ? 'bg-green-100'
                        : 'bg-gray-100'
                    }`}>
                      {transaction.type === 'Thu nhập' ? (
                        <ArrowDownRight className="w-6 h-6 text-green-600" />
                      ) : (
                        <ArrowUpRight className="w-6 h-6 text-gray-600" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{transaction.description}</p>
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <span>{transaction.date}</span>
                        <Badge
                          variant="secondary"
                          className={`rounded-lg ${
                            transaction.status === 'Hoàn thành'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-yellow-100 text-yellow-700'
                          }`}
                        >
                          {transaction.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <p className={`text-xl font-medium ${
                    transaction.amount > 0 ? 'text-green-600' : 'text-gray-900'
                  }`}>
                    {transaction.amount > 0 ? '+' : ''}{Math.abs(transaction.amount).toLocaleString('vi-VN')}₫
                  </p>
                </div>
              ))}
            </div>
          </Card>

          {/* Weekly Chart */}
          <Card className="mt-8 p-8 rounded-3xl border-0 shadow-lg">
            <h2 className="text-2xl mb-6">Xu hướng thu nhập hàng tuần</h2>
            <div className="space-y-4">
              {weeklyEarnings.map((week, index) => (
                <div key={week.week}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">{week.week}</span>
                    <span className="font-medium">{week.amount.toLocaleString('vi-VN')}₫</span>
                  </div>
                  <div className="h-8 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#00BFA6] to-[#00D4B8] rounded-full transition-all"
                      style={{ width: `${(week.amount / 1000000) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Payment Methods */}
          <Card className="p-6 rounded-3xl border-0 shadow-lg">
            <h3 className="mb-4">Phương thức rút tiền</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">Tài khoản ngân hàng</p>
                    <p className="text-sm text-gray-600">•••• 4242</p>
                  </div>
                </div>
                <Badge variant="secondary" className="rounded-lg">Chính</Badge>
              </div>
              <Button variant="outline" className="w-full rounded-xl">
                Thêm phương thức thanh toán
              </Button>
            </div>
          </Card>

          {/* Quick Stats */}
          <Card className="p-6 rounded-3xl border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50">
            <h3 className="mb-4">Hiệu suất tháng này</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Việc hoàn thành</span>
                <span className="font-medium">32</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Trung bình mỗi việc</span>
                <span className="font-medium">102.710₫</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Ngày hoạt động</span>
                <span className="font-medium">18</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Thu nhập hàng ngày TB</span>
                <span className="font-medium">182.610₫</span>
              </div>
            </div>
          </Card>

          {/* Tips */}
          <Card className="p-6 rounded-3xl border-0 shadow-lg bg-gradient-to-br from-yellow-50 to-orange-50">
            <div className="text-center">
              <div className="text-4xl mb-3">💡</div>
              <h3 className="mb-2">Mẹo kiếm thu nhập</h3>
              <p className="text-sm text-gray-700">
                Hoàn thành công việc đúng hạn và duy trì đánh giá cao để mở khóa cơ hội cao cấp và tiền thưởng!
              </p>
            </div>
          </Card>

          {/* Pending Withdrawals */}
          <Card className="p-6 rounded-3xl border-0 shadow-lg">
            <h3 className="mb-4">Rút tiền đang chờ</h3>
            <div className="text-center py-6">
              <p className="text-2xl text-gray-900 mb-1">500.000₫</p>
              <p className="text-sm text-gray-600">Đang xử lý...</p>
              <p className="text-xs text-gray-500 mt-2">Dự kiến: 26/10/2025</p>
            </div>
          </Card>
        </div>
      </div>

      {/* Top Up Modal */}
      <Dialog open={showTopUpModal} onOpenChange={setShowTopUpModal}>
        <DialogContent className="rounded-3xl max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl">Nạp tiền vào ví</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 mt-4">
            {/* Amount Input */}
            <div>
              <Label>Số tiền nạp</Label>
              <div className="relative mt-2">
                <Input
                  type="number"
                  placeholder="Nhập số tiền"
                  value={topUpAmount}
                  onChange={(e) => setTopUpAmount(e.target.value)}
                  className="rounded-xl pr-12"
                />
                <span className="absolute right-4 top-3 text-gray-500">₫</span>
              </div>
              <div className="grid grid-cols-3 gap-2 mt-3">
                {['100000', '200000', '500000'].map((amount) => (
                  <Button
                    key={amount}
                    variant="outline"
                    onClick={() => setTopUpAmount(amount)}
                    className="rounded-xl"
                  >
                    {(parseInt(amount) / 1000).toLocaleString('vi-VN')}k
                  </Button>
                ))}
              </div>
            </div>

            {/* Payment Method */}
            <div>
              <Label>Phương thức thanh toán</Label>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="mt-3 space-y-3">
                <div className="flex items-center space-x-3 border rounded-xl p-4 hover:bg-gray-50 cursor-pointer">
                  <RadioGroupItem value="momo" id="momo" />
                  <Label htmlFor="momo" className="flex-1 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-pink-100 flex items-center justify-center">
                        <span className="text-pink-600">M</span>
                      </div>
                      <span>MoMo</span>
                    </div>
                  </Label>
                </div>
                <div className="flex items-center space-x-3 border rounded-xl p-4 hover:bg-gray-50 cursor-pointer">
                  <RadioGroupItem value="zalopay" id="zalopay" />
                  <Label htmlFor="zalopay" className="flex-1 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                        <span className="text-blue-600">Z</span>
                      </div>
                      <span>ZaloPay</span>
                    </div>
                  </Label>
                </div>
                <div className="flex items-center space-x-3 border rounded-xl p-4 hover:bg-gray-50 cursor-pointer">
                  <RadioGroupItem value="wallet" id="wallet" />
                  <Label htmlFor="wallet" className="flex-1 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                        <Wallet className="w-5 h-5 text-green-600" />
                      </div>
                      <span>HandyGo Wallet</span>
                    </div>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Summary */}
            <div className="bg-gray-50 rounded-xl p-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Số tiền nạp:</span>
                <span className="font-medium">
                  {topUpAmount ? parseFloat(topUpAmount).toLocaleString('vi-VN') : '0'}₫
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Phí giao dịch:</span>
                <span className="font-medium text-green-600">Miễn phí</span>
              </div>
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between">
                  <span>Tổng thanh toán:</span>
                  <span className="text-xl text-[#00BFA6]">
                    {topUpAmount ? parseFloat(topUpAmount).toLocaleString('vi-VN') : '0'}₫
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setShowTopUpModal(false)}
                className="flex-1 rounded-xl"
              >
                Hủy
              </Button>
              <Button
                onClick={handleTopUp}
                className="flex-1 bg-[#00BFA6] hover:bg-[#00A88F] text-white rounded-xl"
              >
                Xác nhận nạp tiền
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Withdraw Modal */}
      <Dialog open={showWithdrawModal} onOpenChange={setShowWithdrawModal}>
        <DialogContent className="rounded-3xl max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl">Rút tiền</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 mt-4">
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-sm text-gray-600 mb-1">Số dư khả dụng</p>
              <p className="text-3xl text-green-600">1.247.500₫</p>
            </div>
            
            <div>
              <Label>Số tiền rút</Label>
              <div className="relative mt-2">
                <Input
                  type="number"
                  placeholder="Nhập số tiền"
                  className="rounded-xl pr-12"
                />
                <span className="absolute right-4 top-3 text-gray-500">₫</span>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
              <p className="text-sm text-yellow-800">
                ⏱ Thời gian xử lý: 1-2 ngày làm việc
              </p>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setShowWithdrawModal(false)}
                className="flex-1 rounded-xl"
              >
                Hủy
              </Button>
              <Button
                onClick={handleWithdraw}
                className="flex-1 bg-[#00BFA6] hover:bg-[#00A88F] text-white rounded-xl"
              >
                Xác nhận rút tiền
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
