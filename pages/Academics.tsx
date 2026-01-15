
import React from 'react';
import PublicLayout from '../components/PublicLayout';
import { Book, Microscope, Laptop, Music } from 'lucide-react';

const Academics: React.FC = () => {
  return (
    <PublicLayout>
      <div className="bg-blue-600 py-20 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-black mb-4">Academic Excellence</h1>
          <p className="text-xl opacity-90">A curriculum designed for the 21st-century learner.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <div className="bg-white p-10 rounded-[40px] shadow-sm border border-gray-100">
            <h2 className="text-2xl font-black text-blue-900 mb-6">Primary School Curriculum</h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Our primary section focuses on building a solid foundation in literacy and numeracy, while encouraging curiosity through inquiry-based learning.
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {['English Language', 'Mathematics', 'Basic Science', 'Social Studies', 'ICT Literacy', 'Cultural Arts'].map((sub) => (
                <li key={sub} className="flex items-center space-x-2 text-sm text-gray-700 font-medium">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>{sub}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white p-10 rounded-[40px] shadow-sm border border-gray-100">
            <h2 className="text-2xl font-black text-blue-900 mb-6">Secondary School Curriculum</h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              At the secondary level, we offer a diverse range of subjects across Sciences, Arts, and Commercial streams to prepare students for higher education.
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {['Physics & Chemistry', 'Literature in English', 'Accounting', 'Further Mathematics', 'Technical Drawing', 'Government'].map((sub) => (
                <li key={sub} className="flex items-center space-x-2 text-sm text-gray-700 font-medium">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                  <span>{sub}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="text-center mb-16">
          <h2 className="text-3xl font-black text-gray-900 mb-4">Specialized Departments</h2>
          <p className="text-gray-500">Going beyond textbooks to develop practical skills.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: <Book />, title: 'Languages', desc: 'English, Yoruba, and French immersion programs.' },
            { icon: <Microscope />, title: 'STEM', desc: 'Hands-on laboratory experience and scientific research.' },
            { icon: <Laptop />, title: 'Digital Tech', desc: 'Coding, robotics, and advanced ICT workshops.' },
            { icon: <Music />, title: 'Creative Arts', desc: 'Music, drama, and fine arts for holistic growth.' },
          ].map((item, i) => (
            <div key={i} className="text-center p-6 hover:translate-y-[-5px] transition-all">
              <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center text-blue-600 mx-auto mb-6">
                {item.icon}
              </div>
              <h4 className="font-bold text-gray-900 mb-2">{item.title}</h4>
              <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </PublicLayout>
  );
};

export default Academics;
