-- CreateEnum
CREATE TYPE "Role" AS ENUM ('COLLABORATOR', 'HR_ADMIN', 'ADMIN');

-- CreateTable
CREATE TABLE "company" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "street_number" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "is_verified" BOOLEAN NOT NULL DEFAULT false,
    "verification_code" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "position" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,

    CONSTRAINT "position_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "is_company_representative" BOOLEAN NOT NULL DEFAULT false,
    "position_id" TEXT,
    "company_id" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'COLLABORATOR',

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "evaluation_cycle" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "start_date" DATE NOT NULL,
    "end_date" DATE NOT NULL,
    "allow_self_evaluation" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "evaluation_cycle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "evaluation_cycle_positions" (
    "cycle_id" TEXT NOT NULL,
    "position_id" TEXT NOT NULL,

    CONSTRAINT "evaluation_cycle_positions_pkey" PRIMARY KEY ("cycle_id","position_id")
);

-- CreateTable
CREATE TABLE "Evaluation" (
    "id" TEXT NOT NULL,
    "evaluated_user_id" TEXT NOT NULL,
    "evaluator_user_id" TEXT NOT NULL,
    "cycle_id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "manager_evaluation_at" TIMESTAMP(3),
    "self_evaluation_at" TIMESTAMP(3),
    "manager_evaluation_potential_value" DECIMAL(65,30),
    "manager_evaluation_performance_value" DECIMAL(65,30),
    "self_evaluation_potential_value" DOUBLE PRECISION,
    "self_evaluation_performance_value" DOUBLE PRECISION,

    CONSTRAINT "Evaluation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "company_cnpj_key" ON "company"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "company_email_key" ON "company"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- AddForeignKey
ALTER TABLE "position" ADD CONSTRAINT "position_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_position_id_fkey" FOREIGN KEY ("position_id") REFERENCES "position"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "evaluation_cycle_positions" ADD CONSTRAINT "evaluation_cycle_positions_cycle_id_fkey" FOREIGN KEY ("cycle_id") REFERENCES "evaluation_cycle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "evaluation_cycle_positions" ADD CONSTRAINT "evaluation_cycle_positions_position_id_fkey" FOREIGN KEY ("position_id") REFERENCES "position"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Evaluation" ADD CONSTRAINT "Evaluation_cycle_id_fkey" FOREIGN KEY ("cycle_id") REFERENCES "evaluation_cycle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Evaluation" ADD CONSTRAINT "Evaluation_evaluated_user_id_fkey" FOREIGN KEY ("evaluated_user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Evaluation" ADD CONSTRAINT "Evaluation_evaluator_user_id_fkey" FOREIGN KEY ("evaluator_user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
