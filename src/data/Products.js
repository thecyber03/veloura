export async function fetchProducts() {
  try {
    const response = await fetch(import.meta.env.VITE_PRODUCT_API); // Replace with actual API if needed
    const data = await response.json();

    return data
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

