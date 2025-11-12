import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { TrendingUp, TrendingDown } from 'lucide-react';

export function SupportAnalytics() {
  return (
    <div className="space-y-6">
      {/* Resolution Rate */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-8 rounded-3xl border-0 shadow-lg">
          <h2 className="text-2xl mb-6">Tỷ lệ giải quyết</h2>
          <div className="text-center mb-6">
            <div className="text-6xl mb-4">94%</div>
            <p className="text-[#6B7280]">Yêu cầu được giải quyết trong 24 giờ</p>
          </div>
          <div className="space-y-3">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-[#6B7280]">{'< 1 giờ'}</span>
                <span className="font-medium">45%</span>
              </div>
              <div className="h-3 bg-[#F7FBFA] rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full" style={{ width: '45%' }} />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-[#6B7280]">1-4 giờ</span>
                <span className="font-medium">30%</span>
              </div>
              <div className="h-3 bg-[#F7FBFA] rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full" style={{ width: '30%' }} />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-[#6B7280]">4-24 giờ</span>
                <span className="font-medium">19%</span>
              </div>
              <div className="h-3 bg-[#F7FBFA] rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full" style={{ width: '19%' }} />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-[#6B7280]">{'> 24 giờ'}</span>
                <span className="font-medium">6%</span>
              </div>
              <div className="h-3 bg-[#F7FBFA] rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-red-500 to-pink-500 rounded-full" style={{ width: '6%' }} />
              </div>
            </div>
          </div>
        </Card>

        {/* Customer Satisfaction */}
        <Card className="p-8 rounded-3xl border-0 shadow-lg">
          <h2 className="text-2xl mb-6">Hài lòng khách hàng</h2>
          <div className="text-center mb-6">
            <div className="text-6xl mb-4">4.7⭐</div>
            <p className="text-[#6B7280]">Điểm hài lòng trung bình</p>
          </div>
          <div className="space-y-3">
            {[5, 4, 3, 2, 1].map((rating) => {
              const percentage = rating === 5 ? 65 : rating === 4 ? 25 : rating === 3 ? 7 : rating === 2 ? 2 : 1;
              return (
                <div key={rating}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-[#6B7280]">{rating} sao</span>
                    <span className="font-medium">{percentage}%</span>
                  </div>
                  <div className="h-3 bg-[#F7FBFA] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Ticket Trends */}
      <Card className="p-8 rounded-3xl border-0 shadow-lg">
        <h2 className="text-2xl mb-6">Xu hướng yêu cầu (7 ngày qua)</h2>
        <div className="h-64 flex items-end justify-between gap-4">
          {['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map((day, i) => {
            const height = [40, 55, 45, 60, 50, 35, 45][i];
            const count = [24, 33, 27, 36, 30, 21, 27][i];
            return (
              <div key={day} className="flex-1 flex flex-col items-center group">
                <div className="relative w-full">
                  <div 
                    className="w-full bg-gradient-to-t from-[#00BFA6] to-[#00D4B8] rounded-t-xl transition-all duration-300 hover:from-[#00D4B8] hover:to-[#2ED47A] cursor-pointer" 
                    style={{ height: `${height * 3}px` }}
                  />
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-[#1E293B] text-white text-xs px-2 py-1 rounded-lg whitespace-nowrap">
                      {count} yêu cầu
                    </div>
                  </div>
                </div>
                <p className="text-sm text-[#6B7280] mt-2">{day}</p>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Category Breakdown */}
      <Card className="p-8 rounded-3xl border-0 shadow-lg">
        <h2 className="text-2xl mb-6">Phân loại yêu cầu</h2>
        <div className="space-y-4">
          {[
            { category: 'Vấn đề thanh toán', count: 28, trend: -8, percentage: 35 },
            { category: 'Chất lượng dịch vụ', count: 22, trend: 5, percentage: 27 },
            { category: 'Lịch hẹn', count: 18, trend: 0, percentage: 22 },
            { category: 'Truy cập tài khoản', count: 13, trend: -12, percentage: 16 },
          ].map((item, idx) => (
            <div key={idx} className="p-4 bg-[#F7FBFA] rounded-2xl">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <h3 className="font-medium">{item.category}</h3>
                  {item.trend !== 0 && (
                    <Badge className={`rounded-lg ${
                      item.trend < 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {item.trend < 0 ? (
                        <TrendingDown className="w-3 h-3 mr-1 inline" />
                      ) : (
                        <TrendingUp className="w-3 h-3 mr-1 inline" />
                      )}
                      {Math.abs(item.trend)}%
                    </Badge>
                  )}
                </div>
                <div className="text-right">
                  <p className="font-medium">{item.count} yêu cầu</p>
                  <p className="text-xs text-[#6B7280]">{item.percentage}% tổng</p>
                </div>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#00BFA6] to-[#00D4B8] rounded-full"
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Response Times */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 rounded-3xl border-0 shadow-lg text-center">
          <p className="text-[#6B7280] text-sm mb-2">Thời gian phản hồi TB</p>
          <p className="text-4xl mb-2">8 phút</p>
          <Badge className="bg-green-100 text-green-700 rounded-lg">
            <TrendingDown className="w-3 h-3 mr-1 inline" />
            2 phút so với tuần trước
          </Badge>
        </Card>

        <Card className="p-6 rounded-3xl border-0 shadow-lg text-center">
          <p className="text-[#6B7280] text-sm mb-2">Thời gian giải quyết TB</p>
          <p className="text-4xl mb-2">3.2 giờ</p>
          <Badge className="bg-green-100 text-green-700 rounded-lg">
            <TrendingDown className="w-3 h-3 mr-1 inline" />
            0.5 giờ so với tuần trước
          </Badge>
        </Card>

        <Card className="p-6 rounded-3xl border-0 shadow-lg text-center">
          <p className="text-[#6B7280] text-sm mb-2">Tỷ lệ giải quyết lần đầu</p>
          <p className="text-4xl mb-2">82%</p>
          <Badge className="bg-green-100 text-green-700 rounded-lg">
            <TrendingUp className="w-3 h-3 mr-1 inline" />
            3% so với tuần trước
          </Badge>
        </Card>
      </div>
    </div>
  );
}
