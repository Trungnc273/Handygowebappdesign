import { useState } from 'react';
import { PostCard, Post } from './PostCard';
import { CreatePost, NewPost } from './CreatePost';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Plus, Search, Filter } from 'lucide-react';

interface Props {
  isWorker?: boolean;
  userName: string;
  userAvatar?: string;
  userType: 'customer' | 'worker';
}

const samplePosts: Post[] = [
  {
    id: '1',
    userId: 'user1',
    userName: 'Nguyễn Văn A',
    userType: 'customer',
    location: 'Quận 1, TP.HCM',
    timeAgo: '2 giờ trước',
    type: 'request',
    serviceCategory: 'Dọn dẹp',
    budget: '150.000₫ - 200.000₫',
    content: 'Mình cần tìm người giúp dọn dẹp nhà cửa cho căn hộ 3 phòng ngủ. Yêu cầu kinh nghiệm và mang theo dụng cụ dọn dẹp. Thời gian linh hoạt trong tuần này.',
    images: ['https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400'],
    likes: 12,
    comments: 5,
    shares: 2
  },
  {
    id: '2',
    userId: 'user2',
    userName: 'Trần Thị B',
    userAvatar: 'https://images.unsplash.com/photo-1665436035665-d7dad9086ee2?w=100',
    userType: 'worker',
    location: 'Quận 3, TP.HCM',
    timeAgo: '5 giờ trước',
    type: 'offer',
    serviceCategory: 'Gia sư',
    budget: '100.000₫/giờ',
    content: 'Mình là sinh viên năm 4 chuyên ngành Toán, có kinh nghiệm dạy kèm 3 năm. Nhận dạy học sinh cấp 2 và cấp 3. Cam kết chất lượng, học phí hợp lý. Có thể dạy online hoặc tại nhà.',
    images: [
      'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400',
      'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400'
    ],
    likes: 28,
    comments: 15,
    shares: 8
  },
  {
    id: '3',
    userId: 'user3',
    userName: 'Lê Minh C',
    userType: 'customer',
    location: 'Quận 7, TP.HCM',
    timeAgo: '1 ngày trước',
    type: 'request',
    serviceCategory: 'Sửa chữa',
    budget: '200.000₫ - 300.000₫',
    content: 'Cần thợ điện đến sửa chữa hệ thống đèn và ổ cắm trong nhà. Một số ổ cắm bị chập điện. Cần người có kinh nghiệm và chuyên nghiệp.',
    likes: 8,
    comments: 3,
    shares: 1
  },
  {
    id: '4',
    userId: 'user4',
    userName: 'Phạm Văn D',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
    userType: 'worker',
    location: 'Quận 2, TP.HCM',
    timeAgo: '3 ngày trước',
    type: 'offer',
    serviceCategory: 'Vận chuyển',
    budget: '50.000₫/chuyến',
    content: 'Nhận giao hàng và vận chuyển đồ đạc trong nội thành TP.HCM. Có xe tải nhỏ, làm việc nhanh gọn, cẩn thận. Giá cả hợp lý, có thể thương lượng cho khối lượng lớn.',
    images: [
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400'
    ],
    likes: 35,
    comments: 12,
    shares: 6
  }
];

export function Feed({ isWorker = false, userName, userAvatar, userType }: Props) {
  const [posts, setPosts] = useState<Post[]>(samplePosts);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [filterType, setFilterType] = useState<'all' | 'offer' | 'request'>('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const handleCreatePost = (newPost: NewPost) => {
    const post: Post = {
      id: Date.now().toString(),
      userId: 'current-user',
      userName: userName,
      userAvatar: userAvatar,
      userType: userType,
      location: newPost.location,
      timeAgo: 'Vừa xong',
      type: newPost.type,
      serviceCategory: newPost.serviceCategory,
      budget: newPost.budget,
      content: newPost.content,
      images: newPost.images,
      likes: 0,
      comments: 0,
      shares: 0
    };
    setPosts([post, ...posts]);
  };

  const filteredPosts = posts.filter(post => {
    if (filterType !== 'all' && post.type !== filterType) return false;
    if (filterCategory !== 'all' && post.serviceCategory !== filterCategory) return false;
    if (searchQuery && !post.content.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm kiếm bài đăng..."
            className="pl-9 sm:pl-10 rounded-xl"
          />
        </div>
        <div className="flex gap-2 sm:gap-3">
          <Select value={filterType} onValueChange={(v: any) => setFilterType(v)}>
            <SelectTrigger className="flex-1 sm:w-48 rounded-xl text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả bài đăng</SelectItem>
              <SelectItem value="request">Cần giúp đỡ</SelectItem>
              <SelectItem value="offer">Cung cấp dịch vụ</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="flex-1 sm:w-48 rounded-xl text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả danh mục</SelectItem>
              <SelectItem value="Dọn dẹp">Dọn dẹp</SelectItem>
              <SelectItem value="Giao hàng">Giao hàng</SelectItem>
              <SelectItem value="Sửa chữa">Sửa chữa</SelectItem>
              <SelectItem value="Gia sư">Gia sư</SelectItem>
              <SelectItem value="Vận chuyển">Vận chuyển</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Posts */}
      <div className="space-y-6">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Không tìm thấy bài đăng nào</p>
          </div>
        ) : (
          filteredPosts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              isWorker={isWorker}
              onLike={(id) => console.log('Like post:', id)}
              onComment={(id) => console.log('Comment on post:', id)}
              onShare={(id) => console.log('Share post:', id)}
              onApply={(id) => console.log('Apply to post:', id)}
              onBookmark={(id) => console.log('Bookmark post:', id)}
            />
          ))
        )}
      </div>

      {/* Floating Create Post Button */}
      <Button
        onClick={() => setShowCreatePost(true)}
        className="fixed bottom-8 right-8 w-16 h-16 rounded-full bg-gradient-to-r from-[#00BFA6] to-[#00D4B8] hover:from-[#00A88F] hover:to-[#00BFA6] text-white shadow-2xl hover:shadow-3xl transition-all z-50"
      >
        <Plus className="w-8 h-8" />
      </Button>

      {/* Create Post Dialog */}
      <CreatePost
        open={showCreatePost}
        onClose={() => setShowCreatePost(false)}
        onPost={handleCreatePost}
        userType={userType}
        userName={userName}
        userAvatar={userAvatar}
      />
    </div>
  );
}
