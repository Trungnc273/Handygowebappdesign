import { useState } from 'react';
import { WorkerDashboard } from './worker/WorkerDashboard';
import { JobList } from './worker/JobList';
import { CurrentJob } from './worker/CurrentJob';
import { WorkerEarnings } from './worker/WorkerEarnings';
import { WorkerProfile } from './worker/WorkerProfile';
import { Home, Briefcase, Clock, Wallet, User, Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { Button } from './ui/button';

export function WorkerApp() {
  const [activePage, setActivePage] = useState<'dashboard' | 'jobs' | 'current' | 'earnings' | 'profile'>('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'dashboard' as const, label: 'Bảng điều khiển', icon: Home },
    { id: 'jobs' as const, label: 'Công việc', icon: Briefcase },
    { id: 'current' as const, label: 'Hiện tại', icon: Clock },
    { id: 'earnings' as const, label: 'Thu nhập', icon: Wallet },
    { id: 'profile' as const, label: 'Hồ sơ', icon: User },
  ];

  const handleNavigation = (page: typeof activePage) => {
    setActivePage(page);
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00BFA6] to-[#00D4B8] flex items-center justify-center">
                <span className="text-white">🛠️</span>
              </div>
              <span className="text-[#00BFA6] text-sm sm:text-base">HandyGo <span className="hidden sm:inline">- Người làm việc</span></span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex gap-3 lg:gap-6">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                    activePage === item.id ? 'text-[#00BFA6] bg-[#00BFA6]/10' : 'text-gray-600 hover:text-[#00BFA6]'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="hidden lg:inline">{item.label}</span>
                </button>
              ))}
            </div>

            {/* Mobile Navigation */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="outline" size="icon">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px]">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <div className="mt-6 flex flex-col gap-3">
                  {navItems.map((item) => (
                    <Button
                      key={item.id}
                      variant={activePage === item.id ? 'default' : 'outline'}
                      onClick={() => handleNavigation(item.id)}
                      className={`w-full justify-start ${activePage === item.id ? 'bg-[#00BFA6] hover:bg-[#00A88F]' : ''}`}
                    >
                      <item.icon className="w-4 h-4 mr-2" />
                      {item.label}
                    </Button>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div>
        {activePage === 'dashboard' && <WorkerDashboard onNavigate={setActivePage} />}
        {activePage === 'jobs' && <JobList onNavigate={setActivePage} />}
        {activePage === 'current' && <CurrentJob onNavigate={setActivePage} />}
        {activePage === 'earnings' && <WorkerEarnings onNavigate={setActivePage} />}
        {activePage === 'profile' && <WorkerProfile onNavigate={setActivePage} />}
      </div>
    </div>
  );
}