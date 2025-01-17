-- CreateEnum
CREATE TYPE "Progress" AS ENUM ('YETTOBEGIN', 'STARTED', 'HALFDONE', 'DONE', 'BLOCKED');

-- CreateTable
CREATE TABLE "Goal" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "progress" "Progress" NOT NULL DEFAULT 'YETTOBEGIN',
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "Goal_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Goal" ADD CONSTRAINT "Goal_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
