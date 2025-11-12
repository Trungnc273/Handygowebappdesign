import { useState } from 'react';
import { Card } from '../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Heart, MessageCircle, Share2, Briefcase, MapPin, Clock, Bookmark, MoreHorizontal } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

export interface Post {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  userType: 'customer' | 'worker';
  location: string;
  timeAgo: string;
  type: 'offer' | 'request';
  serviceCategory: string;
  budget?: string;
  content: string;
  images?: string[];
  likes: number;
  comments: number;
  shares: number;
  isLiked?: boolean;
  isBookmarked?: boolean;
}

interface Props {
  post: Post;
  onLike?: (postId: string) => void;
  onComment?: (postId: string) => void;
  onShare?: (postId: string) => void;
  onApply?: (postId: string) => void;
  onBookmark?: (postId: string) => void;
  showActions?: boolean;
  isWorker?: boolean;
}

export function PostCard({ 
  post, 
  onLike, 
  onComment, 
  onShare, 
  onApply, 
  onBookmark,
  showActions = true,
  isWorker = false
}: Props) {
  const [liked, setLiked] = useState(post.isLiked || false);
  const [bookmarked, setBookmarked] = useState(post.isBookmarked || false);
  const [likesCount, setLikesCount] = useState(post.likes);

  const handleLike = () => {
    setLiked(!liked);
    setLikesCount(liked ? likesCount - 1 : likesCount + 1);
    onLike?.(post.id);
  };

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
    onBookmark?.(post.id);
  };

  return (
    <Card className="p-6 rounded-3xl border-0 shadow-lg hover:shadow-xl transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <Avatar className="w-12 h-12 rounded-2xl">
            <AvatarImage src={post.userAvatar} />
            <AvatarFallback className="rounded-2xl bg-gradient-to-br from-[#00BFA6] to-[#00D4B8] text-white">
              {post.userName.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h4 className="font-medium">{post.userName}</h4>
              <Badge 
                variant="secondary" 
                className={`rounded-lg text-xs ${
                  post.userType === 'worker' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'bg-purple-100 text-purple-700'
                }`}
              >
                {post.userType === 'worker' ? 'Người làm việc' : 'Khách hàng'}
              </Badge>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600 mt-1">
              <div className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                <span>{post.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{post.timeAgo}</span>
              </div>
            </div>
          </div>
        </div>
        <Button variant="ghost" size="sm" className="rounded-xl">
          <MoreHorizontal className="w-5 h-5" />
        </Button>
      </div>

      {/* Post Type & Category */}
      <div className="flex items-center gap-2 mb-3">
        <Badge 
          className={`rounded-lg ${
            post.type === 'offer' 
              ? 'bg-green-100 text-green-700' 
              : 'bg-orange-100 text-orange-700'
          }`}
        >
          {post.type === 'offer' ? '💼 Cung cấp dịch vụ' : '🙋 Cần giúp đỡ'}
        </Badge>
        <Badge variant="secondary" className="rounded-lg">
          {post.serviceCategory}
        </Badge>
        {post.budget && (
          <Badge variant="secondary" className="rounded-lg bg-[#00BFA6]/10 text-[#00BFA6]">
            💰 {post.budget}
          </Badge>
        )}
      </div>

      {/* Content */}
      <p className="text-gray-800 mb-4 whitespace-pre-line">{post.content}</p>

      {/* Images */}
      {post.images && post.images.length > 0 && (
        <div className={`grid gap-2 mb-4 ${
          post.images.length === 1 ? 'grid-cols-1' : 
          post.images.length === 2 ? 'grid-cols-2' : 
          'grid-cols-2'
        }`}>
          {post.images.slice(0, 4).map((image, index) => (
            <div 
              key={index} 
              className={`relative rounded-2xl overflow-hidden ${
                post.images!.length === 1 ? 'aspect-video' : 'aspect-square'
              } ${index === 3 && post.images!.length > 4 ? 'relative' : ''}`}
            >
              <ImageWithFallback
                src={image}
                alt={`Post image ${index + 1}`}
                className="w-full h-full object-cover"
              />
              {index === 3 && post.images!.length > 4 && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <span className="text-white text-2xl">+{post.images!.length - 4}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Engagement Stats */}
      <div className="flex items-center gap-4 py-3 border-t border-gray-100 text-sm text-gray-600">
        <span>{likesCount} lượt thích</span>
        <span>{post.comments} bình luận</span>
        <span>{post.shares} chia sẻ</span>
      </div>

      {/* Action Buttons */}
      {showActions && (
        <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLike}
            className={`flex-1 rounded-xl ${liked ? 'text-red-600' : ''}`}
          >
            <Heart className={`w-5 h-5 mr-2 ${liked ? 'fill-current' : ''}`} />
            Thích
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onComment?.(post.id)}
            className="flex-1 rounded-xl"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Bình luận
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onShare?.(post.id)}
            className="flex-1 rounded-xl"
          >
            <Share2 className="w-5 h-5 mr-2" />
            Chia sẻ
          </Button>
          
          {/* Worker-specific actions */}
          {isWorker && post.type === 'request' && (
            <Button
              onClick={() => onApply?.(post.id)}
              className="flex-1 bg-[#00BFA6] hover:bg-[#00A88F] text-white rounded-xl"
            >
              <Briefcase className="w-5 h-5 mr-2" />
              Nhận việc
            </Button>
          )}
          
          {/* Customer viewing worker offer */}
          {!isWorker && post.type === 'offer' && (
            <Button
              onClick={() => onApply?.(post.id)}
              className="flex-1 bg-[#00BFA6] hover:bg-[#00A88F] text-white rounded-xl"
            >
              <Briefcase className="w-5 h-5 mr-2" />
              Liên hệ
            </Button>
          )}

          <Button
            variant="ghost"
            size="sm"
            onClick={handleBookmark}
            className={`rounded-xl ${bookmarked ? 'text-[#00BFA6]' : ''}`}
          >
            <Bookmark className={`w-5 h-5 ${bookmarked ? 'fill-current' : ''}`} />
          </Button>
        </div>
      )}
    </Card>
  );
}
