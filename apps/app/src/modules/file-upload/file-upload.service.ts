import {
  Injectable,
  PayloadTooLargeException,
  ServiceUnavailableException,
  UnsupportedMediaTypeException,
} from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { constant } from '../../constants';

@Injectable()
export class FileUploadService {
  async upload(file) {
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

    await s3.upload(params, (err, data) => {
      if (err) {
        throw new ServiceUnavailableException(err);
      }
      return data;
    });
  }

  getS3() {
    return new S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });
  }

  isFileValid(file) {
    console.log(file)
    if (file.size > constant.MAX_FILE_SIZE) {
      throw new PayloadTooLargeException();
    }

    if (!constant.ALLOWED_MIME_TYPES.includes(file.mimetype)) {
      throw new UnsupportedMediaTypeException();
    }
  }

  async delete(imageName) {
    const s3 = this.getS3();
    const params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: imageName.slice(process.env.S3_BUCKET_URL.length),
    };

    await s3.createBucket({ Bucket: process.env.S3_BUCKET_NAME }, function () {
      s3.deleteObject(params, function (err, data) {
        if (err) {
          throw new ServiceUnavailableException(err);
        }
        return data;
      });
    });
  }
}
