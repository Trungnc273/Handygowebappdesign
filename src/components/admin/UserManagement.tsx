import { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Search, Plus, Edit2, Ban, Eye, Loader2, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';

const mockUsers = [
  { id: 1, name: 'Nguyễn Văn A', email: 'nguyenvana@email.com', phone: '0901234567', type: 'customer', status: 'active', joined: '15/10/2025', totalSpent: '2.450.000₫', jobs: 12 },
  { id: 2, name: 'Trần Thị B', email: 'tranthib@email.com', phone: '0901234568', type: 'worker', status: 'active', joined: '03/01/2024', rating: 4.9, completed: 234 },
  { id: 3, name: 'Lê Văn C', email: 'levanc@email.com', phone: '0901234569', type: 'customer', status: 'active', joined: '22/09/2025', totalSpent: '890.000₫', jobs: 5 },
  { id: 4, name: 'Phạm Thị D', email: 'phamthid@email.com', phone: '0901234570', type: 'worker', status: 'suspended', joined: '11/03/2024', rating: 4.2, completed: 89 },
  { id: 5, name: 'Hoàng Văn E', email: 'hoangvane@email.com', phone: '0901234571', type: 'customer', status: 'active', joined: '05/11/2025', totalSpent: '450.000₫', jobs: 3 },
];

export function UserManagement() {
  const [activeTab, setActiveTab] = useState('customers');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [banDialogOpen, setBanDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const filteredUsers = mockUsers.filter(user => {
    const matchesType = activeTab === 'customers' ? user.type === 'customer' : user.type === 'worker';
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    return matchesType && matchesSearch && matchesStatus;
  });

  const handleBanUser = () => {
    setLoading(true);
    setTimeout(() => {
      toast.success(`Đã tạm ngưng tài khoản ${selectedUser.name}`);
      setBanDialogOpen(false);
      setLoading(false);
      setSelectedUser(null);
    }, 1000);
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl mb-2">Quản lý người dùng</h1>
        <p className="text-[#6B7280]">Quản lý khách hàng và người làm việc</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-2 w-full max-w-md rounded-2xl p-1 bg-[#F7FBFA]">
          <TabsTrigger value="customers" className="rounded-xl">
            Khách hàng ({mockUsers.filter(u => u.type === 'customer').length})
          </TabsTrigger>
          <TabsTrigger value="workers" className="rounded-xl">
            Người làm việc ({mockUsers.filter(u => u.type === 'worker').length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab}>
          <Card className="p-8 rounded-3xl border-0 shadow-lg">
            {/* Filters */}
            <div className="flex items-center gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 w-5 h-5 text-[#6B7280]" />
                <Input 
                  placeholder="Tìm kiếm người dùng..." 
                  className="pl-10 rounded-xl border-[#E6EEF1]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48 rounded-xl border-[#E6EEF1]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả trạng thái</SelectItem>
                  <SelectItem value="active">Hoạt động</SelectItem>
                  <SelectItem value="suspended">Tạm ngưng</SelectItem>
                </SelectContent>
              </Select>
              <Button className="bg-[#00BFA6] hover:bg-[#00A88F] text-white rounded-xl">
                <Plus className="w-4 h-4 mr-2" />
                Thêm người dùng
              </Button>
            </div>

            {/* Table */}
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 text-[#00BFA6] animate-spin" />
              </div>
            ) : filteredUsers.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#F7FBFA] flex items-center justify-center">
                  <Search className="w-8 h-8 text-[#6B7280]" />
                </div>
                <h3 className="text-xl mb-2">Không tìm thấy người dùng</h3>
                <p className="text-[#6B7280]">Thử thay đổi bộ lọc hoặc tìm kiếm</p>
              </div>
            ) : (
              <div className="rounded-2xl border border-[#E6EEF1] overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-[#F7FBFA] hover:bg-[#F7FBFA]">
                      <TableHead>Tên</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Số điện thoại</TableHead>
                      <TableHead>Trạng thái</TableHead>
                      {activeTab === 'customers' ? (
                        <>
                          <TableHead>Tổng chi tiêu</TableHead>
                          <TableHead>Số công việc</TableHead>
                        </>
                      ) : (
                        <>
                          <TableHead>Đánh giá</TableHead>
                          <TableHead>Hoàn thành</TableHead>
                        </>
                      )}
                      <TableHead>Tham gia</TableHead>
                      <TableHead>Hành động</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow key={user.id} className="hover:bg-[#F7FBFA] transition-colors">
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="w-10 h-10 rounded-xl">
                              <AvatarFallback className="rounded-xl bg-gradient-to-br from-[#00BFA6] to-[#00D4B8] text-white">
                                {user.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{user.name}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-[#6B7280]">{user.email}</TableCell>
                        <TableCell className="text-[#6B7280]">{user.phone}</TableCell>
                        <TableCell>
                          <Badge
                            variant="secondary"
                            className={`rounded-lg ${
                              user.status === 'active'
                                ? 'bg-green-100 text-green-700'
                                : 'bg-red-100 text-red-700'
                            }`}
                          >
                            {user.status === 'active' ? 'Hoạt động' : 'Tạm ngưng'}
                          </Badge>
                        </TableCell>
                        {activeTab === 'customers' ? (
                          <>
                            <TableCell className="font-medium text-[#00BFA6]">{user.totalSpent}</TableCell>
                            <TableCell>{user.jobs}</TableCell>
                          </>
                        ) : (
                          <>
                            <TableCell>
                              <span className="text-yellow-500">★</span> {user.rating}
                            </TableCell>
                            <TableCell>{user.completed}</TableCell>
                          </>
                        )}
                        <TableCell className="text-[#6B7280]">{user.joined}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="rounded-xl"
                              onClick={() => {
                                setSelectedUser(user);
                                setViewDialogOpen(true);
                              }}
                            >
                              <Eye className="w-3 h-3" />
                            </Button>
                            <Button variant="outline" size="sm" className="rounded-xl">
                              <Edit2 className="w-3 h-3" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="rounded-xl text-red-600 hover:bg-red-50"
                              onClick={() => {
                                setSelectedUser(user);
                                setBanDialogOpen(true);
                              }}
                            >
                              <Ban className="w-3 h-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </Card>
        </TabsContent>
      </Tabs>

      {/* View User Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="sm:max-w-[500px] rounded-3xl">
          <DialogHeader>
            <DialogTitle>Chi tiết người dùng</DialogTitle>
            <DialogDescription>
              Thông tin chi tiết về {selectedUser?.name}
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-[#F7FBFA] rounded-2xl">
                <Avatar className="w-16 h-16 rounded-2xl">
                  <AvatarFallback className="rounded-2xl bg-gradient-to-br from-[#00BFA6] to-[#00D4B8] text-white text-xl">
                    {selectedUser.name.split(' ').map((n: string) => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl">{selectedUser.name}</h3>
                  <Badge className={`rounded-lg mt-1 ${
                    selectedUser.status === 'active' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {selectedUser.status === 'active' ? 'Hoạt động' : 'Tạm ngưng'}
                  </Badge>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-[#6B7280] mb-1">Email</p>
                  <p className="font-medium">{selectedUser.email}</p>
                </div>
                <div>
                  <p className="text-sm text-[#6B7280] mb-1">Số điện thoại</p>
                  <p className="font-medium">{selectedUser.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-[#6B7280] mb-1">Loại tài khoản</p>
                  <p className="font-medium">{selectedUser.type === 'customer' ? 'Khách hàng' : 'Người làm việc'}</p>
                </div>
                <div>
                  <p className="text-sm text-[#6B7280] mb-1">Ngày tham gia</p>
                  <p className="font-medium">{selectedUser.joined}</p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setViewDialogOpen(false)} className="rounded-xl">
              Đóng
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Ban User Confirmation Dialog */}
      <Dialog open={banDialogOpen} onOpenChange={setBanDialogOpen}>
        <DialogContent className="sm:max-w-[425px] rounded-3xl">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <DialogTitle>Xác nhận tạm ngưng</DialogTitle>
            </div>
            <DialogDescription>
              Bạn có chắc chắn muốn tạm ngưng tài khoản <strong>{selectedUser?.name}</strong>? 
              Họ sẽ không thể truy cập vào nền tảng cho đến khi được kích hoạt lại.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setBanDialogOpen(false)} 
              className="rounded-xl"
              disabled={loading}
            >
              Hủy
            </Button>
            <Button 
              onClick={handleBanUser}
              className="bg-red-600 hover:bg-red-700 text-white rounded-xl"
              disabled={loading}
            >
              {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Tạm ngưng tài khoản
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
