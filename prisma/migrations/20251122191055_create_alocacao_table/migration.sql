-- CreateTable
CREATE TABLE "Alocacao" (
    "idAlocacao" SERIAL NOT NULL,
    "diaSemana" TEXT NOT NULL,
    "horarioInicio" TEXT NOT NULL,
    "horarioFim" TEXT NOT NULL,
    "professorId" INTEGER NOT NULL,
    "disciplinaId" INTEGER NOT NULL,
    "salaId" INTEGER NOT NULL,
    "cursoId" INTEGER NOT NULL,
    "periodoId" INTEGER NOT NULL,

    CONSTRAINT "Alocacao_pkey" PRIMARY KEY ("idAlocacao")
);

-- AddForeignKey
ALTER TABLE "Alocacao" ADD CONSTRAINT "Alocacao_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "professor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Alocacao" ADD CONSTRAINT "Alocacao_disciplinaId_fkey" FOREIGN KEY ("disciplinaId") REFERENCES "Disciplina"("idDisciplina") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Alocacao" ADD CONSTRAINT "Alocacao_salaId_fkey" FOREIGN KEY ("salaId") REFERENCES "Sala"("idSala") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Alocacao" ADD CONSTRAINT "Alocacao_cursoId_fkey" FOREIGN KEY ("cursoId") REFERENCES "Curso"("idCurso") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Alocacao" ADD CONSTRAINT "Alocacao_periodoId_fkey" FOREIGN KEY ("periodoId") REFERENCES "Periodo"("idPeriodo") ON DELETE RESTRICT ON UPDATE CASCADE;
