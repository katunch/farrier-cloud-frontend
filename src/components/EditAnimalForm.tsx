import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import Api from '../service/Api';
import type Animal from '../types/Animal';

interface EditAnimalFormProps {
  isOpen: boolean;
  onClose: () => void;
  onAnimalUpdated: (animal: Animal) => void;
  animal: Animal | null;
  customerId: number;
}

const EditAnimalForm: React.FC<EditAnimalFormProps> = ({ 
  isOpen, 
  onClose, 
  onAnimalUpdated,
  animal,
  customerId
}) => {
  const [formData, setFormData] = useState({
    name: '',
    additionalInformation: ''
  });

  useEffect(() => {
    if (animal) {
      setFormData({
        name: animal.name,
        additionalInformation: animal.additionalInformation ? 
          JSON.stringify(animal.additionalInformation, null, 2) : 
          ''
      });
    }
  }, [animal]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!animal) return;

    try {
      const response = await Api.put(`/customers/${customerId}/animals/${animal.id}`, {
        ...formData,
        additionalInformation: formData.additionalInformation ? 
          JSON.parse(formData.additionalInformation) : 
          null
      });
      onAnimalUpdated(response.data);
      onClose();
    } catch (error) {
      console.error('Error updating animal:', error);
    }
  };

  if (!isOpen || !animal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X size={20} />
        </button>
        
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Edit Animal</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Additional Information (JSON)
            </label>
            <textarea
              rows={4}
              value={formData.additionalInformation}
              onChange={(e) => setFormData({ ...formData, additionalInformation: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder='{"breed": "Arabian", "color": "Bay", "age": 12}'
            />
          </div>
          
          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAnimalForm;