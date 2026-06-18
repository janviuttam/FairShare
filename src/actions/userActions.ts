"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";

export async function createUser(formData: FormData) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const name = formData.get("name") as string;
  const email = formData.get("email") as string;

  await prisma.user.create({
    data: {
      name,
      email,
    },
  });

  revalidatePath("/users");
}

export async function deleteUser(id: string) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  await prisma.user.delete({
    where: { id },
  });

  revalidatePath("/users");
}