import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { AdministradorService } from './administrador.service';
import { CreateAdministradorDto } from './dto/create-administrador.dto';

@Controller('administrador')
export class AdministradorController {
  constructor(private readonly administradorService: AdministradorService) {}

  @Post("create")
  async createAdmin(@Body() data: CreateAdministradorDto) {
    return await this.administradorService.create(data);
  }

  @Get("all")
  async getAllAdmins() {
    return await this.administradorService.findAll();
  }

  @Put("update")
  async updateAdmin(@Body('id') id: number, @Body() data: Partial<CreateAdministradorDto>) {
    return await this.administradorService.update(id, data);
  }

  @Delete("delete")
  async deleteAdmin(@Body('id') id: number) {
    return await this.administradorService.delete(id);
  }
}