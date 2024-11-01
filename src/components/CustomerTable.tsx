import React, { useState } from 'react';
import { MoreHorizontal, Pencil, Trash2, PlusCircle, ChevronDown, ChevronUp } from 'lucide-react';
import Customer from '../types/Customer';
import Animal from '../types/Animal';
import ConfirmationModal from './ConfirmationModal';
import AnimalTable from './AnimalTable';
import AddAnimalForm from './AddAnimalForm';
import Api from '../service/Api';

interface CustomerTableProps {
  customers: Customer[];
  onCustomerDeleted: (customerId: number) => void;
  onEditCustomer: (customer: Customer) => void;
}

const CustomerTable: React.FC<CustomerTableProps> = ({ 
  customers, 
  onCustomerDeleted,
  onEditCustomer 
}) => {
  const [deleteCustomerId, setDeleteCustomerId] = useState<number | null>(null);
  const [customerToDelete, setCustomerToDelete] = useState<Customer | null>(null);
  const [expandedCustomerId, setExpandedCustomerId] = useState<number | null>(null);
  const [customerAnimals, setCustomerAnimals] = useState<{ [key: number]: Animal[] }>({});
  const [isAddAnimalOpen, setIsAddAnimalOpen] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState<number | null>(null);
  const [loadingCustomerId, setLoadingCustomerId] = useState<number | null>(null);

  const handleDeleteClick = (e: React.MouseEvent, customer: Customer) => {
    e.stopPropagation();
    setCustomerToDelete(customer);
    setDeleteCustomerId(customer.id);
  };

  const handleDeleteConfirm = async () => {
    if (deleteCustomerId) {
      try {
        await Api.delete(`/customers/${deleteCustomerId}`);
        onCustomerDeleted(deleteCustomerId);
        setDeleteCustomerId(null);
        setCustomerToDelete(null);
      } catch (error) {
        console.error('Error deleting customer:', error);
      }
    }
  };

  const handleRowClick = async (customerId: number) => {
    try {
      if (expandedCustomerId === customerId) {
        setExpandedCustomerId(null);
        return;
      }

      setLoadingCustomerId(customerId);
      setExpandedCustomerId(customerId);

      if (!customerAnimals[customerId]) {
        const response = await Api.get(`/customers/${customerId}/animals`);
        setCustomerAnimals(prev => ({
          ...prev,
          [customerId]: response.data
        }));
      }
    } catch (error) {
      console.error('Error fetching animals:', error);
      setCustomerAnimals(prev => ({
        ...prev,
        [customerId]: []
      }));
    } finally {
      setLoadingCustomerId(null);
    }
  };

  const handleAddAnimal = (e: React.MouseEvent, customerId: number) => {
    e.stopPropagation();
    setSelectedCustomerId(customerId);
    setIsAddAnimalOpen(true);
  };

  const handleAnimalAdded = (newAnimal: Animal) => {
    if (selectedCustomerId) {
      setCustomerAnimals(prev => ({
        ...prev,
        [selectedCustomerId]: [...(prev[selectedCustomerId] || []), newAnimal]
      }));
    }
  };

  const handleAnimalDeleted = (customerId: number, animalId: number) => {
    setCustomerAnimals(prev => ({
      ...prev,
      [customerId]: prev[customerId].filter(animal => animal.id !== animalId)
    }));
  };

  const handleAnimalUpdated = (customerId: number, updatedAnimal: Animal) => {
    setCustomerAnimals(prev => ({
      ...prev,
      [customerId]: prev[customerId].map(animal => 
        animal.id === updatedAnimal.id ? updatedAnimal : animal
      )
    }));
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Address
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Phone Number
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {customers.map((customer) => (
                <React.Fragment key={customer.id}>
                  <tr 
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => handleRowClick(customer.id)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {expandedCustomerId === customer.id ? (
                          <ChevronUp className="w-4 h-4 mr-2 text-gray-400" />
                        ) : (
                          <ChevronDown className="w-4 h-4 mr-2 text-gray-400" />
                        )}
                        <div className="text-sm font-medium text-gray-900">
                          {customer.firstName} {customer.lastName}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {customer.address !== '-' && (
                          <>{customer.address}, </>
                        )}
                        {customer.zip} {customer.city}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{customer.mobile}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          className="text-blue-600 hover:text-blue-900 p-1 rounded-full hover:bg-blue-50"
                          onClick={(e) => {
                            e.stopPropagation();
                            onEditCustomer(customer);
                          }}
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-50"
                          onClick={(e) => handleDeleteClick(e, customer)}
                        >
                          <Trash2 size={16} />
                        </button>
                        <button
                          className="text-gray-600 hover:text-gray-900 p-1 rounded-full hover:bg-gray-50"
                          onClick={(e) => {
                            e.stopPropagation();
                            console.log('More', customer.id);
                          }}
                        >
                          <MoreHorizontal size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                  {expandedCustomerId === customer.id && (
                    <tr>
                      <td colSpan={4} className="px-6 py-4 bg-gray-50">
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <h3 className="text-lg font-medium text-gray-900">Animals</h3>
                            <button
                              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                              onClick={(e) => handleAddAnimal(e, customer.id)}
                            >
                              <PlusCircle className="mr-2 h-4 w-4" />
                              Add Animal
                            </button>
                          </div>
                          {loadingCustomerId === customer.id ? (
                            <div className="text-center py-4">
                              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
                            </div>
                          ) : (
                            <AnimalTable
                              animals={customerAnimals[customer.id] || []}
                              customerId={customer.id}
                              onAnimalDeleted={(animalId) => handleAnimalDeleted(customer.id, animalId)}
                              onAnimalUpdated={(animal) => handleAnimalUpdated(customer.id, animal)}
                            />
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ConfirmationModal
        isOpen={deleteCustomerId !== null}
        onClose={() => {
          setDeleteCustomerId(null);
          setCustomerToDelete(null);
        }}
        onConfirm={handleDeleteConfirm}
        title={`Delete ${customerToDelete?.firstName} ${customerToDelete?.lastName}`}
        message={`Are you sure you want to delete ${customerToDelete?.firstName} ${customerToDelete?.lastName}?`}
      />

      <AddAnimalForm
        isOpen={isAddAnimalOpen}
        onClose={() => {
          setIsAddAnimalOpen(false);
          setSelectedCustomerId(null);
        }}
        onAnimalAdded={handleAnimalAdded}
        customerId={selectedCustomerId}
      />
    </>
  );
};

export default CustomerTable;