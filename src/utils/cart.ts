import { type CartItem } from "../types";

export const addToCart = (product: CartItem) => {
  const stored = JSON.parse(
    localStorage.getItem("carrito") || "[]",
  ) as CartItem[];

  const existing = stored.find((item) => item.id === product.id);

  if (existing) {
    existing.quantity += product.quantity; // sumamos
  } else {
    stored.push(product);
  }

  localStorage.setItem("carrito", JSON.stringify(stored));
};
