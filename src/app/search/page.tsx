import SearchPage from '@/components/search/SearchPage';
import axios from 'axios';
import { css } from '@styled-system/css';
import SearchHeader from '@/components/search/SearchHeader';
import BottomNav from '@/components/common/navigations/BottomNav';

const Page = async () => {
  try {
    // const res = await axios.get('http://localhost:8000/places');
    // const restrooms = res.data;

    return (
      <>
        <SearchHeader></SearchHeader>
        <SearchPage data={[]}></SearchPage>

        <BottomNav></BottomNav>
      </>
    );
  } catch (err) {
    // return <div>에러페이지</div>;
  }
};

export default Page;
