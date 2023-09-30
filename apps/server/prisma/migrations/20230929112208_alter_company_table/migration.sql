/*
  Warnings:

  - You are about to drop the column `isActive` on the `user` table. All the data in the column will be lost.
  - Added the required column `verification_code` to the `company` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_user" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "organizational_structure_id" TEXT,
    "position_id" TEXT,
    "company_id" TEXT NOT NULL,
    "role_id" TEXT NOT NULL,
    CONSTRAINT "user_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "rbac_role" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "user_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "user_position_id_fkey" FOREIGN KEY ("position_id") REFERENCES "position" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "user_organizational_structure_id_fkey" FOREIGN KEY ("organizational_structure_id") REFERENCES "organizational_sctructure" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_user" ("company_id", "email", "first_name", "id", "last_name", "organizational_structure_id", "password", "position_id", "role_id") SELECT "company_id", "email", "first_name", "id", "last_name", "organizational_structure_id", "password", "position_id", "role_id" FROM "user";
DROP TABLE "user";
ALTER TABLE "new_user" RENAME TO "user";
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");
CREATE TABLE "new_company" (
    "id" TEXT NOT NULL PRIMARY KEY,
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
    "verification_code" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_company" ("cep", "city", "cnpj", "createdAt", "email", "id", "name", "neighborhood", "phone_number", "state", "street", "street_number") SELECT "cep", "city", "cnpj", "createdAt", "email", "id", "name", "neighborhood", "phone_number", "state", "street", "street_number" FROM "company";
DROP TABLE "company";
ALTER TABLE "new_company" RENAME TO "company";
CREATE UNIQUE INDEX "company_cnpj_key" ON "company"("cnpj");
CREATE UNIQUE INDEX "company_email_key" ON "company"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
