export interface Show {
  id: string;
  date: string;
  location: string;
  lineup: string[];
  performers: Comedian[];
  hostId?: string;
  notes: string;
  income_expenses_id: string;
  attendance: number;
}

export interface Venue {
  id: string;
  name: string;
  address: string;
  contact: {
    name: string;
    email: string;
    phone: string;
  };
  socialMedia: {
    twitter: string;
    instagram: string;
    youtube: string;
    facebook: string;
  };
  imageUrl: string;
  availableDays: string[];
  showHistory: string[];
}

export interface Comedian {
  id: string;
  name: string;
  contact: {
    email: string;
    phone: string;
  };
  socialMedia: {
    instagram: string;
    facebook: string;
    youtube: string;
    x: string;
  };
  imageUrl: string;
  introSong: string;
  observations: string;
  performanceHistory: string[];
}

export interface Transaction {
    id: string;
    showId: string;
    date: string;
    type: 'income' | 'expense';
    category: 'ticket sales' | 'merchandise' | 'venue rental' | 'marketing' | 'performer payment' | 'other';
    amount: number;
    description: string;
}
