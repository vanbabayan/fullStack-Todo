'use client'

import { useState } from 'react';

type Props = {
  onAdd: (title: string) => void;
};

const NewTodo = ({ onAdd }: Props) => {
  const [title, setTitle] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const t = title.trim();
    if (!t) return;
    onAdd(t);
    setTitle('');
  };

  return (
    <form onSubmit={submit}>
      <input
        type="text"
        placeholder="Add new todo"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button className=' bg-grey-500' type="submit">Add Todo</button>
    </form>
  );
};

export default NewTodo;
