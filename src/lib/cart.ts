export type CartItem = {
  slug: string;
  name: string;
  color: string;
  size: string;
  price: number;
  quantity: number;
  image: string;
};

export function cartItemKey(slug: string, size: string) {
  return `${slug}__${size}`;
}

export function cartSubtotal(items: CartItem[]) {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

export function cartQuantity(items: CartItem[]) {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}
