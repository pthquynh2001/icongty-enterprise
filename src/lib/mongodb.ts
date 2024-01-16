import mongoose from 'mongoose';

export const connectMongoDB = async () => {
  try {
    const mongodbUrl = process.env.MONGODB_URI || '';
    await mongoose.connect(mongodbUrl);
    console.log('MongoDB connected');
  } catch (error) {
    console.log('Error connecting to MongoDB', error);
  }
};
