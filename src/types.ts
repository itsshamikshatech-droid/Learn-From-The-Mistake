export interface Chapter {
  id: number;
  key: string;
  title: string;
  description: string;
}

export interface PersonalityTimelineEvent {
  year?: string;
  title: string;
  description: string;
}

export interface Personality {
  id: number;
  name: string;
  profession: string;
  quote: string;
  iconType: 'rocket' | 'basketball' | 'bulb' | 'book' | 'apple';
  timeline: PersonalityTimelineEvent[];
  lesson: string;
  imageUrl?: string;
}

export interface DoorData {
  id: number;
  title: string;
  color: string;
  mistake: string;
  lesson: string;
  action: string;
  success: string;
}

export interface Quote {
  id: number;
  text: string;
  author: string;
}
