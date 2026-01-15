
import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  GraduationCap, 
  Trophy, 
  ShieldCheck, 
  Cpu, 
  Users, 
  Heart, 
  CheckCircle2 
} from 'lucide-react';

const benefits = [
  {
    title: "Quality Education",
    subtitle: "Empowering Young Minds",
    description: "Our experienced educators deliver a dual-standard curriculum that bridges Nigerian excellence with international benchmarks.",
    icon: <GraduationCap size={48} />,
    color: "from-blue-600 to-indigo-700",
    bg: "bg-blue-50"
  },
  {
    title: "Holistic Development",
    subtitle: "Beyond the Classroom",
    description: "We nurture talents in sports, music, and the arts, ensuring every student discovers their unique voice and creative potential.",
    icon: <Trophy size={48} />,
    color: "from-emerald-500 to-teal-600",
    bg: "bg-emerald-50"
  },
  {
    title: "Safe & Secure",
    subtitle: "Your Child's Second Home",
    description: "24/7 CCTV surveillance, strictly gated campus, and a highly trained security team provide total peace of mind for parents.",
    icon: <ShieldCheck size={48} />,
    color: "from-orange-500 to-red-600",
    bg: "bg-orange-50"
  },
  {
    title: "Technology-Driven",
    subtitle: "Future-Ready Learning",
    description: "From coding labs to smart classrooms, our students master the digital tools required for the 21st-century global economy.",
    icon: <Cpu size={48} />,
    color: "from-purple-600 to-pink-600",
    bg: "bg-purple-50"
  },
  {
    title: "Parent Engagement",
    subtitle: "Transparent Partnership",
    description: "Stay connected through our digital portal with real-time updates on attendance, grades, and school announcements.",
    icon: <Users size={48} />,
    color: "from-cyan-500 to-blue-500",
    bg: "bg-cyan-50"
  },
  {
    title: "Inclusive Culture",
    subtitle: "Values that Matter",
    description: "We promote teamwork, leadership, and moral integrity, building a supportive community where every child belongs.",
    icon: <Heart size={48} />,
    color: "from-pink-500 to-rose-500",
    bg: "bg-pink-50"
  },
  {
    title: "Proven Results",
    subtitle: "A Legacy of Success",
    description: "Our alumni consistently secure admissions into top universities, backed by our 100% exam pass rate record.",
    icon: <CheckCircle2 size={48} />,
    color: "from-amber-500 to-yellow-600",
    bg: "bg-amber-50"
  }
];

const BenefitSlider: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const next = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrent((prev) => (prev + 1) % benefits.length);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const prev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrent((prev) => (prev - 1 + benefits.length) % benefits.length);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 py-16">
      <div className="relative overflow-hidden rounded-[3rem] bg-white shadow-2xl border border-gray-100 min-h-[500px] flex items-center">
        {/* Navigation Buttons */}
        <button 
          onClick={prev}
          className="absolute left-6 z-30 p-3 rounded-full bg-white/80 backdrop-blur-sm border border-gray-100 text-gray-800 hover:bg-blue-600 hover:text-white transition-all shadow-lg hidden md:block"
        >
          <ChevronLeft size={24} />
        </button>
        <button 
          onClick={next}
          className="absolute right-6 z-30 p-3 rounded-full bg-white/80 backdrop-blur-sm border border-gray-100 text-gray-800 hover:bg-blue-600 hover:text-white transition-all shadow-lg hidden md:block"
        >
          <ChevronRight size={24} />
        </button>

        {/* Content Slides */}
        <div className="w-full h-full flex items-center">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className={`absolute inset-0 w-full h-full flex flex-col lg:flex-row items-center transition-all duration-700 ease-in-out px-12 py-16 lg:px-24 ${
                index === current 
                ? 'opacity-100 translate-x-0 scale-100' 
                : 'opacity-0 translate-x-20 scale-95 pointer-events-none'
              }`}
            >
              <div className="flex-1 text-center lg:text-left space-y-6">
                <div className={`inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-gradient-to-r ${benefit.color} text-white text-xs font-black uppercase tracking-widest shadow-md mb-2`}>
                  <span>The Lifequiver Advantage</span>
                </div>
                <h2 className="text-4xl lg:text-6xl font-black text-gray-900 leading-tight">
                  {benefit.title}
                </h2>
                <p className={`text-xl font-bold bg-gradient-to-r ${benefit.color} bg-clip-text text-transparent`}>
                  {benefit.subtitle}
                </p>
                <p className="text-lg text-gray-600 max-w-xl leading-relaxed">
                  {benefit.description}
                </p>
                <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <button className={`px-8 py-4 rounded-full bg-gradient-to-r ${benefit.color} text-white font-bold shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1`}>
                    Learn More
                  </button>
                  <button className="px-8 py-4 rounded-full border-2 border-gray-100 text-gray-600 font-bold hover:bg-gray-50 transition-all">
                    Virtual Tour
                  </button>
                </div>
              </div>

              <div className="flex-1 mt-12 lg:mt-0 flex justify-center items-center">
                <div className={`relative w-64 h-64 lg:w-96 lg:h-96 rounded-full ${benefit.bg} flex items-center justify-center animate-pulse`}>
                  <div className={`absolute inset-4 rounded-full border-4 border-dashed border-opacity-30 border-current transition-colors duration-700 ${benefit.color.split(' ')[0].replace('from-', 'text-')}`}></div>
                  <div className={`p-10 rounded-[2.5rem] bg-white shadow-2xl text-transparent bg-clip-text bg-gradient-to-br ${benefit.color} transform rotate-3 transition-transform duration-700 group-hover:rotate-0`}>
                    {benefit.icon}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Progress Indicators */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex space-x-3 z-30">
          {benefits.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-2 transition-all duration-300 rounded-full ${
                i === current ? 'w-10 bg-blue-600 shadow-md' : 'w-2 bg-gray-200 hover:bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BenefitSlider;
