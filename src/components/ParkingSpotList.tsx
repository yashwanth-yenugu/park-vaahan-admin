import React from 'react';
import { ParkingSpot } from '../types';
import { AlertCircle, Edit, Trash2, MapPin, Camera, Shield } from 'lucide-react';

interface ParkingSpotListProps {
  spots: ParkingSpot[];
  onEdit: (spot: ParkingSpot) => void;
  onDelete: (id: string) => void;
}

export default function ParkingSpotList({ spots, onEdit, onDelete }: ParkingSpotListProps) {
  const getStatusColor = (status: ParkingSpot['status']) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'occupied':
        return 'bg-red-100 text-red-800';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Spot</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rate</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amenities</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {spots.map((spot) => (
            <tr key={spot.id} className="hover:bg-gray-50">
              <td className="px-6 py-4">
                <div className="text-sm font-medium text-gray-900">{spot.name}</div>
                {spot.images.length > 0 && (
                  <div className="mt-2 flex -space-x-2">
                    {spot.images.slice(0, 3).map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`Parking ${index + 1}`}
                        className="h-8 w-8 rounded-full ring-2 ring-white object-cover"
                      />
                    ))}
                    {spot.images.length > 3 && (
                      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-200 ring-2 ring-white">
                        <span className="text-xs text-gray-600">+{spot.images.length - 3}</span>
                      </div>
                    )}
                  </div>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">₹{spot.rate}/hr</div>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm text-gray-900">{spot.address.street}</div>
                <div className="text-sm text-gray-500">
                  {spot.address.city}, {spot.address.state} - {spot.address.pincode}
                </div>
                <div className="text-xs text-gray-400 flex items-center mt-1">
                  <MapPin className="h-3 w-3 mr-1" />
                  {spot.address.latitude.toFixed(4)}, {spot.address.longitude.toFixed(4)}
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex flex-wrap gap-2">
                  {spot.amenities.map((amenity) => (
                    <span
                      key={amenity}
                      className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(spot.status)}`}>
                  {spot.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex space-x-2">
                  <button
                    onClick={() => onEdit(spot)}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDelete(spot.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}