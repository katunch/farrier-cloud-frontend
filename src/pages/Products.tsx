import { useEffect, useState } from "react";
import { PlusCircle } from "lucide-react";
import ProductTable from "../components/ProductTable";
import Api from "../service/Api";
import Product from "../types/Product";

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    Api.get("/products").then((response: { data: Product[] }) => {
      console.log(`Products loaded: ${response.data.length}`);
      setProducts(response.data);
    });
  }, []);


  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Produkte</h1>
          <p className="text-gray-600">Manage your products here.</p>
        </div>
        <button
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          onClick={() => console.log('Add new product')}
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Customer
        </button>
      </div>
      
      <div className="flex flex-col">
        <ProductTable products={products}/>
      </div>
    </div>
  );
};

export default Products;