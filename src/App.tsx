import { useState } from 'react';
import { CustomerApp } from './components/CustomerApp';
import { WorkerApp } from './components/WorkerApp';
import { SupportApp } from './components/SupportApp';
import { AdminApp } from './components/AdminApp';
import { Button } from './components/ui/button';
import { Users, Briefcase, Headphones, Shield, Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './components/ui/sheet';
import { Toaster } from './components/ui/sonner';

export default function App() {
  const [activeModule, setActiveModule] = useState<'customer' | 'worker' | 'support' | 'admin'>('customer');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const modules = [
    { id: 'customer' as const, label: 'Khách hàng', icon: Users },
    { id: 'worker' as const, label: 'Người làm việc', icon: Briefcase },
    { id: 'support' as const, label: 'Hỗ trợ', icon: Headphones },
    { id: 'admin' as const, label: 'Quản trị', icon: Shield },
  ];

  const handleModuleChange = (module: typeof activeModule) => {
    setActiveModule(module);
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Module Selector */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00BFA6] to-[#00D4B8] flex items-center justify-center">
                <span className="text-white">🛠️</span>
              </div>
              <span className="text-[#00BFA6] hidden sm:inline">Nền tảng HandyGo</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex gap-2">
              {modules.map((module) => (
                <Button
                  key={module.id}
                  variant={activeModule === module.id ? 'default' : 'outline'}
                  onClick={() => handleModuleChange(module.id)}
                  className={activeModule === module.id ? 'bg-[#00BFA6] hover:bg-[#00A88F]' : ''}
                >
                  <module.icon className="w-4 h-4 lg:mr-2" />
                  <span className="hidden lg:inline">{module.label}</span>
                </Button>
              ))}
            </div>

            {/* Mobile Navigation */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="outline" size="icon">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <div className="mt-6 flex flex-col gap-3">
                  {modules.map((module) => (
                    <Button
                      key={module.id}
                      variant={activeModule === module.id ? 'default' : 'outline'}
                      onClick={() => handleModuleChange(module.id)}
                      className={`w-full justify-start ${activeModule === module.id ? 'bg-[#00BFA6] hover:bg-[#00A88F]' : ''}`}
                    >
                      <module.icon className="w-4 h-4 mr-2" />
                      {module.label}
                    </Button>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Active Module */}
      <div>
        {activeModule === 'customer' && <CustomerApp />}
        {activeModule === 'worker' && <WorkerApp />}
        {activeModule === 'support' && <SupportApp />}
        {activeModule === 'admin' && <AdminApp />}
      </div>

      {/* Toast Notifications */}
      <Toaster position="top-right" richColors />
    </div>
  );
}