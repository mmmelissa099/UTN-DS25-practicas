
import React, { useState } from 'react';
import api from '../services/api';

export default function BookForm({ onSuccess }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [year, setYear] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !author || !year) {
      setError('Todos los campos son obligatorios');
      return;
    }
    setLoading(true);
    try {
      await api.post('/books', { 
        title, 
        author, 
        year, 
        description
      });
      setTitle('');
      setAuthor('');
      setYear('');
      setDescription('');
      setError('');
      if (onSuccess) onSuccess();
    } catch (err) {
      setError('Error al agregar el libro');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <h2 className="text-2xl font-bold text-blue-800 mb-2">Agregar Libro</h2>
      {error && <div className="text-red-600 mb-2">{error}</div>}
      <div>
        <label className="block text-blue-900 mb-1">Título</label>
        <input
          type="text"
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label className="block text-blue-900 mb-1">Autor</label>
        <input
          type="text"
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={author}
          onChange={e => setAuthor(e.target.value)}
        />
      </div>
      <div>
        <label className="block text-blue-900 mb-1">Año</label>
        <input
          type="number"
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={year}
          onChange={e => setYear(e.target.value)}
        />
      </div>
      <div>
        <label className="block text-blue-900 mb-1">Descripción</label>
        <textarea
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 h-24"
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Describe el libro..."
        />
      </div>
      <button
        type="submit"
        className="bg-blue-700 text-white px-6 py-2 rounded font-semibold hover:bg-blue-800 transition-colors w-full mt-4"
        disabled={loading}
      >
        {loading ? 'Guardando...' : 'Guardar'}
      </button>
    </form>
  );
}
