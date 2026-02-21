export const products = [
  { id: 'A1', name: 'Arduino UNO R3', category: 'Microcontrollers', status: 'Available', locker: 'A1', price: 25 },
  { id: 'A2', name: 'ESP32 Dev Board', category: 'Microcontrollers', status: 'Occupied', locker: 'A2', price: 30 },
  { id: 'A3', name: 'Sensor Module', category: 'Sensors', status: 'Occupied', locker: 'A3', price: 15 },
  { id: 'B3', name: 'DHT11 Sensor', category: 'Sensors', status: 'Maintenance', locker: 'B3', price: 10 },
  { id: 'C1', name: 'Power Module', category: 'Modules', status: 'Maintenance', locker: 'C1', price: 20 },
  { id: 'C2', name: 'Jumper Wires', category: 'Power', status: 'Available', locker: 'C2', price: 5 },
];

export const rentals = [
  { time: '10:30 AM', locker: 'A2', activity: 'Arduino Uno rented by Francis B.' },
  { time: '09:15 AM', locker: 'A1', activity: 'Locker A1 unlocked by admin' },
];  