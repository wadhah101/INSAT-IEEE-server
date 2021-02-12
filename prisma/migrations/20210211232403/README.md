# Migration `20210211232403`

This migration has been generated by Wadhah Mahrouk at 2/12/2021, 12:24:03 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "MemberBadge" DROP COLUMN "exported",
ADD COLUMN     "paid" BOOLEAN NOT NULL DEFAULT false
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20210102155337..20210211232403
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
@@ -25,9 +25,8 @@
   studyLevel  Int?
   ieeeAccount IEEEAccount?
   chapters    Chapter[]
   qrScans     QrScan[]
-  // badge MemberBadge
   MemberBadge MemberBadge?
 }
 model MemberBadge {
@@ -35,9 +34,9 @@
   imageDriveId String? @unique
   member       Member  @relation(fields: [memberId], references: [id])
   memberId     String
   wave         Int
-  exported     Boolean @default(false)
+  paid     Boolean @default(false)
 }
 model IEEEAccount {
   id             Int       @id
```

