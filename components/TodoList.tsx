'use client';

import { useRef, useState } from "react";

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

type Props = {
  todos: Todo[];
  loading: boolean;
  onEdit: (id: number, title: string) => void;
  onToggle: (id: number, completed: boolean) => void;
  onDelete: (id: number) => void;
};

export default function TodoList({ todos, loading, onEdit, onToggle, onDelete }: Props) {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editValue, setEditValue] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;

  const startEditing = (todo: Todo) => {
    setEditingId(todo.id);
    setEditValue(todo.title);
  };

  const finishEditing = (id: number) => {
    if (editValue.trim()) {
      onEdit(id, editValue);
    }
    setEditingId(null);
  };

  return (
    <ul className="space-y-3">
      {todos.map((todo) => (
        <li
          key={todo.id}
          className="flex items-center justify-between p-3 bg-white rounded-md shadow-sm hover:shadow-md transition"
        >
          <div className="flex items-center gap-3 flex-grow">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => onToggle(todo.id, !todo.completed)}
              className="w-5 h-5 cursor-pointer"
            />
            {editingId === todo.id ? (
              <input
                ref={inputRef}
                type="text"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                onBlur={() => finishEditing(todo.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") finishEditing(todo.id);
                  if (e.key === "Escape") setEditingId(null);
                }}
                className="flex-grow px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            ) : (
              <span
                onDoubleClick={() => startEditing(todo)}
                className={`flex-grow cursor-pointer select-none ${
                  todo.completed ? "line-through text-gray-400" : "text-gray-800"
                }`}
              >
                {todo.title}
              </span>
            )}
          </div>
          <button
            onClick={() => onDelete(todo.id)}
            className="text-red-600 hover:text-red-800 font-semibold transition"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
