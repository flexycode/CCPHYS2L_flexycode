import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Calculator, X, RotateCcw } from 'lucide-react';

const ScientificCalculator: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [memory, setMemory] = useState(0);
  const [isRadians, setIsRadians] = useState(true);

  const inputNumber = useCallback((num: string) => {
    if (waitingForOperand) {
      setDisplay(num);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  }, [display, waitingForOperand]);

  const inputDecimal = useCallback(() => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  }, [display, waitingForOperand]);

  const clear = useCallback(() => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  }, []);

  const performOperation = useCallback((nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      let result = 0;

      switch (operation) {
        case '+':
          result = currentValue + inputValue;
          break;
        case '-':
          result = currentValue - inputValue;
          break;
        case '×':
          result = currentValue * inputValue;
          break;
        case '÷':
          result = inputValue !== 0 ? currentValue / inputValue : 0;
          break;
        case '^':
          result = Math.pow(currentValue, inputValue);
          break;
        case '=':
          result = inputValue;
          break;
        default:
          return;
      }

      setDisplay(String(result));
      setPreviousValue(result);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  }, [display, previousValue, operation]);

  const performFunction = useCallback((func: string) => {
    const inputValue = parseFloat(display);
    let result = 0;
    const angleValue = isRadians ? inputValue : (inputValue * Math.PI) / 180;

    switch (func) {
      case 'sin':
        result = Math.sin(angleValue);
        break;
      case 'cos':
        result = Math.cos(angleValue);
        break;
      case 'tan':
        result = Math.tan(angleValue);
        break;
      case 'ln':
        result = inputValue > 0 ? Math.log(inputValue) : 0;
        break;
      case 'log':
        result = inputValue > 0 ? Math.log10(inputValue) : 0;
        break;
      case '√':
        result = inputValue >= 0 ? Math.sqrt(inputValue) : 0;
        break;
      case 'x²':
        result = inputValue * inputValue;
        break;
      case '1/x':
        result = inputValue !== 0 ? 1 / inputValue : 0;
        break;
      case '±':
        result = -inputValue;
        break;
      case 'π':
        result = Math.PI;
        break;
      case 'e':
        result = Math.E;
        break;
      default:
        return;
    }

    setDisplay(String(result));
    setWaitingForOperand(true);
  }, [display, isRadians]);

  const memoryOperation = useCallback((op: string) => {
    const inputValue = parseFloat(display);
    
    switch (op) {
      case 'MC':
        setMemory(0);
        break;
      case 'MR':
        setDisplay(String(memory));
        setWaitingForOperand(true);
        break;
      case 'M+':
        setMemory(memory + inputValue);
        break;
      case 'M-':
        setMemory(memory - inputValue);
        break;
      case 'MS':
        setMemory(inputValue);
        break;
    }
  }, [display, memory]);

  const Button: React.FC<{
    onClick: () => void;
    className?: string;
    children: React.ReactNode;
  }> = ({ onClick, className = '', children }) => (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`h-12 rounded-lg font-semibold transition-all duration-200 ${className}`}
    >
      {children}
    </motion.button>
  );

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
          Scientific Calculator
        </h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsRadians(!isRadians)}
            className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
              isRadians 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-600 text-gray-300'
            }`}
          >
            {isRadians ? 'RAD' : 'DEG'}
          </button>
          <span className="text-gray-400 text-sm">
            Memory: {memory !== 0 ? memory.toFixed(4) : '0'}
          </span>
        </div>
      </div>

      {/* Display */}
      <div className="bg-gray-900 rounded-lg p-4 mb-4">
        <div className="text-right text-3xl font-mono text-white overflow-hidden">
          {display.length > 12 ? parseFloat(display).toExponential(6) : display}
        </div>
      </div>

      {/* Button Grid */}
      <div className="grid grid-cols-6 gap-2">
        {/* Memory Functions */}
        <Button onClick={() => memoryOperation('MC')} className="bg-purple-600 hover:bg-purple-700 text-white text-sm">
          MC
        </Button>
        <Button onClick={() => memoryOperation('MR')} className="bg-purple-600 hover:bg-purple-700 text-white text-sm">
          MR
        </Button>
        <Button onClick={() => memoryOperation('M+')} className="bg-purple-600 hover:bg-purple-700 text-white text-sm">
          M+
        </Button>
        <Button onClick={() => memoryOperation('M-')} className="bg-purple-600 hover:bg-purple-700 text-white text-sm">
          M-
        </Button>
        <Button onClick={() => memoryOperation('MS')} className="bg-purple-600 hover:bg-purple-700 text-white text-sm">
          MS
        </Button>
        <Button onClick={clear} className="bg-red-600 hover:bg-red-700 text-white">
          <RotateCcw className="h-4 w-4" />
        </Button>

        {/* Scientific Functions Row 1 */}
        <Button onClick={() => performFunction('sin')} className="bg-blue-600 hover:bg-blue-700 text-white text-sm">
          sin
        </Button>
        <Button onClick={() => performFunction('cos')} className="bg-blue-600 hover:bg-blue-700 text-white text-sm">
          cos
        </Button>
        <Button onClick={() => performFunction('tan')} className="bg-blue-600 hover:bg-blue-700 text-white text-sm">
          tan
        </Button>
        <Button onClick={() => performFunction('ln')} className="bg-blue-600 hover:bg-blue-700 text-white text-sm">
          ln
        </Button>
        <Button onClick={() => performFunction('log')} className="bg-blue-600 hover:bg-blue-700 text-white text-sm">
          log
        </Button>
        <Button onClick={() => performOperation('^')} className="bg-orange-600 hover:bg-orange-700 text-white">
          x^y
        </Button>

        {/* Scientific Functions Row 2 */}
        <Button onClick={() => performFunction('√')} className="bg-blue-600 hover:bg-blue-700 text-white">
          √
        </Button>
        <Button onClick={() => performFunction('x²')} className="bg-blue-600 hover:bg-blue-700 text-white text-sm">
          x²
        </Button>
        <Button onClick={() => performFunction('1/x')} className="bg-blue-600 hover:bg-blue-700 text-white text-sm">
          1/x
        </Button>
        <Button onClick={() => performFunction('π')} className="bg-green-600 hover:bg-green-700 text-white">
          π
        </Button>
        <Button onClick={() => performFunction('e')} className="bg-green-600 hover:bg-green-700 text-white">
          e
        </Button>
        <Button onClick={() => performFunction('±')} className="bg-gray-600 hover:bg-gray-700 text-white">
          ±
        </Button>

        {/* Number Pad and Operations */}
        <Button onClick={() => inputNumber('7')} className="bg-gray-700 hover:bg-gray-600 text-white">
          7
        </Button>
        <Button onClick={() => inputNumber('8')} className="bg-gray-700 hover:bg-gray-600 text-white">
          8
        </Button>
        <Button onClick={() => inputNumber('9')} className="bg-gray-700 hover:bg-gray-600 text-white">
          9
        </Button>
        <Button onClick={() => performOperation('÷')} className="bg-orange-600 hover:bg-orange-700 text-white">
          ÷
        </Button>
        <Button onClick={() => inputNumber('(')} className="bg-gray-600 hover:bg-gray-700 text-white">
          (
        </Button>
        <Button onClick={() => inputNumber(')')} className="bg-gray-600 hover:bg-gray-700 text-white">
          )
        </Button>

        <Button onClick={() => inputNumber('4')} className="bg-gray-700 hover:bg-gray-600 text-white">
          4
        </Button>
        <Button onClick={() => inputNumber('5')} className="bg-gray-700 hover:bg-gray-600 text-white">
          5
        </Button>
        <Button onClick={() => inputNumber('6')} className="bg-gray-700 hover:bg-gray-600 text-white">
          6
        </Button>
        <Button onClick={() => performOperation('×')} className="bg-orange-600 hover:bg-orange-700 text-white">
          ×
        </Button>
        <Button onClick={() => inputNumber('0')} className="bg-gray-700 hover:bg-gray-600 text-white col-span-2">
          0
        </Button>

        <Button onClick={() => inputNumber('1')} className="bg-gray-700 hover:bg-gray-600 text-white">
          1
        </Button>
        <Button onClick={() => inputNumber('2')} className="bg-gray-700 hover:bg-gray-600 text-white">
          2
        </Button>
        <Button onClick={() => inputNumber('3')} className="bg-gray-700 hover:bg-gray-600 text-white">
          3
        </Button>
        <Button onClick={() => performOperation('-')} className="bg-orange-600 hover:bg-orange-700 text-white">
          -
        </Button>
        <Button onClick={inputDecimal} className="bg-gray-600 hover:bg-gray-700 text-white">
          .
        </Button>
        <Button onClick={() => performOperation('=')} className="bg-green-600 hover:bg-green-700 text-white">
          =
        </Button>

        <Button onClick={() => performOperation('+')} className="bg-orange-600 hover:bg-orange-700 text-white col-span-6">
          +
        </Button>
      </div>

      <div className="mt-4 bg-gray-700/50 rounded-lg p-3">
        <h4 className="text-white font-semibold mb-2 text-sm">Physics Constants:</h4>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <button
            onClick={() => {
              setDisplay('8.99e9');
              setWaitingForOperand(true);
            }}
            className="bg-gray-600 hover:bg-gray-500 text-white p-2 rounded transition-colors"
          >
            k = 8.99×10⁹ N⋅m²/C²
          </button>
          <button
            onClick={() => {
              setDisplay('8.85e-12');
              setWaitingForOperand(true);
            }}
            className="bg-gray-600 hover:bg-gray-500 text-white p-2 rounded transition-colors"
          >
            ε₀ = 8.85×10⁻¹² F/m
          </button>
          <button
            onClick={() => {
              setDisplay('1.602e-19');
              setWaitingForOperand(true);
            }}
            className="bg-gray-600 hover:bg-gray-500 text-white p-2 rounded transition-colors"
          >
            e = 1.602×10⁻¹⁹ C
          </button>
          <button
            onClick={() => {
              setDisplay('9.109e-31');
              setWaitingForOperand(true);
            }}
            className="bg-gray-600 hover:bg-gray-500 text-white p-2 rounded transition-colors"
          >
            mₑ = 9.109×10⁻³¹ kg
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ScientificCalculator;