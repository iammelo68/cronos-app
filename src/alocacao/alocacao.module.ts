import { Module } from '@nestjs/common';
import { AlocacaoService } from './alocacao.service';
import { AlocacaoController } from './alocacao.controller';

@Module({
  controllers: [AlocacaoController],
  providers: [AlocacaoService],
})
export class AlocacaoModule {}
