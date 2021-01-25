import { HttpException, HttpStatus } from '@nestjs/common';
import path = require('path');
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';

const imageFileFilter = (req, file, callback) => {
  //TODO Maybe other formats??
  if (!file.originalname.match(/\.(jpg|png|jpeg|gif)$/)) {
    return callback(
      new HttpException(
        'Only image files are allowed!',
        HttpStatus.BAD_REQUEST,
      ),
      false,
    );
  }
  callback(null, true);
};

export const fileLimits = {
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  storage: diskStorage({
    //TODO change destination to real server
    destination: './uploads/profileAvatars',
    filename: (req, file, cb) => {
      const filename: string =
        path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
      const extension: string = path.parse(file.originalname).ext;

      cb(null, `${filename}${extension}`);
    },
  }),
  fileFilter: imageFileFilter,
};
