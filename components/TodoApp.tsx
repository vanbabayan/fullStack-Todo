'use client';

import NewTodo from "@/components/NewTodo";
import TodoList from "@/components/TodoList";
import useTodos from "@/hooks/useTodos";

export default function TodoApp() {
  const { todos, addTodo, updateTodo, deleteTodo, toggleTodo, loading } = useTodos();

  return (
    <main className="max-w-xl mx-auto mt-12 p-6 bg-gray-50 rounded-md shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-8 text-indigo-700">My Todo List</h1>
      <NewTodo onAdd={addTodo} />
      <TodoList
        todos={todos}
        loading={loading}
        onEdit={updateTodo}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
      />
    </main>
  );
}
