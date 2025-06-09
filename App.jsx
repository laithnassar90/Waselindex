const fetchRides = async () => {
  try {
    const response = await axios.get('http://localhost:3001/rides');
    setRides(response.data);
  } catch (error) {
    console.error("Error fetching rides:", error);
  }
};

const handlePost = async () => {
  try {
    await axios.post('http://localhost:3001/rides', form);
    setForm({ location: '', destination: '', seats: '', isZakaah: false });
    fetchRides();
  } catch (error) {
    console.error("Error posting ride:", error);
  }
};

const handleSearch = async () => {
  try {
    const res = await axios.get('http://localhost:3001/search', { params: search });
    setRides(res.data);
  } catch (error) {
    console.error("Error searching rides:", error);
  }
};
