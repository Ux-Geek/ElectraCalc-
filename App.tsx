
import React, { useState } from 'react';
import { CalculatorType } from './types';
import LEDCalculator from './components/LEDCalculator';
import OhmCalculator from './components/OhmCalculator';
import CombinationsCalculator from './components/CombinationsCalculator';
import BatteryCalculator from './components/BatteryCalculator';
import VoltageDropCalculator from './components/VoltageDropCalculator';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<CalculatorType>(CalculatorType.LED);

  const tabs = [
    { id: CalculatorType.LED, label: 'LED Resistor' },
    { id: CalculatorType.OHM, label: "Ohm's Law" },
    { id: CalculatorType.COMBINATIONS, label: 'Combinations' },
    { id: CalculatorType.BATTERY, label: 'Battery Life' },
    { id: CalculatorType.VOLTAGE_DROP, label: 'Voltage Drop' },
  ];

  const renderCalculator = () => {
    switch (activeTab) {
      case CalculatorType.LED: return <LEDCalculator />;
      case CalculatorType.OHM: return <OhmCalculator />;
      case CalculatorType.COMBINATIONS: return <CombinationsCalculator />;
      case CalculatorType.BATTERY: return <BatteryCalculator />;
      case CalculatorType.VOLTAGE_DROP: return <VoltageDropCalculator />;
      default: return <LEDCalculator />;
    }
  };

  return (
    <div className="min-h-screen bg-bgLight px-4 py-8 md:py-16">
      <div className="max-w-3xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="font-instrument text-5xl md:text-6xl text-textPrimary tracking-tight mb-2">
            ElectraCalc <span className="text-primary italic">Pro</span>
          </h1>
          <p className="font-inter text-textSecondary text-sm uppercase tracking-widest font-medium">
            Professional Engineering Suite
          </p>
        </header>

        {/* Navigation Tabs */}
        <nav className="flex space-x-1 overflow-x-auto no-scrollbar border-b border-gray-200 mb-10 pb-0.5">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap px-6 py-4 text-sm font-medium transition-all relative ${
                activeTab === tab.id
                  ? 'text-primary'
                  : 'text-textSecondary hover:text-textPrimary'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary animate-in fade-in slide-in-from-bottom-1 duration-300" />
              )}
            </button>
          ))}
        </nav>

        {/* Calculator Display */}
        <main className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 min-h-[500px] flex flex-col">
          {renderCalculator()}
        </main>

        <footer className="mt-16 text-center text-xs text-gray-400 font-inter">
          &copy; {new Date().getFullYear()} ElectraCalc Pro &bull; Precision Engineered for Clarity
        </footer>
      </div>
    </div>
  );
};

export default App;
