import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Image from "next/image";
import logo from '../public/images/logo-cropped.png'
import Link from "next/link";

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
    text: "Contact",
    url: "/contact"
  },
  {
    text: "About Us",
    url: "/about"
  },
]

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={'relative min-h-screen max-w-[100vw] overflow-hidden'}>
      <div className={'relative '}>
        <div className={'h-[75px] bg-[#9fd067] flex items-center shadow justify-end '}>
          <div className={'lg:right-[92px] relative flex w-full justify-center w-[calc(100vw-183px)] lg:w-[calc(100vw-275px)]'}>
            {links.map((link, index) =>
              <Link
                href={link.url}
                key={link.url}
                className={`font-bold flex-1 max-w-[175px] px-4 lg:px-8 py-2 text-center relative after:transition
                    after:absolute after:w-2/3 after:left-1/2 after:-translate-x-[50%] after:h-[2px] after:top-[100%] after:left-0 after:bg-black after:scale-x-0 after:origin-left hover:after:scale-x-100 hover:after:origin-right
                    ${index < links.length - 1 ? 'border-r-2 border-r-black' : ''}`}>
                {link.text}
              </Link>
            )}
          </div>
        </div>
        <div className={'h-[75px] bg-[#609f51] shadow'}>
        </div>
        <div className={'h-[150px] w-[183px] absolute top-0 flex items-center justify-end'}>
          <Link href={'/'}>
            <Image className={'h-auto w-[158px] rounded-xl'} src={logo} alt={'Martin and Stella Logo'}/>
          </Link>
        </div>

      </div>
      <div className={''}>
        <Component {...pageProps} />
      </div>
      <div className={'bottom-0 fixed'}>
        Footer
      </div>
    </div>
  )
}
