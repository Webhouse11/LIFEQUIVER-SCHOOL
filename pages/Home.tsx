
import React from 'react';
import PublicLayout from '../components/PublicLayout';
import BenefitSlider from '../components/BenefitSlider';
import { Link } from 'react-router-dom';
import { Shield, Target, Users, Award, ArrowRight, Play } from 'lucide-react';

const FeatureCard: React.FC<{ icon: React.ReactNode, title: string, text: string }> = ({ icon, title, text }) => (
  <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-gray-100 group">
    <div className="bg-blue-50 text-blue-600 p-4 rounded-xl inline-block mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
    <p className="text-gray-600 text-sm leading-relaxed">{text}</p>
  </div>
);

const Home: React.FC = () => {
  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gray-50 pt-20 pb-32">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600 rounded-bl-[100px] hidden lg:block opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10 flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 text-center lg:text-left">
            <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
              Welcome to Excellence
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-gray-900 leading-[1.1] mb-6">
              Building a Foundation for <span className="text-blue-600">Global Leaders</span>
            </h1>
            <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto lg:mx-0">
              Lifequiver Schools provides a nurturing environment where Primary and Secondary students excel academically, morally, and socially.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link to="/admissions" className="bg-blue-600 text-white px-8 py-4 rounded-full font-bold flex items-center space-x-2 hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl">
                <span>Enroll Today</span>
                <ArrowRight size={18} />
              </Link>
              <button className="flex items-center space-x-3 text-gray-700 font-bold hover:text-blue-600 transition-colors">
                <div className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center bg-white shadow-sm">
                  <Play size={16} className="fill-blue-600 text-blue-600" />
                </div>
                <span>Watch School Tour</span>
              </button>
            </div>
          </div>
          <div className="flex-1 relative">
            <div className="relative z-10 rounded-[40px] overflow-hidden shadow-2xl">
              <img src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1000" alt="Students" className="w-full h-auto" />
            </div>
            <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-2xl shadow-xl z-20 hidden md:block border border-gray-100">
              <div className="flex items-center space-x-4">
                <div className="bg-green-100 p-3 rounded-full text-green-600">
                  <Award size={24} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">100%</p>
                  <p className="text-xs text-gray-500 font-medium">Exam Pass Rate</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modern Benefit Slider Section */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 pt-24 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">Experience World-Class Education</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">Discover why Lifequiver Schools is the preferred choice for forward-thinking families in Ile-Ife.</p>
        </div>
        <BenefitSlider />
      </section>

      {/* Stats Section */}
      <section className="bg-white py-16 border-t border-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <h4 className="text-4xl font-bold text-blue-600 mb-2">1200+</h4>
              <p className="text-gray-500 text-sm uppercase tracking-wider font-bold">Students</p>
            </div>
            <div className="text-center">
              <h4 className="text-4xl font-bold text-blue-600 mb-2">85+</h4>
              <p className="text-gray-500 text-sm uppercase tracking-wider font-bold">Teachers</p>
            </div>
            <div className="text-center">
              <h4 className="text-4xl font-bold text-blue-600 mb-2">24</h4>
              <p className="text-gray-500 text-sm uppercase tracking-wider font-bold">Classrooms</p>
            </div>
            <div className="text-center">
              <h4 className="text-4xl font-bold text-blue-600 mb-2">15+</h4>
              <p className="text-gray-500 text-sm uppercase tracking-wider font-bold">Awards</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6">Why Lifequiver Schools?</h2>
            <p className="text-gray-600">We offer a holistic educational experience that combines traditional academic rigor with modern technological and creative skills.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Shield size={28} />} 
              title="Secure Environment" 
              text="Our campus is fully gated with 24/7 security and digital attendance tracking for every student." 
            />
            <FeatureCard 
              icon={<Target size={28} />} 
              title="Academic Excellence" 
              text="Customized curriculum that bridges Nigerian standards with international educational benchmarks." 
            />
            <FeatureCard 
              icon={<Users size={28} />} 
              title="Expert Educators" 
              text="Our staff undergo continuous training to deliver student-centered learning and moral mentorship." 
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-blue-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
        </div>
        <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-black mb-8">Give Your Child the Competitive Edge They Deserve.</h2>
          <p className="text-xl mb-12 opacity-90">Admissions for the 2024/2025 academic session are now open. Visit us in Ile-Ife today!</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/admissions" className="bg-white text-blue-600 px-10 py-4 rounded-full font-bold hover:bg-blue-50 transition-all shadow-xl">Apply Online</Link>
            <Link to="/contact" className="bg-transparent border-2 border-white px-10 py-4 rounded-full font-bold hover:bg-white hover:text-blue-600 transition-all">Visit Campus</Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default Home;
