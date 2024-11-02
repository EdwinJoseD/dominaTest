import mongoose from 'mongoose';

const { MONGO_URI }: any = process.env;

export const MongoDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {});
    console.log('MongoDB connected!!');
  } catch (error) {
    console.error('MongoDB connection failed', error);
    throw new Error('MongoDB connection failed');
  }
};
