import mongoose from 'mongoose';

import { config } from '../config';
import Languages from "../utils/Languages";

export async function connectDatabase() {
  try {
    await mongoose.connect(config.mongoUri as string);
    console.log(Languages.Database.connection[config.language]);
  } catch (error) {
    console.error(Languages.Database.error_connection[config.language], error);
    process.exit(1);
  }
}