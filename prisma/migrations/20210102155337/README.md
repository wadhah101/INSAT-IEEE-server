# Migration `20210102155337`

This migration has been generated by Wadhah Mahrouk at 1/2/2021, 4:53:37 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "MemberBadge" ALTER COLUMN "exported" SET DEFAULT false
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20210102155302..20210102155337
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
@@ -35,9 +35,9 @@
   imageDriveId String? @unique
   member       Member  @relation(fields: [memberId], references: [id])
   memberId     String
   wave         Int
-  exported     Boolean @default(true)
+  exported     Boolean @default(false)
 }
 model IEEEAccount {
   id             Int       @id
```


