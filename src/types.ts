export interface ParkingSpot {
  id: string;
  name: string;
  status: 'available' | 'occupied' | 'maintenance';
  rate: number;
  images: string[];
  amenities: string[];
  address: {
    street: string;
    city: string;
    state: string;
    pincode: string;
    latitude: number;
    longitude: number;
  };
}

export type ParkingSpotFormData = Omit<ParkingSpot, 'id'>;

export interface User {
  email: string;
  password: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}