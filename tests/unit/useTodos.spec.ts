import { describe, expect, it } from 'vitest';
import {
  addTodo,
  clearCompleted,
  createTodoState,
  deserializeTodos,
  getFilteredTodos,
  toggleTodo,
  updateTodoText
} from '../../src/frontend/composables/useTodos';

describe('useTodos core logic', () => {
  it('adds a valid todo', () => {
    const state = createTodoState();
    const created = addTodo(state, '  Comprar pan  ');
    expect(created).toBe(true);
    expect(state.todos).toHaveLength(1);
    expect(state.todos[0].text).toBe('Comprar pan');
  });

  it('rejects empty todo text', () => {
    const state = createTodoState();
    const created = addTodo(state, '   ');
    expect(created).toBe(false);
    expect(state.todos).toHaveLength(0);
    expect(state.error).toContain('vacia');
  });

  it('toggles completion state', () => {
    const state = createTodoState([
      {
        id: 'a',
        text: 'Test',
        completed: false,
        createdAt: 'x',
        updatedAt: 'x'
      }
    ]);

    toggleTodo(state, 'a');
    expect(state.todos[0].completed).toBe(true);

    toggleTodo(state, 'a');
    expect(state.todos[0].completed).toBe(false);
  });

  it('edits an existing todo', () => {
    const state = createTodoState([
      {
        id: 'a',
        text: 'Viejo',
        completed: false,
        createdAt: 'x',
        updatedAt: 'x'
      }
    ]);

    const ok = updateTodoText(state, 'a', 'Nuevo');
    expect(ok).toBe(true);
    expect(state.todos[0].text).toBe('Nuevo');
  });

  it('filters pending and completed', () => {
    const state = createTodoState([
      {
        id: 'a',
        text: 'Uno',
        completed: false,
        createdAt: 'x',
        updatedAt: 'x'
      },
      {
        id: 'b',
        text: 'Dos',
        completed: true,
        createdAt: 'x',
        updatedAt: 'x'
      }
    ]);

    state.filter = 'pending';
    expect(getFilteredTodos(state)).toHaveLength(1);
    state.filter = 'completed';
    expect(getFilteredTodos(state)).toHaveLength(1);
  });

  it('clears completed todos', () => {
    const state = createTodoState([
      {
        id: 'a',
        text: 'Uno',
        completed: false,
        createdAt: 'x',
        updatedAt: 'x'
      },
      {
        id: 'b',
        text: 'Dos',
        completed: true,
        createdAt: 'x',
        updatedAt: 'x'
      }
    ]);

    clearCompleted(state);
    expect(state.todos).toHaveLength(1);
    expect(state.todos[0].id).toBe('a');
  });

  it('recovers invalid storage payload safely', () => {
    expect(deserializeTodos('not-json')).toEqual([]);
    expect(deserializeTodos('{"x":1}')).toEqual([]);
  });
});
