"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";

export async function createGroup(formData: FormData) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const name = formData.get("name") as string;

  await prisma.group.create({
    data: {
      name,
    },
  });

  revalidatePath("/groups");
}

export async function deleteGroup(
  formData: FormData
) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const id =
    formData.get("id") as string;

  await prisma.group.delete({
    where: {
      id,
    },
  });

  revalidatePath("/groups");
  revalidatePath("/dashboard");
}