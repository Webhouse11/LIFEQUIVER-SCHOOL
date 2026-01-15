
import React, { useState } from 'react';
import { User, UserRole } from '../types';
import { Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  Calendar, 
  LogOut, 
  Bell, 
  Menu, 
  X,
  GraduationCap,
  MessageSquare,
  BarChart3,
  ExternalLink,
  Home
} from 'lucide-react';

interface LayoutProps {
  user: User;
  onLogout: () => void;
  children: React.ReactNode;
}

const SidebarItem: React.FC<{ icon: React.ReactNode, label: string, active?: boolean, onClick?: () => void, className?: string }> = ({ icon, label, active, onClick, className }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
      active ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'
    } ${className}`}
  >
    {icon}
    <span className="font-medium">{label}</span>
  </button>
);

const Layout: React.FC<LayoutProps> = ({ user, onLogout, children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    { label: 'Dashboard', icon: <LayoutDashboard size={20} />, role: [UserRole.ADMIN, UserRole.TEACHER, UserRole.STUDENT, UserRole.PARENT] },
    { label: 'Students', icon: <Users size={20} />, role: [UserRole.ADMIN, UserRole.TEACHER] },
    { label: 'Academic Results', icon: <GraduationCap size={20} />, role: [UserRole.ADMIN, UserRole.TEACHER, UserRole.STUDENT, UserRole.PARENT] },
    { label: 'Schedule', icon: <Calendar size={20} />, role: [UserRole.ADMIN, UserRole.TEACHER, UserRole.STUDENT] },
    { label: 'Reports', icon: <BarChart3 size={20} />, role: [UserRole.ADMIN] },
    { label: 'AI Assistant', icon: <MessageSquare size={20} />, role: [UserRole.ADMIN, UserRole.TEACHER, UserRole.STUDENT, UserRole.PARENT] },
  ];

  const visibleNav = navigationItems.filter(item => item.role.includes(user.role));

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-gray-900 text-white">
        <div className="p-6 flex items-center space-x-3 border-b border-gray-800">
          <div className="bg-blue-600 p-2 rounded-lg">
            <BookOpen className="text-white" size={24} />
          </div>
          <span className="text-xl font-bold tracking-tight">LIFEQUIVER</span>
        </div>
        
        <nav className="flex-1 px-4 space-y-1 overflow-y-auto mt-6">
          <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest px-4 mb-2">Main Navigation</div>
          {visibleNav.map((item, idx) => (
            <SidebarItem key={idx} icon={item.icon} label={item.label} active={idx === 0} />
          ))}

          <div className="pt-8 text-[10px] font-black text-gray-500 uppercase tracking-widest px-4 mb-2">Portal Links</div>
          <Link to="/" className="block">
            <SidebarItem icon={<Home size={20} />} label="Public Website" className="text-blue-400 hover:text-blue-300" />
          </Link>
        </nav>

        <div className="p-4 border-t border-gray-800">
          <button 
            onClick={onLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 text-red-400 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <LogOut size={20} />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Navbar */}
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 lg:px-8 shrink-0">
          <div className="flex items-center">
            <button 
              className="lg:hidden p-2 text-gray-500 mr-2" 
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>
            <div className="hidden lg:flex items-center space-x-2 text-sm text-gray-500">
              <Link to="/" className="hover:text-blue-600 flex items-center space-x-1">
                <Home size={14} />
                <span>Home</span>
              </Link>
              <span>/</span>
              <span className="text-gray-900 font-semibold">{user.role} Portal</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link to="/" className="hidden md:flex items-center space-x-2 text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full hover:bg-blue-100 transition-colors">
              <ExternalLink size={12} />
              <span>Public Site</span>
            </Link>
            
            <button className="relative p-2 text-gray-400 hover:text-blue-600 transition-colors">
              <Bell size={20} />
              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            
            <div className="flex items-center space-x-3 border-l pl-4 border-gray-200">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-500">{user.role}</p>
              </div>
              <img 
                src={`https://picsum.photos/seed/${user.id}/40/40`} 
                alt="Profile" 
                className="h-10 w-10 rounded-full border border-gray-200"
              />
              <button 
                onClick={onLogout}
                className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                title="Logout"
              >
                <LogOut size={20} />
              </button>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8 bg-gray-50">
          {children}
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setIsMobileMenuOpen(false)}></div>
          <div className="fixed inset-y-0 left-0 w-64 bg-gray-900 shadow-xl flex flex-col">
            <div className="p-6 flex items-center justify-between border-b border-gray-800">
              <div className="flex items-center space-x-3">
                <BookOpen className="text-blue-500" size={24} />
                <span className="text-white font-bold">LIFEQUIVER</span>
              </div>
              <button onClick={() => setIsMobileMenuOpen(false)} className="text-gray-400">
                <X size={24} />
              </button>
            </div>
            <nav className="flex-1 px-4 py-4 space-y-1">
              <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest px-4 mb-2">Main Navigation</div>
              {visibleNav.map((item, idx) => (
                <SidebarItem key={idx} icon={item.icon} label={item.label} onClick={() => setIsMobileMenuOpen(false)} />
              ))}
              
              <div className="pt-6 text-[10px] font-black text-gray-500 uppercase tracking-widest px-4 mb-2">Public</div>
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
                <SidebarItem icon={<Home size={20} />} label="Visit Website" className="text-blue-400" />
              </Link>
            </nav>
            <div className="p-4 border-t border-gray-800">
              <button 
                onClick={onLogout}
                className="w-full flex items-center space-x-3 px-4 py-3 text-red-400 hover:bg-gray-800 rounded-lg transition-colors"
              >
                <LogOut size={20} />
                <span className="font-medium">Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Layout;
