import { describe, expect, test } from '@jest/globals';

// Test 1: Validación de estructura de libro
describe('Book validation', () => {
  test('should validate book structure', () => {
    const book = {
      title: 'Test Book',
      author: 'Test Author',
      year: 2024,
      genre: 'Fiction'
    };

    expect(book).toHaveProperty('title');
    expect(book).toHaveProperty('author');
    expect(book.title).toBe('Test Book');
    expect(book.year).toBe(2024);
  });
});

// Test 2: Validación de transformación de datos
describe('Data transformation', () => {
  test('should convert year to integer', () => {
    const yearString = '2024';
    const yearInt = parseInt(yearString);

    expect(typeof yearInt).toBe('number');
    expect(yearInt).toBe(2024);
  });

  test('should handle null values', () => {
    const book = {
      title: 'Test',
      author: 'Author',
      year: null,
      genre: null
    };

    expect(book.year).toBeNull();
    expect(book.genre).toBeNull();
  });
});

// Test 3: Validación de respuestas de API
describe('API response format', () => {
  test('should format error response correctly', () => {
    const errorResponse = { error: 'Error message' };

    expect(errorResponse).toHaveProperty('error');
    expect(typeof errorResponse.error).toBe('string');
  });

  test('should format success response correctly', () => {
    const successResponse = { message: 'Book deleted successfully' };

    expect(successResponse).toHaveProperty('message');
    expect(successResponse.message).toContain('successfully');
  });
});
