import { test, expect } from '@playwright/test';
 
// agrupa los tests del flujo principal de la app
test.describe('Flujo completo: login → buscar mueble', () => {
 
  // hago login antes de cada test para no repetirlo
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
 
    await page.getByPlaceholder('ejemplo@correo.com').fill('goku@kamehouse.com');
    await page.getByPlaceholder('Ingresa tu contraseña').fill('kamehameha123a');
    await page.getByRole('button', { name: 'Entrar' }).click();
 
    // espero que me mande al home antes de seguir
    await page.waitForURL('/');
  });
 
  // verifico el login y que el header muestre el perfil
  test('el usuario puede iniciar sesión correctamente', async ({ page }) => {
    await expect(page).toHaveURL('/');
 
    // si aparece "perfil" en el header, la sesión está activa
    await expect(page.getByRole('link', { name: 'Perfil' })).toBeVisible();
  });
 
  // Busco un mueble y chequeo que aparezcan resultados
  test('el usuario puede buscar un mueble', async ({ page }) => {
    await page.getByPlaceholder('Buscar muebles...').fill('silla');
    await page.getByPlaceholder('Buscar muebles...').press('Enter');
 
    // Verifico que la URL cambió correctamente

    await expect(page).toHaveURL(/\/busqueda\?q=silla/);
 
    // al menos un resultado visible
    await expect(page.locator('text=silla').first()).toBeVisible();
  });
 
});
 