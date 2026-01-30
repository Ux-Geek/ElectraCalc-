
import React, { useState, useEffect } from 'react';
import { Input } from './ui/Input';
import { ResultDisplay } from './ui/ResultDisplay';

const CombinationsCalculator: React.FC = () => {
  const [componentType, setComponentType] = useState<'resistor' | 'capacitor'>('resistor');
  const [config, setConfig] = useState<'series' | 'parallel'>('series');
  const [values, setValues] = useState<string[]>(['100', '100']);
  const [total, setTotal] = useState<number>(0);

  const addComponent = () => setValues([...values, '100']);
  const removeComponent = (index: number) => {
    if (values.length > 2) {
      setValues(values.filter((_, i) => i !== index));
    }
  };

  const updateValue = (index: number, val: string) => {
    const next = [...values];
    next[index] = val;
    setValues(next);
  };

  useEffect(() => {
    const nums = values.map(v => parseFloat(v)).filter(n => !isNaN(n) && n > 0);
    if (nums.length === 0) {
      setTotal(0);
      return;
    }

    let calculated = 0;
    if (componentType === 'resistor') {
      if (config === 'series') {
        calculated = nums.reduce((a, b) => a + b, 0);
      } else {
        const sumInv = nums.reduce((a, b) => a + (1 / b), 0);
        calculated = 1 / sumInv;
      }
    } else {
      // Capacitors are opposite
      if (config === 'series') {
        const sumInv = nums.reduce((a, b) => a + (1 / b), 0);
        calculated = 1 / sumInv;
      } else {
        calculated = nums.reduce((a, b) => a + b, 0);
      }
    }
    setTotal(Math.round(calculated * 100) / 100);
  }, [componentType, config, values]);

  return (
    <div className="flex flex-col flex-1">
      <h2 className="font-instrument text-3xl mb-8">Component Combinations</h2>

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="flex bg-gray-100 p-1 rounded-2xl w-full sm:w-auto">
          <button 
            onClick={() => setComponentType('resistor')}
            className={`flex-1 px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${componentType === 'resistor' ? 'bg-white text-primary shadow-sm' : 'text-textSecondary'}`}
          >
            Resistors
          </button>
          <button 
            onClick={() => setComponentType('capacitor')}
            className={`flex-1 px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${componentType === 'capacitor' ? 'bg-white text-primary shadow-sm' : 'text-textSecondary'}`}
          >
            Capacitors
          </button>
        </div>

        <div className="flex bg-gray-100 p-1 rounded-2xl w-full sm:w-auto">
          <button 
            onClick={() => setConfig('series')}
            className={`flex-1 px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${config === 'series' ? 'bg-white text-primary shadow-sm' : 'text-textSecondary'}`}
          >
            Series
          </button>
          <button 
            onClick={() => setConfig('parallel')}
            className={`flex-1 px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${config === 'parallel' ? 'bg-white text-primary shadow-sm' : 'text-textSecondary'}`}
          >
            Parallel
          </button>
        </div>
      </div>

      <div className="space-y-4 mb-8 max-h-[300px] overflow-y-auto pr-2 no-scrollbar">
        {values.map((val, idx) => (
          <div key={idx} className="flex items-end space-x-3">
            <Input
              label={`${componentType === 'resistor' ? 'R' : 'C'}${idx + 1}`}
              value={val}
              onChange={(e) => updateValue(idx, e.target.value)}
              suffix={componentType === 'resistor' ? 'Ω' : 'μF'}
              type="number"
            />
            {values.length > 2 && (
              <button 
                onClick={() => removeComponent(idx)}
                className="p-3 text-gray-300 hover:text-red-500 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            )}
          </div>
        ))}
      </div>

      <button 
        onClick={addComponent}
        className="self-start flex items-center space-x-2 text-primary font-bold text-xs uppercase tracking-widest hover:opacity-70 transition-opacity mb-8"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        <span>Add Component</span>
      </button>

      <ResultDisplay 
        label="Total Combined Value" 
        value={total > 0 ? total : '—'} 
        unit={componentType === 'resistor' ? 'Ω' : 'μF'} 
      />
    </div>
  );
};

export default CombinationsCalculator;
