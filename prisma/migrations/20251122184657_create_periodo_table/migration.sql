-- CreateTable
CREATE TABLE "Periodo" (
    "idPeriodo" SERIAL NOT NULL,
    "semestre" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "dataInicio" TIMESTAMP(3) NOT NULL,
    "dataFim" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Periodo_pkey" PRIMARY KEY ("idPeriodo")
);
