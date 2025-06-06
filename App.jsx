import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function WaselApp() {
  const [rides, setRides] = useState([]);
  const [form, setForm] = useState({ location: '', destination: '', seats: '', isZakaah: false });
  const [search, setSearch] = useState({ location: '', destination: '' });

  const fetchRides = async () => {
    const response = await axios.get('http://localhost:3001/rides');
    setRides(response.data);
  };

  useEffect(() => {
    fetchRides();
  }, []);

  const handlePost = async () => {
    await axios.post('http://localhost:3001/rides', form);
    setForm({ location: '', destination: '', seats: '', isZakaah: false });
    fetchRides();
  };

  const handleSearch = async () => {
    const res = await axios.get('http://localhost:3001/search', { params: search });
    setRides(res.data);
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🚗 Wasel App</h1>

      <div className="mb-4">
        <h2 className="font-semibold">Post a Ride</h2>
        <input placeholder="Location" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} className="border p-2 w-full mb-2" />
        <input placeholder="Destination" value={form.destination} onChange={e => setForm({ ...form, destination: e.target.value })} className="border p-2 w-full mb-2" />
        <input placeholder="Seats" value={form.seats} onChange={e => setForm({ ...form, seats: e.target.value })} className="border p-2 w-full mb-2" />
        <label className="flex items-center mb-2">
          <input type="checkbox" checked={form.isZakaah} onChange={e => setForm({ ...form, isZakaah: e.target.checked })} />
          <span className="ml-2">Zakaah Seat</span>
        </label>
        <button onClick={handlePost} className="bg-blue-500 text-white px-4 py-2 rounded">Post Ride</button>
      </div>

      <div className="mb-4">
        <h2 className="font-semibold">Search Rides</h2>
        <input placeholder="Location" value={search.location} onChange={e => setSearch({ ...search, location: e.target.value })} className="border p-2 w-full mb-2" />
        <input placeholder="Destination" value={search.destination} onChange={e => setSearch({ ...search, destination: e.target.value })} className="border p-2 w-full mb-2" />
        <button onClick={handleSearch} className="bg-green-500 text-white px-4 py-2 rounded">Search</button>
      </div>

      <div>
        <h2 className="font-semibold mb-2">Available Rides</h2>
        {rides.map(ride => (
          <div key={ride.id} className="border rounded p-2 mb-2">
            <p><strong>From:</strong> {ride.location}</p>
            <p><strong>To:</strong> {ride.destination}</p>
            <p><strong>Seats:</strong> {ride.seats}</p>
            {ride.isZakaah && <span className="text-green-600">Zakaah Ride 🌟</span>}
          </div>
        ))}
      </div>
    </div>
  );
}
