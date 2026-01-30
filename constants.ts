
import { LEDPreset, WireMaterial } from './types';

export const LED_PRESETS: LEDPreset[] = [
  { name: 'Red', voltage: 2.0 },
  { name: 'Green', voltage: 3.2 },
  { name: 'Blue', voltage: 3.2 },
  { name: 'Yellow', voltage: 2.1 },
  { name: 'White', voltage: 3.3 },
  { name: 'Infrared', voltage: 1.2 },
];

export const WIRE_MATERIALS: WireMaterial[] = [
  { name: 'Copper', resistivity: 0.0172 },
  { name: 'Aluminum', resistivity: 0.0265 },
  { name: 'Silver', resistivity: 0.0159 },
  { name: 'Gold', resistivity: 0.0244 },
];

export const AWG_TO_MM2: Record<string, number> = {
  '10': 5.26,
  '12': 3.31,
  '14': 2.08,
  '16': 1.31,
  '18': 0.823,
  '20': 0.518,
  '22': 0.326,
  '24': 0.205,
};
