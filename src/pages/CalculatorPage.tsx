import React from 'react';
import { motion } from 'framer-motion';
import { Calculator, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import ScientificCalculator from '../components/ScientificCalculator';
import DesmosCalculator from '../components/DesmosCalculator';

const CalculatorPage: React.FC = () => {
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
            Back to Home
          </Link>
          
          <div className="flex items-center space-x-4 mb-6">
            <div className="p-4 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500">
              <Calculator className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white">Physics Calculators</h1>
              <p className="text-xl text-gray-300 mt-2">
                Advanced mathematical tools for physics calculations and graphing
              </p>
            </div>
          </div>
        </motion.div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <div>
            <ScientificCalculator />
          </div>
          <div>
            <DesmosCalculator />
          </div>
        </div>

        {/* Physics Formulas Quick Reference */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-700/50"
        >
          <h3 className="text-2xl font-bold text-white mb-4">Physics Formulas Quick Reference</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-gray-700/50 rounded-lg p-4">
              <h4 className="font-semibold text-blue-400 mb-2">Electric Force</h4>
              <code className="text-green-400 font-mono">F = k(q₁q₂)/r²</code>
              <p className="text-gray-300 text-sm mt-1">k = 8.99×10⁹ N⋅m²/C²</p>
            </div>
            <div className="bg-gray-700/50 rounded-lg p-4">
              <h4 className="font-semibold text-blue-400 mb-2">Electric Field</h4>
              <code className="text-green-400 font-mono">E = F/q = kQ/r²</code>
              <p className="text-gray-300 text-sm mt-1">Field strength (N/C)</p>
            </div>
            <div className="bg-gray-700/50 rounded-lg p-4">
              <h4 className="font-semibold text-blue-400 mb-2">Electric Potential</h4>
              <code className="text-green-400 font-mono">V = kQ/r</code>
              <p className="text-gray-300 text-sm mt-1">Potential energy per charge</p>
            </div>
            <div className="bg-gray-700/50 rounded-lg p-4">
              <h4 className="font-semibold text-blue-400 mb-2">Capacitance</h4>
              <code className="text-green-400 font-mono">C = Q/V = ε₀A/d</code>
              <p className="text-gray-300 text-sm mt-1">Charge storage capacity</p>
            </div>
            <div className="bg-gray-700/50 rounded-lg p-4">
              <h4 className="font-semibold text-blue-400 mb-2">Ohm's Law</h4>
              <code className="text-green-400 font-mono">V = IR</code>
              <p className="text-gray-300 text-sm mt-1">Voltage, current, resistance</p>
            </div>
            <div className="bg-gray-700/50 rounded-lg p-4">
              <h4 className="font-semibold text-blue-400 mb-2">Power</h4>
              <code className="text-green-400 font-mono">P = IV = I²R = V²/R</code>
              <p className="text-gray-300 text-sm mt-1">Electrical power dissipation</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CalculatorPage;