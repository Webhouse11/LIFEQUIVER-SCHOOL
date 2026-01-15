
import React from 'react';
import PublicLayout from '../components/PublicLayout';
import { Target, Eye, History, Award } from 'lucide-react';

const About: React.FC = () => {
  return (
    <PublicLayout>
      <div className="bg-blue-600 py-20 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-black mb-4">Our Story & Mission</h1>
          <p className="text-xl opacity-90">Nurturing excellence in Ile-Ife since inception.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <div>
            <h2 className="text-3xl font-black text-gray-900 mb-6">A Heritage of Excellence</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Lifequiver Schools was founded with a singular vision: to provide a world-class educational experience that remains deeply rooted in our local values and culture. Located in the historic city of Ile-Ife, we have grown from a small primary school into a comprehensive educational institution serving both primary and secondary levels.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Our approach combines rigorous academic standards with a focus on character development, ensuring that our students are prepared not just for exams, but for life in a globalized world.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=600" alt="Classroom" className="rounded-2xl shadow-lg" />
            <img src="https://images.unsplash.com/photo-1577896851231-70ef1460370e?auto=format&fit=crop&q=80&w=600" alt="Students" className="rounded-2xl shadow-lg mt-8" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center text-blue-600 mx-auto mb-6">
              <Target size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Our Mission</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              To provide a safe and stimulating environment where students can achieve their full potential through quality teaching and diverse opportunities.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center text-blue-600 mx-auto mb-6">
              <Eye size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Our Vision</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              To be the leading educational institution in Nigeria, recognized for producing innovative leaders and upright citizens.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center text-blue-600 mx-auto mb-6">
              <History size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Our History</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Established over a decade ago, we have consistently maintained 100% pass rates in national examinations while expanding our modern facilities.
            </p>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};

export default About;
