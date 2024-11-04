import { useState, useEffect } from "react";
import { PlusCircle, ParkingSquare, LogOut } from "lucide-react";
import ParkingSpotList from "./ParkingSpotList";
import ParkingSpotForm from "./ParkingSpotForm";
import { ParkingSpot, ParkingSpotFormData } from "../types";
import { useAuth } from "../context/AuthContext";

const STORAGE_KEY = "parking_spots";

export default function Dashboard() {
  const { logout } = useAuth();
  const [spots, setSpots] = useState<ParkingSpot[]>(() => {
    // Initialize state from sessionStorage if available
    const savedSpots = sessionStorage.getItem(STORAGE_KEY);
    if (savedSpots) {
      return JSON.parse(savedSpots);
    }
    // Default initial state if nothing in storage
    return [
      {
        id: "1",
        name: "Central Parking A1",
        status: "available",
        rate: 2000,
        images: [],
        amenities: ["Security Guard", "CC Camera"],
        address: {
          street: "MG Road",
          city: "Bangalore",
          state: "Karnataka",
          pincode: "560001",
          latitude: 12.9716,
          longitude: 77.5946,
        },
      },
    ];
  });

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingSpot, setEditingSpot] = useState<ParkingSpot | undefined>();

  // Update sessionStorage whenever spots change
  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(spots));
  }, [spots]);

  const handleCreate = (data: ParkingSpotFormData) => {
    const newSpot: ParkingSpot = {
      ...data,
      id: Date.now().toString(),
    };
    setSpots((prev) => [...prev, newSpot]);
    setIsFormOpen(false);
  };

  const handleUpdate = (data: ParkingSpotFormData) => {
    if (!editingSpot) return;
    setSpots((prev) =>
      prev.map((spot) =>
        spot.id === editingSpot.id ? { ...data, id: spot.id } : spot
      )
    );
    setEditingSpot(undefined);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this parking spot?")) {
      setSpots((prev) => prev.filter((spot) => spot.id !== id));
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
      <div className="w-full max-w-7xl mx-auto py-4 px-4 sm:py-6 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
            <div className="flex items-center">
              <ParkingSquare className="h-6 w-6 sm:h-8 sm:w-8 text-indigo-600" />
              <h1 className="ml-2 sm:ml-3 text-xl sm:text-2xl font-bold text-gray-900 truncate">
                Parking Spot Management
              </h1>
            </div>
            <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-4">
              {!isFormOpen && !editingSpot && (
                <button
                  onClick={() => setIsFormOpen(true)}
                  className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-full sm:w-auto"
                >
                  <PlusCircle className="h-5 w-5 mr-2" />
                  Add Parking Spot
                </button>
              )}
              <button
                onClick={logout}
                className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-full sm:w-auto"
              >
                <LogOut className="h-5 w-5 mr-2" />
                Logout
              </button>
            </div>
          </div>

          {(isFormOpen || editingSpot) && (
            <div className="rounded-lg bg-white shadow p-4 sm:p-6">
              <ParkingSpotForm
                onSubmit={editingSpot ? handleUpdate : handleCreate}
                initialData={editingSpot}
                onCancel={handleCancel}
              />
            </div>
          )}

          <div className="rounded-lg bg-white shadow">
            <ParkingSpotList
              spots={spots}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
