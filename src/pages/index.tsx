import CourseList from '@/pages/CourseList';
import Header from '@/components/Header';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>ELP课程列表</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' />
        <link
          href='https://fonts.googleapis.com/css2?family=Noto+Sans+SC&display=swap'
          rel='stylesheet'
        />
      </Head>
      <main className='h-screen dark:bg-slate-800'>
        <Header />
        <div className='flex justify-center align-center'>
          <CourseList />
        </div>
      </main>
    </>
  );
}
