'use client';

import { useState } from "react";

type Props = {
  onAdd: (title: string) => void;
};

export default function NewTodo({ onAdd }: Props) {
  const [title, setTitle] = useState("");

  const handleAdd = () => {
    if (title.trim()) {
      onAdd(title);
      setTitle("");
    }
  };

  return (
    <div className="flex gap-3 mb-6">
      <input
        type="text"
        className="flex-grow px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        placeholder="Add new task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
      />
      <button
        className="bg-indigo-600 text-white px-5 py-2 rounded-md hover:bg-indigo-700 transition"
        onClick={handleAdd}
      >
        Add
      </button>
    </div>
  );
}
