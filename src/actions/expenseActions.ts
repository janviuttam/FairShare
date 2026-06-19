"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";

export async function createExpense(formData: FormData) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const description =
    formData.get("description") as string;

  const amount = Number(
    formData.get("amount")
  );

  const category =
    (formData.get("category") as string) ||
    "Other";

  const paidById =
    formData.get("paidById") as string;

  const groupId =
    formData.get("groupId") as string;

  const participantIds =
    formData.getAll(
      "participantIds"
    ) as string[];

  const expense =
    await prisma.expense.create({
      data: {
        description,
        amount,
        category,
        paidById,
        groupId,
      },
    });

  await prisma.expenseParticipant.createMany({
    data: participantIds.map((id) => ({
      expenseId: expense.id,
      userId: id,
    })),
  });

  revalidatePath("/expenses");
  revalidatePath("/dashboard");
}

export async function updateExpense(
  formData: FormData
) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const id =
    formData.get("id") as string;

  const description =
    formData.get("description") as string;

  const amount = Number(
    formData.get("amount")
  );

  const category =
    (formData.get("category") as string) ||
    "Other";

  await prisma.expense.update({
    where: {
      id,
    },
    data: {
      description,
      amount,
      category,
    },
  });

  revalidatePath("/expenses");
  revalidatePath("/dashboard");
}

export async function deleteExpense(
  formData: FormData
) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const id =
    formData.get("id") as string;

  await prisma.expense.delete({
    where: {
      id,
    },
  });

  revalidatePath("/expenses");
  revalidatePath("/dashboard");
}