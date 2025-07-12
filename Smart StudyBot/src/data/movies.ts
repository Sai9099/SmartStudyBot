import { Movie } from '../types';

export const moviesData: Movie[] = [
  {
    id: '1',
    title: 'Dune: Part Two',
    genre: ['Sci-Fi', 'Adventure', 'Drama'],
    rating: 8.7,
    duration: 166,
    description: 'Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.',
    poster: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop',
    backdrop: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
    releaseDate: '2024-03-01',
    director: 'Denis Villeneuve',
    cast: ['Timothée Chalamet', 'Zendaya', 'Rebecca Ferguson', 'Oscar Isaac'],
    showtimes: [
      { id: '1-1', movieId: '1', date: '2024-12-20', time: '14:30', theater: 'IMAX Theater 1', price: 18.99, availableSeats: 45 },
      { id: '1-2', movieId: '1', date: '2024-12-20', time: '18:00', theater: 'IMAX Theater 1', price: 18.99, availableSeats: 32 },
      { id: '1-3', movieId: '1', date: '2024-12-20', time: '21:30', theater: 'Theater 2', price: 14.99, availableSeats: 28 },
      { id: '1-4', movieId: '1', date: '2024-12-21', time: '15:00', theater: 'IMAX Theater 1', price: 18.99, availableSeats: 50 },
    ]
  },
  {
    id: '2',
    title: 'The Batman',
    genre: ['Action', 'Crime', 'Drama'],
    rating: 7.8,
    duration: 176,
    description: 'When a sadistic serial killer begins murdering key political figures in Gotham, Batman is forced to investigate the citys hidden corruption.',
    poster: 'https://images.pexels.com/photos/8849295/pexels-photo-8849295.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop',
    backdrop: 'https://images.pexels.com/photos/8849295/pexels-photo-8849295.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
    releaseDate: '2024-03-04',
    director: 'Matt Reeves',
    cast: ['Robert Pattinson', 'Zoë Kravitz', 'Paul Dano', 'Jeffrey Wright'],
    showtimes: [
      { id: '2-1', movieId: '2', date: '2024-12-20', time: '16:00', theater: 'Theater 3', price: 14.99, availableSeats: 38 },
      { id: '2-2', movieId: '2', date: '2024-12-20', time: '20:00', theater: 'Theater 3', price: 14.99, availableSeats: 22 },
      { id: '2-3', movieId: '2', date: '2024-12-21', time: '17:30', theater: 'Theater 3', price: 14.99, availableSeats: 41 },
    ]
  },
  {
    id: '3',
    title: 'Oppenheimer',
    genre: ['Biography', 'Drama', 'History'],
    rating: 8.4,
    duration: 180,
    description: 'The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.',
    poster: 'https://images.pexels.com/photos/8471077/pexels-photo-8471077.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop',
    backdrop: 'https://images.pexels.com/photos/8471077/pexels-photo-8471077.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
    releaseDate: '2024-07-21',
    director: 'Christopher Nolan',
    cast: ['Cillian Murphy', 'Emily Blunt', 'Matt Damon', 'Robert Downey Jr.'],
    showtimes: [
      { id: '3-1', movieId: '3', date: '2024-12-20', time: '13:00', theater: 'Premium Theater', price: 16.99, availableSeats: 25 },
      { id: '3-2', movieId: '3', date: '2024-12-20', time: '17:00', theater: 'Premium Theater', price: 16.99, availableSeats: 18 },
      { id: '3-3', movieId: '3', date: '2024-12-21', time: '14:30', theater: 'Premium Theater', price: 16.99, availableSeats: 30 },
    ]
  },
  {
    id: '4',
    title: 'Spider-Man: Across the Spider-Verse',
    genre: ['Animation', 'Action', 'Adventure'],
    rating: 8.6,
    duration: 140,
    description: 'Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence.',
    poster: 'https://images.pexels.com/photos/12266009/pexels-photo-12266009.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop',
    backdrop: 'https://images.pexels.com/photos/12266009/pexels-photo-12266009.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
    releaseDate: '2024-06-02',
    director: 'Joaquim Dos Santos',
    cast: ['Shameik Moore', 'Hailee Steinfeld', 'Brian Tyree Henry', 'Luna Lauren Velez'],
    showtimes: [
      { id: '4-1', movieId: '4', date: '2024-12-20', time: '15:30', theater: 'Theater 4', price: 13.99, availableSeats: 42 },
      { id: '4-2', movieId: '4', date: '2024-12-20', time: '19:30', theater: 'Theater 4', price: 13.99, availableSeats: 35 },
      { id: '4-3', movieId: '4', date: '2024-12-21', time: '16:00', theater: 'Theater 4', price: 13.99, availableSeats: 48 },
    ]
  },
  {
    id: '5',
    title: 'John Wick: Chapter 4',
    genre: ['Action', 'Crime', 'Thriller'],
    rating: 7.9,
    duration: 169,
    description: 'With the price on his head ever increasing, John Wick uncovers a path to defeating The High Table.',
    poster: 'https://images.pexels.com/photos/8369648/pexels-photo-8369648.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop',
    backdrop: 'https://images.pexels.com/photos/8369648/pexels-photo-8369648.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
    releaseDate: '2024-03-24',
    director: 'Chad Stahelski',
    cast: ['Keanu Reeves', 'Donnie Yen', 'Bill Skarsgård', 'Laurence Fishburne'],
    showtimes: [
      { id: '5-1', movieId: '5', date: '2024-12-20', time: '14:00', theater: 'Theater 5', price: 14.99, availableSeats: 33 },
      { id: '5-2', movieId: '5', date: '2024-12-20', time: '18:30', theater: 'Theater 5', price: 14.99, availableSeats: 27 },
      { id: '5-3', movieId: '5', date: '2024-12-21', time: '19:00', theater: 'Theater 5', price: 14.99, availableSeats: 39 },
    ]
  },
  {
    id: '6',
    title: 'Avatar: The Way of Water',
    genre: ['Action', 'Adventure', 'Drama'],
    rating: 7.6,
    duration: 192,
    description: 'Jake Sully lives with his newfound family formed on the extrasolar moon Pandora.',
    poster: 'https://images.pexels.com/photos/7991471/pexels-photo-7991471.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop',
    backdrop: 'https://images.pexels.com/photos/7991471/pexels-photo-7991471.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
    releaseDate: '2024-12-16',
    director: 'James Cameron',
    cast: ['Sam Worthington', 'Zoe Saldana', 'Sigourney Weaver', 'Stephen Lang'],
    showtimes: [
      { id: '6-1', movieId: '6', date: '2024-12-20', time: '13:30', theater: 'IMAX Theater 2', price: 19.99, availableSeats: 40 },
      { id: '6-2', movieId: '6', date: '2024-12-20', time: '17:30', theater: 'IMAX Theater 2', price: 19.99, availableSeats: 31 },
      { id: '6-3', movieId: '6', date: '2024-12-21', time: '20:00', theater: 'IMAX Theater 2', price: 19.99, availableSeats: 45 },
    ]
  }
];