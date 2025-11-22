import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { SalaService } from './sala.service';
import { CreateSalaDto } from './dto/create-sala.dto';

@Controller('sala')
export class SalaController {
  constructor(private readonly salaService: SalaService) {}

  @Post("create")
  async createSala(@Body() data: CreateSalaDto) {
    return await this.salaService.create(data);
  }

  @Get("all")
  async getAllSalas() {
    return await this.salaService.findAll();
  }

  @Put("update")
  async updateSala(@Body('id') id: number, @Body() data: Partial<CreateSalaDto>) {
    return await this.salaService.update(id, data);
  }

  @Delete("delete")
  async deleteSala(@Body('id') id: number) {
    return await this.salaService.delete(id);
  }
}