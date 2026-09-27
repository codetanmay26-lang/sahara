import type { ElderState, CaregiverAlert } from '../types';

// Mock DB initial state
const MOCK_ELDER: ElderState = {
  id: 'harish-1',
  name: 'Harish Chandra',
  age: 76,
  status: 'resting',
  mood: 'Calm & Relaxed',
  vitals: {
    heartRate: 72,
    steps: 3840,
    sleepHours: 7.5,
    medicationStatus: 'taken',
    lastActive: '10 mins ago'
  }
};

const MOCK_ALERTS: CaregiverAlert[] = [
  { id: '1', type: 'warning', message: 'Activity level is lower than average for a Monday morning.', time: '11:45 AM', read: false },
  { id: '2', type: 'info', message: 'Morning blood pressure checked: 122/81 mmHg. (Optimal)', time: '9:15 AM', read: true },
  { id: '3', type: 'urgent', message: 'Dad reported a minor dizzy spell. Emergency contact notified.', time: 'Yesterday, 6:30 PM', read: true }
];

export const mockDataService = {
  getElderStatus: (): Promise<ElderState> => {
    return Promise.resolve({ ...MOCK_ELDER });
  },

  getAlerts: (): Promise<CaregiverAlert[]> => {
    return Promise.resolve([...MOCK_ALERTS]);
  },

  logAlert: (type: 'urgent' | 'warning' | 'info', message: string): Promise<CaregiverAlert> => {
    const newAlert: CaregiverAlert = {
      id: Date.now().toString(),
      type,
      message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: false
    };
    return Promise.resolve(newAlert);
  }
};
