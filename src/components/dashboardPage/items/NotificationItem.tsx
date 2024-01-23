import { User } from '@/types';

interface NotificationItemProps {
  user: User;
}

const NotificationItem = ({ user }: NotificationItemProps) => {
  return <div>Notification Item</div>;
};

export default NotificationItem;
