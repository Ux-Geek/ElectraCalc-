
export enum CalculatorType {
  LED = 'LED',
  OHM = 'OHM',
  COMBINATIONS = 'COMBINATIONS',
  BATTERY = 'BATTERY',
  VOLTAGE_DROP = 'VOLTAGE_DROP'
}

export interface LEDPreset {
  name: string;
  voltage: number;
}

export interface WireMaterial {
  name: string;
  resistivity: number; // Ω·mm²/m
}
