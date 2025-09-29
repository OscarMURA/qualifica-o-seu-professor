import dotenv from 'dotenv';
import app from './app';
import { connectDB } from './config/connectionDB';

dotenv.config();

export async function startServer(port?: number) {
  await connectDB();
  const PORT = port || process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`API up on :${PORT}`));
}

// Only start the server when this file is run directly
if (require.main === module) {
  startServer().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}

