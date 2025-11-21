-- CreateTable
CREATE TABLE "Disciplina" (
    "idDisciplina" SERIAL NOT NULL,
    "matriculaDisciplina" TEXT NOT NULL,
    "nomeDisciplina" TEXT NOT NULL,

    CONSTRAINT "Disciplina_pkey" PRIMARY KEY ("idDisciplina")
);

-- CreateIndex
CREATE UNIQUE INDEX "Disciplina_matriculaDisciplina_key" ON "Disciplina"("matriculaDisciplina");

-- CreateIndex
CREATE UNIQUE INDEX "Disciplina_nomeDisciplina_key" ON "Disciplina"("nomeDisciplina");
