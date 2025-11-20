-- CreateTable
CREATE TABLE "professor" (
    "id" SERIAL NOT NULL,
    "nomeProf" TEXT NOT NULL,
    "emailProf" TEXT NOT NULL,
    "matriculaProf" TEXT NOT NULL,

    CONSTRAINT "professor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "professor_emailProf_key" ON "professor"("emailProf");

-- CreateIndex
CREATE UNIQUE INDEX "professor_matriculaProf_key" ON "professor"("matriculaProf");
