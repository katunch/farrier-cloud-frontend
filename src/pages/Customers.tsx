import { useEffect, useState } from 'react';
import { PlusCircle } from 'lucide-react';
import CustomerTable from '../components/CustomerTable';
import AddCustomerForm from '../components/AddCustomerForm';
import EditCustomerForm from '../components/EditCustomerForm';
import Api from '../service/Api';
import Customer from '../types/Customer';

const Customers = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isAddCustomerOpen, setIsAddCustomerOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);

  useEffect(() => {
    Api.get('/customers').then((response: { data: Customer[] }) => {
      console.log(`Customers loaded: ${response.data.length}`);
      setCustomers(response.data);
    });
  }, []);

  const handleCustomerAdded = (newCustomer: Customer) => {
    setCustomers([...customers, newCustomer]);
  };

  const handleCustomerDeleted = (customerId: number) => {
    setCustomers(customers.filter(customer => customer.id !== customerId));
  };

  const handleCustomerUpdated = (updatedCustomer: Customer) => {
    setCustomers(customers.map(customer => 
      customer.id === updatedCustomer.id ? updatedCustomer : customer
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Kunden</h1>
          <p className="text-gray-600">Manage your customer database here.</p>
        </div>
        <button
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          onClick={() => setIsAddCustomerOpen(true)}
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Customer
        </button>
      </div>

      <div className="flex flex-col">
        <CustomerTable
          customers={customers}
          onCustomerDeleted={handleCustomerDeleted}
          onEditCustomer={setEditingCustomer}
        />
      </div>
      <AddCustomerForm
        isOpen={isAddCustomerOpen}
        onClose={() => setIsAddCustomerOpen(false)}
        onCustomerAdded={handleCustomerAdded}
      />
            <EditCustomerForm
        isOpen={editingCustomer !== null}
        onClose={() => setEditingCustomer(null)}
        onCustomerUpdated={handleCustomerUpdated}
        customer={editingCustomer}
      />
    </div>
  );
};

export default Customers;