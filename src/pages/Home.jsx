import { useState, useEffect } from "react";
import CategoryFilter from "../components/ui/CategoryFilter.jsx";
import Card from "../components/ui/Card.jsx";
import { useProducts } from "../API/ProductContext.jsx";
import ProductView from "./ProductView.jsx";
import SearchProduct from '../components/ui/SearchProduct.jsx'
import { useLocation } from "react-router-dom";

export default function Home() {
  const { products } = useProducts();
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState(products[0]);
  
  useEffect(() => {
    if (products.length > 0 && !selectedProduct) {
      setSelectedProduct(products[0]);
    }
  }, [products]); 
  
  const handleProductClick = (product) => {
    setSelectedProduct(product); // ✅ Large screen should update when clicking a product
  };

  const categories = ["All", ...new Set(products.map((product) => product.category))];

  function handleFilter(category) {
    setActiveCategory(category);
  }
  
  const filteredProducts = products
  .filter((product) => activeCategory === "All" || product.category === activeCategory) // Category filter

   
  return (
    <div className="flex">
      {/* Left Side: Product List (70%) */}
      <div className="w-full lg:w-[60%]">
        <div className="fixed z-[10] top-16 left-0 w-full bg-white px-4 lg:w-[60%]">
          <SearchProduct />
          <div className="overflow-x-auto whitespace-nowrap">
            <CategoryFilter categories={categories} activeCategory={activeCategory} onFilter={handleFilter} />
          </div>
        </div>

        <div className=" mt-32 px-1 grid grid-cols-2 gap-1 lg:grid-cols-4">
          {filteredProducts.map((product) => (
            <Card key={product.id} product={product} onSelectProduct={handleProductClick} />
          ))}
        </div>
      </div>

      {/* Right Side: Product View (30%) - Only on Large Screens */}
      <div className="hidden lg:block w-[40%] border-l p-4">
        {selectedProduct ? (
          <ProductView product={selectedProduct} onSelectProduct={handleProductClick} />
        ) : (
          <p>Select a product to view</p>
        )}
      </div>
      
      
    </div>
  );
}
