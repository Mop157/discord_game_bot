import mongoose from 'mongoose';
import { config } from '../config';

export async function connectDatabase() {
  try {
    await mongoose.connect(config.mongoUri as string);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
}