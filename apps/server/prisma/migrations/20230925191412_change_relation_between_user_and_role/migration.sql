/*
  Warnings:

  - You are about to drop the `_user_role` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `is_company_responsible` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `second_name` on the `user` table. All the data in the column will be lost.
  - Added the required column `last_name` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role_id` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "_user_role_B_index";

-- DropIndex
DROP INDEX "_user_role_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_user_role";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_user" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "organizational_structure_id" TEXT,
    "position_id" TEXT,
    "company_id" TEXT NOT NULL,
    "role_id" TEXT NOT NULL,
    CONSTRAINT "user_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "rbac_role" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "user_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "user_position_id_fkey" FOREIGN KEY ("position_id") REFERENCES "position" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "user_organizational_structure_id_fkey" FOREIGN KEY ("organizational_structure_id") REFERENCES "organizational_sctructure" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_user" ("company_id", "email", "first_name", "id", "isActive", "organizational_structure_id", "password", "position_id") SELECT "company_id", "email", "first_name", "id", "isActive", "organizational_structure_id", "password", "position_id" FROM "user";
DROP TABLE "user";
ALTER TABLE "new_user" RENAME TO "user";
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
