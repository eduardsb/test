"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface Todo {
  id: number;
  title: string;
  done: boolean;
}

export default function Home() {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [newList, setNewList] = useState<string>("");

  const handleAddList = () => {
    if (newList.trim() !== "") {
      createEntry(newList);
      setNewList("");
    }
  };

  const createEntry = async (entry: string) => {
    try {
      const response = await axios.post("/api", { data: entry });
      setTodoList([response.data, ...todoList]);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const listEntries = async () => {
    try {
      const response = await axios.get("/api");
      console.log(response.data);
      setTodoList(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteEntry = async (id: number) => {
    try {
      await axios.delete(`/api/${id}`);
      setTodoList(todoList.filter((item) => item.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    listEntries();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <div>
          <div>Todo</div>
          <div>
            <form onSubmit={(e) => {
              e.preventDefault();
              handleAddList();
            }}>
              <input
                type="text"
                value={newList}
                onChange={(e) => setNewList(e.target.value)}
              />
              <button onClick={handleAddList}>Add List</button>
            </form>
          </div>
          <div>
            {todoList.map((item, index) => (
              <div className="flex" key={index}>
                <Link href={`/todo/${item.id}`}>
                {item.title}{" "}
                </Link>
                <div onClick={() => deleteEntry(item.id)}>
                  {" "}
                  <div className="px-2 text-red-500">X</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
