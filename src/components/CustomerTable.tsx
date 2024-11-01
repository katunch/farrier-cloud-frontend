import React from 'react';
import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react';

interface Customer {
  id: number;
  firstName: string;
  lastName: string;
  address: string;
  zip: string;
  city: string;
  mobile: string;
}

const CustomerTable: React.FC = () => {
  const customers: Customer[] = [
    {
      id: 1,
      firstName: 'Michele',
      lastName: 'Schmid',
      address: 'Im Kläffler 9',
      zip: '8370',
      city: 'Sirnach',
      mobile: '+41799331297'
    },
    {
      id: 2,
      firstName: 'Nadine',
      lastName: 'Rüegg',
      address: '-',
      zip: '9247',
      city: 'Henau',
      mobile: '+41791234567'
    }
  ];

  return (
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
                      onClick={() => console.log('Edit', customer.id)}
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-50"
                      onClick={() => console.log('Delete', customer.id)}
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
  );
};

export default CustomerTable;