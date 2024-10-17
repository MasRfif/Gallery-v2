import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Buffer } from 'buffer';
import dotenv from 'dotenv';

dotenv.config();

const BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME as string;
const REGION = process.env.AWS_S3_BUCKET_REGION as string;
const ACCESS_KEY = process.env.AWS_S3_ACCESS_KEY as string;
const SECRET_ACCESS_KEY = process.env.AWS_S3_SECRET_ACCESS_KEY as string;

const s3Client = new S3Client({
  region: REGION,
  credentials: {
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY,
  },
});

export function uploadFile(
  fileBuffer: Buffer,
  fileName: string,
  mimetype: string,
) {
  const uploadParams = {
    Bucket: BUCKET_NAME,
    Body: fileBuffer,
    Key: fileName,
    ContentType: mimetype,
  };
  return s3Client.send(new PutObjectCommand(uploadParams));
}
export function deleteFile(fileName: string) {
  const deleteParams = {
    Bucket: BUCKET_NAME,
    Key: fileName,
  };
  return s3Client.send(new DeleteObjectCommand(deleteParams));
}
export async function getFileUrl(fileName: string) {
  const getParams = new GetObjectCommand({
    Bucket: BUCKET_NAME,
    Key: fileName,
  });
  const url = await getSignedUrl(s3Client, getParams, { expiresIn: 3600 });
  return url;
}
