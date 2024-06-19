import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class ApisService {
  getFields(requested_api: string) {
    const filePath = path.resolve(
      __dirname,
      'json/' + requested_api + '/fields.json',
    );
    return JSON.parse(
      fs.readFileSync(path.resolve(__dirname, filePath), 'utf8'),
    );
  }
}
