import dotenv from 'dotenv';
import app from './app';
import { connectDB } from './config/connectionDB';

dotenv.config();

(async () => {
  await connectDB();
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`API up on :${PORT}`));
})();
