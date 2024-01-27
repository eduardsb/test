import { PrismaClient } from "@prisma/client";
import { AppContext } from "next/app";
import { Context } from "react";

const prisma = new PrismaClient();

interface PageProps {
  params: {
    id: string;
  };
}

export const dynamic = "force-dynamic"; // defaults to auto

export const GET = async () => {
  try {
    const entries = await prisma.todo.findMany({
      orderBy: {
        id: "desc",
      },
    });
    return new Response(JSON.stringify(entries), {
      status: 200,
    });
  } catch (error) {
    throw new Error(`Failed to get entries`);
  }
};

export const POST = async (request: Request) => {
  const body = await request.json();

  try {
    const entry = await prisma.todo.create({
      data: { title: body.data },
    });
    console.log(entry);
    return new Response(JSON.stringify(entry), {
      status: 200,
    });
  } catch (error) {
    throw new Error(`Failed to create entry`);
  }
};

export const DELETE = async (request: Request) => {
  console.log(request);
  try {
    const { id } = await request.json();
    const deletedEntry = await prisma.todo.delete({
      where: { id },
    });
    console.log(deletedEntry);
    return new Response(JSON.stringify(deletedEntry), {
      status: 200,
    });
  } catch (error) {
    throw new Error(`Failed to delete entry`);
  }
};
