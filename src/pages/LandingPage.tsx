import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Zap, 
  Orbit, 
  Battery, 
  Radio, 
  Calculator, 
  PlayCircle,
  BookOpen,
  ArrowRight,
  Atom
} from 'lucide-react';
import ParticleBackground from '../components/ParticleBackground';
import QuantumCard from '../components/QuantumCard';

const LandingPage: React.FC = () => {
  const lessonsRef = useRef<HTMLElement>(null);

  const lessons = [
    {
      id: 'electric-charge',
      title: 'Electric Charge',
      description: 'Explore the fundamental nature of electric charge and its properties',
      icon: Zap,
      color: 'from-blue-500 to-cyan-500',
      formula: 'F = k(q₁q₂)/r²'
    },
    {
      id: 'electric-field',
      title: 'Electric Field',
      description: 'Understand electric fields and their visualization in space',
      icon: Orbit,
      color: 'from-purple-500 to-pink-500',
      formula: 'E = F/q = kQ/r²'
    },
    {
      id: 'electric-potential',
      title: 'Electric Potential',
      description: 'Learn about electric potential energy and voltage',
      icon: Battery,
      color: 'from-green-500 to-emerald-500',
      formula: 'V = kQ/r'
    },
    {
      id: 'capacitors',
      title: 'Capacitors',
      description: 'Discover how capacitors store and release electrical energy',
      icon: Radio,
      color: 'from-orange-500 to-red-500',
      formula: 'C = Q/V'
    },
    {
      id: 'resistivity',
      title: 'Resistivity & Resistance',
      description: 'Study electrical resistance and material properties',
      icon: Calculator,
      color: 'from-indigo-500 to-purple-500',
      formula: 'R = ρL/A'
    },
    {
      id: 'ohms-law',
      title: "Ohm's Law",
      description: 'Master the fundamental relationship between voltage, current, and resistance',
      icon: Zap,
      color: 'from-yellow-500 to-orange-500',
      formula: 'V = IR'
    },
    {
      id: 'maxwell-equations',
      title: "Maxwell's Equations",
      description: 'Explore the equations that describe electromagnetic phenomena',
      icon: Atom,
      color: 'from-teal-500 to-blue-500',
      formula: '∇ × E = -∂B/∂t'
    }
  ];

  const scrollToLessons = () => {
    lessonsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <ParticleBackground />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Explore the Universe
              </h1>
              <h2 className="text-3xl md:text-5xl font-bold text-white">
                of Physics
              </h2>
              <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Journey through the quantum realm and discover the fundamental forces that shape our reality. 
                Interactive simulations, visual learning, and hands-on exploration await.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToLessons}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center space-x-2"
              >
                <BookOpen className="h-5 w-5" />
                <span>Start Learning</span>
                <ArrowRight className="h-5 w-5" />
              </motion.button>
              
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="https://www.desmos.com/calculator"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-gray-700 to-gray-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center space-x-2"
              >
                <Calculator className="h-5 w-5" />
                <span>Open Calculator</span>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-16"
          >
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Interactive Learning Experience
            </h3>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Immerse yourself in physics through cutting-edge simulations and interactive tools
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <QuantumCard
              title="Interactive Simulations"
              description="Visualize complex physics concepts with real-time simulations"
              icon={Orbit}
              delay={0.1}
            />
            <QuantumCard
              title="Desmos Integration"
              description="Advanced mathematical calculations and graphing capabilities"
              icon={Calculator}
              delay={0.2}
            />
            <QuantumCard
              title="Video Lessons"
              description="Comprehensive video tutorials for every physics topic"
              icon={PlayCircle}
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* Lessons Section */}
      <section ref={lessonsRef} className="relative py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center mb-16"
          >
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Physics 2 Curriculum
            </h3>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Master the fundamental concepts of electricity and magnetism
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {lessons.map((lesson, index) => (
              <motion.div
                key={lesson.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <Link to={`/lesson/${lesson.id}`}>
                  <div className="group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 hover:transform hover:scale-105">
                    <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl"
                         style={{ backgroundImage: `linear-gradient(135deg, ${lesson.color.split(' ')[1]}, ${lesson.color.split(' ')[3]})` }} />
                    
                    <div className="relative z-10">
                      <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${lesson.color} mb-4`}>
                        <lesson.icon className="h-6 w-6 text-white" />
                      </div>
                      
                      <h4 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                        {lesson.title}
                      </h4>
                      
                      <p className="text-gray-300 mb-4 leading-relaxed">
                        {lesson.description}
                      </p>
                      
                      <div className="bg-gray-700/50 rounded-lg p-3 mb-4">
                        <p className="text-sm text-gray-400 mb-1">Key Formula:</p>
                        <code className="text-blue-400 font-mono text-lg">{lesson.formula}</code>
                      </div>
                      
                      <div className="flex items-center text-blue-400 font-semibold group-hover:text-blue-300 transition-colors">
                        <span>Explore Lesson</span>
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;