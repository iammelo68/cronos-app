import { Module } from '@nestjs/common';
import { SalaService } from './sala.service';
import { SalaController } from './sala.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [SalaController],
  providers: [SalaService],
})
export class SalaModule {}
