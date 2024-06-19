import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class MenuService {
  createMenu() {
    return JSON.parse(
      fs.readFileSync(path.resolve(__dirname, 'json/menu.json'), 'utf8'),
    );
  }
}
