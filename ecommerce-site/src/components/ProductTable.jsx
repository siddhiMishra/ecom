import React from 'react';

const ProductTable = ({ products }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Name</th>
            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Price</th>
            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Category</th>
            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Color</th>
            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Size</th>
            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Image</th>
            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Link</th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {products.map((product, index) => (
            <tr key={index}>
              <td className="text-left py-3 px-4">{product.name}</td>
              <td className="text-left py-3 px-4">{product.price}</td>
              <td className="text-left py-3 px-4">{product.category}</td>
              <td className="text-left py-3 px-4">{product.color}</td>
              <td className="text-left py-3 px-4">{product.size}</td>
              <td className="text-left py-3 px-4">
                <img
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  className="w-16 h-16 object-cover"
                />
              </td>
              <td className="text-left py-3 px-4">
                <a href={product.href} className="text-blue-500 hover:underline">
                  View Product
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
