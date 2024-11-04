import React, { useState } from "react";
import { ParkingSpot, ParkingSpotFormData } from "../types";
import { Upload } from "lucide-react";

interface ParkingSpotFormProps {
  onSubmit: (data: ParkingSpotFormData) => void;
  onCancel: () => void;
  initialData?: ParkingSpot;
}

const AMENITIES_OPTIONS = [
  "Security Guard",
  "CC Camera",
  "EV Charging",
  "Car Wash",
  "Covered Parking",
  "24/7 Access",
];

export default function ParkingSpotForm({
  onSubmit,
  onCancel,
  initialData,
}: ParkingSpotFormProps) {
  const [formData, setFormData] = useState<ParkingSpotFormData>({
    name: initialData?.name ?? "",
    status: initialData?.status ?? "available",
    rate: initialData?.rate ?? 2000,
    images: initialData?.images ?? [],
    amenities: initialData?.amenities ?? [],
    address: initialData?.address ?? {
      street: "",
      city: "",
      state: "",
      pincode: "",
      latitude: 0,
      longitude: 0,
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    if (name.startsWith("address.")) {
      const addressField = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]:
            addressField === "latitude" || addressField === "longitude"
              ? Number(value)
              : value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: name === "rate" ? Number(value) : value,
      }));
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...newImages],
      }));
    }
  };

  const handleAmenityToggle = (amenity: string) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-lg px-4 py-5 sm:px-6 sm:py-6"
      data-netlify="true"
      name="parking-spot-post"
    >
      <div className="space-y-6">
        {/* Basic Information */}
        <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6">
          <div className="col-span-1">
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="name"
            >
              Spot Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div className="col-span-1">
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="rate"
            >
              Rate (₹/month)
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
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div className="col-span-1">
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="status"
            >
              Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="available">Available</option>
              <option value="occupied">Occupied</option>
              <option value="maintenance">Maintenance</option>
            </select>
          </div>

          {/* Images Section */}
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Images
            </label>
            <div className="mt-1 flex justify-center px-4 py-4 border-2 border-gray-300 border-dashed rounded-md">
              <div className="text-center">
                <Upload className="mx-auto h-8 w-8 text-gray-400" />
                <div className="mt-2">
                  <label
                    htmlFor="images"
                    className="cursor-pointer text-sm font-medium text-indigo-600 hover:text-indigo-500"
                  >
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
              <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3">
                {formData.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Parking spot ${index + 1}`}
                    className="h-20 w-full object-cover rounded-md sm:h-24"
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Amenities Section */}
        <div className="col-span-full">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Amenities
          </label>
          <div className="grid grid-cols-1 gap-y-2 sm:grid-cols-2 lg:grid-cols-3 sm:gap-x-4">
            {AMENITIES_OPTIONS.map((amenity) => (
              <label key={amenity} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.amenities.includes(amenity)}
                  onChange={() => handleAmenityToggle(amenity)}
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-sm text-gray-700">{amenity}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Address Section */}
        <div className="col-span-full">
          <h3 className="text-lg font-medium text-gray-900 mb-3">
            Address Details
          </h3>
          <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6">
            <div className="col-span-full sm:col-span-2">
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="address.street"
              >
                Street Address
              </label>
              <textarea
                id="address.street"
                name="address.street"
                required
                value={formData.address.street}
                onChange={handleChange}
                rows={2}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="address.city"
              >
                City
              </label>
              <input
                id="address.city"
                name="address.city"
                type="text"
                required
                value={formData.address.city}
                onChange={handleChange}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="address.state"
              >
                State
              </label>
              <input
                id="address.state"
                name="address.state"
                type="text"
                required
                value={formData.address.state}
                onChange={handleChange}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="address.pincode"
              >
                Pincode
              </label>
              <input
                id="address.pincode"
                name="address.pincode"
                type="text"
                required
                value={formData.address.pincode}
                onChange={handleChange}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="address.latitude"
              >
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
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="address.longitude"
              >
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
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Form Actions */}
      <div className="mt-6 flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="mt-3 sm:mt-0 w-full sm:w-auto inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="w-full sm:w-auto inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          {initialData ? "Update" : "Create"} Spot
        </button>
      </div>
    </form>
  );
}
