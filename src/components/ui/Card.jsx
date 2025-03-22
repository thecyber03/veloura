import { Link } from "react-router-dom";
import AddToCartButton from "./AddToCartButton.jsx"; 

export default function Card({ product, onSelectProduct }) {
  
  return (
    <div className="p-2 shadow-sm bg-white cursor-pointer">
      {/* Mobile: Redirect to ProductView */}
      <Link to={`/product/${product.id}`} className="block lg:hidden">
        <div>
          <div className="h-48 lg:h-28 overflow-hidden flex justify-center items-center">
            <img src={product.image} className="h-full w-auto object-contain" />
          </div>
          <h3 className="truncate w-full overflow-hidden whitespace-nowrap font-medium mt-2 lg:text-xs">
            {product.title}
          </h3>
        </div>
      </Link>

      {/* Large Screens: Update ProductView without redirecting */}
      <div className="hidden lg:block" onClick={() => onSelectProduct(product)}>
        <div className="h-48 lg:h-28 overflow-hidden flex justify-center items-center">
          <img src={product.image} className="h-full w-auto object-contain" />
        </div>
        <h3 className="truncate w-full overflow-hidden whitespace-nowrap font-medium mt-2 lg:text-xs">
          {product.title}
        </h3>
      </div>

      <p className="text-gray-500 text-xs">{product.quantity || 500} {product.unit || "gm"}</p>

      <div className="flex justify-between items-center mt-2">  
        <p className="text-gray-700 font-semibold lg:text-sm">₹{product.price}</p>
        <AddToCartButton product={product} />
      </div>

      <p className="text-gray-600 text-xs mt-1 lg:mt-0">@{product.author}</p>
    </div>
  );
}
