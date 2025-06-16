import React from 'react';
import { motion } from 'framer-motion';
import { Calculator, ExternalLink } from 'lucide-react';

const DesmosCalculator: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-700/50"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-2xl font-bold text-white flex items-center">
          <Calculator className="h-6 w-6 mr-2 text-blue-400" />
          Desmos Graphing Calculator
        </h3>
        <a
          href="https://www.desmos.com/calculator"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <ExternalLink className="h-4 w-4" />
          <span>Open in New Tab</span>
        </a>
      </div>

      <div className="relative">
        <iframe
          src="https://www.desmos.com/calculator"
          className="w-full h-96 rounded-lg border border-gray-600"
          title="Desmos Graphing Calculator"
          allow="fullscreen"
        />
      </div>
      
      <div className="mt-4 bg-gray-700/50 rounded-lg p-4">
        <h4 className="text-white font-semibold mb-2">Calculator Tips:</h4>
        <ul className="text-gray-300 text-sm space-y-1">
          <li>• Use this calculator to plot electric field equations and visualize physics concepts</li>
          <li>• Try graphing: y = 1/x² (inverse square law for electric fields)</li>
          <li>• Plot potential functions: V(r) = k*Q/r</li>
          <li>• Visualize wave functions for electromagnetic radiation</li>
          <li>• Use parametric equations to show particle motion in fields</li>
        </ul>
      </div>
    </motion.div>
  );
};

export default DesmosCalculator;