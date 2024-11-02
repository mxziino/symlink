import fs from 'fs';
import path from 'path';

export const createSymlink = async (sourcePath, destinationPath) => {
  try {
    // Create destination directory if it doesn't exist
    const destDir = path.dirname(destinationPath);
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }

    // Create the symlink
    await fs.promises.symlink(sourcePath, destinationPath);
    return true;
  } catch (error) {
    console.error('Error creating symlink:', error);
    throw error;
  }
};

export const deleteSymlink = async (symlinkPath) => {
  try {
    if (fs.existsSync(symlinkPath) && fs.lstatSync(symlinkPath).isSymbolicLink()) {
      await fs.promises.unlink(symlinkPath);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error deleting symlink:', error);
    throw error;
  }
};

export const listSymlinks = async (directory) => {
  try {
    const items = await fs.promises.readdir(directory);
    const symlinks = [];

    for (const item of items) {
      const fullPath = path.join(directory, item);
      if (fs.lstatSync(fullPath).isSymbolicLink()) {
        const target = await fs.promises.readlink(fullPath);
        symlinks.push({ path: fullPath, target });
      }
    }

    return symlinks;
  } catch (error) {
    console.error('Error listing symlinks:', error);
    throw error;
  }
};