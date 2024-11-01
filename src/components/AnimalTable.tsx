import React, { useState } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import type Animal from '../types/Animal';
import ConfirmationModal from './ConfirmationModal';
import EditAnimalForm from './EditAnimalForm';
import Api from '../service/Api';

interface AnimalTableProps {
  animals: Animal[];
  customerId: number;
  onAnimalDeleted: (animalId: number) => void;
  onAnimalUpdated: (animal: Animal) => void;
}

const AnimalTable: React.FC<AnimalTableProps> = ({
  animals,
  customerId,
  onAnimalDeleted,
  onAnimalUpdated,
}) => {
  const [deleteAnimalId, setDeleteAnimalId] = useState<number | null>(null);
  const [animalToDelete, setAnimalToDelete] = useState<Animal | null>(null);
  const [editingAnimal, setEditingAnimal] = useState<Animal | null>(null);

  const handleDeleteClick = (animal: Animal) => {
    setAnimalToDelete(animal);
    setDeleteAnimalId(animal.id);
  };

  const handleDeleteConfirm = async () => {
    if (deleteAnimalId) {
      try {
        await Api.delete(`/customers/${customerId}/animals/${deleteAnimalId}`);
        onAnimalDeleted(deleteAnimalId);
        setDeleteAnimalId(null);
      } catch (error) {
        console.error('Error deleting animal:', error);
      }
    }
  };

  if (animals.length === 0) {
    return (
      <div className="text-center py-4 text-gray-500">
        No animals found for this customer.
      </div>
    );
  }

  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Additional Information
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {animals.map((animal) => (
              <tr key={animal.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {animal.name}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">
                    {animal.additionalInformation ? (
                      <pre className="whitespace-pre-wrap">
                        {JSON.stringify(animal.additionalInformation, null, 2)}
                      </pre>
                    ) : (
                      <span className="text-gray-500">No additional information</span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end space-x-2">
                    <button
                      className="text-blue-600 hover:text-blue-900 p-1 rounded-full hover:bg-blue-50"
                      onClick={() => setEditingAnimal(animal)}
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-50"
                      onClick={() => handleDeleteClick(animal)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ConfirmationModal
        isOpen={deleteAnimalId !== null}
        onClose={() => setDeleteAnimalId(null)}
        onConfirm={handleDeleteConfirm}
        title={`Delete ${animalToDelete?.name}`}
        message={`Are you sure you want to delete ${animalToDelete?.name}?`}
      />

      <EditAnimalForm
        isOpen={editingAnimal !== null}
        onClose={() => setEditingAnimal(null)}
        onAnimalUpdated={onAnimalUpdated}
        animal={editingAnimal}
        customerId={customerId}
      />
    </>
  );
};

export default AnimalTable;