import React, { useState } from 'react';
import { PlusCircle, ParkingSquare, LogOut } from 'lucide-react';
import ParkingSpotList from './ParkingSpotList';
import ParkingSpotForm from './ParkingSpotForm';
import { ParkingSpot, ParkingSpotFormData } from '../types';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { logout } = useAuth();
  const [spots, setSpots] = useState<ParkingSpot[]>([
    {
      id: '1',
      name: 'Central Parking A1',
      status: 'available',
      rate: 60,
      images: [],
      amenities: ['Security Guard', 'CC Camera'],
      address: {
        street: 'MG Road',
        city: 'Bangalore',
        state: 'Karnataka',
        pincode: '560001',
        latitude: 12.9716,
        longitude: 77.5946,
      },
    },
  ]);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingSpot, setEditingSpot] = useState<ParkingSpot | undefined>();

  const handleCreate = (data: ParkingSpotFormData) => {
    const newSpot: ParkingSpot = {
      ...data,
      id: Date.now().toString(),
    };
    setSpots(prev => [...prev, newSpot]);
    setIsFormOpen(false);
  };

  const handleUpdate = (data: ParkingSpotFormData) => {
    if (!editingSpot) return;
    setSpots(prev =>
      prev.map(spot =>
        spot.id === editingSpot.id ? { ...data, id: spot.id } : spot
      )
    );
    setEditingSpot(undefined);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this parking spot?')) {
      setSpots(prev => prev.filter(spot => spot.id !== id));
    }
  };

  const handleEdit = (spot: ParkingSpot) => {
    setEditingSpot(spot);
  };

  const handleCancel = () => {
    setIsFormOpen(false);
    setEditingSpot(undefined);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <ParkingSquare className="h-8 w-8 text-indigo-600" />
              <h1 className="ml-3 text-2xl font-bold text-gray-900">
                Parking Spot Management
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              {!isFormOpen && !editingSpot && (
                <button
                  onClick={() => setIsFormOpen(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <PlusCircle className="h-5 w-5 mr-2" />
                  Add Parking Spot
                </button>
              )}
              <button
                onClick={logout}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <LogOut className="h-5 w-5 mr-2" />
                Logout
              </button>
            </div>
          </div>

          {(isFormOpen || editingSpot) && (
            <div className="mb-8">
              <ParkingSpotForm
                onSubmit={editingSpot ? handleUpdate : handleCreate}
                initialData={editingSpot}
                onCancel={handleCancel}
              />
            </div>
          )}

          <ParkingSpotList
            spots={spots}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
}