
import React, { useState, useEffect } from 'react';
import { Input } from './ui/Input';
import { ResultDisplay } from './ui/ResultDisplay';
import { WIRE_MATERIALS, AWG_TO_MM2 } from '../constants';

const VoltageDropCalculator: React.FC = () => {
  const [voltage, setVoltage] = useState<string>('12');
  const [current, setCurrent] = useState<string>('5');
  const [length, setLength] = useState<string>('10');
  const [area, setArea] = useState<string>('2.08'); // Default 14AWG
  const [material, setMaterial] = useState<number>(0.0172); // Copper
  const [drop, setDrop] = useState<number>(0);

  useEffect(() => {
    const v = parseFloat(voltage);
    const i = parseFloat(current);
    const l = parseFloat(length);
    const a = parseFloat(area);

    if (v > 0 && i > 0 && l > 0 && a > 0) {
      // Loop resistance: R = 2 * resistivity * length / area
      const r = (2 * material * l) / a;
      const vDrop = i * r;
      setDrop(Math.round(vDrop * 100) / 100);
    } else {
      setDrop(0);
    }
  }, [voltage, current, length, area, material]);

  return (
    <div className="flex flex-col flex-1">
      <h2 className="font-instrument text-3xl mb-8">Voltage Drop (DC / 1φ)</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Input
          label="Source Voltage"
          value={voltage}
          onChange={(e) => setVoltage(e.target.value)}
          suffix="V"
          type="number"
        />
        <Input
          label="Current Load"
          value={current}
          onChange={(e) => setCurrent(e.target.value)}
          suffix="A"
          type="number"
        />
        <Input
          label="Cable Length (One-way)"
          value={length}
          onChange={(e) => setLength(e.target.value)}
          suffix="m"
          type="number"
        />
        <Input
          label="Wire Cross Section"
          value={area}
          onChange={(e) => setArea(e.target.value)}
          suffix="mm²"
          type="number"
          step="0.01"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-10">
        <div>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Conductor Material</p>
          <div className="flex gap-2">
            {WIRE_MATERIALS.slice(0, 2).map((m) => (
              <button
                key={m.name}
                onClick={() => setMaterial(m.resistivity)}
                className={`flex-1 px-4 py-2 border rounded-xl text-xs font-medium transition-all ${material === m.resistivity ? 'border-primary bg-primary text-white' : 'border-gray-200 bg-white hover:border-primary/50'}`}
              >
                {m.name}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Common AWG Sizes</p>
          <div className="flex flex-wrap gap-2">
            {['12', '14', '16', '18'].map((awg) => (
              <button
                key={awg}
                onClick={() => setArea(AWG_TO_MM2[awg].toString())}
                className="px-3 py-1.5 border border-gray-100 rounded-lg text-[10px] font-bold hover:border-primary transition-colors bg-white shadow-sm"
              >
                {awg} AWG
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-primary/5 rounded-2xl p-4 mb-8 flex justify-between items-center">
        <span className="text-xs font-semibold text-primary uppercase tracking-widest">Efficiency</span>
        <span className="font-instrument text-2xl text-primary">
          {drop > 0 ? (Math.max(0, 100 - (drop / parseFloat(voltage)) * 100)).toFixed(1) : '100'}%
        </span>
      </div>

      <ResultDisplay 
        label="Voltage Loss" 
        value={drop > 0 ? drop : '—'} 
        unit="V" 
      />
    </div>
  );
};

export default VoltageDropCalculator;
