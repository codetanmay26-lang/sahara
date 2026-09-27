export interface ElderVitals {
  heartRate: number;
  steps: number;
  sleepHours: number;
  medicationStatus: 'taken' | 'pending' | 'missed';
  lastActive: string;
}

export interface ElderState {
  id: string;
  name: string;
  age: number;
  vitals: ElderVitals;
  status: 'active' | 'resting' | 'away' | 'help_needed';
  mood: string;
}

export interface CaregiverAlert {
  id: string;
  type: 'urgent' | 'info' | 'warning';
  message: string;
  time: string;
  read: boolean;
}

export interface VoiceInteraction {
  id: string;
  sender: 'senior' | 'saathi';
  text: string;
  timestamp: Date;
}

export interface MemoryMedia {
  id: string;
  title: string;
  type: 'image' | 'video' | 'audio';
  url: string;
  dateAdded: string;
  description?: string;
}

export interface LegacyMemory {
  id: string;
  title: string;
  titleHi?: string;
  type: 'photo' | 'video' | 'voice';
  url: string; // Base64 data URL or mock public URL
  dateAdded: string;
  description: string;
  descriptionHi?: string;
  isPinned: boolean;
  category: 'family' | 'career' | 'education' | 'travel' | 'spiritual' | 'celebrations' | 'life_lessons';
  contributor: 'senior' | 'family';
}

export interface LifeStory {
  id: string;
  title: string;
  titleHi?: string;
  category: string;
  categoryHi?: string;
  content: string;
  contentHi?: string;
  dateCreated: string;
}

export interface TimelineEvent {
  id: string;
  year: string;
  title: string;
  titleHi?: string;
  description: string;
  descriptionHi?: string;
}

export interface FutureMessage {
  id: string;
  category: 'advice' | 'values' | 'blessings' | 'wishes' | 'letters';
  categoryHi?: string;
  title: string;
  titleHi?: string;
  content: string;
  contentHi?: string;
  dateAdded: string;
}

export interface LegacyContribution {
  id: string;
  contributor: string;
  relation: string;
  type: 'photo' | 'video' | 'voice' | 'milestone';
  title: string;
  timestamp: string;
}
