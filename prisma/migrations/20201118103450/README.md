# Migration `20201118103450`

This migration has been generated by Wadhah mahrouk at 11/18/2020, 11:34:50 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "Partner" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true

CREATE UNIQUE INDEX "Member.fbLink_unique" ON "Member"("fbLink")

CREATE UNIQUE INDEX "Member.phone_unique" ON "Member"("phone")

CREATE UNIQUE INDEX "Partner.email_unique" ON "Partner"("email")
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201118094032..20201118103450
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
@@ -39,8 +39,9 @@
   id      Int      @id @default(autoincrement())
   name    String
   code    String   @unique
   email   String   @unique
+  active  Boolean  @default(true)
   rate    Int?
   qrScans QrScan[]
 }
```


