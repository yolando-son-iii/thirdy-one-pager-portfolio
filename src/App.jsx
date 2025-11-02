import React, { useState, useEffect, useRef } from 'react';
import { Heart, Camera, Gamepad2, Cat, Code2, Sparkles, Music } from 'lucide-react';

export default function Portfolio() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cardPosition, setCardPosition] = useState({ x: 150, y: 80 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [cardRotation, setCardRotation] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState([]);
  const trailRef = useRef([]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      if (isDragging) {
        const newX = e.clientX - dragOffset.x;
        const newY = e.clientY - dragOffset.y;
        
        setCardPosition({ x: newX, y: newY });

        // Calculate rotation based on mouse movement speed
        const rotateY = (e.movementX || 0) * 0.5;
        const rotateX = -(e.movementY || 0) * 0.5;
        
        setCardRotation({ x: rotateX, y: rotateY });

        // Smoother rotation decay
        setTimeout(() => {
          setCardRotation(prev => ({
            x: prev.x * 0.8,
            y: prev.y * 0.8
          }));
        }, 50);

        // Add particle trail
        trailRef.current.push({
          x: newX + 160,
          y: newY + 180,
          id: Date.now() + Math.random(),
          opacity: 1
        });

        if (trailRef.current.length > 15) {
          trailRef.current.shift();
        }
        setTrail([...trailRef.current]);
      } else {
        setCardRotation({ x: 0, y: 0 });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isDragging, dragOffset]);

  useEffect(() => {
    if (isDragging) {
      const interval = setInterval(() => {
        trailRef.current = trailRef.current.map(p => ({
          ...p,
          opacity: p.opacity - 0.05
        })).filter(p => p.opacity > 0);
        setTrail([...trailRef.current]);
      }, 50);
      return () => clearInterval(interval);
    }
  }, [isDragging]);

  const handleCardMouseDown = (e) => {
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - cardPosition.x,
      y: e.clientY - cardPosition.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    trailRef.current = [];
    setTrail([]);
  };

  useEffect(() => {
    window.addEventListener('mouseup', handleMouseUp);
    return () => window.removeEventListener('mouseup', handleMouseUp);
  }, []);

  const hobbies = [
    { icon: Gamepad2, text: "Honkai Star Rail & Genshin", color: "text-purple-400" },
    { icon: Gamepad2, text: "Mobile Legends", color: "text-blue-400" },
    { icon: Cat, text: "Cat Enthusiast", color: "text-pink-400" },
    { icon: Code2, text: "Web Development", color: "text-green-400" },
    { icon: Camera, text: "Photography", color: "text-yellow-400" },
    { icon: Music, text: "K-Pop & K-Drama", color: "text-red-400" }
  ];

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
          animation: 'gridMove 20s linear infinite'
        }}></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 3 + 1 + 'px',
              height: Math.random() * 3 + 1 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              background: `rgba(${i % 3 === 0 ? '139, 92, 246' : i % 3 === 1 ? '59, 130, 246' : '168, 85, 247'}, ${Math.random() * 0.5 + 0.3})`,
              animation: `floatParticle ${Math.random() * 15 + 10}s ease-in-out infinite`,
              animationDelay: Math.random() * 5 + 's'
            }}
          />
        ))}
      </div>

      {/* Gradient Blobs */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      {/* Scanline Effect */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white to-transparent h-2 animate-scanline"></div>
      </div>

      {/* Mouse Glow */}
      <div 
        className="absolute w-96 h-96 bg-purple-500/5 rounded-full blur-3xl transition-all duration-300 ease-out pointer-events-none"
        style={{
          left: mousePosition.x - 192 + 'px',
          top: mousePosition.y - 192 + 'px',
        }}
      />

      {/* Particle Trail */}
      {trail.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-2 h-2 rounded-full bg-purple-400 pointer-events-none"
          style={{
            left: particle.x + 'px',
            top: particle.y + 'px',
            opacity: particle.opacity,
            boxShadow: `0 0 10px rgba(139, 92, 246, ${particle.opacity})`,
            transition: 'opacity 0.1s'
          }}
        />
      ))}

      {/* Main Content Container */}
      <div className="relative z-10 h-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 max-w-7xl w-full">
          
          {/* Left Column - Main Info */}
          <div className="flex flex-col justify-center space-y-4 lg:space-y-6 text-center lg:text-left">
            <div className="space-y-3 lg:space-y-4">
              <div className="inline-block">
                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white tracking-tight animate-fadeInUp">
                  Hi, I'm <span className="bg-gradient-to-r from-purple-400 via-violet-400 to-blue-400 bg-clip-text text-transparent animate-gradient">Thirdy</span>
                </h1>
              </div>
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 leading-relaxed animate-fadeInUp animation-delay-200">
                Aspiring Business Analyst. I turn data into stories and chaos into strategy. 
                <span className="text-purple-400"> Slightly addicted to gacha games</span>, pistachionista, and I love building cool websites.
              </p>
            </div>

            {/* Skills Pills */}
            <div className="flex flex-wrap gap-2 lg:gap-3 pt-2 lg:pt-4 animate-fadeInUp animation-delay-400 justify-center lg:justify-start">
              {['Project Management', 'Business Analytics', 'Web Development', 'Problem Solving'].map((skill, idx) => (
                <span 
                  key={skill} 
                  className="px-3 py-1.5 lg:px-4 lg:py-2 bg-white/5 border border-purple-500/30 rounded-full text-xs lg:text-sm text-gray-300 hover:bg-purple-500/20 hover:border-purple-400/50 hover:scale-105 transition-all duration-300 cursor-default"
                  style={{ animationDelay: `${600 + idx * 100}ms` }}
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* About Section */}
            <div className="pt-4 lg:pt-6 space-y-3 lg:space-y-4 animate-fadeInUp animation-delay-600">
              <h2 className="text-xl lg:text-2xl font-semibold text-white flex items-center gap-2 justify-center lg:justify-start">
                <Heart className="w-5 h-5 lg:w-6 lg:h-6 text-purple-400 animate-pulse" />
                Things I Love
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 lg:gap-3">
                {hobbies.map((hobby, idx) => {
                  const Icon = hobby.icon;
                  return (
                    <div 
                      key={idx} 
                      className="flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-all duration-300 hover:translate-x-1 cursor-default group justify-center lg:justify-start"
                    >
                      <Icon className={`w-4 h-4 ${hobby.color} group-hover:scale-110 transition-transform`} />
                      <span className="text-sm">{hobby.text}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 pt-3 lg:pt-4 animate-fadeInUp animation-delay-800 justify-center lg:justify-start">
              <a href="mailto:yolandosoniii@gmail.com" className="px-5 py-2.5 lg:px-6 lg:py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-purple-500/50 hover:scale-105 transition-all duration-300 text-center">
                Get in Touch
              </a>
              <a href="https://www.linkedin.com/in/yolando-son-iii" target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 lg:px-6 lg:py-3 bg-white/5 border border-purple-500/30 text-white rounded-lg font-medium hover:bg-white/10 hover:border-purple-400/50 transition-all duration-300 text-center">
                LinkedIn
              </a>
            </div>
          </div>

          {/* Right Column - 3D Floating Card */}
          <div className="hidden lg:flex items-center justify-center">
            <div className="relative">
              
              {/* 3D Rotating Holographic Card */}
              <div
                onMouseDown={handleCardMouseDown}
                className={`absolute ${isDragging ? 'cursor-grabbing' : 'cursor-grab'} transition-all duration-200`}
                style={{
                  left: cardPosition.x + 'px',
                  top: cardPosition.y + 'px',
                  transform: `perspective(1000px) rotateX(${cardRotation.x}deg) rotateY(${cardRotation.y}deg) ${isDragging ? 'scale(1.05)' : 'scale(1)'}`,
                  transformStyle: 'preserve-3d',
                  transition: isDragging ? 'none' : 'transform 0.5s ease-out',
                }}
              >
                {/* Glowing aura when dragging */}
                {isDragging && (
                  <div className="absolute inset-0 bg-purple-500/20 rounded-3xl blur-2xl animate-pulse"></div>
                )}

                {/* Main Card */}
                <div
                  className="relative w-96 h-[660px] bg-gradient-to-br from-gray-900 via-purple-900/40 to-gray-900 rounded-3xl p-8 border-2 border-purple-500/40 shadow-2xl overflow-hidden"
                  style={{
                    boxShadow: isDragging 
                      ? '0 30px 60px -15px rgba(139, 92, 246, 0.5), 0 0 100px rgba(139, 92, 246, 0.3)' 
                      : '0 20px 40px -12px rgba(139, 92, 246, 0.3)'
                  }}
                >
                  {/* Holographic Shimmer Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-transparent to-blue-500/20 opacity-70 pointer-events-none animate-shimmer"></div>
                  
                  {/* Animated Corner Accents */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-purple-500/30 to-transparent rounded-bl-3xl"></div>
                  <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-blue-500/30 to-transparent rounded-tr-3xl"></div>

                  <div className="relative z-10 h-full flex flex-col justify-between py-4">
                    {/* Profile Section */}
                    <div className="space-y-4">
                      {/* Profile Image */}
                      <div className="w-44 h-44 mx-auto rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center overflow-hidden border-4 border-purple-400/30 shadow-lg">
                        <img 
                          src="portfolio-picture.jpg" 
                          alt="Thirdy"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                        <div className="w-full h-full items-center justify-center text-6xl font-bold text-white hidden">
                          T
                        </div>
                      </div>

                      {/* Name & Role */}
                      <div className="text-center space-y-2">
                        <h3 className="text-2xl font-bold text-white">Yolando S. Son III</h3>
                        <p className="text-purple-300 font-medium text-lg">Business Analyst</p>
                      </div>

                      {/* Quick Stats */}
                      <div className="grid grid-cols-2 gap-3 pt-3">
                        <div className="bg-purple-500/10 rounded-lg p-2 border border-purple-500/20 text-center">
                          <p className="text-purple-400 text-xs font-semibold">Education</p>
                          <p className="text-white text-sm font-bold">BSIT</p>
                        </div>
                        <div className="bg-blue-500/10 rounded-lg p-2 border border-blue-500/20 text-center">
                          <p className="text-blue-400 text-xs font-semibold">University</p>
                          <p className="text-white text-sm font-bold">BulSU</p>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Section */}
                    <div className="space-y-3 pt-4">
                      {/* Achievement Badge */}
                      <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-xl p-3 border border-purple-500/30">
                        <p className="text-purple-400 text-xs font-semibold mb-1">🏆 Featured Project</p>
                        <p className="text-white font-medium text-sm">Evalu8</p>
                        <p className="text-gray-400 text-xs">Faculty Evaluation System</p>
                      </div>

                      {/* Subtle Achievements */}
                      <div className="space-y-2">
                        <p className="text-gray-500 text-xs text-center">Research Recognitions</p>
                        <div className="space-y-2">
                          <div className="bg-purple-500/5 rounded-lg p-2.5 border border-purple-500/20">
                            <p className="text-purple-300 text-xs leading-relaxed">International Research Conference on Information Technology Education (IRCITE) 2025</p>
                          </div>
                          <div className="bg-blue-500/5 rounded-lg p-2.5 border border-blue-500/20">
                            <p className="text-blue-300 text-xs leading-relaxed">ITDS Research Summit 2024</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-4 lg:bottom-6 left-1/2 transform -translate-x-1/2 text-gray-500 text-xs lg:text-sm text-center px-4">
        © 2025 Thirdy • Made with React & Tailwind CSS
      </div>

      <style jsx>{`
        @keyframes floatParticle {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0.3;
          }
          25% {
            transform: translateY(-30px) translateX(10px);
            opacity: 0.7;
          }
          50% {
            transform: translateY(-60px) translateX(-10px);
            opacity: 1;
          }
          75% {
            transform: translateY(-30px) translateX(15px);
            opacity: 0.7;
          }
        }

        @keyframes gridMove {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(50px, 50px);
          }
        }

        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        @keyframes scanline {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100vh);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%) translateY(-100%) rotate(45deg);
          }
          100% {
            transform: translateX(100%) translateY(100%) rotate(45deg);
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        .animate-scanline {
          animation: scanline 8s linear infinite;
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
        }

        .animation-delay-400 {
          animation-delay: 0.4s;
        }

        .animation-delay-600 {
          animation-delay: 0.6s;
        }

        .animation-delay-800 {
          animation-delay: 0.8s;
        }

        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 3s ease infinite;
        }

        .animate-shimmer {
          animation: shimmer 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
