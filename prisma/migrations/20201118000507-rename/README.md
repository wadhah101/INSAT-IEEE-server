# Migration `20201118000507-rename`

This migration has been generated by Wadhah mahrouk at 11/18/2020, 1:05:07 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "IEEEAcount" DROP CONSTRAINT "IEEEAcount_memberId_fkey"

CREATE TABLE "IEEEAccount" (
"id" SERIAL,
    "email" TEXT NOT NULL,
    "code" INTEGER NOT NULL,
    "registrationDate" TIMESTAMP(3),
    "memberId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
)

DROP TABLE "IEEEAcount"

CREATE UNIQUE INDEX "IEEEAccount_memberId_unique" ON "IEEEAccount"("memberId")

ALTER TABLE "IEEEAccount" ADD FOREIGN KEY("memberId")REFERENCES "Member"("id") ON DELETE CASCADE ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201118000002-init..20201118000507-rename
--- datamodel.dml
+++ datamodel.dml
@@ -1,7 +1,7 @@
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url = "***"
 }
 generator client {
   provider = "prisma-client-js"
@@ -21,12 +21,12 @@
   fbLink      String
   phone       Int
   email       String      @unique
   chapters    Chapter[]
-  ieeeAccount IEEEAcount?
+  ieeeAccount IEEEAccount?
 }
-model IEEEAcount {
+model IEEEAccount {
   id               Int       @id @default(autoincrement())
   email            String
   code             Int
   registrationDate DateTime?
```


