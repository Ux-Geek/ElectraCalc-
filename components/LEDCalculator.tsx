
import React, { useState, useEffect } from 'react';
import { Input } from './ui/Input';
import { ResultDisplay } from './ui/ResultDisplay';
import { LED_PRESETS } from '../constants';

const LEDCalculator: React.FC = () => {
  const [sourceVoltage, setSourceVoltage] = useState<string>('5');
  const [forwardVoltage, setForwardVoltage] = useState<string>('2.0');
  const [forwardCurrent, setForwardCurrent] = useState<string>('20');
  const [resistor, setResistor] = useState<number>(0);

  useEffect(() => {
    const vs = parseFloat(sourceVoltage);
    const vf = parseFloat(forwardVoltage);
    const ifA = parseFloat(forwardCurrent) / 1000;

    if (vs > vf && ifA > 0) {
      setResistor(Math.round(((vs - vf) / ifA) * 10) / 10);
    } else {
      setResistor(0);
    }
  }, [sourceVoltage, forwardVoltage, forwardCurrent]);

  const selectPreset = (v: number) => {
    setForwardVoltage(v.toString());
  };

  return (
    <div className="flex flex-col flex-1">
      <h2 className="font-instrument text-3xl mb-8">LED Series Resistor</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Input
          label="Source Voltage"
          value={sourceVoltage}
          onChange={(e) => setSourceVoltage(e.target.value)}
          suffix="V"
          type="number"
          step="0.1"
        />
        <Input
          label="Forward Voltage"
          value={forwardVoltage}
          onChange={(e) => setForwardVoltage(e.target.value)}
          suffix="V"
          type="number"
          step="0.1"
        />
        <Input
          label="Forward Current"
          value={forwardCurrent}
          onChange={(e) => setForwardCurrent(e.target.value)}
          suffix="mA"
          type="number"
        />
      </div>

      <div className="mb-10">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Quick Presets</p>
        <div className="flex flex-wrap gap-2">
          {LED_PRESETS.map((p) => (
            <button
              key={p.name}
              onClick={() => selectPreset(p.voltage)}
              className="px-4 py-2 border border-gray-200 rounded-full text-xs font-medium hover:border-primary hover:text-primary transition-colors bg-white shadow-sm"
            >
              {p.name} ({p.voltage}V)
            </button>
          ))}
        </div>
      </div>

      <ResultDisplay 
        label="Required Resistance" 
        value={resistor > 0 ? resistor : '—'} 
        unit="Ω" 
      />
    </div>
  );
};

export default LEDCalculator;
