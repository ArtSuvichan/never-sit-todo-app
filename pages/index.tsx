
import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router';

const Home: NextPage = () => {
  const router = useRouter();

  return (
    <div>
      <Head>
        <title>MainPage</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="vh-100 d-flex justify-content-center align-items-center">
        <div className='text-center'>
          <h1 className='mb-5'>Welcome to the Todo App</h1>
          <button type="button" className='btn btn-primary text-center' onClick={() => router.push('/login-page')}> Login </button>
        </div>
      </div>
    </div>

  );
}

export default Home