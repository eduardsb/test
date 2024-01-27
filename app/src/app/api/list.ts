import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient();

export const createEntry = async () => {
    try {
        const entry = await prisma.todo.create({
            data: { title: "123" },
          });
        return entry;
    } catch (error) {
        //throw new Error(`Failed to create entry: ${error.message}`);
    }
};

export const list = async () => {
    try {
        const entry = await prisma.todo.findMany();
        return entry;
    } catch (error) {
        //throw new Error(`Failed to create entry: ${error.message}`);
    }
};

