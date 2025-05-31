'use client';

import { useRef, useState } from "react";


type Todo = {
  id: number,
  title: string;
  completed: boolean;
};

type Props = {
  todos: Todo[],
  loading: boolean,
  onEdit: (id: number, title: string)=> void;
  onToggle: (id: number, completed: boolean)=> void;
  onDelete: (id: number)=>void;
}


export default function TodoList({todos, loading, onEdit, onToggle, onDelete}: Props) {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editValue, setEditValue] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  if(loading) return <p>Loading ... </p>

  const startEditing = (todo: Todo)=>{
    setEditingId(todo.id);
    setEditValue(todo.title);
  };

  const finishEditing = (id: number)=>{
      if (editValue.trim()){
        onEdit(id, editValue);
      }
      setEditingId(null);
    }

  return (
    <ul>
      {todos.map((todo) => <li key={todo.id}>
          <div>
            {editingId === todo.id ? <>
              
              <input 
                  ref={inputRef}
                  type="text" 
                  value={editValue}
                  onChange={(e)=> setEditValue(e.target.value)}
                  onBlur={()=> finishEditing(todo.id)}
                  onKeyDown={e=>{
                    if(e.key === 'Enter') finishEditing(todo.id);
                    if(e.key === 'Escape') setEditingId(null);
                  }}
              />
              
            </> : <>
                <div 
                  onDoubleClick={()=> startEditing(todo)}
                  className={todo.completed ? 'line-through text-gray-500 cursor-pointer' : 'cursor-pointer'}
                >
                    {todo.title}
                </div>
            
            </>}
          </div>
          <div>
                  <input type="checkbox" checked={todo.completed} onChange={()=> onToggle(todo.id, !todo.completed)} />
                  <button onClick={()=> onDelete(todo.id)}>Delete</button>
          </div>
      </li>
      )}
    </ul>
  )
}
