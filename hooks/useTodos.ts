"use client";

import { useState, useEffect } from "react";

type Todo = { id: number; title: string; completed: boolean };

 const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/todos")
      .then((response) => response.json())
      .then((data: Todo[]) => {setTodos(data); setLoading(false)});

  }, []);

  const addTodo = async (title: string) =>{
    const res = await fetch('/api/todos',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({title})
    })

    const todo = await res.json();
    setTodos(prev => [...prev, todo]);
  }

  const updateTodo = async (id: number, title: string) =>{
    const res = await fetch('/api/todos',{
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({id, title})
    })
    const updated = await res.json();
    setTodos(prev =>
        prev.map((todo) => todo.id === id ? updated : todo))
  }

  const toggleTodo = async (id: number, completed: boolean) =>{
    const res = await fetch('/api/todos', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({id, completed})
        })
        const updated = await res.json();
        setTodos(prev => prev.map((todo) => todo.id === id ? updated : todo))
  }

  const deleteTodo = async (id: number) =>{
    const res = await fetch('/api/todos',{
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({id})
    })
    
    setTodos(prev => prev.filter(todo => todo.id !== id))

    
  }
  return { todos, loading, addTodo, updateTodo, deleteTodo, toggleTodo } 
}

export default useTodos