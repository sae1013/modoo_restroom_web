import SearchPage from '@/components/search/SearchPage';
import axios from 'axios';

const Page = async () => {
  try {
    const res = await axios.get('http://localhost:8000/restrooms');
    const restrooms = res.data;
    return <SearchPage data={restrooms}></SearchPage>;
  } catch (err) {
    return <div>에러페이지</div>;
  }


};

export default Page;