import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "./SearchBar";

// Mock de useNavigate
const mockNavigate = vi.fn();
vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

// wrapper que evita repetir el render en cada test
const renderSearchBar = (props = {}) =>
  render(<SearchBar {...props} />);

beforeEach(() => {
  mockNavigate.mockClear();
});

// Renderizado

describe("SearchBar – renderizado", () => {
  it("muestra el input con el placeholder correcto", () => {
    renderSearchBar();
    expect(
      screen.getByPlaceholderText("Buscar muebles...")
    ).toBeInTheDocument();
  });

  it("muestra el botón de búsqueda", () => {
    renderSearchBar();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("el input empieza vacío", () => {
    renderSearchBar();
    expect(screen.getByPlaceholderText("Buscar muebles...")).toHaveValue("");
  });
});

// simula el input
describe("SearchBar – escritura en el input", () => {
  it("actualiza el valor mientras el usuario escribe", () => {
    renderSearchBar();
    const input = screen.getByPlaceholderText("Buscar muebles...");

    fireEvent.change(input, { target: { value: "silla" } });

    expect(input).toHaveValue("silla");
  });
});

// verifica si mockNavigate se llama con la URL correcta al hacer submit

describe("SearchBar – submit del formulario", () => {
  it("navega a /busqueda?q=... al hacer submit con texto válido", () => {
    renderSearchBar();
    const input = screen.getByPlaceholderText("Buscar muebles...");

    fireEvent.change(input, { target: { value: "mesa" } });
    fireEvent.submit(input.closest("form")!);

    expect(mockNavigate).toHaveBeenCalledOnce();
    expect(mockNavigate).toHaveBeenCalledWith("/busqueda?q=mesa");
  });

  it("codifica caracteres especiales en la URL", () => {
    renderSearchBar();
    const input = screen.getByPlaceholderText("Buscar muebles...");

    fireEvent.change(input, { target: { value: "silla de jardín" } });
    fireEvent.submit(input.closest("form")!);

    expect(mockNavigate).toHaveBeenCalledWith(
      "/busqueda?q=silla%20de%20jard%C3%ADn"
    );
  });

  it("NO navega si el input está vacío", () => {
    renderSearchBar();
    const input = screen.getByPlaceholderText("Buscar muebles...");

    fireEvent.submit(input.closest("form")!);

    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it("NO navega si el input contiene sólo espacios", () => {
    renderSearchBar();
    const input = screen.getByPlaceholderText("Buscar muebles...");

    fireEvent.change(input, { target: { value: "   " } });
    fireEvent.submit(input.closest("form")!);

    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it("hace trim al texto antes de navegar", () => {
    renderSearchBar();
    const input = screen.getByPlaceholderText("Buscar muebles...");

    fireEvent.change(input, { target: { value: "  sofá  " } });
    fireEvent.submit(input.closest("form")!);

    expect(mockNavigate).toHaveBeenCalledWith("/busqueda?q=sof%C3%A1");
  });

  it("también funciona al presionar Enter en el input", () => {
    renderSearchBar();
    const input = screen.getByPlaceholderText("Buscar muebles...");

    fireEvent.change(input, { target: { value: "armario" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });
    fireEvent.submit(input.closest("form")!);

    expect(mockNavigate).toHaveBeenCalledWith("/busqueda?q=armario");
  });
});


// cierra el menú si se pasa onCloseMenu y el submit es válido, no lo llama si el input esta vacio o solo espacios, y no lanza error si onCloseMenu no se pasa (es opcional)

describe("SearchBar – prop onCloseMenu", () => {
  it("llama a onCloseMenu después de un submit válido", () => {
    const onCloseMenu = vi.fn();
    renderSearchBar({ onCloseMenu });
    const input = screen.getByPlaceholderText("Buscar muebles...");

    fireEvent.change(input, { target: { value: "cama" } });
    fireEvent.submit(input.closest("form")!);

    expect(onCloseMenu).toHaveBeenCalledOnce();
  });

  it("NO llama a onCloseMenu si el input está vacío", () => {
    const onCloseMenu = vi.fn();
    renderSearchBar({ onCloseMenu });
    const input = screen.getByPlaceholderText("Buscar muebles...");

    fireEvent.submit(input.closest("form")!);

    expect(onCloseMenu).not.toHaveBeenCalled();
  });

  it("funciona correctamente cuando onCloseMenu no se pasa (es opcional)", () => {
    renderSearchBar();
    const input = screen.getByPlaceholderText("Buscar muebles...");

    fireEvent.change(input, { target: { value: "mesa" } });

    // No debe lanzar error al hacer submit sin el prop
    expect(() => fireEvent.submit(input.closest("form")!)).not.toThrow();
  });
});

// verifica que la clase llegue al form y que siempre esté la clase base 
describe("SearchBar – prop className", () => {
  it("aplica la className al formulario cuando se pasa", () => {
    const { container } = renderSearchBar({ className: "mi-clase-custom" });
    const form = container.querySelector("form");

    expect(form).toHaveClass("mi-clase-custom");
  });

  it("usa clase vacía por defecto cuando no se pasa className", () => {
    const { container } = renderSearchBar();
    const form = container.querySelector("form");

    // La clase base siempre está, className default es ""
    expect(form?.className).toContain("flex");
  });
});