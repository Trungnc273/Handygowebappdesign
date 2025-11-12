import { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Search, Eye, EyeOff, Trash2, Flag, Check, X } from 'lucide-react';

interface ModerationPost {
  id: string;
  userId: string;
  userName: string;
  userType: 'customer' | 'worker';
  type: 'offer' | 'request';
  category: string;
  contentPreview: string;
  date: string;
  status: 'visible' | 'hidden' | 'flagged';
  reports: number;
}

const moderationPosts: ModerationPost[] = [
  {
    id: 'P-1001',
    userId: 'U-1234',
    userName: 'Nguyễn Văn A',
    userType: 'customer',
    type: 'request',
    category: 'Dọn dẹp',
    contentPreview: 'Cần tìm người giúp dọn dẹp nhà cửa cho căn hộ 3 phòng ngủ...',
    date: 'Ngày 26/10/2025',
    status: 'visible',
    reports: 0
  },
  {
    id: 'P-1002',
    userId: 'U-5678',
    userName: 'Trần Thị B',
    userType: 'worker',
    type: 'offer',
    category: 'Gia sư',
    contentPreview: 'Mình là sinh viên năm 4 chuyên ngành Toán, có kinh nghiệm...',
    date: 'Ngày 26/10/2025',
    status: 'visible',
    reports: 0
  },
  {
    id: 'P-1003',
    userId: 'U-9012',
    userName: 'Lê Minh C',
    userType: 'customer',
    type: 'request',
    category: 'Sửa chữa',
    contentPreview: 'Cần thợ điện đến sửa chữa hệ thống đèn và ổ cắm...',
    date: 'Ngày 25/10/2025',
    status: 'flagged',
    reports: 2
  },
  {
    id: 'P-1004',
    userId: 'U-3456',
    userName: 'Phạm Văn D',
    userType: 'worker',
    type: 'offer',
    category: 'Vận chuyển',
    contentPreview: 'Nhận giao hàng và vận chuyển đồ đạc trong nội thành...',
    date: 'Ngày 24/10/2025',
    status: 'hidden',
    reports: 5
  }
];

export function FeedModeration() {
  const [posts, setPosts] = useState<ModerationPost[]>(moderationPosts);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const handleApprove = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, status: 'visible' as const } : post
    ));
  };

  const handleHide = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, status: 'hidden' as const } : post
    ));
  };

  const handleDelete = (postId: string) => {
    if (confirm('Bạn có chắc chắn muốn xóa bài đăng này?')) {
      setPosts(posts.filter(post => post.id !== postId));
    }
  };

  const filteredPosts = posts.filter(post => {
    if (filterStatus !== 'all' && post.status !== filterStatus) return false;
    if (filterType !== 'all' && post.type !== filterType) return false;
    if (searchQuery && !post.contentPreview.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !post.userName.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div>
      <Card className="p-8 rounded-3xl border-0 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl mb-1">Kiểm duyệt bài đăng</h2>
            <p className="text-gray-600">Quản lý và kiểm duyệt các bài đăng trên feed</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="px-4 py-2 rounded-xl">
              {posts.filter(p => p.status === 'flagged').length} báo cáo mới
            </Badge>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm bài đăng hoặc người dùng..."
              className="pl-10 rounded-xl"
            />
          </div>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-48 rounded-xl">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả trạng thái</SelectItem>
              <SelectItem value="visible">Hiển thị</SelectItem>
              <SelectItem value="hidden">Đã ẩn</SelectItem>
              <SelectItem value="flagged">Đã báo cáo</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-48 rounded-xl">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả loại</SelectItem>
              <SelectItem value="request">Cần giúp đỡ</SelectItem>
              <SelectItem value="offer">Cung cấp dịch vụ</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <div className="rounded-2xl border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Người dùng</TableHead>
                <TableHead>Loại</TableHead>
                <TableHead>Danh mục</TableHead>
                <TableHead>Nội dung</TableHead>
                <TableHead>Ngày</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Hành động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPosts.map((post) => (
                <TableRow key={post.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium">{post.id}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{post.userName}</p>
                      <Badge
                        variant="secondary"
                        className={`rounded-lg text-xs mt-1 ${
                          post.userType === 'worker'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-purple-100 text-purple-700'
                        }`}
                      >
                        {post.userType === 'worker' ? 'Người làm việc' : 'Khách hàng'}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={`rounded-lg ${
                        post.type === 'offer'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-orange-100 text-orange-700'
                      }`}
                    >
                      {post.type === 'offer' ? 'Cung cấp' : 'Yêu cầu'}
                    </Badge>
                  </TableCell>
                  <TableCell>{post.category}</TableCell>
                  <TableCell>
                    <p className="max-w-xs truncate">{post.contentPreview}</p>
                  </TableCell>
                  <TableCell>{post.date}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="secondary"
                        className={`rounded-lg ${
                          post.status === 'visible'
                            ? 'bg-green-100 text-green-700'
                            : post.status === 'hidden'
                            ? 'bg-gray-100 text-gray-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {post.status === 'visible' ? 'Hiển thị' : post.status === 'hidden' ? 'Đã ẩn' : 'Báo cáo'}
                      </Badge>
                      {post.reports > 0 && (
                        <Badge variant="secondary" className="rounded-lg bg-red-100 text-red-700">
                          {post.reports} báo cáo
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      {post.status !== 'visible' && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="rounded-xl text-green-600 hover:text-green-700"
                          onClick={() => handleApprove(post.id)}
                          title="Phê duyệt"
                        >
                          <Check className="w-4 h-4" />
                        </Button>
                      )}
                      {post.status === 'visible' && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="rounded-xl"
                          onClick={() => handleHide(post.id)}
                          title="Ẩn"
                        >
                          <EyeOff className="w-4 h-4" />
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-xl text-red-600 hover:text-red-700"
                        onClick={() => handleDelete(post.id)}
                        title="Xóa"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">Không tìm thấy bài đăng nào</p>
          </div>
        )}
      </Card>
    </div>
  );
}
