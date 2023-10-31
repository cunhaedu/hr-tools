-- RedefineTables
PRAGMA foreign_keys=OFF;
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
    "verification_code" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_company" ("cep", "city", "cnpj", "createdAt", "email", "id", "is_verified", "name", "neighborhood", "phone_number", "state", "street", "street_number", "verification_code") SELECT "cep", "city", "cnpj", "createdAt", "email", "id", "is_verified", "name", "neighborhood", "phone_number", "state", "street", "street_number", "verification_code" FROM "company";
DROP TABLE "company";
ALTER TABLE "new_company" RENAME TO "company";
CREATE UNIQUE INDEX "company_cnpj_key" ON "company"("cnpj");
CREATE UNIQUE INDEX "company_email_key" ON "company"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
