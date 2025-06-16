import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Play, 
  Calculator, 
  BookOpen, 
  Zap, 
  Orbit,
  Battery,
  Radio,
  Atom
} from 'lucide-react';
import DesmosCalculator from '../components/DesmosCalculator';
import PhysicsSimulation from '../components/PhysicsSimulation';
import ScientificCalculator from '../components/ScientificCalculator';

const LessonPage: React.FC = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const [activeTab, setActiveTab] = useState<'overview' | 'simulation' | 'calculator' | 'scientific'>('overview');

  const lessonData = {
    'electric-charge': {
      title: 'Electric Charge',
      icon: Zap,
      color: 'from-blue-500 to-cyan-500',
      description: 'Electric charge is a fundamental property of matter that causes it to experience a force in an electromagnetic field.',
      keyFormulas: [
        { name: "Coulomb's Law", formula: 'F = k(q₁q₂)/r²', description: 'Force between two point charges' },
        { name: 'Electric Force Constant', formula: 'k = 8.99 × 10⁹ N⋅m²/C²', description: 'Coulomb constant' },
        { name: 'Charge Quantization', formula: 'q = ne', description: 'Charge is quantized in units of elementary charge' }
      ],
      videoUrl: 'https://www.youtube.com/embed/x1-SibwIPM4',
      concepts: [
        'Electric charge is conserved - it cannot be created or destroyed',
        'Like charges repel, opposite charges attract',
        'Charge is quantized in units of elementary charge (e = 1.602 × 10⁻¹⁹ C)',
        'Objects can be charged by friction, conduction, or induction'
      ]
    },
    'electric-field': {
      title: 'Electric Field',
      icon: Orbit,
      color: 'from-purple-500 to-pink-500',
      description: 'Electric field represents the influence that electric charges exert on other charges in their vicinity.',
      keyFormulas: [
        { name: 'Electric Field Definition', formula: 'E = F/q', description: 'Electric field as force per unit charge' },
        { name: 'Point Charge Field', formula: 'E = kQ/r²', description: 'Electric field due to a point charge' },
        { name: 'Electric Field Lines', formula: 'N ∝ Q', description: 'Number of field lines proportional to charge' }
      ],
      videoUrl: 'https://www.youtube.com/embed/mdulzEfQXD0',
      concepts: [
        'Electric field exists whether or not a test charge is present',
        'Field lines point away from positive charges and toward negative charges',
        'Field strength decreases with distance from the source charge',
        'Uniform fields can be created between parallel plates'
      ]
    },
    'electric-potential': {
      title: 'Electric Potential',
      icon: Battery,
      color: 'from-green-500 to-emerald-500',
      description: 'Electric potential is the amount of electric potential energy per unit charge at a point in space.',
      keyFormulas: [
        { name: 'Electric Potential', formula: 'V = U/q', description: 'Potential energy per unit charge' },
        { name: 'Point Charge Potential', formula: 'V = kQ/r', description: 'Potential due to a point charge' },
        { name: 'Potential Difference', formula: 'ΔV = -∫E⋅dr', description: 'Work done moving charge in electric field' }
      ],
      videoUrl: 'https://www.youtube.com/embed/ZrMw3HAM7a0',
      concepts: [
        'Electric potential is a scalar quantity (no direction)',
        'Potential difference (voltage) drives current flow',
        'Equipotential surfaces are perpendicular to electric field lines',
        'Zero potential is typically defined at infinity or ground'
      ]
    },
    'capacitors': {
      title: 'Capacitors',
      icon: Radio,
      color: 'from-orange-500 to-red-500',
      description: 'Capacitors are devices that store electrical energy by accumulating electric charges on closely spaced surfaces.',
      keyFormulas: [
        { name: 'Capacitance', formula: 'C = Q/V', description: 'Charge stored per unit voltage' },
        { name: 'Parallel Plate Capacitor', formula: 'C = ε₀A/d', description: 'Capacitance of parallel plates' },
        { name: 'Energy Stored', formula: 'U = ½CV²', description: 'Energy stored in capacitor' }
      ],
      videoUrl: 'https://www.youtube.com/embed/X4EUwTwZ110',
      concepts: [
        'Capacitors store energy in electric fields between conductors',
        'Capacitance depends on geometry and dielectric material',
        'Series capacitors: 1/Ctotal = 1/C1 + 1/C2 + ...',
        'Parallel capacitors: Ctotal = C1 + C2 + ...'
      ]
    },
    'resistivity': {
      title: 'Resistivity & Resistance',
      icon: Calculator,
      color: 'from-indigo-500 to-purple-500',
      description: 'Resistance opposes the flow of electric current, while resistivity is an intrinsic material property.',
      keyFormulas: [
        { name: 'Resistance', formula: 'R = ρL/A', description: 'Resistance depends on material and geometry' },
        { name: 'Resistivity', formula: 'ρ = RA/L', description: 'Intrinsic resistance of material' },
        { name: 'Temperature Dependence', formula: 'ρ(T) = ρ₀[1 + α(T - T₀)]', description: 'Resistivity varies with temperature' }
      ],
      videoUrl: 'https://www.youtube.com/embed/NiceaqGUc4Q',
      concepts: [
        'Resistance converts electrical energy to heat',
        'Resistivity is independent of object size and shape',
        'Conductors have low resistivity, insulators have high resistivity',
        'Temperature affects resistivity in most materials'
      ]
    },
    'ohms-law': {
      title: "Ohm's Law",
      icon: Zap,
      color: 'from-yellow-500 to-orange-500',
      description: "Ohm's Law describes the relationship between voltage, current, and resistance in electrical circuits.",
      keyFormulas: [
        { name: "Ohm's Law", formula: 'V = IR', description: 'Voltage equals current times resistance' },
        { name: 'Power', formula: 'P = IV = I²R = V²/R', description: 'Electrical power dissipation' },
        { name: 'Current Definition', formula: 'I = Q/t', description: 'Current as charge flow rate' }
      ],
      videoUrl: 'https://www.youtube.com/embed/HsLLq6Rm5tU',
      concepts: [
        'Voltage drives current through resistance',
        'Current is the rate of charge flow',
        'Power is the rate of energy conversion',
        'Ohmic materials have constant resistance'
      ]
    },
    'maxwell-equations': {
      title: "Maxwell's Equations",
      icon: Atom,
      color: 'from-teal-500 to-blue-500',
      description: "Maxwell's equations describe how electric and magnetic fields are generated and altered by charges and currents.",
      keyFormulas: [
        { name: "Gauss's Law", formula: '∇⋅E = ρ/ε₀', description: 'Electric field divergence from charge density' },
        { name: "Gauss's Law for Magnetism", formula: '∇⋅B = 0', description: 'No magnetic monopoles exist' },
        { name: "Faraday's Law", formula: '∇×E = -∂B/∂t', description: 'Changing magnetic field creates electric field' },
        { name: "Ampère's Law", formula: '∇×B = μ₀J + μ₀ε₀∂E/∂t', description: 'Current and changing electric field create magnetic field' }
      ],
      videoUrl: 'https://www.youtube.com/embed/9Tm2c6NJH4Y',
      concepts: [
        'Electric and magnetic fields are interconnected',
        'Changing fields create electromagnetic waves',
        'Light is an electromagnetic wave',
        'These equations unify electricity and magnetism'
      ]
    }
  };

  const lesson = lessonId ? lessonData[lessonId as keyof typeof lessonData] : null;

  if (!lesson) {
    return (
      <div className="pt-20 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Lesson Not Found</h1>
          <Link to="/" className="text-blue-400 hover:text-blue-300 transition-colors">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  const Icon = lesson.icon;

  return (
    <div className="pt-20 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Link 
            to="/" 
            className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors mb-6"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Lessons
          </Link>
          
          <div className="flex items-center space-x-4 mb-6">
            <div className={`p-4 rounded-xl bg-gradient-to-r ${lesson.color}`}>
              <Icon className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white">{lesson.title}</h1>
              <p className="text-xl text-gray-300 mt-2">{lesson.description}</p>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex space-x-1 bg-gray-800/50 rounded-lg p-1 overflow-x-auto">
            {[
              { id: 'overview' as const, label: 'Overview', icon: BookOpen },
              { id: 'simulation' as const, label: 'Simulation', icon: Zap },
              { id: 'calculator' as const, label: 'Graphing', icon: Calculator },
              { id: 'scientific' as const, label: 'Scientific Calc', icon: Calculator }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-gray-700'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {activeTab === 'overview' && (
            <>
              <div className="space-y-8">
                {/* Key Concepts */}
                <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-700/50">
                  <h3 className="text-2xl font-bold text-white mb-4">Key Concepts</h3>
                  <ul className="space-y-3">
                    {lesson.concepts.map((concept, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                        <span className="text-gray-300">{concept}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Important Formulas */}
                <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-700/50">
                  <h3 className="text-2xl font-bold text-white mb-4">Important Formulas</h3>
                  <div className="space-y-4">
                    {lesson.keyFormulas.map((formula, index) => (
                      <div key={index} className="bg-gray-700/50 rounded-lg p-4">
                        <h4 className="font-semibold text-blue-400 mb-2">{formula.name}</h4>
                        <div className="bg-gray-900/50 rounded p-3 mb-2">
                          <code className="text-xl text-green-400 font-mono">{formula.formula}</code>
                        </div>
                        <p className="text-gray-300 text-sm">{formula.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                {/* Video Lesson */}
                <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-700/50">
                  <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                    <Play className="h-6 w-6 mr-2 text-red-400" />
                    Video Lesson
                  </h3>
                  <div className="aspect-video rounded-lg overflow-hidden">
                    <iframe
                      src={lesson.videoUrl}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title={`${lesson.title} - Physics Lesson`}
                    />
                  </div>
                  <div className="mt-4 bg-gray-700/50 rounded-lg p-4">
                    <h4 className="text-white font-semibold mb-2">Video Notes:</h4>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Watch the complete video for comprehensive understanding</li>
                      <li>• Take notes on key formulas and concepts</li>
                      <li>• Use the pause feature to work through examples</li>
                      <li>• Review difficult sections multiple times</li>
                    </ul>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'simulation' && (
            <div className="lg:col-span-2">
              <PhysicsSimulation lessonId={lessonId!} />
            </div>
          )}

          {activeTab === 'calculator' && (
            <div className="lg:col-span-2">
              <DesmosCalculator />
            </div>
          )}

          {activeTab === 'scientific' && (
            <div className="lg:col-span-2">
              <ScientificCalculator />
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default LessonPage;