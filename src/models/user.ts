import mongoose, { Schema, models } from 'mongoose';

export interface UserDocument extends Document {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  phone?: number;
}

const userSchema = new Schema<UserDocument>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: { type: String, required: true },
    phone: { type: Number, required: false },
  },
  {
    timestamps: true,
  }
);

const User = models.User || mongoose.model('User', userSchema);

export default User;
