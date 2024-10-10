import { ClothingItem } from '../types/ClothingItem';

const mockClothingItems: ClothingItem[] = [
  { id: 1, name: 'Summer Dress', price: 49.99, stock: 100, category: 'Dresses', image: 'https://source.unsplash.com/400x600/?summer+dress' },
  { id: 2, name: 'Denim Jeans', price: 59.99, stock: 150, category: 'Pants', image: 'https://source.unsplash.com/400x600/?denim+jeans' },
  { id: 3, name: 'Floral Blouse', price: 39.99, stock: 80, category: 'Tops', image: 'https://source.unsplash.com/400x600/?floral+blouse' },
  { id: 4, name: 'Leather Jacket', price: 99.99, stock: 50, category: 'Outerwear', image: 'https://source.unsplash.com/400x600/?leather+jacket' },
  { id: 5, name: 'Sneakers', price: 79.99, stock: 120, category: 'Shoes', image: 'https://source.unsplash.com/400x600/?sneakers' },
];

export const fetchClothingItems = (): Promise<ClothingItem[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockClothingItems);
    }, 500); // Simulate network delay
  });
};