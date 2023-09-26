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
