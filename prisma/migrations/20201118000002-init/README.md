# Migration `20201118000002-init`

This migration has been generated by Wadhah mahrouk at 11/18/2020, 1:00:02 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "Chapter" (
"id" SERIAL,
    "name" TEXT NOT NULL,
    "acronym" TEXT NOT NULL,

    PRIMARY KEY ("id")
)

CREATE TABLE "Member" (
"id" SERIAL,
    "name" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "fbLink" TEXT NOT NULL,
    "phone" INTEGER NOT NULL,
    "email" TEXT NOT NULL,

    PRIMARY KEY ("id")
)

CREATE TABLE "IEEEAcount" (
"id" SERIAL,
    "email" TEXT NOT NULL,
    "code" INTEGER NOT NULL,
    "registrationDate" TIMESTAMP(3),
    "memberId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
)

CREATE TABLE "_ChapterToMember" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
)

CREATE UNIQUE INDEX "Member.email_unique" ON "Member"("email")

CREATE UNIQUE INDEX "IEEEAcount_memberId_unique" ON "IEEEAcount"("memberId")

CREATE UNIQUE INDEX "_ChapterToMember_AB_unique" ON "_ChapterToMember"("A", "B")

CREATE INDEX "_ChapterToMember_B_index" ON "_ChapterToMember"("B")

ALTER TABLE "IEEEAcount" ADD FOREIGN KEY("memberId")REFERENCES "Member"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "_ChapterToMember" ADD FOREIGN KEY("A")REFERENCES "Chapter"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "_ChapterToMember" ADD FOREIGN KEY("B")REFERENCES "Member"("id") ON DELETE CASCADE ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20201118000002-init
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,35 @@
+datasource db {
+  provider = "postgresql"
+  url = "***"
+}
+
+generator client {
+  provider = "prisma-client-js"
+}
+
+model Chapter {
+  id      Int      @id @default(autoincrement())
+  name    String
+  acronym String
+  members Member[]
+}
+
+model Member {
+  id          Int         @id @default(autoincrement())
+  name        String
+  lastname    String
+  fbLink      String
+  phone       Int
+  email       String      @unique
+  chapters    Chapter[]
+  ieeeAccount IEEEAcount?
+}
+
+model IEEEAcount {
+  id               Int       @id @default(autoincrement())
+  email            String
+  code             Int
+  registrationDate DateTime?
+  member           Member    @relation(fields: [memberId], references: [id])
+  memberId         Int
+}
```

