'use client';

const Page = () => {
  return <div>
    <button onClick={() => {
      fetch('http://localhost:8000/auth/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'test1234@gmail.com',
          password: '2342343',
        }),
      });
    }}>로그인
    </button>
    <button onClick={() => {
      fetch('http://localhost:8000/private', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }}>API호출
    </button>

  </div>;
};
export default Page;
