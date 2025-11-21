import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProfessorService } from './professor/professor.service';
import { ProfessorController } from './professor/professor.controller';
import { ProfessorModule } from './professor/professor.module';
import { DisciplinaModule } from './disciplina/disciplina.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [ProfessorModule, DisciplinaModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
