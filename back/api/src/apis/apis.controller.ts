import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';
import { ApisService } from './apis.service';

@Controller('v1/apis')
export class ApisController {
  constructor(private apisService: ApisService) {}

  @Get('*')
  findAPIFields(@Req() request: Request) {
    const requestedApi = request.url.replace('/v1/apis/', '');
    return this.apisService.getFields(requestedApi);
  }
}
