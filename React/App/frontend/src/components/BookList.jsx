
import React, { useEffect, useState } from 'react';
import api from '../services/api';

export default function BookList() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await api.get('/books');
        setBooks(res.data);
      } catch (err) {
        setBooks([]);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  if (loading) return <div className="text-blue-700">Cargando catálogo...</div>;
  if (!books.length) return <div className="text-blue-700">No hay libros en el catálogo.</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-blue-800">Catálogo de Libros</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {books.map(book => (
          <div key={book.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-blue-100 p-4">
            <h3 className="font-semibold text-blue-900 text-lg mb-2">{book.title}</h3>
            <p className="text-blue-700 mb-1">Autor: {book.author}</p>
            <p className="text-blue-400 mb-2">Año: {book.year}</p>
            {book.description && (
              <p className="text-gray-600 text-sm">{book.description}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
