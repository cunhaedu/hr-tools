-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_user" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "is_company_representative" BOOLEAN NOT NULL DEFAULT false,
    "organizational_structure_id" TEXT,
    "position_id" TEXT,
    "company_id" TEXT NOT NULL,
    "role_id" TEXT NOT NULL,
    CONSTRAINT "user_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "rbac_role" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "user_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "user_position_id_fkey" FOREIGN KEY ("position_id") REFERENCES "position" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "user_organizational_structure_id_fkey" FOREIGN KEY ("organizational_structure_id") REFERENCES "organizational_sctructure" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_user" ("company_id", "email", "first_name", "id", "is_active", "last_name", "organizational_structure_id", "password", "position_id", "role_id") SELECT "company_id", "email", "first_name", "id", "is_active", "last_name", "organizational_structure_id", "password", "position_id", "role_id" FROM "user";
DROP TABLE "user";
ALTER TABLE "new_user" RENAME TO "user";
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
