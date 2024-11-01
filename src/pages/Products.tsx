import { useEffect, useState } from "react";
import { PlusCircle } from "lucide-react";
import ProductTable from "../components/ProductTable";
import AddProductForm from "../components/AddProductForm";
import EditProductForm from "../components/EditProductForm";
import ConfirmationModal from "../components/ConfirmationModal";
import Api from "../service/Api";
import Product from "../types/Product";

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deleteProductId, setDeleteProductId] = useState<number | null>(null);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  useEffect(() => {
    Api.get("/products").then((response: { data: Product[] }) => {
      console.log(`Products loaded: ${response.data.length}`);
      setProducts(response.data);
    });
  }, []);

  const handleProductAdded = (newProduct: Product) => {
    setProducts([...products, newProduct]);
  };

  const handleProductDeleted = async (productId: number) => {
    const productToDelete = products.find(p => p.id === productId);
    setProductToDelete(productToDelete || null);
    setDeleteProductId(productId);
  };

  const handleDeleteConfirm = async () => {
    if (deleteProductId) {
      try {
        await Api.delete(`/products/${deleteProductId}`);
        setProducts(products.filter(product => product.id !== deleteProductId));
        setDeleteProductId(null);
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  const handleProductUpdated = (updatedProduct: Product) => {
    setProducts(products.map(product => 
      product.id === updatedProduct.id ? updatedProduct : product
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Produkte</h1>
          <p className="text-gray-600">Manage your products here.</p>
        </div>
        <button
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          onClick={() => setIsAddProductOpen(true)}
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Product
        </button>
      </div>
      
      <div className="flex flex-col">
        <ProductTable 
          products={products}
          onProductDeleted={handleProductDeleted}
          onEditProduct={setEditingProduct}
        />
      </div>

      <AddProductForm
        isOpen={isAddProductOpen}
        onClose={() => setIsAddProductOpen(false)}
        onProductAdded={handleProductAdded}
      />

      <EditProductForm
        isOpen={editingProduct !== null}
        onClose={() => setEditingProduct(null)}
        onProductUpdated={handleProductUpdated}
        product={editingProduct}
      />

      <ConfirmationModal
        isOpen={deleteProductId !== null}
        onClose={() => setDeleteProductId(null)}
        onConfirm={handleDeleteConfirm}
        title={`Delete ${productToDelete?.title}`}
        message={`Are you sure you want to delete ${productToDelete?.title}?`}
      />
    </div>
  );
};

export default Products;