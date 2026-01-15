
import React, { useState } from 'react';
import { UserRole } from '../types';
import { BookOpen, ShieldCheck, GraduationCap, UserCircle, Users, AlertCircle, Key, ChevronDown, ChevronUp, Phone, Mail } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Link } from 'react-router-dom';

const Login: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<UserRole>(UserRole.STUDENT);
  const [identifier, setIdentifier] = useState(''); // Email or Phone
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showDemo, setShowDemo] = useState(true);

  const demoAccounts = [
    { role: UserRole.ADMIN, email: 'admin@lifequiver.edu.ng', phone: '08001111111', label: 'School Admin' },
    { role: UserRole.TEACHER, email: 'teacher@lifequiver.edu.ng', phone: '08002222222', label: 'Grade Teacher' },
    { role: UserRole.STUDENT, email: 'student@lifequiver.edu.ng', phone: '08003333333', label: 'Portal Student' },
    { role: UserRole.PARENT, email: 'parent@lifequiver.edu.ng', phone: '08004444444', label: 'Student Parent' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    // Check if it's a demo account (matches email or phone)
    const demoMatch = demoAccounts.find(acc => (acc.email === identifier || acc.phone === identifier) && password === 'password123');

    if (demoMatch) {
      // Simulate successful login for demo accounts
      setTimeout(() => {
        const demoUser = {
          id: `demo-${Date.now()}`,
          email: demoMatch.email,
          phone: demoMatch.phone,
          name: demoMatch.email.split('@')[0].toUpperCase(),
          role: demoMatch.role, // Use the role defined in the demo account
        };
        localStorage.setItem('lqs_demo_session', JSON.stringify(demoUser));
        window.location.reload(); 
      }, 800);
      return;
    }
    
    try {
      // For real Supabase auth, we typically use email. 
      // If the identifier doesn't look like an email, it might be a phone number.
      const isEmail = identifier.includes('@');
      
      let authResponse;
      if (isEmail) {
        authResponse = await supabase.auth.signInWithPassword({
          email: identifier,
          password,
        });
      } else {
        // Supabase phone login usually requires phone + password or OTP.
        // Assuming standard phone/password login for this implementation.
        authResponse = await supabase.auth.signInWithPassword({
          phone: identifier,
          password,
        });
      }

      if (authResponse.error) throw authResponse.error;
    } catch (err: any) {
      setError(err.message || 'Invalid login credentials. Please check your email/phone and password.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoFill = (acc: typeof demoAccounts[0]) => {
    setSelectedRole(acc.role);
    setIdentifier(acc.email); // Default to email for the fill, but both work
    setPassword('password123');
    setError(null);
  };

  const roles = [
    { type: UserRole.STUDENT, icon: <GraduationCap size={20} />, label: 'Student' },
    { type: UserRole.TEACHER, icon: <Users size={20} />, label: 'Teacher' },
    { type: UserRole.PARENT, icon: <UserCircle size={20} />, label: 'Parent' },
    { type: UserRole.ADMIN, icon: <ShieldCheck size={20} />, label: 'Admin' },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-800 px-4 py-12">
      <Link to="/" className="mb-8 text-white flex items-center space-x-2 hover:opacity-80 transition-opacity bg-white/10 px-6 py-2 rounded-full border border-white/20 backdrop-blur-sm">
        <BookOpen size={20} />
        <span className="font-bold tracking-tight">Return to Public Home</span>
      </Link>

      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl overflow-hidden mb-6">
        <div className="p-8">
          <div className="flex flex-col items-center mb-8">
            <div className="bg-blue-100 p-4 rounded-full mb-4">
              <BookOpen className="text-blue-600" size={40} />
            </div>
            <h2 className="text-3xl font-black text-gray-900">Lifequiver</h2>
            <p className="text-gray-500 font-medium">Portal Access</p>
          </div>

          <div className="mb-8">
            <div className="grid grid-cols-2 gap-3">
              {roles.map((r) => (
                <button
                  key={r.type}
                  onClick={() => setSelectedRole(r.type)}
                  className={`flex items-center justify-center space-x-2 p-3 rounded-xl border-2 transition-all duration-200 ${
                    selectedRole === r.type 
                      ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-sm' 
                      : 'border-gray-50 hover:border-gray-200 text-gray-400'
                  }`}
                >
                  {r.icon}
                  <span className="font-bold text-xs">{r.label}</span>
                </button>
              ))}
            </div>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 flex items-center space-x-3 rounded-r-lg">
              <AlertCircle size={20} className="shrink-0" />
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Email or Phone Number</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="e.g. name@mail.com or 080..."
                  className="w-full pl-4 pr-10 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300">
                  {/* Fixed: Added missing 'Mail' icon to lucide-react imports */}
                  {identifier.includes('@') ? <Mail size={18} /> : <Phone size={18} />}
                </div>
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all"
              />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center disabled:opacity-70"
            >
              {loading ? (
                <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                `Enter ${selectedRole} Portal`
              )}
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-md w-full bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden shadow-xl">
        <button 
          onClick={() => setShowDemo(!showDemo)}
          className="w-full p-4 flex items-center justify-between text-white font-bold text-xs hover:bg-white/5 transition-colors"
        >
          <div className="flex items-center space-x-2">
            <Key size={16} className="text-yellow-400" />
            <span>QUICK DEMO ACCESS (Email or Phone)</span>
          </div>
          {showDemo ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        
        {showDemo && (
          <div className="p-4 border-t border-white/10 bg-white/5 grid grid-cols-1 gap-2">
            {demoAccounts.map((account) => (
              <div 
                key={account.role}
                className="flex items-center justify-between p-3 rounded-xl bg-white/10 border border-white/5 text-white"
              >
                <div className="flex flex-col">
                  <span className="text-[10px] font-black uppercase tracking-tighter opacity-60">{account.role}</span>
                  <div className="flex items-center space-x-2 mt-0.5">
                    <span className="text-xs font-bold">{account.email}</span>
                    <span className="text-[10px] opacity-40">|</span>
                    <span className="text-xs font-bold">{account.phone}</span>
                  </div>
                </div>
                <button 
                  onClick={() => handleDemoFill(account)}
                  className="bg-white/20 hover:bg-white hover:text-blue-700 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all"
                >
                  Fill
                </button>
              </div>
            ))}
            <div className="text-center pt-2">
              <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Password: <span className="text-white">password123</span></p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
