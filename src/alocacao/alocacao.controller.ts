import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { AlocacaoService } from './alocacao.service';
import { CreateAlocacaoDto } from './dto/create-alocacao.dto';

@Controller('alocacao')
export class AlocacaoController {
  constructor(private readonly alocacaoService: AlocacaoService) {}

  @Post("create")
  async createAlocacao(@Body() data: CreateAlocacaoDto) {
    return await this.alocacaoService.create(data);
  }

  @Get("all")
  async getAllAlocacoes() {
    return await this.alocacaoService.findAll();
  }

  @Put("update")
  async updateAlocacao(@Body('id') id: number, @Body() data: Partial<CreateAlocacaoDto>) {
    return await this.alocacaoService.update(id, data);
  }

  @Delete("delete")
  async deleteAlocacao(@Body('id') id: number) {
    return await this.alocacaoService.delete(id);
  }
}