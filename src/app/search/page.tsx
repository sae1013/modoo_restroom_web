import SearchPage from '@/components/search/SearchPage';
import axios from 'axios';
import { css } from '@styled-system/css';
import SearchHeader from '@/components/search/SearchHeader';

const Page = async () => {
  try {
    // const res = await axios.get('http://localhost:8000/restrooms');
    // const restrooms = res.data;
    const restrooms = [];

    return (
      <>
        <SearchHeader></SearchHeader>
        <SearchPage data={restrooms}></SearchPage>;
      </>
    );
  } catch (err) {
    // return <div>에러페이지</div>;
  }
};

export default Page;
