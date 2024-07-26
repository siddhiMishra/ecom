// src/App.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductGrid from './components/ProductGrid';
import Filter from './components/Filter';
import ProductTable from './components/ProductTable';

const App = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({ category: 'All', color: 'All', size: 'All', search: '' });
  const [view, setView] = useState('Table'); // State to toggle between grid and table views

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/products', {
          params: {
            search: filters.search,
          },
        });
        setProducts(response.data);
        console.log(products)
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [filters]);

  const filteredProducts = products.filter((product) => {
    const matchesCategory = filters.category === 'All' || product.category === filters.category;
    const matchesColor = filters.color === 'All' || product.color === filters.color;
    const matchesSize = filters.size === 'All' || product.size === filters.size;
    const matchesSearch = product.name.toLowerCase().includes(filters.search.toLowerCase());
   
    return matchesCategory && matchesColor && matchesSize && matchesSearch;
  });

  return (
    <div className="App">
      <header className="bg-gray-800 text-white p-4">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold">E-Commerce Store</h1>
          {/* Toggle buttons for Grid and Table views */}
          
        </div>
      </header>
      <main className="container mx-auto py-8">
        <Filter filters={filters} setFilters={setFilters} />
        {view === 'grid' ? (
          <ProductGrid products={filteredProducts} />
        ) : (
          <ProductTable products={filteredProducts} />

        )}
      </main>
    </div>
  );
};

export default App;
