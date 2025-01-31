export interface User {
  name: string;
  email: string;
  isVerified: boolean;
}

export interface Organization {
  name: string;
  website: string;
  description: string;
}

export interface WebpageStatus {
  url: string;
  status: 'pending' | 'scraped' | 'failed';
  chunks?: string[];
  lastUpdated: string;
}

export interface Step {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
}