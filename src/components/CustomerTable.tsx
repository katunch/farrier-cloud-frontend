import React, { useState } from 'react';
import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import Customer from '../types/Customer';
import ConfirmationModal from './ConfirmationModal';
import Api from '../service/Api';


interface CustomerTableProps {
  customers: Customer[];
  onCustomerDeleted: (customerId: number) => void;
  onEditCustomer: (customer: Customer) => void;
}

const CustomerTable: React.FC<CustomerTableProps>= ({ 
  customers, 
  onCustomerDeleted,
  onEditCustomer 
}) => {
  const [deleteCustomerId, setDeleteCustomerId] = useState<number | null>(null);
  const [customerToDelete, setCustomerToDelete] = useState<Customer | null>(null);

  const handleDeleteClick = (customer: Customer) => {
    setCustomerToDelete(customer);
    setDeleteCustomerId(customer.id);
  };

  const handleDeleteConfirm = async () => {
    if (deleteCustomerId) {
      try {
        await Api.delete(`/customers/${deleteCustomerId}`);
        onCustomerDeleted(deleteCustomerId);
      } catch (error) {
        console.error('Error deleting customer:', error);
      }
    }
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
              <tr key={customer.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {customer.firstName} {customer.lastName}
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
                      onClick={() => onEditCustomer(customer)}
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-50"
                      onClick={() => handleDeleteClick(customer)}
                    >
                      <Trash2 size={16} />
                    </button>
                    <button
                      className="text-gray-600 hover:text-gray-900 p-1 rounded-full hover:bg-gray-50"
                      onClick={() => console.log('More', customer.id)}
                    >
                      <MoreHorizontal size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
          <ConfirmationModal
          isOpen={deleteCustomerId !== null}
          onClose={() => setDeleteCustomerId(null)}
          onConfirm={handleDeleteConfirm}
          title={"Delete "+customerToDelete?.firstName+" "+customerToDelete?.lastName}
          message={"Are you sure you want to delete "+ customerToDelete?.firstName+" "+customerToDelete?.lastName +"?"}
        />
        </>
  );
};

export default CustomerTable;