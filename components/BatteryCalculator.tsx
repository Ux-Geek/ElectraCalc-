
import React, { useState, useEffect } from 'react';
import { Input } from './ui/Input';
import { ResultDisplay } from './ui/ResultDisplay';

const BatteryCalculator: React.FC = () => {
  const [capacity, setCapacity] = useState<string>('2500');
  const [consumption, setConsumption] = useState<string>('100');
  const [safetyFactor, setSafetyFactor] = useState<boolean>(true);
  const [hours, setHours] = useState<number>(0);

  useEffect(() => {
    const cap = parseFloat(capacity);
    const con = parseFloat(consumption);
    const multiplier = safetyFactor ? 0.7 : 1.0;

    if (cap > 0 && con > 0) {
      setHours(Math.round((cap * multiplier / con) * 10) / 10);
    } else {
      setHours(0);
    }
  }, [capacity, consumption, safetyFactor]);

  return (
    <div className="flex flex-col flex-1">
      <h2 className="font-instrument text-3xl mb-8">Battery Life Estimation</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <Input
          label="Battery Capacity"
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
          suffix="mAh"
          type="number"
        />
        <Input
          label="Average Consumption"
          value={consumption}
          onChange={(e) => setConsumption(e.target.value)}
          suffix="mA"
          type="number"
        />
      </div>

      <div className="mb-10 p-6 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-between">
        <div>
          <h4 className="text-sm font-bold text-textPrimary mb-1">Safety Factor (0.7x)</h4>
          <p className="text-xs text-textSecondary">Accounts for discharge efficiency and self-discharge.</p>
        </div>
        <button
          onClick={() => setSafetyFactor(!safetyFactor)}
          className={`w-14 h-8 rounded-full transition-all relative ${safetyFactor ? 'bg-primary' : 'bg-gray-200'}`}
        >
          <div className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${safetyFactor ? 'translate-x-6' : ''}`} />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="p-4 rounded-2xl border border-gray-100 text-center">
            <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Days</span>
            <span className="text-xl font-instrument text-textPrimary">{(hours / 24).toFixed(1)}</span>
        </div>
        <div className="p-4 rounded-2xl border border-gray-100 text-center">
            <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Weeks</span>
            <span className="text-xl font-instrument text-textPrimary">{(hours / 168).toFixed(1)}</span>
        </div>
      </div>

      <ResultDisplay 
        label="Estimated Runtime" 
        value={hours > 0 ? hours : '—'} 
        unit="Hours" 
      />
    </div>
  );
};

export default BatteryCalculator;
