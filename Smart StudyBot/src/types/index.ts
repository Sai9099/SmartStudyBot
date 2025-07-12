export interface Movie {
  id: string;
  title: string;
  genre: string[];
  rating: number;
  duration: number;
  description: string;
  poster: string;
  backdrop: string;
  showtimes: Showtime[];
  releaseDate: string;
  director: string;
  cast: string[];
}

export interface Showtime {
  id: string;
  movieId: string;
  date: string;
  time: string;
  theater: string;
  price: number;
  availableSeats: number;
}

export interface CartItem {
  id: string;
  movieId: string;
  movieTitle: string;
  showtimeId: string;
  date: string;
  time: string;
  theater: string;
  quantity: number;
  price: number;
  seats: string[];
}

export interface User {
  id: string;
  email: string;
  name: string;
  isAdmin?: boolean;
}

export interface BookingConfirmation {
  id: string;
  userId?: string;
  items: CartItem[];
  total: number;
  bookingDate: string;
  status: 'confirmed' | 'pending' | 'cancelled';
}