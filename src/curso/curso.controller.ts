import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { CursoService } from './curso.service';
import { CreateCursoDto } from './dto/create-curso.dto';

@Controller('curso')
export class CursoController {
  constructor(private readonly cursoService: CursoService) {}

  @Post("create")
  async createCurso(@Body() data: CreateCursoDto) {
    return await this.cursoService.create(data);
  }

  @Get("all")
  async getAllCursos() {
    return await this.cursoService.findAll();
  }

  @Put("update")
  async updateCurso(@Body('id') id: number, @Body() data: Partial<CreateCursoDto>) {
    return await this.cursoService.update(id, data);
  }

  @Delete("delete")
  async deleteCurso(@Body('id') id: number) {
    return await this.cursoService.delete(id);
  }
}