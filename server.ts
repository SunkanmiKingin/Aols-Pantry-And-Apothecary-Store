import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { initDatabase } from './server/db';
import { apiRouter } from './server/api';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;
  const isProduction = process.env.NODE_ENV === 'production';

  app.use(cors());
  app.use(express.json());

  // Initialize SQLite database & migrations
  await initDatabase();

  // Mount backend API routes under /api
  app.use('/api', apiRouter);

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      service: 'Akinnike Ols Pantry & Apothecary Full-Stack Server',
      database: 'SQLite (LibSQL)',
      timestamp: new Date().toISOString(),
    });
  });

  if (!isProduction) {
    // Development mode: Vite middleware
    console.log('[Server] Mounting Vite dev middleware...');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Production mode: Serve built static files
    console.log('[Server] Serving production static files...');
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Server] Akinnike Ols Pantry running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('[Server Error]:', err);
  process.exit(1);
});
