import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:5173");
});

// ── Renderizado ───────────────────────────────────────────────────────────────

test.describe("SearchBar – renderizado", () => {
  test("muestra el input con el placeholder correcto", async ({ page }) => {
    await expect(page.getByPlaceholder("Buscar muebles...")).toBeVisible();
  });

  test("muestra el botón de búsqueda", async ({ page }) => {
    await expect(
      page
        .getByRole("button", { name: /buscar/i })
        .or(page.locator("form button"))
        .first(),
    ).toBeVisible();
  });

  test("el input empieza vacío", async ({ page }) => {
    const input = page.getByPlaceholder("Buscar muebles...");
    await expect(input).toHaveValue("");
  });
});

// ── Escritura en el input ─────────────────────────────────────────────────────

test.describe("SearchBar – escritura en el input", () => {
  test("actualiza el valor mientras el usuario escribe", async ({ page }) => {
    const input = page.getByPlaceholder("Buscar muebles...");
    await input.fill("silla");
    await expect(input).toHaveValue("silla");
  });
});

// ── Submit del formulario ─────────────────────────────────────────────────────

test.describe("SearchBar – submit del formulario", () => {
  test("navega a /busqueda?q=... al hacer submit con texto válido", async ({
    page,
  }) => {
    const input = page.getByPlaceholder("Buscar muebles...");
    await input.fill("mesa");
    await input.press("Enter");
    await expect(page).toHaveURL(/\/busqueda\?q=mesa/);
  });

  test("codifica caracteres especiales en la URL", async ({ page }) => {
    const input = page.getByPlaceholder("Buscar muebles...");
    await input.fill("silla de jardín");
    await input.press("Enter");
    await expect(page).toHaveURL(/\/busqueda\?q=silla/);
  });

  test("NO navega si el input está vacío", async ({ page }) => {
    const input = page.getByPlaceholder("Buscar muebles...");
    await input.press("Enter");
    await expect(page).toHaveURL("http://localhost:5173/");
  });

  test("NO navega si el input contiene sólo espacios", async ({ page }) => {
    const input = page.getByPlaceholder("Buscar muebles...");
    await input.fill("   ");
    await input.press("Enter");
    await expect(page).toHaveURL("http://localhost:5173/");
  });

  test("hace trim al texto antes de navegar", async ({ page }) => {
    const input = page.getByPlaceholder("Buscar muebles...");
    await input.fill("  sofá  ");
    await input.press("Enter");
    await expect(page).toHaveURL(/\/busqueda\?q=sof/);
  });
});
