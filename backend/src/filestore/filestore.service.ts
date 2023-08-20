import { Injectable } from "@nestjs/common";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import {
  getSignedUrl,
  S3RequestPresigner,
} from "@aws-sdk/s3-request-presigner";

@Injectable()
export class FilestoreService {
  client: S3Client;

  constructor() {
    this.client = new S3Client({
      endpoint: `http://127.0.0.1:8333`,
      region: `king-region`,
      forcePathStyle: true,
      // credentials is mandatory and s3 authorization should be enabled with `s3.configure`
      credentials: {
        accessKeyId: `same as -accesskey`,
        secretAccessKey: `same as -secretkey`,
      },
    });
  }

  private async createPresignedUrl(bucket: string) {
    const putParams = {
      Bucket: bucket,
      ACL: "public-read",
      Key: "king-key",
    };

    const client_url = await getSignedUrl(
      this.client,
      new PutObjectCommand(putParams),
      { expiresIn: 60 * 60 },
    );

    return client_url;
  }

  async getUploadMemberPhotoUrl() {
    const bucket = `member-photo`;
    const url = await this.createPresignedUrl(bucket);
    return url;
  }
}
