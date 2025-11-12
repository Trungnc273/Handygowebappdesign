import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { ImagePlus, X, MapPin, DollarSign } from 'lucide-react';

interface Props {
  open: boolean;
  onClose: () => void;
  onPost: (post: NewPost) => void;
  userType: 'customer' | 'worker';
  userName: string;
  userAvatar?: string;
}

export interface NewPost {
  type: 'offer' | 'request';
  serviceCategory: string;
  budget?: string;
  location: string;
  content: string;
  images?: string[];
}

const serviceCategories = [
  'Dọn dẹp',
  'Giao hàng',
  'Sửa chữa',
  'Gia sư',
  'Vận chuyển',
  'Chăm sóc vườn',
  'Lắp ráp nội thất',
  'Mua sắm',
  'Khác'
];

export function CreatePost({ open, onClose, onPost, userType, userName, userAvatar }: Props) {
  const [postType, setPostType] = useState<'offer' | 'request'>(
    userType === 'worker' ? 'offer' : 'request'
  );
  const [category, setCategory] = useState('');
  const [budget, setBudget] = useState('');
  const [location, setLocation] = useState('');
  const [content, setContent] = useState('');
  const [images, setImages] = useState<string[]>([]);

  const handleSubmit = () => {
    if (!category || !location || !content) {
      alert('Vui lòng điền đầy đủ thông tin');
      return;
    }

    onPost({
      type: postType,
      serviceCategory: category,
      budget: budget || undefined,
      location,
      content,
      images: images.length > 0 ? images : undefined
    });

    // Reset form
    setPostType(userType === 'worker' ? 'offer' : 'request');
    setCategory('');
    setBudget('');
    setLocation('');
    setContent('');
    setImages([]);
    onClose();
  };

  const handleImageAdd = () => {
    // Simulate image upload - in real app, would use file input
    const sampleImages = [
      'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400',
      'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=400',
      'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400'
    ];
    const randomImage = sampleImages[Math.floor(Math.random() * sampleImages.length)];
    setImages([...images, randomImage]);
  };

  const handleImageRemove = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">Tạo bài đăng mới</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* User Info */}
          <div className="flex items-center gap-3">
            <Avatar className="w-12 h-12 rounded-2xl">
              <AvatarImage src={userAvatar} />
              <AvatarFallback className="rounded-2xl bg-gradient-to-br from-[#00BFA6] to-[#00D4B8] text-white">
                {userName.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h4 className="font-medium">{userName}</h4>
              <Badge 
                variant="secondary" 
                className={`rounded-lg text-xs ${
                  userType === 'worker' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'bg-purple-100 text-purple-700'
                }`}
              >
                {userType === 'worker' ? 'Người làm việc' : 'Khách hàng'}
              </Badge>
            </div>
          </div>

          {/* Post Type */}
          <div>
            <Label>Loại bài đăng</Label>
            <div className="grid grid-cols-2 gap-3 mt-2">
              <Button
                type="button"
                variant={postType === 'request' ? 'default' : 'outline'}
                onClick={() => setPostType('request')}
                className={`rounded-xl justify-start ${
                  postType === 'request' ? 'bg-orange-500 hover:bg-orange-600' : ''
                }`}
              >
                🙋 Cần giúp đỡ
              </Button>
              <Button
                type="button"
                variant={postType === 'offer' ? 'default' : 'outline'}
                onClick={() => setPostType('offer')}
                className={`rounded-xl justify-start ${
                  postType === 'offer' ? 'bg-green-500 hover:bg-green-600' : ''
                }`}
              >
                💼 Cung cấp dịch vụ
              </Button>
            </div>
          </div>

          {/* Service Category */}
          <div>
            <Label>Danh mục dịch vụ *</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="mt-2 rounded-xl">
                <SelectValue placeholder="Chọn loại dịch vụ" />
              </SelectTrigger>
              <SelectContent>
                {serviceCategories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Location */}
          <div>
            <Label>Địa điểm *</Label>
            <div className="relative mt-2">
              <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <Input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Nhập địa điểm của bạn"
                className="pl-10 rounded-xl"
              />
            </div>
          </div>

          {/* Budget */}
          <div>
            <Label>Ngân sách (tùy chọn)</Label>
            <div className="relative mt-2">
              <DollarSign className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <Input
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                placeholder="VD: 100.000₫ - 200.000₫"
                className="pl-10 rounded-xl"
              />
            </div>
          </div>

          {/* Content */}
          <div>
            <Label>Nội dung *</Label>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={
                postType === 'offer' 
                  ? 'Mô tả dịch vụ bạn cung cấp, kinh nghiệm, khu vực làm việc...'
                  : 'Mô tả chi tiết công việc bạn cần giúp đỡ...'
              }
              className="mt-2 rounded-2xl min-h-32"
            />
          </div>

          {/* Images */}
          <div>
            <Label>Hình ảnh (tùy chọn)</Label>
            <div className="mt-2">
              <div className="grid grid-cols-4 gap-3">
                {images.map((image, index) => (
                  <div key={index} className="relative aspect-square rounded-xl overflow-hidden group">
                    <img src={image} alt={`Upload ${index + 1}`} className="w-full h-full object-cover" />
                    <button
                      onClick={() => handleImageRemove(index)}
                      className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                {images.length < 4 && (
                  <button
                    onClick={handleImageAdd}
                    className="aspect-square rounded-xl border-2 border-dashed border-gray-300 hover:border-[#00BFA6] flex flex-col items-center justify-center gap-2 text-gray-500 hover:text-[#00BFA6] transition-colors"
                  >
                    <ImagePlus className="w-8 h-8" />
                    <span className="text-xs">Thêm ảnh</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 rounded-xl"
            >
              Hủy
            </Button>
            <Button
              onClick={handleSubmit}
              className="flex-1 bg-gradient-to-r from-[#00BFA6] to-[#00D4B8] hover:from-[#00A88F] hover:to-[#00BFA6] text-white rounded-xl"
            >
              Đăng bài
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
