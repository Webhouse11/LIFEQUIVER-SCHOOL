
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, BookOpen, Phone, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';

const PublicLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Admissions', path: '/admissions' },
    { name: 'Academics', path: '/academics' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Bar */}
      <div className="bg-blue-900 text-white py-2 px-4 text-sm hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex space-x-4">
            <span className="flex items-center space-x-1"><Phone size={14} /> <span>+234 800 123 4567</span></span>
            <span className="flex items-center space-x-1"><MapPin size={14} /> <span>Ile-Ife, Osun State</span></span>
          </div>
          <div className="flex space-x-4">
            <Facebook size={14} className="cursor-pointer hover:text-blue-300 transition-colors" />
            <Twitter size={14} className="cursor-pointer hover:text-blue-300 transition-colors" />
            <Instagram size={14} className="cursor-pointer hover:text-blue-300 transition-colors" />
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white sticky top-0 z-50 shadow-sm border-b border-gray-100">
        <nav className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-blue-600 p-2 rounded-lg text-white">
              <BookOpen size={24} />
            </div>
            <div>
              <span className="text-xl font-bold text-blue-900 block">LIFEQUIVER</span>
              <span className="text-[10px] tracking-widest text-blue-600 font-bold uppercase -mt-1">Schools</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-semibold transition-colors ${
                  location.pathname === link.path ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/login"
              className="bg-blue-600 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-blue-700 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Portal Login
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="lg:hidden p-2 text-gray-600" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 py-4 px-4 space-y-4 shadow-xl">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="block text-gray-700 font-semibold py-2 hover:text-blue-600"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/login"
              className="block bg-blue-600 text-white text-center py-3 rounded-lg font-bold"
              onClick={() => setIsMenuOpen(false)}
            >
              Portal Login
            </Link>
          </div>
        )}
      </header>

      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center space-x-2 text-white mb-6">
              <BookOpen size={24} className="text-blue-500" />
              <span className="text-xl font-bold">LIFEQUIVER</span>
            </div>
            <p className="text-sm leading-relaxed">
              Empowering the next generation with quality education, moral excellence, and a solid academic foundation. Located in the heart of Ile-Ife.
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/about" className="hover:text-blue-400">Our History</Link></li>
              <li><Link to="/academics" className="hover:text-blue-400">Curriculum</Link></li>
              <li><Link to="/admissions" className="hover:text-blue-400">Apply Now</Link></li>
              <li><Link to="/contact" className="hover:text-blue-400">Support Center</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Departments</h4>
            <ul className="space-y-3 text-sm">
              <li><span className="hover:text-blue-400 cursor-pointer">Primary School</span></li>
              <li><span className="hover:text-blue-400 cursor-pointer">Secondary School</span></li>
              <li><span className="hover:text-blue-400 cursor-pointer">Science & Tech</span></li>
              <li><span className="hover:text-blue-400 cursor-pointer">Arts & Humanities</span></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Newsletter</h4>
            <p className="text-sm mb-4">Stay updated with our latest events and announcements.</p>
            <div className="flex">
              <input type="email" placeholder="Email" className="bg-gray-800 border-none rounded-l-lg px-4 py-2 w-full focus:ring-1 focus:ring-blue-500 outline-none" />
              <button className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700">Go</button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 border-t border-gray-800 mt-16 pt-8 text-center text-xs">
          <p>© {new Date().getFullYear()} Lifequiver Schools, Ile-Ife. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;
