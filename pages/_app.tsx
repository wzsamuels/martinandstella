import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Image from "next/image";
import logo from '../public/images/logo-cropped.png'
import Link from "next/link";
import {IoMenuSharp} from "react-icons/io5";
import {useState} from "react";
import Head from "next/head";

const links = [
  {
    text: "Moving",
    url: "/moving"
  },
  {
    text: "Vehicle Rental",
    url: "/rental"
  },
  {
    text: "Event Booking",
    url: "/booking"
  },
  {
    text: "Contact",
    url: "/contact"
  },
]

export default function App({ Component, pageProps }: AppProps) {
  const [drawerClosing, setDrawerClosing] = useState(false);
  const [drawerOpen, setDrawer] = useState(false);

  const handleDrawerClose = () => {
    setDrawerClosing(true)
    setTimeout(() => {
      setDrawer(false);
      setDrawerClosing(false);
    }, 500);
  }

  return (
    <div className={'relative min-h-screen max-w-[100vw] overflow-hidden'}>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin={"true"}/>
            <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@500&display=swap" rel="stylesheet"/>
      </Head>
      <nav className={'relative'}>
        <div className={'h-[75px] bg-lightGreen flex items-center shadow justify-end '}>
          <div className={' lg:right-[92px] relative  w-full w-[calc(100vw-230px)] md:w-[calc(100vw-183px)] lg:w-[calc(100vw-275px)]'}>
            <div className={'hidden md:flex justify-center items-center'}>
            { links.map((link, index) =>
              <Link
                href={link.url}
                key={link.url}
                className={`font-bold flex-1 max-w-[175px] px-4 lg:px-8 py-2 text-center relative after:transition
                    after:absolute after:w-1/2  after:right-1/2 after:translate-x-[50%] after:h-[2px] after:top-[100%] after:left-0 after:bg-black after:scale-x-0 after:origin-left hover:after:scale-x-100 hover:after:origin-right
                    ${index < links.length - 1 ? 'border-r-2 border-r-black' : ''}`}
              >
                {link.text}
              </Link>
            )}
            </div>
            <span className={'block md:hidden xs:text-xs md:text-sm text-md font-bold text-center'}>Your Next Journey Begins Here</span>
          </div>

          <button className={'block md:hidden'} onClick={() => setDrawer(true)}>
            <IoMenuSharp className={'w-6 h-6 mr-2'}/>
          </button>
        </div>
        <div className={'h-[75px] bg-green shadow flex justify-end items-center'}>
          <div className={'lg:right-[92px] relative flex w-full justify-center w-[calc(100vw-183px)] lg:w-[calc(100vw-275px)]'}>
            <span className={'hidden md:block text-2xl font-bold text-center'}>Your Next Journey Begins Here</span>
          </div>
        </div>
        <div className={'h-[150px] w-[183px] absolute top-0 flex items-center justify-end'}>
          <Link href={'/'}>
            <Image className={'h-auto w-[158px] rounded-xl'} src={logo} alt={'Martin and Stella Logo'}/>
          </Link>
        </div>
      </nav>

      {/* Side Drawer */}
      <div
        onClick={handleDrawerClose}
        className={`fixed z-40 w-screen h-screen ${drawerOpen ? 'block' : 'hidden'} ${drawerClosing ? 'transparent' : 'bg-[rgba(0,0,0,0.4)]'}`}
      >
        <div
          className = {`fixed z-10 animate-[fromRight_0.4s_ease-in-out] right-0 top-0 bg-lightGreen m-auto h-full transition-all duration-500 ease-in-out w-[220px] 
           ${drawerClosing && 'right-[-300px]'} shadow-[0_4px_8px_0_rgba(0,0,0,0.2)_0_6px_20px_0_rgba(0,0,0,0.19)]`}
        >
          <div className="flex justify-between h-[75px] pl-3.5 bg-green">
            <Link href={`/`} style={{fontFamily: 'Oswald, sans-serif'}} className={'flex items-center font-bold text-lg'}>Martin & Stella</Link>
            <button aria-label="Close Menu">
              <IoMenuSharp className={'w-6 h-6 mr-2'}/>
            </button>

          </div>
          {
            links.map(link =>
                <Link
                  href={link.url}
                  key={link.url}
                  className="w-full px-4 py-3 float-left hover:bg-green "
                >
                  {link.text}
                </Link>
            )
          }
        </div>
      </div>

      <div className={'mb-16'}>
        <Component {...pageProps} />
      </div>
      <footer className={'absolute bottom-0 bg-green h-16 p-4 w-full flex justify-center items-center'}>
        <div className={'font-bold'}>
          <a className={'underline'} href={'mailto:martinstella@gmail.com'}> martinstella@gmail.com </a> | <a className={'underline'} href={'tel:9196350595'}>919-635-0595</a> | Copyright Martin & Stella LLC | Web Site by <a className={'underline'} href={'https://twinsilverdesign.com'}>Twin Silver Design</a>
        </div>
      </footer>
    </div>
  )
}