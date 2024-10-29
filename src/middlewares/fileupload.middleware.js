// 1. Import multer.
import multer from 'multer';

// 2. Configure storage with filename and location.

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads'); // Ensure the 'uploads' folder exists
  },
  filename: (req, file, cb) => {
    // Replace colons from the date string to avoid issues with file names
    const timestamp = new Date().toISOString().replace(/:/g, '-');
    const uniqueSuffix = timestamp + file.originalname;
    cb(null, uniqueSuffix);
  },
});

export const upload = multer({
  storage: storage,
});
