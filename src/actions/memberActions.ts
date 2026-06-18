"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";

export async function createMember(formData: FormData) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const userIdValue = formData.get("userId") as string;
  const groupId = formData.get("groupId") as string;

  await prisma.groupMember.create({
    data: {
      userId: userIdValue,
      groupId,
    },
  });

  revalidatePath("/members");
}

export async function deleteMember(id: string) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  await prisma.groupMember.delete({
    where: { id },
  });

  revalidatePath("/members");
}