import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface InventoryItem {
  id: number;
  name: string;
  price: number;
  stock: number;
  category: string;
  image: string;
}

const AdminPanel: React.FC = () => {
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([]);
  const [newItem, setNewItem] = useState({ name: '', price: 0, stock: 0, category: '', image: '' });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/inventory');
      setInventoryItems(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching inventory:', error);
      setError('Failed to load inventory. Please try again later.');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: name === 'price' || name === 'stock' ? Number(value) : value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/api/inventory', newItem);
      setNewItem({ name: '', price: 0, stock: 0, category: '', image: '' });
      fetchInventory();
    } catch (error) {
      console.error('Error adding item:', error);
      setError('Failed to add item. Please try again.');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3001/api/inventory/${id}`);
      fetchInventory();
    } catch (error) {
      console.error('Error deleting item:', error);
      setError('Failed to delete item. Please try again.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Panel</h1>
      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}
      <form onSubmit={handleSubmit} className="mb-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Add New Item</h2>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            value={newItem.name}
            onChange={handleInputChange}
            placeholder="Item Name"
            className="border p-2 rounded"
            required
          />
          <input
            type="number"
            name="price"
            value={newItem.price}
            onChange={handleInputChange}
            placeholder="Price"
            className="border p-2 rounded"
            required
          />
          <input
            type="number"
            name="stock"
            value={newItem.stock}
            onChange={handleInputChange}
            placeholder="Stock"
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            name="category"
            value={newItem.category}
            onChange={handleInputChange}
            placeholder="Category"
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            name="image"
            value={newItem.image}
            onChange={handleInputChange}
            placeholder="Image URL"
            className="border p-2 rounded col-span-2"
            required
          />
        </div>
        <button type="submit" className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300">
          Add Item
        </button>
      </form>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Inventory</h2>
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Price</th>
              <th className="p-2 text-left">Stock</th>
              <th className="p-2 text-left">Category</th>
              <th className="p-2 text-left">Image</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {inventoryItems.map((item) => (
              <tr key={item.id} className="border-b">
                <td className="p-2">{item.name}</td>
                <td className="p-2">${item.price.toFixed(2)}</td>
                <td className="p-2">{item.stock}</td>
                <td className="p-2">{item.category}</td>
                <td className="p-2">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                </td>
                <td className="p-2">
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600 transition duration-300"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPanel;