import Header from '@/components/Header';

const HeaderLayout = async () => {
  const result = await fetch('http://jsonplaceholder.typicode.com/users');
  const user = {
    email: 'sae1013',
  };
  return <Header data={user}></Header>;
};

export default HeaderLayout;