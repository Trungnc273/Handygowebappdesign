import { useState } from 'react';
import { TicketList } from './support/TicketList';
import { TicketDetail } from './support/TicketDetail';
import { SupportAnalytics } from './support/SupportAnalytics';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { MessageSquare, TrendingUp, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { Toaster } from './ui/sonner';

const stats = [
  { label: 'Yêu cầu mới', value: '12', icon: AlertCircle, color: 'from-red-500 to-orange-500', change: '+3' },
  { label: 'Đang xử lý', value: '28', icon: Clock, color: 'from-blue-500 to-indigo-500', change: '+5' },
  { label: 'Đã giải quyết hôm nay', value: '45', icon: CheckCircle, color: 'from-green-500 to-emerald-500', change: '+12' },
  { label: 'Phản hồi TB', value: '8 phút', icon: TrendingUp, color: 'from-purple-500 to-pink-500', change: '-2 phút' },
];

export function SupportApp() {
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-[#F7FBFA]">
      <Toaster position="bottom-right" />
      
      {/* Header */}
      <div className="bg-white border-b border-[#E6EEF1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <h1 className="text-2xl sm:text-3xl mb-2">Bảng điều khiển hỗ trợ khách hàng</h1>
          <p className="text-[#6B7280] text-sm sm:text-base">Quản lý yêu cầu hỗ trợ và câu hỏi của khách hàng</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <Card key={stat.label} className="p-6 rounded-3xl border-0 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <Badge variant="secondary" className="bg-green-100 text-green-700 rounded-lg">
                  {stat.change}
                </Badge>
              </div>
              <p className="text-[#6B7280] text-sm mb-1">{stat.label}</p>
              <p className="text-3xl">{stat.value}</p>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <Tabs defaultValue="tickets" className="space-y-6">
          <TabsList className="grid grid-cols-2 w-full max-w-md rounded-2xl p-1 bg-white shadow-md">
            <TabsTrigger value="tickets" className="rounded-xl">
              <MessageSquare className="w-4 h-4 mr-2" />
              Yêu cầu
            </TabsTrigger>
            <TabsTrigger value="analytics" className="rounded-xl">
              <TrendingUp className="w-4 h-4 mr-2" />
              Phân tích
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tickets">
            {selectedTicket ? (
              <TicketDetail 
                ticketId={selectedTicket} 
                onBack={() => setSelectedTicket(null)} 
              />
            ) : (
              <TicketList onSelectTicket={setSelectedTicket} />
            )}
          </TabsContent>

          <TabsContent value="analytics">
            <SupportAnalytics />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
