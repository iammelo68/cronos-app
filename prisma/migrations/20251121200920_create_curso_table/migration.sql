-- CreateTable
CREATE TABLE "Curso" (
    "idCurso" SERIAL NOT NULL,
    "nomeCurso" TEXT NOT NULL,
    "siglaCurso" TEXT,

    CONSTRAINT "Curso_pkey" PRIMARY KEY ("idCurso")
);
