'use client';
import { css } from '@styled-system/css';
import { usePlaces } from '@/lib/apis/place';

const Page = () => {
  const { data, isError, isLoading, error } = usePlaces();
  console.log('query', data);
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>{error.toString()}</div>;

  return (
    <div>테스트페이지
      {data.map((place) => {
        return (<div>{place.name}</div>);
      })}
    </div>
  );
};
export default Page;
