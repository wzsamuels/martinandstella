import Head from 'next/head'
import Image from 'next/image'
import bannerImage from '../public/images/index/road.jpg'
import Link from "next/link";

const links = [
  {
    url: '/moving',
    text: 'Schedule a Move',
  },
  {
    url: '/rental',
    text: 'Rent a Vehicle',
  },
  {
    url: '/booking',
    text: 'Book an Event',
  },
]

export default function Home() {
  return (
    <>
      <Head>
        <title>Martin & Stella LLC</title>
        <meta name="description" content="Jump Starting Your Next Journey" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className={'h-[400px] relative flex items-center justify-center'}>
          <Image className={'absolute top-0 left-0 object-cover w-full h-full'} src={bannerImage} alt={'Road'}/>
          <div className={'bg-white/80 bg-white rounded shadow p-4 z-10 md:text-2xl text-xl'}>
            No Matter Your Destination, Your Next Journey Begins Here
          </div>


        </div>
        <div className={'flex justify-center items-center flex-wrap mt-6'}>
          { links.map(link =>
            <Link
            href={link.url}
            key={link.url}
            className={'min-w-[400px] max-w-[600px] flex-1 m-4 p-4 shadow rounded border border-gray-300 hover:border-gray-500 hover:shadow-2xl'}
            >
            <h2 className={'text-center text-xl '}>{link.text}</h2>
            </Link>
          )}

        </div>
      </main>
    </>
  )
}
