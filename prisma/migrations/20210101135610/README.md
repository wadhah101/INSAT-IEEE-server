# Migration `20210101135610`

This migration has been generated by Wadhah Mahrouk at 1/1/2021, 2:56:10 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "MemberBadge" ADD COLUMN     "wave" INTEGER NOT NULL DEFAULT 1
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201227185222..20210101135610
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
@@ -14,28 +14,29 @@
   members Member[]
 }
 model Member {
-  id           String       @id @default(cuid())
-  fullName     String
-  gender       Gender?
-  fbLink       String?
-  phone        Int?         @unique
-  email        String?      @unique
-  studyField   String?
-  studyLevel   Int?
-  ieeeAccount  IEEEAccount?
-  chapters     Chapter[]
-  qrScans      QrScan[]
+  id          String       @id @default(cuid())
+  fullName    String
+  gender      Gender?
+  fbLink      String?
+  phone       Int?         @unique
+  email       String?      @unique
+  studyField  String?
+  studyLevel  Int?
+  ieeeAccount IEEEAccount?
+  chapters    Chapter[]
+  qrScans     QrScan[]
   // badge MemberBadge
-  MemberBadge  MemberBadge?
+  MemberBadge MemberBadge?
 }
 model MemberBadge {
-  id           Int  @id @default(autoincrement())
+  id           Int     @id @default(autoincrement())
   imageDriveId String? @unique
   member       Member  @relation(fields: [memberId], references: [id])
   memberId     String
+  wave         Int     @default(1)
 }
 model IEEEAccount {
   id             Int       @id
```


