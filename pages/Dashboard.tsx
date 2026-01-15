
import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { User, UserRole } from '../types';
import { Link } from 'react-router-dom';
import { 
  MOCK_STUDENT, 
  MOCK_NOTIFICATIONS, 
  MOCK_RESULTS, 
  MOCK_SCHEDULE 
} from '../mockData';
import { 
  AreaChart,
  Area,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  BarChart, 
  Bar,
} from 'recharts';
import { 
  FileText, 
  CheckCircle, 
  Send, 
  MessageCircle,
  TrendingUp,
  UserCheck,
  Users,
  GraduationCap,
  Calendar,
  AlertCircle,
  Search,
  ChevronRight,
  Plus,
  Home,
  ArrowLeftRight,
  Globe,
  Mail,
  X,
  Printer,
  UserPlus,
  Info,
  LogOut,
  Phone,
  Clock,
  Settings,
  Edit,
  Trash2,
  MoreVertical,
  // Added missing BookOpen import
  BookOpen
} from 'lucide-react';
import { askSchoolAssistant } from '../services/gemini';

interface DashboardProps {
  user: User;
  onLogout: () => void;
}

const Modal: React.FC<{ isOpen: boolean, onClose: () => void, title: string, children: React.ReactNode }> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <h3 className="text-xl font-black text-gray-900">{title}</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>
        <div className="p-6 overflow-y-auto max-h-[80vh]">
          {children}
        </div>
      </div>
    </div>
  );
};

const Toast: React.FC<{ message: string, type: 'success' | 'info', onHide: () => void }> = ({ message, type, onHide }) => {
  useEffect(() => {
    const timer = setTimeout(onHide, 3000);
    return () => clearTimeout(timer);
  }, [onHide]);

  return (
    <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] px-6 py-3 rounded-2xl shadow-2xl border flex items-center space-x-3 animate-in slide-in-from-bottom-4 duration-300 ${
      type === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-blue-50 border-blue-200 text-blue-800'
    }`}>
      {type === 'success' ? <CheckCircle size={20} className="text-emerald-500" /> : <Info size={20} className="text-blue-500" />}
      <span className="font-bold text-sm">{message}</span>
    </div>
  );
};

const StatCard: React.FC<{ label: string, value: string | number, subtext: string, icon: React.ReactNode, color: string }> = ({ label, value, subtext, icon, color }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start space-x-4">
    <div className={`p-3 rounded-xl ${color}`}>
      {icon}
    </div>
    <div>
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <h3 className="text-2xl font-bold text-gray-900 mt-1">{value}</h3>
      <p className="text-xs text-green-600 mt-1 font-medium">{subtext}</p>
    </div>
  </div>
);

const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState<{ role: 'user' | 'assistant', text: string }[]>([]);
  const [isAiLoading, setIsAiLoading] = useState(false);
  
  // Modal states
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [selectedStaff, setSelectedStaff] = useState<any>(null);
  const [toast, setToast] = useState<{ message: string, type: 'success' | 'info' } | null>(null);

  const showToast = (message: string, type: 'success' | 'info' = 'success') => {
    setToast({ message, type });
    setActiveModal(null);
  };

  const handleAiChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMessage = chatInput;
    setChatHistory(prev => [...prev, { role: 'user', text: userMessage }]);
    setChatInput('');
    setIsAiLoading(true);

    const context = {
      userName: user.name,
      userRole: user.role,
      userIdentifier: user.email || user.phone,
      school: "Lifequiver Schools, Ile-Ife",
      studentData: user.role === UserRole.STUDENT ? MOCK_STUDENT : null
    };

    const aiResponse = await askSchoolAssistant(userMessage, context);
    setChatHistory(prev => [...prev, { role: 'assistant', text: aiResponse }]);
    setIsAiLoading(false);
  };

  const renderAdminDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Total Students" value="1,240" subtext="+12% from last term" color="bg-blue-50 text-blue-600" icon={<Users size={24} />} />
        <StatCard label="Active Teachers" value="86" subtext="All certified" color="bg-purple-50 text-purple-600" icon={<UserCheck size={24} />} />
        <StatCard label="Revenue (N)" value="4.2M" subtext="Term to date" color="bg-green-50 text-green-600" icon={<TrendingUp size={24} />} />
        <StatCard label="Attendance" value="94.2%" subtext="Overall school avg" color="bg-orange-50 text-orange-600" icon={<CheckCircle size={24} />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold">Enrollment Trends (2024)</h3>
            <button className="text-xs font-bold text-blue-600 flex items-center space-x-1" onClick={() => showToast("Downloading full analytics report...", "info")}>
              <FileText size={14} />
              <span>Full Report</span>
            </button>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={[
                { month: 'Jan', students: 1000 },
                { month: 'Feb', students: 1100 },
                { month: 'Mar', students: 1080 },
                { month: 'Apr', students: 1200 },
                { month: 'May', students: 1240 },
              ]}>
                <defs>
                  <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Area type="monotone" dataKey="students" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorStudents)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold mb-6">Quick Actions</h3>
          <div className="space-y-3">
            {[
              { id: 'register', label: 'Register New Student', icon: <UserPlus size={18} /> },
              { id: 'print', label: 'Print Result Slips', icon: <Printer size={18} /> },
              { id: 'staff', label: 'Manage Staff', icon: <Users size={18} /> },
              { id: 'alert', label: 'Send School Alert', icon: <AlertCircle size={18} /> },
              { id: 'logout', label: 'Sign Out', icon: <LogOut size={18} />, action: onLogout, color: 'text-red-500' },
            ].map((btn, i) => (
              <button 
                key={i} 
                onClick={() => btn.action ? btn.action() : setActiveModal(btn.id)}
                className={`w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-blue-50 rounded-xl transition-colors group ${btn.color || ''}`}
              >
                <div className="flex items-center space-x-3">
                  <span className={`transition-colors ${btn.color ? btn.color : 'text-gray-400 group-hover:text-blue-600'}`}>{btn.icon}</span>
                  <span className={`font-medium ${btn.color ? btn.color : 'text-gray-700 group-hover:text-blue-700'}`}>{btn.label}</span>
                </div>
                <ChevronRight size={16} className={`transition-colors ${btn.color ? btn.color : 'text-gray-300 group-hover:text-blue-600'}`} />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Admin Modals */}
      <Modal isOpen={activeModal === 'register'} onClose={() => setActiveModal(null)} title="Register New Student">
        <form onSubmit={(e) => { e.preventDefault(); showToast("Student records successfully updated!"); }} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 uppercase">First Name</label>
              <input type="text" required className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. Samuel" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 uppercase">Last Name</label>
              <input type="text" required className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. Adenle" />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 uppercase">Class Level</label>
            <select className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500 bg-white">
              <option>JSS 1</option>
              <option>JSS 2</option>
              <option>JSS 3</option>
              <option>SSS 1</option>
              <option>SSS 2</option>
              <option>SSS 3</option>
            </select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 uppercase">Contact Email</label>
              <input type="email" required className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500" placeholder="student@lifequiver.edu.ng" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 uppercase">Contact Phone</label>
              <input type="tel" required className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500" placeholder="080 0000 0000" />
            </div>
          </div>
          <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100 flex items-start space-x-3">
            <Info size={16} className="text-blue-600 shrink-0 mt-1" />
            <p className="text-[10px] text-blue-700 font-medium leading-relaxed">Both Email and Phone are required for dual-identifier login support. An automated welcome message will be sent to both.</p>
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl shadow-lg mt-4 flex items-center justify-center space-x-2">
            <UserPlus size={20} />
            <span>Complete Registration</span>
          </button>
        </form>
      </Modal>

      <Modal isOpen={activeModal === 'print'} onClose={() => setActiveModal(null)} title="Print Result Slips">
        <div className="space-y-4">
          <p className="text-sm text-gray-500">Select class and term to generate slips for your students.</p>
          <div className="grid grid-cols-2 gap-3">
            <select className="p-3 border rounded-xl outline-none bg-white text-sm font-medium">
              <option>JSS 3A</option>
              <option>JSS 3B</option>
              <option>SSS 2B</option>
            </select>
            <select className="p-3 border rounded-xl outline-none bg-white text-sm font-medium">
              <option>2nd Term 2024</option>
              <option>1st Term 2024</option>
            </select>
          </div>
          <div className="max-h-64 overflow-y-auto space-y-2 border-y py-4 scrollbar-hide">
            {['Toluwani Adeyemi', 'Chisom Okoro', 'Fatima Musa', 'Emeka Nwosu', 'Bolu Ajayi', 'Shola Bakare'].map((name, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg group hover:bg-white transition-colors border border-transparent hover:border-blue-100">
                <div className="flex items-center space-x-3">
                   <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-[10px] font-black text-blue-600 uppercase">
                     {name.substring(0, 2)}
                   </div>
                   <span className="text-sm font-medium text-gray-700">{name}</span>
                </div>
                <input type="checkbox" defaultChecked className="w-5 h-5 accent-blue-600 cursor-pointer rounded-lg" />
              </div>
            ))}
          </div>
          <button onClick={() => showToast("Preparing documents for the printer...", "info")} className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transition-all">
            <Printer size={20} />
            <span>Generate & Print Selected</span>
          </button>
        </div>
      </Modal>

      <Modal isOpen={activeModal === 'alert'} onClose={() => setActiveModal(null)} title="Send School Alert">
        <form onSubmit={(e) => { e.preventDefault(); showToast("Alert broadcasted successfully via SMS and Email!"); }} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 uppercase">Alert Subject</label>
            <input type="text" required className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. Mid-Term Break Notice" />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 uppercase">Message Content</label>
            <textarea rows={4} required className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500 resize-none" placeholder="Type your school-wide message here..."></textarea>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 uppercase">Target Audience</label>
              <select className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                <option>All Parents & Staff</option>
                <option>Secondary Only</option>
                <option>Primary Only</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 uppercase">Delivery Channel</label>
              <select className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                <option>Email Only</option>
                <option>SMS Only</option>
                <option>Email + SMS (Urgent)</option>
              </select>
            </div>
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl shadow-lg flex items-center justify-center space-x-2">
            <Send size={18} />
            <span>Broadcast Alert Now</span>
          </button>
        </form>
      </Modal>

      <Modal isOpen={activeModal === 'staff'} onClose={() => setActiveModal(null)} title="Manage Staff Records">
        <div className="space-y-6">
          <div className="flex items-center space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input type="text" placeholder="Search staff name..." className="w-full pl-10 pr-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-gray-50" />
            </div>
            <button onClick={() => showToast("Opening HR recruitment portal...", "info")} className="bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 transition-colors shadow-sm">
              <Plus size={20} />
            </button>
          </div>
          <div className="space-y-3">
            {[
              { id: '1', name: 'Mr. Adewale', role: 'Mathematics Lead', status: 'On Duty', phone: '08123456789' },
              { id: '2', name: 'Mrs. Olaniyi', role: 'English Dept', status: 'On Duty', phone: '08198765432' },
              { id: '3', name: 'Dr. Ifeoma', role: 'Science Coordinator', status: 'Leave', phone: '08112233445' },
              { id: '4', name: 'Mr. Balogun', role: 'Physical Education', status: 'On Duty', phone: '08155443322' },
            ].map((staff, i) => (
              <div key={i} className="flex items-center justify-between p-4 border border-gray-100 rounded-2xl hover:bg-blue-50 transition-all group cursor-pointer" onClick={() => { setSelectedStaff(staff); setActiveModal('staff-edit'); }}>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-sm">
                    {staff.name.split(' ')[1][0]}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm group-hover:text-blue-700 transition-colors">{staff.name}</h4>
                    <p className="text-[10px] text-gray-500 font-bold uppercase">{staff.role}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className={`text-[10px] font-black px-2 py-1 rounded-full mb-1 ${staff.status === 'On Duty' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                    {staff.status}
                  </span>
                  <p className="text-[10px] text-gray-400 font-mono flex items-center">
                    <Edit size={10} className="mr-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span>{staff.phone}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-[10px] text-gray-400 font-bold uppercase tracking-widest">Showing 4 of 86 active staff</p>
        </div>
      </Modal>

      <Modal isOpen={activeModal === 'staff-edit'} onClose={() => setActiveModal('staff')} title="Edit Staff Member">
        {selectedStaff && (
          <form onSubmit={(e) => { e.preventDefault(); showToast(`Profile for ${selectedStaff.name} updated!`); }} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 uppercase">Full Name</label>
              <input type="text" defaultValue={selectedStaff.name} className="w-full p-3 border rounded-xl outline-none" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 uppercase">Role / Designation</label>
              <input type="text" defaultValue={selectedStaff.role} className="w-full p-3 border rounded-xl outline-none" />
            </div>
            <div className="grid grid-cols-2 gap-4">
               <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase">Phone Number</label>
                <input type="tel" defaultValue={selectedStaff.phone} className="w-full p-3 border rounded-xl outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase">Status</label>
                <select className="w-full p-3 border rounded-xl outline-none bg-white">
                  <option>On Duty</option>
                  <option>On Leave</option>
                  <option>Resigned</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 pt-4">
              <button type="button" onClick={() => showToast("Staff record archived.", "info")} className="flex-1 py-3 border border-red-200 text-red-600 rounded-xl font-bold hover:bg-red-50 transition-colors flex items-center justify-center space-x-2">
                <Trash2 size={16} />
                <span>Archive</span>
              </button>
              <button type="submit" className="flex-[2] py-3 bg-blue-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all">Save Changes</button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );

  const renderTeacherDashboard = () => (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
        <div>
          <h2 className="text-2xl font-black text-gray-900">Class Management</h2>
          <p className="text-gray-500">Currently managing <span className="text-blue-600 font-bold">JSS 3A (35 Students)</span></p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input type="text" placeholder="Search student..." className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>
          <button 
            onClick={() => setActiveModal('upload-scores')}
            className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center space-x-2 hover:bg-blue-700 transition-colors shadow-sm"
          >
            <Plus size={16} />
            <span>Upload Scores</span>
          </button>
          <button 
            onClick={onLogout}
            className="bg-red-50 text-red-600 px-4 py-2 rounded-xl text-sm font-bold flex items-center space-x-2 hover:bg-red-100 transition-colors border border-red-100"
          >
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50/50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-[10px] font-black text-gray-500 uppercase tracking-widest">Student Name</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-500 uppercase tracking-widest">Term Average</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-500 uppercase tracking-widest">Attendance</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-500 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                { name: 'Toluwani Adeyemi', avg: 85, att: '94%', id: '001', phone: '08133333333' },
                { name: 'Chisom Okoro', avg: 92, att: '100%', id: '002', phone: '08122222222' },
                { name: 'Fatima Musa', avg: 78, att: '88%', id: '003', phone: '08144444444' },
                { name: 'Emeka Nwosu', avg: 65, att: '92%', id: '004', phone: '08155555555' },
                { name: 'Boluwatife Ajayi', avg: 89, att: '96%', id: '005', phone: '08166666666' },
              ].map((std) => (
                <tr key={std.id} className="hover:bg-blue-50/50 transition-colors group cursor-pointer" onClick={() => setActiveModal('edit-score')}>
                  <td className="px-6 py-5">
                    <div className="flex items-center space-x-3">
                      <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-black text-xs">
                        {std.name.split(' ')[0][0]}{std.name.split(' ')[1][0]}
                      </div>
                      <div>
                        <span className="font-bold text-gray-900 block group-hover:text-blue-700 transition-colors">{std.name}</span>
                        <span className="text-[10px] text-gray-400 font-mono">{std.phone}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center space-x-2">
                       <span className="font-bold text-gray-700">{std.avg}%</span>
                       <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden hidden sm:block">
                          <div className={`h-full bg-blue-500 rounded-full`} style={{ width: `${std.avg}%` }}></div>
                       </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-sm text-gray-600 font-medium">{std.att}</span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                       <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-white rounded-lg transition-all" title="View Profile">
                          <Search size={16} />
                       </button>
                       <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-white rounded-lg transition-all" title="Edit Grades">
                          <Edit size={16} />
                       </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="p-4 bg-gray-50/50 text-center">
             <button className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline" onClick={() => showToast("Loading more students...", "info")}>View All 35 Students</button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-gray-900 flex items-center space-x-2">
               <Calendar size={18} className="text-blue-600" />
               <span>Today's Classes</span>
            </h3>
            <span className="text-[10px] font-black text-gray-400 uppercase">{new Date().toLocaleDateString('en-GB', { weekday: 'long' })}</span>
          </div>
          <div className="space-y-4">
            {[
              { time: '08:30', sub: 'Mathematics', class: 'JSS 3A', room: 'R204' },
              { time: '10:00', sub: 'Physics', class: 'SSS 1B', room: 'Lab A' },
              { time: '11:30', sub: 'Further Maths', class: 'SSS 2A', room: 'R112' },
            ].map((s, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-transparent hover:border-blue-200 transition-all group cursor-pointer" onClick={() => showToast(`Opening Lesson Plan: ${s.sub}`, "info")}>
                <div className="flex items-center space-x-3">
                  <div className="text-xs font-black text-blue-600 bg-blue-100 w-12 h-12 flex flex-col items-center justify-center rounded-xl">
                     <span className="text-[10px] opacity-70">START</span>
                     <span>{s.time}</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900 group-hover:text-blue-700">{s.sub}</p>
                    <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest">{s.class} • {s.room}</p>
                  </div>
                </div>
                <div className="p-2 bg-white rounded-lg text-gray-400 group-hover:text-blue-600 transition-colors">
                  <FileText size={18} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Teacher Modals */}
      <Modal isOpen={activeModal === 'upload-scores'} onClose={() => setActiveModal(null)} title="Upload Batch Scores">
        <div className="space-y-4">
          <div className="p-10 border-2 border-dashed border-gray-200 rounded-[2.5rem] flex flex-col items-center justify-center text-center hover:border-blue-400 transition-colors cursor-pointer group" onClick={() => showToast("Scanning assessment file...", "info")}>
            <div className="bg-blue-50 p-5 rounded-full text-blue-600 group-hover:scale-110 transition-transform mb-4 shadow-sm">
              <FileText size={40} />
            </div>
            <h4 className="font-black text-gray-900">Drag & Drop Assessment Sheet</h4>
            <p className="text-xs text-gray-500 mt-2 leading-relaxed">Accepted formats: .csv, .xlsx, .pdf (OCR)<br/>Required columns: StudentID, CA1, CA2, Exam</p>
          </div>
          <div className="flex items-center space-x-3 py-2">
            <div className="flex-1 h-px bg-gray-100"></div>
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">or manual input</span>
            <div className="flex-1 h-px bg-gray-100"></div>
          </div>
          <button onClick={() => setActiveModal('edit-score')} className="w-full py-4 bg-gray-50 text-blue-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all shadow-sm">Enter Grades Manually</button>
        </div>
      </Modal>

      <Modal isOpen={activeModal === 'edit-score'} onClose={() => setActiveModal(null)} title="Update Student Scores">
        <form onSubmit={(e) => { e.preventDefault(); showToast("Grades successfully broadcasted to the portal!"); }} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 uppercase">Select Student</label>
            <select className="w-full p-3 border rounded-xl outline-none bg-white font-medium focus:ring-2 focus:ring-blue-500">
              <option>Toluwani Adeyemi (JSS 3A)</option>
              <option>Chisom Okoro (JSS 3A)</option>
              <option>Fatima Musa (JSS 3A)</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 uppercase">Assessment (30%)</label>
              <input type="number" max="30" className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500" placeholder="0 - 30" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 uppercase">Examination (70%)</label>
              <input type="number" max="70" className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500" placeholder="0 - 70" />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 uppercase">Subject</label>
            <select className="w-full p-3 border rounded-xl outline-none bg-white font-medium focus:ring-2 focus:ring-blue-500">
              <option>Mathematics</option>
              <option>Further Mathematics</option>
            </select>
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl shadow-lg mt-4 flex items-center justify-center space-x-2">
            <CheckCircle size={20} />
            <span>Post to Gradebook</span>
          </button>
        </form>
      </Modal>
    </div>
  );

  const renderParentDashboard = () => (
    <div className="space-y-6">
      <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full translate-x-16 -translate-y-16"></div>
        <div className="flex-1 relative z-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-black text-gray-900">Guardian Dashboard</h2>
            <button 
              onClick={onLogout}
              className="text-red-600 font-bold text-xs flex items-center space-x-1 bg-red-50 px-4 py-2 rounded-xl transition-all border border-red-100 hover:bg-red-100"
            >
              <LogOut size={16} />
              <span>Log Out</span>
            </button>
          </div>
          <p className="text-gray-500">Viewing real-time data for: <span className="text-blue-600 font-black">Toluwani Adeyemi (JSS 3A)</span></p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button 
              onClick={() => showToast("Compiling official transcript...", "info")}
              className="bg-blue-600 text-white px-8 py-3 rounded-2xl text-sm font-bold shadow-lg hover:shadow-xl transition-all flex items-center space-x-2 transform hover:-translate-y-0.5"
            >
              <FileText size={18} />
              <span>Academic Results</span>
            </button>
            <button 
              onClick={() => showToast("Opening attendance calendar...", "info")}
              className="bg-white text-gray-700 px-8 py-3 rounded-2xl text-sm font-bold border border-gray-200 hover:bg-gray-50 transition-all flex items-center space-x-2"
            >
              <Clock size={18} />
              <span>Attendance</span>
            </button>
            <button 
              onClick={() => showToast("Tuition Status: Fully Paid. Thank you!", "info")}
              className="bg-emerald-50 text-emerald-700 px-6 py-3 rounded-2xl text-sm font-bold border border-emerald-100 hover:bg-emerald-100 transition-all flex items-center space-x-2"
            >
               <CheckCircle size={18} />
               <span>Tuition: Paid</span>
            </button>
          </div>
        </div>
        <div className="flex items-center space-x-6 shrink-0">
          <div className="text-center">
            <div className="w-20 h-20 rounded-full border-4 border-blue-600 flex items-center justify-center text-2xl font-black text-blue-600 bg-blue-50 shadow-inner">85%</div>
            <p className="text-[10px] font-black uppercase mt-3 text-gray-400 tracking-widest">Term Average</p>
          </div>
          <div className="text-center">
            <div className="w-20 h-20 rounded-full border-4 border-green-500 flex items-center justify-center text-2xl font-black text-green-600 bg-green-50 shadow-inner">94%</div>
            <p className="text-[10px] font-black uppercase mt-3 text-gray-400 tracking-widest">Attendance</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-black text-gray-900 uppercase tracking-tight">Performance Chart</h3>
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">2nd Term Assessments</span>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MOCK_RESULTS}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="subject" hide />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#9ca3af' }} />
                <Tooltip cursor={{fill: '#f9fafb'}} contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                <Bar dataKey="score" fill="#2563eb" radius={[8, 8, 0, 0]} barSize={45} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-black text-gray-900 uppercase tracking-tight">Teacher Feedback</h3>
            <button onClick={() => showToast("Opening chat with class teacher...", "info")} className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline bg-blue-50 px-3 py-1.5 rounded-full">Message Teacher</button>
          </div>
          <div className="space-y-4 max-h-64 overflow-y-auto scrollbar-hide">
            {MOCK_RESULTS.slice(0, 4).map((r, i) => (
              <div key={i} className="p-4 bg-gray-50 rounded-2xl border-l-4 border-blue-600 hover:bg-blue-50/50 transition-colors group cursor-pointer" onClick={() => showToast(`Opening feedback thread for ${r.subject}...`, "info")}>
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-gray-900 group-hover:text-blue-700 transition-colors">{r.subject}</span>
                  <div className="flex items-center space-x-2">
                     <span className={`text-[10px] font-black px-2 py-0.5 rounded-lg ${r.grade === 'A' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>GRADE {r.grade}</span>
                     <ChevronRight size={14} className="text-gray-300 group-hover:text-blue-600" />
                  </div>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed italic">"{r.remarks}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderStudentDashboard = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-800 p-10 rounded-[2.5rem] text-white relative overflow-hidden shadow-2xl">
        <div className="relative z-10">
          <div className="flex items-center space-x-3 mb-6">
             <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-xl">
                <GraduationCap size={28} />
             </div>
             <div>
               <span className="text-[10px] font-black tracking-widest uppercase opacity-70 block">Student Identity</span>
               <span className="text-xs font-bold text-yellow-300">JSS 3A • STU-2024-001</span>
             </div>
          </div>
          <h2 className="text-5xl font-black tracking-tight leading-tight">Focus on Today, <br/> {user.name.split(' ')[0]}!</h2>
          <p className="opacity-90 mt-4 max-w-lg text-lg font-medium">Your first lesson is <span className="underline decoration-yellow-400 decoration-2 underline-offset-4">Mathematics</span> with Mr. Adewale at 08:30 AM.</p>
          <div className="flex flex-wrap gap-4 mt-10">
            <button 
              onClick={() => showToast("Compiling your latest grade report...", "info")}
              className="bg-white text-blue-700 px-10 py-4 rounded-full font-black shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 active:scale-95"
            >
              My Report Card
            </button>
            <Link to="/" className="bg-white/10 border border-white/20 backdrop-blur-md text-white px-10 py-4 rounded-full font-bold hover:bg-white/20 transition-all flex items-center space-x-2">
              <Globe size={20} />
              <span>Public Website</span>
            </Link>
          </div>
        </div>
        <div className="absolute top-0 right-0 h-full w-1/2 bg-white/5 skew-x-[-20deg] translate-x-32"></div>
        <div className="absolute bottom-0 right-0 p-12 opacity-10">
           <BookOpen size={240} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link to="/" className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center hover:bg-blue-50 transition-all group hover:-translate-y-1">
              <div className="bg-blue-100 p-4 rounded-2xl text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all mb-4 shadow-sm">
                <Home size={28} />
              </div>
              <span className="text-[10px] font-black text-gray-900 uppercase tracking-widest">Main Site</span>
            </Link>
            <Link to="/academics" className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center hover:bg-indigo-50 transition-all group hover:-translate-y-1">
              <div className="bg-indigo-100 p-4 rounded-2xl text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all mb-4 shadow-sm">
                <BookOpen size={28} />
              </div>
              <span className="text-[10px] font-black text-gray-900 uppercase tracking-widest">E-Library</span>
            </Link>
            <button onClick={() => showToast("Accessing school settings...", "info")} className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center hover:bg-emerald-50 transition-all group hover:-translate-y-1">
              <div className="bg-emerald-100 p-4 rounded-2xl text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all mb-4 shadow-sm">
                <Settings size={28} />
              </div>
              <span className="text-[10px] font-black text-gray-900 uppercase tracking-widest">Account</span>
            </button>
            <button onClick={onLogout} className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center hover:bg-red-50 transition-all group hover:-translate-y-1">
              <div className="bg-red-100 p-4 rounded-2xl text-red-600 group-hover:bg-red-600 group-hover:text-white transition-all mb-4 shadow-sm">
                <LogOut size={28} />
              </div>
              <span className="text-[10px] font-black text-gray-900 uppercase tracking-widest">Log Out</span>
            </button>
          </div>

          <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-8 border-b border-gray-100 flex items-center justify-between bg-gray-50/30">
              <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight">Academic Progress</h3>
              <button 
                onClick={() => showToast("Downloading your 2nd term report card...", "info")}
                className="text-[10px] font-black text-blue-600 flex items-center space-x-2 hover:bg-blue-600 hover:text-white px-5 py-2.5 rounded-full border-2 border-blue-100 transition-all uppercase tracking-widest"
              >
                <Printer size={14} />
                <span>Export PDF</span>
              </button>
            </div>
            <table className="w-full">
              <thead className="bg-gray-50/50">
                <tr>
                  <th className="px-8 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Subject</th>
                  <th className="px-8 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Assessment</th>
                  <th className="px-8 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {MOCK_RESULTS.map((res, i) => (
                  <tr key={i} className="hover:bg-blue-50/30 transition-colors cursor-pointer group" onClick={() => showToast(`Detailed Feedback: ${res.remarks}`, "info")}>
                    <td className="px-8 py-6 font-bold text-gray-900 group-hover:text-blue-700 transition-colors flex items-center space-x-3">
                       <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                       <span>{res.subject}</span>
                    </td>
                    <td className="px-8 py-6 text-gray-700 font-medium">
                       <span className="text-lg font-black text-gray-900">{res.score}</span><span className="text-xs text-gray-400">/100</span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center space-x-2">
                        <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black tracking-widest uppercase border ${
                          res.grade === 'A' ? 'bg-green-50 text-green-700 border-green-100' : 
                          res.grade === 'B' ? 'bg-blue-50 text-blue-700 border-blue-100' : 'bg-orange-50 text-orange-700 border-orange-100'
                        }`}>
                          {res.grade}
                        </span>
                        <ChevronRight size={14} className="text-gray-200 group-hover:text-blue-600 transition-colors" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 h-fit sticky top-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight">School Day</h3>
            <div className="bg-blue-50 px-3 py-1 rounded-full text-[10px] font-black text-blue-600 uppercase">Live</div>
          </div>
          <div className="space-y-5">
            {MOCK_SCHEDULE.slice(0, 4).map((item, i) => (
              <div 
                key={i} 
                onClick={() => showToast(`Opening Virtual Classroom: ${item.subject}...`, "info")}
                className="flex items-start space-x-4 p-5 rounded-3xl border border-gray-50 bg-gray-50/30 hover:bg-white hover:border-blue-200 hover:shadow-xl transition-all cursor-pointer group transform hover:-translate-x-1"
              >
                <div className="bg-white p-4 rounded-2xl text-blue-600 shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-all shrink-0">
                  <Clock size={24} />
                </div>
                <div>
                  <p className="text-sm font-black text-gray-900 group-hover:text-blue-700 transition-colors uppercase tracking-tight">{item.subject}</p>
                  <p className="text-[10px] text-gray-400 font-bold uppercase mt-1 tracking-widest">{item.time} • Room {101 + i}</p>
                  <div className="flex items-center space-x-1 mt-2">
                     <div className="w-4 h-4 rounded-full bg-gray-200"></div>
                     <p className="text-[10px] text-gray-600 font-medium">{item.teacher}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-8 py-4 border-2 border-blue-600 text-blue-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-50 transition-colors" onClick={() => showToast("Accessing weekly timetable...", "info")}>Full Timetable</button>
        </div>
      </div>
    </div>
  );

  return (
    <Layout user={user} onLogout={onLogout}>
      <div className="max-w-7xl mx-auto pb-12">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 min-w-0">
            {user.role === UserRole.ADMIN && renderAdminDashboard()}
            {user.role === UserRole.TEACHER && renderTeacherDashboard()}
            {user.role === UserRole.PARENT && renderParentDashboard()}
            {user.role === UserRole.STUDENT && renderStudentDashboard()}
          </div>

          <div className="w-full lg:w-80 shrink-0">
            <div className="bg-white rounded-[3rem] shadow-2xl border border-gray-100 flex flex-col h-[700px] sticky top-8 overflow-hidden">
              <div className="p-7 bg-blue-600 text-white flex items-center justify-between shrink-0">
                <div className="flex items-center space-x-4">
                  <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-2xl shadow-inner">
                    <MessageCircle size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-black text-sm uppercase tracking-widest leading-none mb-1">LQS Assistant</h3>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-sm shadow-green-400"></div>
                      <span className="text-[9px] font-black uppercase opacity-80 tracking-widest">Portal AI Online</span>
                    </div>
                  </div>
                </div>
                <button className="p-2 hover:bg-white/10 rounded-xl transition-colors" onClick={() => setChatHistory([])}>
                   <Trash2 size={16} className="opacity-60" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50/50 scrollbar-hide">
                {chatHistory.length === 0 && (
                  <div className="text-center py-20 px-6">
                    <div className="w-24 h-24 bg-white text-blue-600 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-xl border border-gray-50">
                      <GraduationCap size={48} className="transform -rotate-12" />
                    </div>
                    <h4 className="font-black text-gray-900 text-xl tracking-tight mb-3">Welcome to Portal!</h4>
                    <p className="text-sm text-gray-500 font-medium leading-relaxed px-4">I'm your AI guide for Lifequiver Schools. Ask me about your grades, schedule, or school policies.</p>
                  </div>
                )}
                {chatHistory.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 duration-300`}>
                    <div className={`max-w-[90%] p-5 rounded-[2rem] text-sm leading-relaxed shadow-sm ${
                      msg.role === 'user' 
                      ? 'bg-blue-600 text-white rounded-tr-none shadow-blue-200' 
                      : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none font-medium'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                {isAiLoading && (
                  <div className="flex justify-start">
                    <div className="bg-white p-5 rounded-[2rem] rounded-tl-none border border-gray-100 shadow-sm flex space-x-2.5 items-center">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:-.3s]"></div>
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:-.5s]"></div>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-6 bg-white border-t border-gray-100 shrink-0 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.05)]">
                <form onSubmit={handleAiChat} className="relative">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Type your message..."
                    className="w-full pl-6 pr-16 py-5 bg-gray-50 border border-gray-200 rounded-[2rem] text-sm font-semibold focus:ring-4 focus:ring-blue-100 focus:outline-none focus:bg-white focus:border-blue-400 transition-all shadow-inner"
                  />
                  <button 
                    type="submit"
                    className="absolute right-2.5 top-2.5 p-3.5 bg-blue-600 text-white rounded-[1.5rem] hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-200 active:scale-95 flex items-center justify-center transform group"
                  >
                    <Send size={20} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Universal Feedback System */}
      {toast && <Toast message={toast.message} type={toast.type} onHide={() => setToast(null)} />}
    </Layout>
  );
};

export default Dashboard;
