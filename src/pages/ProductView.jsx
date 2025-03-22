import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useProducts } from "../API/ProductContext.jsx";
import Card from "../components/ui/Card.jsx";
import AddToCartButton from "../components/ui/AddToCartButton.jsx";

export default function ProductView({ product: selectedProduct, onSelectProduct }) {
  const { id } = useParams();
  const { products } = useProducts();

  const product = selectedProduct || products.find((p) => p.id === parseInt(id));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) return <div>Loading...</div>;

  const relatedProducts = products.filter((p) => p.category === product.category && p.id !== product.id);
  const exploreProducts = products.filter((p) => p.category !== product.category);
  
  return (
    <div className="p-4">
      {/* ✅ Product Image */}
      <div className="w-full h-80 flex justify-center items-center">
        <img src={product.image} className="h-full w-auto object-contain" />
      </div>

      {/* ✅ Title appears after image */}
      <h1 className="text-2xl font-bold">{product.title}</h1>

      <p className="text-gray-500 text-xs">{product.quantity || 500} {product.unit || "gm"}</p>

      <div className="flex justify-between items-center mt-2">
        <p className="text-gray-700 font-semibold text-lg">₹{product.price}</p>
        <AddToCartButton product={product} />
      </div>

      <p className="text-gray-600 text-xs mt-2">@{product.author}</p>

      {/* ✅ Product Description - Ensures it's always displayed */}
      <div className="mt-4 border-t pt-4">
        <h2 className="text-lg font-semibold">Product Description</h2>
        <p className="text-gray-600 text-sm mt-2">{product.description || "No description available."}</p>
      </div>

      {/* ✅ Related Products Section */}
      {relatedProducts.length > 0 ? (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-3">Related Products</h2>
          <div className="flex gap-4 overflow-x-auto scrollbar-hide">
            {relatedProducts.map((item) => (
              <div key={item.id} className="w-1/2 min-w-[50%]">
                <Card product={item} onSelectProduct={onSelectProduct} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-gray-500 text-sm mt-4">No related products found.</p>
      )}

      {/* ✅ Explore More Section (Already Working) */}
      {exploreProducts.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-3">Explore More</h2>
          <div className="flex gap-4 overflow-x-auto scrollbar-hide">
            {exploreProducts.map((item) => (
              <div key={item.id} className="w-1/2 min-w-[50%]">
                <Card product={item} onSelectProduct={onSelectProduct} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
