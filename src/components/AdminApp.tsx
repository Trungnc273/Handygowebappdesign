import { useState } from 'react';
import { AdminDashboard } from './admin/AdminDashboard';
import { UserManagement } from './admin/UserManagement';
import { TaskManagement } from './admin/TaskManagement';
import { PaymentManagement } from './admin/PaymentManagement';
import { ServiceManagement } from './admin/ServiceManagement';
import { Reports } from './admin/Reports';
import { AdminSettings } from './admin/AdminSettings';
import { FeedModeration } from './feed/FeedModeration';
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { 
  LayoutDashboard, 
  Users, 
  Briefcase, 
  CreditCard, 
  Grid3x3, 
  BarChart3, 
  Settings, 
  Rss,
  Bell,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Menu
} from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Separator } from './ui/separator';
import { Toaster } from './ui/sonner';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';

export function AdminApp() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Tổng quan', icon: LayoutDashboard },
    { id: 'users', label: 'Người dùng', icon: Users },
    { id: 'tasks', label: 'Công việc', icon: Briefcase },
    { id: 'payments', label: 'Thanh toán', icon: CreditCard },
    { id: 'services', label: 'Dịch vụ', icon: Grid3x3 },
    { id: 'feed', label: 'Bảng tin', icon: Rss },
    { id: 'reports', label: 'Báo cáo', icon: BarChart3 },
    { id: 'settings', label: 'Cài đặt', icon: Settings },
  ];

  const notifications = [
    { id: 1, text: 'Người dùng mới đăng ký: Nguyễn Văn A', time: '2 phút trước', unread: true },
    { id: 2, text: 'Thanh toán hoàn thành: 142.500₫', time: '15 phút trước', unread: true },
    { id: 3, text: 'Báo cáo tranh chấp mới từ công việc #1045', time: '1 giờ trước', unread: false },
  ];

  return (
    <div className="min-h-screen bg-[#F7FBFA]">
      <Toaster position="bottom-right" />
      
      <div className="flex">
        {/* Sidebar */}
        <div 
          className={`bg-white border-r border-[#E6EEF1] min-h-screen transition-all duration-300 hidden lg:block ${
            sidebarCollapsed ? 'w-[72px]' : 'w-[240px]'
          }`}
        >
          <div className="p-4">
            {/* Logo */}
            <div className={`mb-8 ${sidebarCollapsed ? 'flex justify-center' : ''}`}>
              {sidebarCollapsed ? (
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00BFA6] to-[#00D4B8] flex items-center justify-center">
                  <span className="text-white">H</span>
                </div>
              ) : (
                <>
                  <h2 className="text-xl mb-1">Bảng quản trị</h2>
                  <p className="text-sm text-[#6B7280]">Quản lý HandyGo</p>
                </>
              )}
            </div>
            
            {/* Navigation */}
            <nav className="space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    activeSection === item.id
                      ? 'bg-[#00BFA6] text-white shadow-lg'
                      : 'text-[#6B7280] hover:bg-[#F7FBFA] hover:text-[#00BFA6]'
                  }`}
                  title={sidebarCollapsed ? item.label : ''}
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  {!sidebarCollapsed && <span>{item.label}</span>}
                </button>
              ))}
            </nav>

            {/* Collapse Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className={`w-full mt-6 rounded-xl ${sidebarCollapsed ? 'justify-center px-0' : ''}`}
            >
              {sidebarCollapsed ? (
                <ChevronRight className="w-4 h-4" />
              ) : (
                <>
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Thu gọn
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top Header */}
          <div className="bg-white border-b border-[#E6EEF1] px-4 sm:px-6 py-4">
            <div className="flex items-center justify-between gap-4">
              {/* Mobile Menu & Breadcrumbs */}
              <div className="flex items-center gap-3">
                {/* Mobile Menu */}
                <Sheet>
                  <SheetTrigger asChild className="lg:hidden">
                    <Button variant="outline" size="icon" className="flex-shrink-0">
                      <Menu className="w-5 h-5" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-[280px] p-0">
                    <div className="p-4">
                      <h2 className="text-xl mb-1">Bảng quản trị</h2>
                      <p className="text-sm text-[#6B7280] mb-6">Quản lý HandyGo</p>
                      <nav className="space-y-1">
                        {navItems.map((item) => (
                          <button
                            key={item.id}
                            onClick={() => setActiveSection(item.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                              activeSection === item.id
                                ? 'bg-[#00BFA6] text-white shadow-lg'
                                : 'text-[#6B7280] hover:bg-[#F7FBFA] hover:text-[#00BFA6]'
                            }`}
                          >
                            <item.icon className="w-5 h-5 flex-shrink-0" />
                            <span>{item.label}</span>
                          </button>
                        ))}
                      </nav>
                    </div>
                  </SheetContent>
                </Sheet>

                {/* Breadcrumbs */}
                <div className="flex items-center gap-2 text-sm text-[#6B7280]">
                  <span className="hidden sm:inline">Quản trị</span>
                  <span className="hidden sm:inline">/</span>
                  <span className="text-[#1E293B] truncate">
                    {navItems.find(item => item.id === activeSection)?.label}
                  </span>
                </div>
              </div>

              {/* Right Actions */}
              <div className="flex items-center gap-2 sm:gap-3">
                {/* Notifications */}
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm" className="relative rounded-xl">
                      <Bell className="w-4 h-4" />
                      <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 bg-red-500 text-white rounded-full text-xs">
                        2
                      </Badge>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80 p-0 rounded-2xl" align="end">
                    <div className="p-4 border-b border-[#E6EEF1]">
                      <h3 className="font-medium">Thông báo</h3>
                    </div>
                    <div className="max-h-[400px] overflow-y-auto">
                      {notifications.map((notif) => (
                        <div 
                          key={notif.id}
                          className={`p-4 border-b border-[#E6EEF1] hover:bg-[#F7FBFA] transition-colors ${
                            notif.unread ? 'bg-blue-50/50' : ''
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            {notif.unread && (
                              <div className="w-2 h-2 bg-[#00BFA6] rounded-full mt-2" />
                            )}
                            <div className="flex-1">
                              <p className="text-sm">{notif.text}</p>
                              <p className="text-xs text-[#6B7280] mt-1">{notif.time}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-3 border-t border-[#E6EEF1]">
                      <Button variant="ghost" size="sm" className="w-full rounded-xl text-[#00BFA6]">
                        Xem tất cả thông báo
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>

                {/* Profile Dropdown */}
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm" className="rounded-xl gap-2">
                      <Avatar className="w-6 h-6 rounded-lg">
                        <AvatarFallback className="rounded-lg bg-gradient-to-br from-[#00BFA6] to-[#00D4B8] text-white text-xs">
                          QT
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm hidden sm:inline">Quản trị viên</span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-64 p-0 rounded-2xl" align="end">
                    <div className="p-4 border-b border-[#E6EEF1]">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-12 h-12 rounded-xl">
                          <AvatarFallback className="rounded-xl bg-gradient-to-br from-[#00BFA6] to-[#00D4B8] text-white">
                            QT
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">Admin User</p>
                          <p className="text-sm text-[#6B7280]">admin@handygo.com</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-2">
                      <Button variant="ghost" className="w-full justify-start rounded-xl" onClick={() => setActiveSection('settings')}>
                        <Settings className="w-4 h-4 mr-2" />
                        Cài đặt
                      </Button>
                      <Separator className="my-2" />
                      <Button variant="ghost" className="w-full justify-start rounded-xl text-red-600 hover:text-red-700 hover:bg-red-50">
                        <LogOut className="w-4 h-4 mr-2" />
                        Đăng xuất
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>

          {/* Page Content */}
          <div className="flex-1 overflow-auto">
            {activeSection === 'dashboard' && <AdminDashboard onNavigate={setActiveSection} />}
            {activeSection === 'users' && <UserManagement />}
            {activeSection === 'tasks' && <TaskManagement />}
            {activeSection === 'payments' && <PaymentManagement />}
            {activeSection === 'services' && <ServiceManagement />}
            {activeSection === 'feed' && <FeedModeration />}
            {activeSection === 'reports' && <Reports />}
            {activeSection === 'settings' && <AdminSettings />}
          </div>

          {/* Footer */}
          <div className="bg-white border-t border-[#E6EEF1] px-4 sm:px-6 py-3">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-[#6B7280]">
              <p className="text-xs sm:text-sm">© 2025 HandyGo. All rights reserved.</p>
              <p className="text-xs sm:text-sm">Cập nhật lần cuối: 2 phút trước</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
