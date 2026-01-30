
import React, { useState, useEffect, useRef } from 'react';
import { Input } from './ui/Input';

const OhmCalculator: React.FC = () => {
  const [voltage, setVoltage] = useState<string>('');
  const [current, setCurrent] = useState<string>('');
  const [resistance, setResistance] = useState<string>('');
  const [power, setPower] = useState<string>('');
  
  // Track which inputs were most recently modified to decide what to calculate
  const editHistory = useRef<string[]>([]);

  const handleInputChange = (id: string, value: string) => {
    // Keep only numeric input
    if (value !== '' && isNaN(parseFloat(value))) return;

    if (id === 'v') setVoltage(value);
    if (id === 'i') setCurrent(value);
    if (id === 'r') setResistance(value);
    if (id === 'p') setPower(value);

    // Update edit history
    if (value !== '') {
      const filtered = editHistory.current.filter(h => h !== id);
      editHistory.current = [id, ...filtered].slice(0, 2);
    } else {
      editHistory.current = editHistory.current.filter(h => h !== id);
    }
  };

  useEffect(() => {
    if (editHistory.current.length < 2) return;

    const [last, prev] = editHistory.current;
    let v = parseFloat(voltage);
    let i = parseFloat(current);
    let r = parseFloat(resistance);
    let p = parseFloat(power);

    const keys = new Set([last, prev]);

    // Ohm's Law (V = IR) & Power (P = VI)
    // We update the fields NOT in the edit history
    
    // Case 1: V and I
    if (keys.has('v') && keys.has('i')) {
      if (v > 0 && i > 0) {
        setResistance((v / i).toFixed(2));
        setPower((v * i).toFixed(2));
      }
    } 
    // Case 2: V and R
    else if (keys.has('v') && keys.has('r')) {
      if (v > 0 && r > 0) {
        setCurrent((v / r).toFixed(3));
        setPower(((v * v) / r).toFixed(2));
      }
    }
    // Case 3: I and R
    else if (keys.has('i') && keys.has('r')) {
      if (i > 0 && r > 0) {
        setVoltage((i * r).toFixed(2));
        setPower((i * i * r).toFixed(2));
      }
    }
    // Case 4: V and P
    else if (keys.has('v') && keys.has('p')) {
      if (v > 0 && p > 0) {
        setCurrent((p / v).toFixed(3));
        setResistance(((v * v) / p).toFixed(2));
      }
    }
    // Case 5: I and P
    else if (keys.has('i') && keys.has('p')) {
      if (i > 0 && p > 0) {
        setVoltage((p / i).toFixed(2));
        setResistance((p / (i * i)).toFixed(2));
      }
    }
    // Case 6: R and P
    else if (keys.has('r') && keys.has('p')) {
      if (r > 0 && p > 0) {
        setVoltage(Math.sqrt(p * r).toFixed(2));
        setCurrent(Math.sqrt(p / r).toFixed(3));
      }
    }

  }, [voltage, current, resistance, power]);

  const clear = () => {
    setVoltage('');
    setCurrent('');
    setResistance('');
    setPower('');
    editHistory.current = [];
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="flex justify-between items-center mb-8">
        <h2 className="font-instrument text-3xl">Ohm's Law & Power</h2>
        <button 
          onClick={clear}
          className="text-xs font-bold text-primary uppercase tracking-widest hover:underline"
        >
          Reset
        </button>
      </div>
      
      <p className="text-sm text-textSecondary mb-8 max-w-md">
        Enter any two values to calculate the remaining two.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Input
          label="Voltage (V)"
          value={voltage}
          onChange={(e) => handleInputChange('v', e.target.value)}
          suffix="V"
          placeholder="0.00"
          className={editHistory.current.includes('v') ? 'ring-1 ring-primary/20 rounded-xl' : ''}
        />
        <Input
          label="Current (I)"
          value={current}
          onChange={(e) => handleInputChange('i', e.target.value)}
          suffix="A"
          placeholder="0.000"
          className={editHistory.current.includes('i') ? 'ring-1 ring-primary/20 rounded-xl' : ''}
        />
        <Input
          label="Resistance (R)"
          value={resistance}
          onChange={(e) => handleInputChange('r', e.target.value)}
          suffix="Ω"
          placeholder="0.00"
          className={editHistory.current.includes('r') ? 'ring-1 ring-primary/20 rounded-xl' : ''}
        />
        <Input
          label="Power (P)"
          value={power}
          onChange={(e) => handleInputChange('p', e.target.value)}
          suffix="W"
          placeholder="0.00"
          className={editHistory.current.includes('p') ? 'ring-1 ring-primary/20 rounded-xl' : ''}
        />
      </div>

      <div className="mt-auto pt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 bg-gray-50 rounded-2xl text-center">
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">V = I × R</div>
            <div className="font-medium text-textPrimary text-sm">Voltage</div>
        </div>
        <div className="p-4 bg-gray-50 rounded-2xl text-center">
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">I = V / R</div>
            <div className="font-medium text-textPrimary text-sm">Current</div>
        </div>
        <div className="p-4 bg-gray-50 rounded-2xl text-center">
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">R = V / I</div>
            <div className="font-medium text-textPrimary text-sm">Resistance</div>
        </div>
        <div className="p-4 bg-gray-50 rounded-2xl text-center">
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">P = V × I</div>
            <div className="font-medium text-textPrimary text-sm">Power</div>
        </div>
      </div>
    </div>
  );
};

export default OhmCalculator;
