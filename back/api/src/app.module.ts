import { Module } from '@nestjs/common';
import { ApisModule } from './apis/apis.module';
import { MenuModule } from './menu/menu.module';

@Module({
  imports: [ApisModule, MenuModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
