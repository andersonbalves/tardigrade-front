import { Controller, Get } from '@nestjs/common';
import { MenuService } from './menu.service';

@Controller('v1/menu')
export class MenuController {
  constructor(private menuService: MenuService) {}
  @Get()
  getMenu() {
    console.log(this.menuService.createMenu());
    return this.menuService.createMenu();
  }
}
