-- CreateTable
CREATE TABLE "Administrador" (
    "idAdm" SERIAL NOT NULL,
    "nomeAdm" TEXT NOT NULL,
    "emailAdm" TEXT NOT NULL,
    "senhaAdm" TEXT NOT NULL,

    CONSTRAINT "Administrador_pkey" PRIMARY KEY ("idAdm")
);

-- CreateIndex
CREATE UNIQUE INDEX "Administrador_emailAdm_key" ON "Administrador"("emailAdm");
