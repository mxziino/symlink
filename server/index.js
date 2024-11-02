import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs/promises';
import { existsSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3001;

// Task status tracking
let taskStatus = {
  running: false,
  lastMessage: '',
  messages: []
};

app.use(cors());
app.use(express.json());

const logToWeb = (message, level = "INFO") => {
  const logMessage = `${level}: ${message}`;
  taskStatus.lastMessage = logMessage;
  taskStatus.messages.push(logMessage);
  if (taskStatus.messages.length > 100) {
    taskStatus.messages.shift();
  }
};

app.get('/api/media', async (req, res) => {
  try {
    const settings = await getSettings();
    const destDir = settings.destDir || '/mnt/realdebrid';
    
    const media = {
      shows: [],
      animeShows: [],
      movies: []
    };

    // Scan shows directory
    const showsDir = join(destDir, 'shows');
    if (existsSync(showsDir)) {
      const shows = await fs.readdir(showsDir);
      for (const show of shows.sort()) {
        const showPath = join(showsDir, show);
        const stats = await fs.stat(showPath);
        if (stats.isDirectory()) {
          const seasons = (await fs.readdir(showPath))
            .filter(async s => (await fs.stat(join(showPath, s))).isDirectory())
            .sort();
          media.shows.push({
            name: show,
            seasons,
            path: showPath
          });
        }
      }
    }

    // Similar logic for anime and movies...
    
    res.json(media);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/scan', async (req, res) => {
  const { splitDirs, force } = req.body;
  
  if (taskStatus.running) {
    return res.status(400).json({ error: 'A scan is already running' });
  }

  try {
    taskStatus.running = true;
    taskStatus.messages = [];
    
    // Implement your symlink creation logic here
    
    res.json({ message: 'Scan completed successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    taskStatus.running = false;
  }
});

app.get('/api/status', (req, res) => {
  res.json(taskStatus);
});

app.post('/api/symlink/delete', async (req, res) => {
  const { path } = req.body;
  
  try {
    const stats = await fs.lstat(path);
    if (stats.isSymbolicLink()) {
      await fs.unlink(path);
      res.json({ message: 'Symlink deleted successfully' });
    } else {
      res.status(400).json({ error: 'Not a symlink' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/symlink/move', async (req, res) => {
  const { path, destination } = req.body;
  
  try {
    const settings = await getSettings();
    const destDir = settings.destDir;
    
    const showName = path.split('/').slice(-2)[0];
    const season = path.split('/').pop();
    const target = await fs.readlink(path);
    
    const newBasePath = join(destDir, destination, showName);
    const newPath = join(newBasePath, season);
    
    await fs.mkdir(newBasePath, { recursive: true });
    await fs.unlink(path);
    await fs.symlink(target, newPath);
    
    res.json({ message: 'Symlink moved successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});