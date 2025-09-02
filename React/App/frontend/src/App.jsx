
import React, { useState } from 'react';
import BookList from './components/BookList';
import BookForm from './components/BookForm';

function App() {
  const [view, setView] = useState('catalog');
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
      <header className="bg-blue-800 py-6 shadow-md">
        <h1 className="text-3xl md:text-4xl text-white font-bold text-center tracking-wide">Biblioteca UTN FRLP</h1>
        <div className="flex justify-center gap-4 mt-4">
          <button
            className={`px-6 py-2 rounded-full font-semibold transition-colors duration-200 ${view === 'form' ? 'bg-white text-blue-800 border-2 border-blue-800' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
            onClick={() => setView('form')}
          >
            Agregar Libro
          </button>
          <button
            className={`px-6 py-2 rounded-full font-semibold transition-colors duration-200 ${view === 'catalog' ? 'bg-white text-blue-800 border-2 border-blue-800' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
            onClick={() => setView('catalog')}
          >
            Ver Catálogo
          </button>
        </div>
      </header>
      <main className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
        {view === 'form' && <BookForm onSuccess={() => setView('catalog')} />}
        {view === 'catalog' && <BookList />}
      </main>
      <footer className="text-center text-blue-900 mt-10 mb-4 opacity-70">
        &copy; {new Date().getFullYear()} Biblioteca UTN FRLP
      </footer>
    </div>
  );
}

export default App;
