-- CreateTable
CREATE TABLE "Sala" (
    "idSala" SERIAL NOT NULL,
    "nomeSala" TEXT NOT NULL,
    "tipoSala" TEXT NOT NULL,

    CONSTRAINT "Sala_pkey" PRIMARY KEY ("idSala")
);

-- CreateIndex
CREATE UNIQUE INDEX "Sala_nomeSala_key" ON "Sala"("nomeSala");
