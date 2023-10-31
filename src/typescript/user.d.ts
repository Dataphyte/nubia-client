interface UserInterface {
  _id: string;
  name: string;
  email: string;
  password: string;
  email_verified: string;
  account_type: 'individual' | 'organization';
  image: string;
  organization;
  createdAt: string;
  projects: string[];
  subscription: 'FREE' | 'STANDARD' | 'PREMIUM' | 'GOLD' | 'ENTREPRENEUR';
  subscription_renew: 'MONTHLY' | 'YEARLY';
  preferences: any;
  organization: {
    name: string;
    position: string;
    size: number;
    niche: string;
  } | null;
}

interface UserStore {
  user: UserInterface | null;
  setUser: (userData: UserInterface) => void;
}
