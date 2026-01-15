
import React from 'react';
import PublicLayout from '../components/PublicLayout';

const Gallery: React.FC = () => {
  const images = [
    { url: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80&w=800', title: 'Library' },
    { url: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80&w=800', title: 'Graduation' },
    { url: 'https://images.unsplash.com/photo-1511629091441-ee46146481b6?auto=format&fit=crop&q=80&w=800', title: 'Science Lab' },
    { url: 'https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&q=80&w=800', title: 'Classroom' },
    { url: 'https://images.unsplash.com/photo-1524069290683-0457abfe42c3?auto=format&fit=crop&q=80&w=800', title: 'Playground' },
    { url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=800', title: 'Learning' },
    { url: 'https://images.unsplash.com/photo-1594608661623-aa0bd3a69d98?auto=format&fit=crop&q=80&w=800', title: 'Sports' },
    { url: 'https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&q=80&w=800', title: 'Discussion' },
  ];

  return (
    <PublicLayout>
      <div className="bg-blue-600 py-20 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-black mb-4">School Gallery</h1>
          <p className="text-xl opacity-90">Capturing moments of learning and joy at Lifequiver.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {images.map((img, i) => (
            <div key={i} className="group relative overflow-hidden rounded-2xl shadow-sm aspect-square">
              <img 
                src={img.url} 
                alt={img.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white font-bold tracking-wider uppercase text-sm">{img.title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PublicLayout>
  );
};

export default Gallery;
