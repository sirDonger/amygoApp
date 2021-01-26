import {
  Injectable,
  PayloadTooLargeException,
  UnsupportedMediaTypeException,
} from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { Logger } from '@nestjs/common';
import {constant} from '../../constants/constants'

@Injectable()
export class FileUploadService {
  async upload(file) {
    this.isFileValid(file);
    const { originalname } = file;
    const bucketS3 = process.env.S3_BUCKET_NAME;

    await this.uploadS3(file.buffer, bucketS3, originalname);
  }

  async uploadS3(file, bucket, name) {
    const s3 = this.getS3();
    const params = {
      Bucket: bucket,
      Key: String(name),
      Body: file,
    };
    return new Promise((resolve, reject) => {
      s3.upload(params, (err, data) => {
        if (err) {
          Logger.error(err);
          reject(err.message);
        }
        resolve(data);
      });
    });
  }

  getS3() {
    return new S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });
  }

  isFileValid(file) {
    if (file.size > constant.MAX_FILE_SIZE){
      throw new PayloadTooLargeException()
    }

    if(!constant.ALLOWED_MIME_TYPES.includes(file.mimetype)){
      throw new UnsupportedMediaTypeException()
    }
  }

  delete(imageName) {
    const s3 = this.getS3();
    const params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: imageName.slice(process.env.S3_BUCKET_URL.length)
    }

    return new Promise((resolve, reject) => {
      s3.createBucket({
        Bucket: process.env.S3_BUCKET_NAME
      }, function() {
        s3.deleteObject(params, function(err, data) {
          if (err) console.log(err);
          else
            console.log("Successfully deleted file from bucket");
            console.log(data);
            resolve(data)
        });
      });
      return
    });
  }
}
