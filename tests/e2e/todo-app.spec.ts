import { expect, test } from '@playwright/test';

test.describe('TaskFlow MVP E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => {
      window.localStorage.clear();
    });
    await page.reload();
    await expect(page.locator('.todo-app')).toBeVisible();
  });

  test('crear tarea con Enter y boton', async ({ page }) => {
    const input = page.getByLabel('Nueva tarea');

    await input.fill('Comprar pan');
    await input.press('Enter');

    await input.fill('Preparar informe');
    await page.getByRole('button', { name: 'Agregar' }).click();

    await expect(page.getByText('Comprar pan')).toBeVisible();
    await expect(page.getByText('Preparar informe')).toBeVisible();
    await expect(page.getByText('2 pendientes para hoy.')).toBeVisible();
  });

  test('completar tarea y filtrar por estado', async ({ page }) => {
    const input = page.getByLabel('Nueva tarea');
    const filters = page.locator('nav.filters');

    await input.fill('Tarea A');
    await input.press('Enter');
    await input.fill('Tarea B');
    await input.press('Enter');

    await page.getByRole('checkbox', { name: 'Marcar tarea Tarea A' }).check();
    await expect(page.getByText('1 pendientes para hoy.')).toBeVisible();

    await filters.getByRole('button', { name: 'Pendientes', exact: true }).click();
    await expect(page.getByText('Tarea B')).toBeVisible();
    await expect(page.getByText('Tarea A')).toHaveCount(0);

    await filters.getByRole('button', { name: 'Completadas', exact: true }).click();
    await expect(page.getByText('Tarea A')).toBeVisible();
    await expect(page.getByText('Tarea B')).toHaveCount(0);
  });

  test('editar y eliminar tarea', async ({ page }) => {
    const input = page.getByLabel('Nueva tarea');

    await input.fill('Texto original');
    await input.press('Enter');

    await page.getByText('Texto original').dblclick();
    const editInput = page.locator('.edit-row input[type="text"]');
    await expect(editInput).toBeVisible();

    await editInput.fill('Texto actualizado');
    await page.getByRole('button', { name: 'Guardar cambios' }).click();

    await expect(page.getByText('Texto actualizado')).toBeVisible();

    await page.getByRole('button', { name: 'Eliminar tarea: Texto actualizado' }).click();
    await expect(page.getByText('No hay tareas para este filtro. Crea una nueva para empezar.')).toBeVisible();
  });

  test('persistencia tras recarga y limpiar completadas', async ({ page }) => {
    const input = page.getByLabel('Nueva tarea');

    await input.fill('Persistir 1');
    await input.press('Enter');
    await input.fill('Persistir 2');
    await input.press('Enter');

    await page.getByRole('checkbox', { name: 'Marcar tarea Persistir 1' }).check();
    await page.reload();

    await expect(page.getByText('Persistir 1')).toBeVisible();
    await expect(page.getByText('Persistir 2')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Limpiar tareas completadas' })).toBeEnabled();

    await page.getByRole('button', { name: 'Limpiar tareas completadas' }).click();
    await expect(page.getByText('Persistir 1')).toHaveCount(0);
    await expect(page.getByText('Persistir 2')).toBeVisible();
  });
});
