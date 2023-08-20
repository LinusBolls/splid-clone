import { Injectable } from "@nestjs/common";
import {
  ListBucketsCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

@Injectable()
export class FilestoreService {
  private client: S3Client;
  buckets: string[] = ["member-photo", "group-photo"];

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

    // fixme, race condition between possible first uploads and bucket creation
    this.initBuckets();
  }

  private async initBuckets() {
    const existing = await this.listBuckets();
    for (const bucket of this.buckets) {
      console.log(bucket + ' ' + existing.includes(bucket));
      if (!existing.includes(bucket)) {
        await this.client.send(
          new PutObjectCommand({
            Key: bucket,
            Bucket: bucket,
          }),
        );
        console.debug(`Created bucket ${bucket}`);
      }
    }
  }

  private async listBuckets(): Promise<string[]> {
    const data = await this.client.send(new ListBucketsCommand({}));
    console.log(data.Buckets);
    return data.Buckets.map((bucket) => bucket.Name);
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
