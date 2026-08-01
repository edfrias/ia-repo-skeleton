import { computed, onMounted, reactive, watch } from 'vue';

export type TodoFilter = 'all' | 'pending' | 'completed';

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TodoState {
  todos: Todo[];
  filter: TodoFilter;
  draft: string;
  error: string | null;
}

const STORAGE_KEY = 'taskflow.todos.v1';
const MAX_TODO_LENGTH = 500;

export function deserializeTodos(raw: string | null): Todo[] {
  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed
      .filter((item) => typeof item === 'object' && item !== null)
      .map((item) => {
        const todo = item as Partial<Todo>;
        return {
          id: typeof todo.id === 'string' ? todo.id : crypto.randomUUID(),
          text: typeof todo.text === 'string' ? todo.text : '',
          completed: Boolean(todo.completed),
          createdAt:
            typeof todo.createdAt === 'string'
              ? todo.createdAt
              : new Date().toISOString(),
          updatedAt:
            typeof todo.updatedAt === 'string'
              ? todo.updatedAt
              : new Date().toISOString()
        };
      })
      .filter((todo) => todo.text.trim().length > 0);
  } catch {
    return [];
  }
}

export function addTodo(state: TodoState, rawText: string): boolean {
  const text = rawText.trim();
  if (!text) {
    state.error = 'La tarea no puede estar vacia.';
    return false;
  }

  if (text.length > MAX_TODO_LENGTH) {
    state.error = 'La tarea supera el maximo de 500 caracteres.';
    return false;
  }

  const now = new Date().toISOString();
  state.todos.unshift({
    id: crypto.randomUUID(),
    text,
    completed: false,
    createdAt: now,
    updatedAt: now
  });
  state.draft = '';
  state.error = null;
  return true;
}

export function toggleTodo(state: TodoState, id: string): void {
  const todo = state.todos.find((entry) => entry.id === id);
  if (!todo) {
    return;
  }
  todo.completed = !todo.completed;
  todo.updatedAt = new Date().toISOString();
}

export function removeTodo(state: TodoState, id: string): void {
  state.todos = state.todos.filter((todo) => todo.id !== id);
}

export function updateTodoText(state: TodoState, id: string, rawText: string): boolean {
  const todo = state.todos.find((entry) => entry.id === id);
  if (!todo) {
    return false;
  }

  const text = rawText.trim();
  if (!text) {
    state.error = 'El texto editado no puede estar vacio.';
    return false;
  }

  if (text.length > MAX_TODO_LENGTH) {
    state.error = 'La tarea supera el maximo de 500 caracteres.';
    return false;
  }

  todo.text = text;
  todo.updatedAt = new Date().toISOString();
  state.error = null;
  return true;
}

export function clearCompleted(state: TodoState): void {
  state.todos = state.todos.filter((todo) => !todo.completed);
}

export function getFilteredTodos(state: TodoState): Todo[] {
  if (state.filter === 'pending') {
    return state.todos.filter((todo) => !todo.completed);
  }
  if (state.filter === 'completed') {
    return state.todos.filter((todo) => todo.completed);
  }
  return state.todos;
}

export function createTodoState(seed: Todo[] = []): TodoState {
  return {
    todos: seed,
    filter: 'all',
    draft: '',
    error: null
  };
}

export function useTodos() {
  const state = reactive(createTodoState());

  onMounted(() => {
    state.todos = deserializeTodos(window.localStorage.getItem(STORAGE_KEY));
  });

  watch(
    () => state.todos,
    (todos) => {
      if (typeof window === 'undefined') {
        return;
      }
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
      } catch {
        state.error = 'No se pudo guardar en localStorage.';
      }
    },
    { deep: true }
  );

  const filteredTodos = computed(() => getFilteredTodos(state));
  const pendingCount = computed(() => state.todos.filter((todo) => !todo.completed).length);

  return {
    state,
    filteredTodos,
    pendingCount,
    addTodo: (text: string) => addTodo(state, text),
    toggleTodo: (id: string) => toggleTodo(state, id),
    removeTodo: (id: string) => removeTodo(state, id),
    updateTodoText: (id: string, text: string) => updateTodoText(state, id, text),
    clearCompleted: () => clearCompleted(state)
  };
}
