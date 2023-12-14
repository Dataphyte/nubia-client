//=============================================>
// ======= ICONS -->
//=============================================>

type IconProps = {
  sx?: string;
  fill?: string;
  action?: () => void;
};

//=============================================>
// ======= NOTIFICATIONS -->
//=============================================>

type NotificationContentType = {
  text: string;
  type: 'success' | 'error' | 'info';
  description: string;
};

type NotificationStoreInterface = {
  content: NotificationContentType;
  show: boolean;
  setContent: (params: NotificationContentType) => void;
  setShow: (state: boolean) => void;
};

type SubscribeStore = {
  seen: boolean;
  setSeen: () => void;
};

//=============================================>
// ======= ENUMS -->
//=============================================>
enum UserAccountTypeEnum {
  INDIVIDUAL = 'individual',
  ORGANIZATION = 'organization',
}

enum SubscriptionEnum {
  FREE = 'FREE',
  STANDARD = 'STANDARD',
  PREMIUM = 'PREMIUM',
  GOLD = 'GOLD',
  ENTREPRENEUR = 'ENTREPRENEUR',
}
