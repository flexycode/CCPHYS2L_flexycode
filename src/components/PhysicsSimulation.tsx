import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw, Settings } from 'lucide-react';

interface PhysicsSimulationProps {
  lessonId: string;
}

const PhysicsSimulation: React.FC<PhysicsSimulationProps> = ({ lessonId }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(true);

  // Simulation parameters that can be adjusted
  const [params, setParams] = useState({
    charge1: 1,
    charge2: -1,
    distance: 100,
    fieldStrength: 1,
    voltage: 12,
    current: 2,
    resistance: 6
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const drawSimulation = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Set up drawing context
      ctx.fillStyle = '#1f2937';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      switch (lessonId) {
        case 'electric-charge':
          drawElectricChargeSimulation(ctx, canvas.width, canvas.height);
          break;
        case 'electric-field':
          drawElectricFieldSimulation(ctx, canvas.width, canvas.height);
          break;
        case 'electric-potential':
          drawElectricPotentialSimulation(ctx, canvas.width, canvas.height);
          break;
        case 'capacitors':
          drawCapacitorSimulation(ctx, canvas.width, canvas.height);
          break;
        case 'resistivity':
          drawResistivitySimulation(ctx, canvas.width, canvas.height);
          break;
        case 'ohms-law':
          drawOhmsLawSimulation(ctx, canvas.width, canvas.height);
          break;
        case 'maxwell-equations':
          drawMaxwellSimulation(ctx, canvas.width, canvas.height);
          break;
        default:
          drawDefaultSimulation(ctx, canvas.width, canvas.height);
      }
    };

    const animate = () => {
      if (isPlaying) {
        drawSimulation();
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    drawSimulation();
    if (isPlaying) {
      animate();
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [lessonId, isPlaying, params]);

  const drawElectricChargeSimulation = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const centerX = width / 2;
    const centerY = height / 2;
    const time = Date.now() * 0.001;

    // Draw positive charge
    const charge1X = centerX - params.distance;
    const charge1Y = centerY;
    
    ctx.fillStyle = params.charge1 > 0 ? '#ef4444' : '#3b82f6';
    ctx.beginPath();
    ctx.arc(charge1X, charge1Y, 20, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = '#ffffff';
    ctx.font = '16px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(params.charge1 > 0 ? '+' : '−', charge1X, charge1Y + 5);

    // Draw negative charge
    const charge2X = centerX + params.distance;
    const charge2Y = centerY;
    
    ctx.fillStyle = params.charge2 > 0 ? '#ef4444' : '#3b82f6';
    ctx.beginPath();
    ctx.arc(charge2X, charge2Y, 20, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = '#ffffff';
    ctx.fillText(params.charge2 > 0 ? '+' : '−', charge2X, charge2Y + 5);

    // Draw force vectors with animation
    if (isPlaying) {
      const forceLength = 50 * Math.sin(time) + 60;
      
      // Force on charge 1
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(charge1X, charge1Y);
      ctx.lineTo(charge1X - forceLength, charge1Y);
      ctx.stroke();
      
      // Arrow head
      ctx.fillStyle = '#10b981';
      ctx.beginPath();
      ctx.moveTo(charge1X - forceLength, charge1Y);
      ctx.lineTo(charge1X - forceLength + 10, charge1Y - 5);
      ctx.lineTo(charge1X - forceLength + 10, charge1Y + 5);
      ctx.closePath();
      ctx.fill();

      // Force on charge 2
      ctx.beginPath();
      ctx.moveTo(charge2X, charge2Y);
      ctx.lineTo(charge2X + forceLength, charge2Y);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.moveTo(charge2X + forceLength, charge2Y);
      ctx.lineTo(charge2X + forceLength - 10, charge2Y - 5);
      ctx.lineTo(charge2X + forceLength - 10, charge2Y + 5);
      ctx.closePath();
      ctx.fill();
    }

    // Draw formula
    ctx.fillStyle = '#ffffff';
    ctx.font = '18px Arial';
    ctx.textAlign = 'left';
    ctx.fillText('F = k(q₁q₂)/r²', 20, 30);
    ctx.font = '14px Arial';
    ctx.fillText(`F = ${(8.99e9 * params.charge1 * params.charge2 / Math.pow(params.distance / 100, 2) / 1e6).toFixed(2)} × 10⁶ N`, 20, 50);
  };

  const drawElectricFieldSimulation = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const centerX = width / 2;
    const centerY = height / 2;
    const time = Date.now() * 0.001;

    // Draw source charge
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.arc(centerX, centerY, 15, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = '#ffffff';
    ctx.font = '14px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('+Q', centerX, centerY + 4);

    // Draw electric field lines
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 2;
    
    const numLines = 8;
    for (let i = 0; i < numLines; i++) {
      const angle = (i / numLines) * 2 * Math.PI;
      const startR = 25;
      const endR = isPlaying ? 100 + 20 * Math.sin(time + i) : 100;
      
      const startX = centerX + startR * Math.cos(angle);
      const startY = centerY + startR * Math.sin(angle);
      const endX = centerX + endR * Math.cos(angle);
      const endY = centerY + endR * Math.sin(angle);
      
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);
      ctx.stroke();
      
      // Arrow heads
      ctx.fillStyle = '#3b82f6';
      ctx.beginPath();
      ctx.moveTo(endX, endY);
      ctx.lineTo(endX - 8 * Math.cos(angle - 0.3), endY - 8 * Math.sin(angle - 0.3));
      ctx.lineTo(endX - 8 * Math.cos(angle + 0.3), endY - 8 * Math.sin(angle + 0.3));
      ctx.closePath();
      ctx.fill();
    }

    // Draw formula
    ctx.fillStyle = '#ffffff';
    ctx.font = '18px Arial';
    ctx.textAlign = 'left';
    ctx.fillText('E = kQ/r²', 20, 30);
    ctx.font = '14px Arial';
    ctx.fillText('Field lines show direction and strength', 20, 50);
  };

  const drawElectricPotentialSimulation = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const centerX = width / 2;
    const centerY = height / 2;

    // Draw equipotential surfaces as concentric circles
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 2;
    
    const potentials = [20, 15, 10, 5, 2];
    for (let i = 0; i < potentials.length; i++) {
      const radius = (i + 1) * 30;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.stroke();
      
      // Label potential
      ctx.fillStyle = '#10b981';
      ctx.font = '12px Arial';
      ctx.textAlign = 'left';
      ctx.fillText(`${potentials[i]}V`, centerX + radius + 5, centerY);
    }

    // Draw source charge
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.arc(centerX, centerY, 12, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = '#ffffff';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('+', centerX, centerY + 4);

    // Draw formula
    ctx.fillStyle = '#ffffff';
    ctx.font = '18px Arial';
    ctx.textAlign = 'left';
    ctx.fillText('V = kQ/r', 20, 30);
    ctx.font = '14px Arial';
    ctx.fillText('Equipotential surfaces (circles)', 20, 50);
  };

  const drawCapacitorSimulation = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const centerX = width / 2;
    const centerY = height / 2;
    const time = Date.now() * 0.001;

    // Draw capacitor plates
    ctx.fillStyle = '#6b7280';
    ctx.fillRect(centerX - 60, centerY - 80, 10, 160); // Left plate
    ctx.fillRect(centerX + 50, centerY - 80, 10, 160);  // Right plate

    // Draw charges on plates
    const numCharges = 8;
    for (let i = 0; i < numCharges; i++) {
      const y = centerY - 70 + (i * 140 / (numCharges - 1));
      
      // Negative charges on left plate
      ctx.fillStyle = '#3b82f6';
      ctx.beginPath();
      ctx.arc(centerX - 65, y, 4, 0, Math.PI * 2);
      ctx.fill();
      
      // Positive charges on right plate
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.arc(centerX + 65, y, 4, 0, Math.PI * 2);
      ctx.fill();
    }

    // Draw electric field lines between plates
    if (isPlaying) {
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 2;
      
      for (let i = 0; i < 5; i++) {
        const y = centerY - 40 + (i * 20);
        const offset = 10 * Math.sin(time + i);
        
        ctx.beginPath();
        ctx.moveTo(centerX - 50 + offset, y);
        ctx.lineTo(centerX + 50 + offset, y);
        ctx.stroke();
        
        // Arrow
        ctx.fillStyle = '#10b981';
        ctx.beginPath();
        ctx.moveTo(centerX + 50 + offset, y);
        ctx.lineTo(centerX + 45 + offset, y - 3);
        ctx.lineTo(centerX + 45 + offset, y + 3);
        ctx.closePath();
        ctx.fill();
      }
    }

    // Draw formula
    ctx.fillStyle = '#ffffff';
    ctx.font = '18px Arial';
    ctx.textAlign = 'left';
    ctx.fillText('C = Q/V = ε₀A/d', 20, 30);
    ctx.font = '14px Arial';
    ctx.fillText(`C = ${(params.charge1 / params.voltage).toFixed(2)} F`, 20, 50);
  };

  const drawResistivitySimulation = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const centerX = width / 2;
    const centerY = height / 2;
    const time = Date.now() * 0.001;

    // Draw resistor
    ctx.fillStyle = '#6b7280';
    ctx.fillRect(centerX - 100, centerY - 20, 200, 40);

    // Draw current flow with animated particles
    if (isPlaying) {
      ctx.fillStyle = '#fbbf24';
      const numParticles = 10;
      
      for (let i = 0; i < numParticles; i++) {
        const x = centerX - 90 + ((time * 50 + i * 20) % 180);
        const y = centerY + (Math.sin(time + i) * 5);
        
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Draw voltage across resistor
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(centerX - 120, centerY - 40);
    ctx.lineTo(centerX - 100, centerY - 40);
    ctx.lineTo(centerX - 100, centerY - 20);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(centerX + 100, centerY - 40);
    ctx.lineTo(centerX + 120, centerY - 40);
    ctx.lineTo(centerX + 120, centerY + 20);
    ctx.stroke();

    // Labels
    ctx.fillStyle = '#ffffff';
    ctx.font = '14px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('V', centerX - 110, centerY - 50);
    ctx.fillText('I', centerX, centerY - 40);

    // Draw formula
    ctx.font = '18px Arial';
    ctx.textAlign = 'left';
    ctx.fillText('R = ρL/A', 20, 30);
    ctx.font = '14px Arial';
    ctx.fillText(`ρ = resistivity (Ω⋅m)`, 20, 50);
  };

  const drawOhmsLawSimulation = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const centerX = width / 2;
    const centerY = height / 2;

    // Draw circuit diagram
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 3;
    
    // Draw circuit rectangle
    ctx.beginPath();
    ctx.rect(centerX - 100, centerY - 60, 200, 120);
    ctx.stroke();

    // Draw battery
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(centerX - 110, centerY - 15, 20, 30);
    ctx.fillStyle = '#ffffff';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('V', centerX - 100, centerY + 5);

    // Draw resistor
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 3;
    const resistorY = centerY - 60;
    for (let i = 0; i < 6; i++) {
      const x = centerX - 60 + (i * 20);
      ctx.beginPath();
      ctx.moveTo(x, resistorY);
      ctx.lineTo(x + 10, resistorY - (i % 2 === 0 ? 10 : -10));
      ctx.lineTo(x + 20, resistorY);
      ctx.stroke();
    }

    // Draw current direction
    ctx.fillStyle = '#fbbf24';
    ctx.beginPath();
    ctx.moveTo(centerX + 120, centerY);
    ctx.lineTo(centerX + 110, centerY - 5);
    ctx.lineTo(centerX + 110, centerY + 5);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.font = '14px Arial';
    ctx.textAlign = 'left';
    ctx.fillText('I', centerX + 125, centerY + 5);

    // Display values
    ctx.font = '16px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(`V = ${params.voltage}V`, centerX, centerY - 100);
    ctx.fillText(`I = ${params.current}A`, centerX, centerY + 100);
    ctx.fillText(`R = ${params.resistance}Ω`, centerX, centerY + 120);

    // Draw formula
    ctx.font = '18px Arial';
    ctx.textAlign = 'left';
    ctx.fillText('V = IR', 20, 30);
    ctx.font = '14px Arial';
    ctx.fillText(`Power P = VI = ${(params.voltage * params.current).toFixed(1)}W`, 20, 50);
  };

  const drawMaxwellSimulation = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const centerX = width / 2;
    const centerY = height / 2;
    const time = Date.now() * 0.001;

    // Draw electromagnetic wave
    if (isPlaying) {
      // Electric field (vertical)
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 3;
      ctx.beginPath();
      for (let x = 0; x < width; x += 5) {
        const y = centerY + 50 * Math.sin((x - time * 100) * 0.02);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Magnetic field (horizontal, 90 degrees out of phase)
      ctx.strokeStyle = '#3b82f6';
      ctx.beginPath();
      for (let x = 0; x < width; x += 5) {
        const y = centerY + 50 * Math.cos((x - time * 100) * 0.02);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Direction of propagation
      ctx.fillStyle = '#10b981';
      for (let x = 50; x < width; x += 100) {
        ctx.beginPath();
        ctx.moveTo(x, centerY - 100);
        ctx.lineTo(x - 10, centerY - 90);
        ctx.lineTo(x - 10, centerY - 110);
        ctx.closePath();
        ctx.fill();
      }
    }

    // Labels
    ctx.fillStyle = '#ffffff';
    ctx.font = '16px Arial';
    ctx.textAlign = 'left';
    ctx.fillText('E (Electric Field)', 20, 80);
    ctx.fillStyle = '#ef4444';
    ctx.fillText('___', 20, 95);

    ctx.fillStyle = '#ffffff';
    ctx.fillText('B (Magnetic Field)', 20, 120);
    ctx.fillStyle = '#3b82f6';
    ctx.fillText('___', 20, 135);

    ctx.fillStyle = '#ffffff';
    ctx.fillText('Direction of Propagation', 20, 160);
    ctx.fillStyle = '#10b981';
    ctx.fillText('→', 20, 175);

    // Draw equations
    ctx.fillStyle = '#ffffff';
    ctx.font = '14px Arial';
    ctx.textAlign = 'left';
    ctx.fillText('∇ × E = -∂B/∂t', 20, 30);
    ctx.fillText('∇ × B = μ₀J + μ₀ε₀∂E/∂t', 20, 50);
  };

  const drawDefaultSimulation = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.fillStyle = '#ffffff';
    ctx.font = '24px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Physics Simulation', width / 2, height / 2);
    ctx.font = '16px Arial';
    ctx.fillText('Interactive visualization coming soon!', width / 2, height / 2 + 40);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const reset = () => {
    setIsPlaying(false);
    // Reset parameters to defaults
    setParams({
      charge1: 1,
      charge2: -1,
      distance: 100,
      fieldStrength: 1,
      voltage: 12,
      current: 2,
      resistance: 6
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-700/50"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-2xl font-bold text-white">Interactive Simulation</h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={togglePlay}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            <span>{isPlaying ? 'Pause' : 'Play'}</span>
          </button>
          <button
            onClick={reset}
            className="flex items-center space-x-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Reset</span>
          </button>
          <button
            onClick={() => setShowControls(!showControls)}
            className="flex items-center space-x-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Settings className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="relative">
        <canvas
          ref={canvasRef}
          className="w-full h-96 bg-gray-900 rounded-lg border border-gray-600"
        />
        
        {showControls && (
          <div className="absolute top-4 right-4 bg-gray-800/90 backdrop-blur-sm rounded-lg p-4 space-y-3">
            <h4 className="text-white font-semibold text-sm">Controls</h4>
            {lessonId === 'electric-charge' && (
              <>
                <div>
                  <label className="text-gray-300 text-xs block mb-1">Charge 1 (C)</label>
                  <input
                    type="range"
                    min="-2"
                    max="2"
                    step="0.1"
                    value={params.charge1}
                    onChange={(e) => setParams({...params, charge1: parseFloat(e.target.value)})}
                    className="w-full"
                  />
                  <span className="text-gray-400 text-xs">{params.charge1}</span>
                </div>
                <div>
                  <label className="text-gray-300 text-xs block mb-1">Distance (m)</label>
                  <input
                    type="range"
                    min="50"
                    max="150"
                    value={params.distance}
                    onChange={(e) => setParams({...params, distance: parseInt(e.target.value)})}
                    className="w-full"
                  />
                  <span className="text-gray-400 text-xs">{params.distance / 100}m</span>
                </div>
              </>
            )}
            {lessonId === 'ohms-law' && (
              <>
                <div>
                  <label className="text-gray-300 text-xs block mb-1">Voltage (V)</label>
                  <input
                    type="range"
                    min="1"
                    max="24"
                    value={params.voltage}
                    onChange={(e) => setParams({...params, voltage: parseInt(e.target.value)})}
                    className="w-full"
                  />
                  <span className="text-gray-400 text-xs">{params.voltage}V</span>
                </div>
                <div>
                  <label className="text-gray-300 text-xs block mb-1">Resistance (Ω)</label>
                  <input
                    type="range"
                    min="1"
                    max="20"
                    value={params.resistance}
                    onChange={(e) => {
                      const r = parseInt(e.target.value);
                      setParams({...params, resistance: r, current: params.voltage / r});
                    }}
                    className="w-full"
                  />
                  <span className="text-gray-400 text-xs">{params.resistance}Ω</span>
                </div>
              </>
            )}
          </div>
        )}
      </div>
      
      <p className="text-gray-300 text-sm mt-4">
        Use the controls to adjust parameters and see how they affect the simulation in real-time.
      </p>
    </motion.div>
  );
};

export default PhysicsSimulation;