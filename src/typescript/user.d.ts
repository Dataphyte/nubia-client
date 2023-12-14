interface UserInterface {
  _id: string;
  name: string;
  email: string;
  password: string;
  email_verified: string;
  account_type: UserAccountTypeEnum;
  image: string;
  organization;
  createdAt: string;
  projects: string[];
  subscription: SubscriptionEnum;
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
  userUpdateData: userUpdateData | null;
  setUserUpdateData: (data: userupdateData) => void;
  setUser: (userData: UserInterface) => void;
}

interface userUpdateData {
  name: string;
  old_password?: string;
  new_password: string;
  account_type: UserAccountTypeEnum;
}
