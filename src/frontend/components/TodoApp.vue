<script setup lang="ts">
import { ref } from 'vue';
import type { Todo, TodoFilter } from '../composables/useTodos';
import { useTodos } from '../composables/useTodos';

const { state, filteredTodos, pendingCount, addTodo, toggleTodo, removeTodo, updateTodoText, clearCompleted } =
  useTodos();

const editingId = ref<string | null>(null);
const editingText = ref('');

function onSubmitNewTodo() {
  addTodo(state.draft);
}

function setFilter(filter: TodoFilter) {
  state.filter = filter;
}

function startEditing(todo: Todo) {
  editingId.value = todo.id;
  editingText.value = todo.text;
}

function cancelEditing() {
  editingId.value = null;
  editingText.value = '';
}

function saveEditing(id: string) {
  const ok = updateTodoText(id, editingText.value);
  if (ok) {
    cancelEditing();
  }
}
</script>

<template>
  <section class="todo-app">
    <header>
      <p class="eyebrow">TaskFlow</p>
      <h1>Tu panel diario</h1>
      <p class="subtitle">{{ pendingCount }} pendientes para hoy.</p>
    </header>

    <form class="new-todo" @submit.prevent="onSubmitNewTodo">
      <input
        v-model="state.draft"
        type="text"
        maxlength="500"
        placeholder="Escribe una tarea y pulsa Enter"
        aria-label="Nueva tarea"
      />
      <button type="submit">Agregar</button>
    </form>

    <p v-if="state.error" class="error">{{ state.error }}</p>

    <nav class="filters" aria-label="Filtros de tareas">
      <button type="button" :class="{ active: state.filter === 'all' }" @click="setFilter('all')">Todas</button>
      <button type="button" :class="{ active: state.filter === 'pending' }" @click="setFilter('pending')">
        Pendientes
      </button>
      <button type="button" :class="{ active: state.filter === 'completed' }" @click="setFilter('completed')">
        Completadas
      </button>
    </nav>

    <ul v-if="filteredTodos.length" class="todo-list">
      <li v-for="todo in filteredTodos" :key="todo.id" :class="{ done: todo.completed }">
        <label class="todo-main">
          <input
            type="checkbox"
            :checked="todo.completed"
            :aria-label="`Marcar tarea ${todo.text}`"
            @change="toggleTodo(todo.id)"
          />
          <span v-if="editingId !== todo.id" @dblclick="startEditing(todo)">{{ todo.text }}</span>
        </label>

        <div v-if="editingId === todo.id" class="edit-row">
          <input v-model="editingText" type="text" maxlength="500" @keyup.enter="saveEditing(todo.id)" @keyup.esc="cancelEditing" />
          <button type="button" class="ghost" aria-label="Guardar cambios" @click="saveEditing(todo.id)">Guardar</button>
          <button type="button" class="ghost" aria-label="Cancelar edicion" @click="cancelEditing">Cancelar</button>
        </div>

        <div v-else class="actions">
          <button type="button" class="ghost" :aria-label="`Editar tarea: ${todo.text}`" @click="startEditing(todo)">Editar</button>
          <button type="button" class="danger" :aria-label="`Eliminar tarea: ${todo.text}`" @click="removeTodo(todo.id)">Eliminar</button>
        </div>
      </li>
    </ul>

    <p v-else class="empty">No hay tareas para este filtro. Crea una nueva para empezar.</p>

    <button
      type="button"
      class="clear"
      aria-label="Limpiar tareas completadas"
      :disabled="!state.todos.some((todo) => todo.completed)"
      @click="clearCompleted"
    >
      Limpiar completadas
    </button>
  </section>
</template>

<style scoped>
.todo-app {
  background: var(--panel);
  border: 1px solid var(--line);
  border-radius: 20px;
  box-shadow: var(--shadow);
  padding: 1.4rem;
}

header h1 {
  margin: 0.2rem 0;
  font-size: clamp(1.5rem, 3.6vw, 2.2rem);
}

.eyebrow {
  margin: 0;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--primary-strong);
}

.subtitle {
  margin: 0;
  color: var(--muted);
}

.new-todo {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 0.6rem;
  margin-top: 1.2rem;
}

input[type='text'] {
  width: 100%;
  border: 1px solid var(--line);
  border-radius: 12px;
  font: inherit;
  padding: 0.74rem 0.9rem;
}

button {
  border: none;
  border-radius: 12px;
  background: var(--primary);
  color: white;
  font: inherit;
  font-weight: 700;
  padding: 0.74rem 1rem;
  cursor: pointer;
}

button:hover {
  background: var(--primary-strong);
}

.filters {
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
}

.filters button {
  background: #ede7dc;
  color: var(--ink);
  font-weight: 500;
}

.filters button.active {
  background: var(--accent);
  color: #1f1200;
}

.todo-list {
  list-style: none;
  margin: 0.9rem 0;
  padding: 0;
  display: grid;
  gap: 0.6rem;
}

.todo-list li {
  border: 1px solid var(--line);
  border-radius: 14px;
  padding: 0.7rem;
  display: grid;
  gap: 0.55rem;
  background: white;
}

.todo-main {
  display: flex;
  gap: 0.55rem;
  align-items: center;
}

.todo-main span {
  flex: 1;
}

.todo-list li.done .todo-main span {
  color: var(--muted);
  text-decoration: line-through;
}

.actions,
.edit-row {
  display: flex;
  gap: 0.4rem;
}

.ghost {
  background: transparent;
  border: 1px solid var(--line);
  color: var(--ink);
}

.danger {
  background: var(--danger);
}

.clear {
  width: 100%;
  margin-top: 0.8rem;
}

.clear:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

.empty,
.error {
  margin-top: 0.9rem;
}

.error {
  color: var(--danger);
  font-weight: 600;
}

@media (max-width: 700px) {
  .new-todo {
    grid-template-columns: 1fr;
  }

  .actions,
  .edit-row {
    flex-wrap: wrap;
  }
}
</style>
