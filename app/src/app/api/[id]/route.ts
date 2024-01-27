import { PrismaClient } from "@prisma/client";
import { NextPageContext } from "next";
import { AppContext } from "next/app";

const prisma = new PrismaClient();

export const dynamic = "force-dynamic"; // defaults to auto

export const GET = async () => {
  try {
    const entries = await prisma.todo.findMany();
    return new Response(JSON.stringify(entries), {
      status: 200,
    });
  } catch (error) {
    throw new Error(`Failed to create entry`);
  }
};

export const POST = async (request: Request) => {
  try {
    const entry = await prisma.todo.create({
      data: { title: "123" },
    });
    console.log(entry);
    return new Response(JSON.stringify(entry), {
      status: 200,
    });
  } catch (error) {
    throw new Error(`Failed to create entry`);
  }
};

interface Params {
  params: {
    id: string;
  };
}

export const DELETE = async (request: Request, params: Params) => {
  const id = Number(params.params.id);
  try {
    const deletedEntry = await prisma.todo.delete({
      where: { id },
    });
    console.log(deletedEntry);
    return new Response(JSON.stringify(deletedEntry), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    throw new Error(`Failed to delete entry!!`);
  }
};
