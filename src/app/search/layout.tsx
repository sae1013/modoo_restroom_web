import axios from 'axios';

export default async function SearchLayout({ children }) {
  const fetchData = async () => {
    const res = await axios.get('http://localhost:8000/restrooms');
    return res;
  };

  try {
    const res = await fetchData();
    console.log(res);
  } catch (err) {

  }

  return (
    <div>
      {children}
    </div>
  );
}