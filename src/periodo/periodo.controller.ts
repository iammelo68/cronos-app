import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { PeriodoService } from './periodo.service';
import { CreatePeriodoDto } from './dto/create-periodo.dto';

@Controller('periodo')
export class PeriodoController {
  constructor(private readonly periodoService: PeriodoService) {}

  @Post("create")
  async createPeriodo(@Body() data: CreatePeriodoDto) {
    return await this.periodoService.create(data);
  }

  @Get("all")
  async getAllPeriodos() {
    return await this.periodoService.findAll();
  }

  @Put("update")
  async updatePeriodo(@Body('id') id: number, @Body() data: Partial<CreatePeriodoDto>) {
    return await this.periodoService.update(id, data);
  }

  @Delete("delete")
  async deletePeriodo(@Body('id') id: number) {
    return await this.periodoService.delete(id);
  }
}