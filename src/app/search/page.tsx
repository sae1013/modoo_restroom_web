import SearchPage from '@/components/search/SearchPage';
import axios from 'axios';
import { css } from '@styled-system/css';
import SearchHeader from '@/components/search/SearchHeader';
import BottomNav from '@/components/common/navigations/BottomNav';

const Page = async () => {
  try {


    return (
      <>
        {/*<SearchHeader></SearchHeader>*/}
        <SearchPage data={[]}></SearchPage>

        <BottomNav></BottomNav>
      </>
    );
  } catch (err) {

  }
};

export default Page;
