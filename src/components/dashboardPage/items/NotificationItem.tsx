import { User } from 'next-auth';

interface NotificationItemProps {
  user: User;
}

const NotificationItem = ({ user }: NotificationItemProps) => {
  return <div>Notification Item</div>;
};

export default NotificationItem;
