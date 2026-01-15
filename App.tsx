
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Admissions from './pages/Admissions';
import Academics from './pages/Academics';
import Contact from './pages/Contact';
import Gallery from './pages/Gallery';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { User, UserRole } from './types';
import { supabase, getUserProfile } from './lib/supabase';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const syncUser = async (userId: string, email: string) => {
    const profile = await getUserProfile(userId);
    if (profile) {
      setUser({
        id: userId,
        email: email,
        phone: profile.phone_number,
        name: profile.full_name || 'User',
        role: profile.role as UserRole,
        avatar: profile.avatar_url
      });
    } else {
      // Fallback for demo users based on email
      const demoRoles: Record<string, UserRole> = {
        'admin@lifequiver.edu.ng': UserRole.ADMIN,
        'teacher@lifequiver.edu.ng': UserRole.TEACHER,
        'student@lifequiver.edu.ng': UserRole.STUDENT,
        'parent@lifequiver.edu.ng': UserRole.PARENT,
      };

      const demoPhones: Record<string, string> = {
        'admin@lifequiver.edu.ng': '08001111111',
        'teacher@lifequiver.edu.ng': '08002222222',
        'student@lifequiver.edu.ng': '08003333333',
        'parent@lifequiver.edu.ng': '08004444444',
      };
      
      setUser({
        id: userId,
        email: email,
        phone: demoPhones[email],
        name: email.split('@')[0].toUpperCase(),
        role: demoRoles[email] || UserRole.STUDENT,
      });
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      // 1. Check for Demo Session first
      const demoSession = localStorage.getItem('lqs_demo_session');
      if (demoSession) {
        const demoData = JSON.parse(demoSession);
        setUser(demoData);
        setLoading(false);
        return;
      }

      // 2. Check Supabase session
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        await syncUser(session.user.id, session.user.email || '');
      }
      setLoading(false);
    };

    initAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        await syncUser(session.user.id, session.user.email || '');
      } else if (!localStorage.getItem('lqs_demo_session')) {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem('lqs_demo_session');
    setUser(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-50">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="text-blue-600 font-bold animate-pulse">Initializing Lifequiver Portal...</p>
        </div>
      </div>
    );
  }

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/admissions" element={<Admissions />} />
        <Route path="/academics" element={<Academics />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/gallery" element={<Gallery />} />
        
        <Route 
          path="/login" 
          element={user ? <Navigate to="/dashboard" /> : <Login />} 
        />
        
        <Route 
          path="/dashboard/*" 
          element={user ? <Dashboard user={user} onLogout={handleLogout} /> : <Navigate to="/login" />} 
        />
        
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
