import dotenv from 'dotenv';
import app from './app';
import { connectDB } from './config/connectionDB';

dotenv.config();

export async function startServer(port?: number) {
  await connectDB();
  const PORT = port || process.env.PORT || 3000;
  const HOST = process.env.HOST || '0.0.0.0';
  
  app.listen(PORT, HOST, () => {
    console.log(`API up on ${HOST}:${PORT}`);
    console.log(`Server accessible from all IPs on port ${PORT}`);
  });
}

// Only start the server when this file is run directly
if (require.main === module) {
  startServer().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}

