
import React, { useState } from 'react';

interface ResultDisplayProps {
  label: string;
  value: string | number;
  unit?: string;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ label, value, unit }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const text = `${value}${unit ? ' ' + unit : ''}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mt-auto pt-8 border-t border-gray-100">
      <div className="flex justify-between items-end">
        <div>
          <span className="text-xs font-semibold text-textSecondary uppercase tracking-widest block mb-2">
            {label}
          </span>
          <div className="flex items-baseline space-x-2">
            <span className="font-instrument text-5xl text-primary leading-none">
              {value}
            </span>
            {unit && (
              <span className="text-xl text-primary/60 font-medium font-inter">
                {unit}
              </span>
            )}
          </div>
        </div>
        <button
          onClick={handleCopy}
          className={`px-4 py-2 rounded-full text-xs font-semibold transition-all flex items-center space-x-2 ${
            copied 
              ? 'bg-green-50 text-green-600' 
              : 'bg-gray-50 text-gray-400 hover:bg-primary/5 hover:text-primary'
          }`}
        >
          {copied ? (
            <>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Copied</span>
            </>
          ) : (
            <>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
              </svg>
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
