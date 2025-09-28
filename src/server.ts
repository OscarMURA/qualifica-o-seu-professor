import app from './app';
import { connectDB } from './config/connectionDB';

(async () => {
  await connectDB();
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`API up on :${PORT}`));
})();
