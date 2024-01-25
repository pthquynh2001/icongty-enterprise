import { User } from 'next-auth';

interface FavoritesItemProps {
  user: User;
}

const FavoritesItem = ({ user }: FavoritesItemProps) => {
  return <div>Favorites Item</div>;
};

export default FavoritesItem;
