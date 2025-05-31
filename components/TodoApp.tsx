'use client'

import NewTodo from "@/components/NewTodo";
import TodoList from "@/components/TodoList";
import useTodos from "@/hooks/useTodos";

export default function TodoApp() {
    const { todos, loading, addTodo, updateTodo, deleteTodo, toggleTodo } = useTodos();


  return (
    <div>
      <NewTodo onAdd={addTodo} />
      <TodoList
        todos={todos}
        loading={loading}
        onEdit={updateTodo}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
      />
    </div>
  );
}
