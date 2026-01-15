
import React from 'react';
import PublicLayout from '../components/PublicLayout';
import { ClipboardList, UserPlus, CheckCircle, HelpCircle } from 'lucide-react';

const Admissions: React.FC = () => {
  return (
    <PublicLayout>
      <div className="bg-blue-600 py-20 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-black mb-4">Admissions & Enrollment</h1>
          <p className="text-xl opacity-90">Start your child's journey to excellence with Lifequiver Schools.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 space-y-12">
            <section>
              <h2 className="text-2xl font-black text-gray-900 mb-8 flex items-center space-x-3">
                <div className="bg-blue-100 p-2 rounded-lg text-blue-600"><ClipboardList size={24} /></div>
                <span>The Application Process</span>
              </h2>
              <div className="space-y-6">
                {[
                  { step: '01', title: 'Pick up Enrollment Form', desc: 'Forms are available at the school admin block or can be downloaded from this page.' },
                  { step: '02', title: 'Schedule Entrance Interview', desc: 'All prospective students undergo a basic competency assessment and parental interview.' },
                  { step: '03', title: 'Submit Documentation', desc: 'Required: Birth certificate, previous school results, and medical records.' },
                  { step: '04', title: 'Letter of Acceptance', desc: 'Successful applicants receive an offer letter within 48 hours of assessment.' },
                ].map((item, i) => (
                  <div key={i} className="flex space-x-6 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm group hover:border-blue-200 transition-colors">
                    <span className="text-3xl font-black text-blue-100 group-hover:text-blue-200 transition-colors shrink-0">{item.step}</span>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">{item.title}</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-gray-50 p-8 rounded-3xl">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
                <UserPlus size={20} className="text-blue-600" />
                <span>Express Interest Form</span>
              </h3>
              <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Guardian Name</label>
                  <input type="text" placeholder="Full Name" className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Email Address</label>
                  <input type="email" placeholder="example@mail.com" className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Child's Prospective Class</label>
                  <select className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                    <option>Select Level</option>
                    <option>Nursery/Primary</option>
                    <option>Junior Secondary (JSS)</option>
                    <option>Senior Secondary (SSS)</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Phone Number</label>
                  <input type="tel" placeholder="+234..." className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="md:col-span-2">
                  <button type="button" className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition-all shadow-lg">Submit Inquiry</button>
                </div>
              </form>
            </section>
          </div>

          <div className="space-y-8">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
              <h4 className="font-bold text-gray-900 mb-4">Why Choose Us?</h4>
              <ul className="space-y-4">
                {['Small Class Sizes (Max 25)', 'CCTV Monitored Campus', 'Modern Science Labs', 'E-Learning Facilities'].map((text, i) => (
                  <li key={i} className="flex items-center space-x-3 text-sm text-gray-600">
                    <CheckCircle size={16} className="text-green-500 shrink-0" />
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100">
              <HelpCircle className="text-blue-600 mb-4" size={32} />
              <h4 className="font-bold text-blue-900 mb-2">Need Help?</h4>
              <p className="text-sm text-blue-700 mb-4 leading-relaxed">Our admissions officers are available Mon-Fri, 8AM to 4PM to answer your questions.</p>
              <p className="font-black text-blue-900">+234 800 123 4567</p>
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};

export default Admissions;
