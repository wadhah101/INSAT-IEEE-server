# Migration `20201122172117`

This migration has been generated by Wadhah Mahrouk at 11/22/2020, 6:21:17 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql

```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201122171444..20201122172117
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
@@ -14,9 +14,9 @@
   members Member[]
 }
 model Member {
-  id          String       @id @default(uuid())
+  id          String       @id @default(cuid())
   name        String
   lastname    String
   gender      Gender?
   fbLink      String?      @unique
```


