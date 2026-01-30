
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  suffix?: string;
  helperText?: string;
}

export const Input: React.FC<InputProps> = ({ label, suffix, helperText, className = "", ...props }) => {
  return (
    <div className={`flex flex-col space-y-1.5 w-full ${className}`}>
      <label className="text-xs font-semibold text-textSecondary uppercase tracking-wider">
        {label}
      </label>
      <div className="relative group">
        <input
          {...props}
          className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-textPrimary font-medium focus:ring-2 focus:ring-primary/10 focus:border-primary outline-none transition-all placeholder:text-gray-300"
        />
        {suffix && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-400 font-medium">
            {suffix}
          </span>
        )}
      </div>
      {helperText && (
        <p className="text-[10px] text-gray-400 italic mt-1">{helperText}</p>
      )}
    </div>
  );
};
