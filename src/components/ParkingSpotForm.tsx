import React, { useState } from 'react';
import { ParkingSpot, ParkingSpotFormData } from '../types';
import { Upload } from 'lucide-react';

interface ParkingSpotFormProps {
  onSubmit: (data: ParkingSpotFormData) => void;
  onCancel: () => void;
  initialData?: ParkingSpot;
}

const AMENITIES_OPTIONS = [
  'Security Guard',
  'CC Camera',
  'EV Charging',
  'Car Wash',
  'Covered Parking',
  'Valet Service',
  '24/7 Access',
];

export default function ParkingSpotForm({ onSubmit, onCancel, initialData }: ParkingSpotFormProps) {
  const [formData, setFormData] = useState<ParkingSpotFormData>({
    name: initialData?.name ?? '',
    status: initialData?.status ?? 'available',
    rate: initialData?.rate ?? 50,
    images: initialData?.images ?? [],
    amenities: initialData?.amenities ?? [],
    address: initialData?.address ?? {
      street: '',
      city: '',
      state: '',
      pincode: '',
      latitude: 0,
      longitude: 0,
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: addressField === 'latitude' || addressField === 'longitude' 
            ? Number(value) 
            : value,
        },
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: name === 'rate' ? Number(value) : value,
      }));
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).map(file => URL.createObjectURL(file));
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...newImages],
      }));
    }
  };

  const handleAmenityToggle = (amenity: string) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Spot Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="rate">
            Rate (₹/hr)
          </label>
          <input
            id="rate"
            name="rate"
            type="number"
            required
            min="0"
            step="10"
            value={formData.rate}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="status">
            Status
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="available">Available</option>
            <option value="occupied">Occupied</option>
            <option value="maintenance">Maintenance</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Images
          </label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600">
                <label htmlFor="images" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                  <span>Upload files</span>
                  <input
                    id="images"
                    name="images"
                    type="file"
                    multiple
                    accept="image/*"
                    className="sr-only"
                    onChange={handleImageUpload}
                  />
                </label>
              </div>
            </div>
          </div>
          {formData.images.length > 0 && (
            <div className="mt-4 grid grid-cols-3 gap-4">
              {formData.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Parking spot ${index + 1}`}
                  className="h-24 w-24 object-cover rounded-md"
                />
              ))}
            </div>
          )}
        </div>

        <div className="col-span-2">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Amenities
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {AMENITIES_OPTIONS.map((amenity) => (
              <label key={amenity} className="inline-flex items-center">
                <input
                  type="checkbox"
                  checked={formData.amenities.includes(amenity)}
                  onChange={() => handleAmenityToggle(amenity)}
                  className="form-checkbox h-5 w-5 text-indigo-600"
                />
                <span className="ml-2 text-gray-700">{amenity}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="col-span-2">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Address Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address.street">
                Street Address
              </label>
              <textarea
                id="address.street"
                name="address.street"
                required
                value={formData.address.street}
                onChange={handleChange}
                rows={3}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address.city">
                City
              </label>
              <input
                id="address.city"
                name="address.city"
                type="text"
                required
                value={formData.address.city}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address.state">
                State
              </label>
              <input
                id="address.state"
                name="address.state"
                type="text"
                required
                value={formData.address.state}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address.pincode">
                Pincode
              </label>
              <input
                id="address.pincode"
                name="address.pincode"
                type="text"
                required
                value={formData.address.pincode}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address.latitude">
                Latitude
              </label>
              <input
                id="address.latitude"
                name="address.latitude"
                type="number"
                step="any"
                required
                value={formData.address.latitude}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address.longitude">
                Longitude
              </label>
              <input
                id="address.longitude"
                name="address.longitude"
                type="number"
                step="any"
                required
                value={formData.address.longitude}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-6 space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {initialData ? 'Update' : 'Create'} Spot
        </button>
      </div>
    </form>
  );
}