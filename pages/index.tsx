import Head from 'next/head'
import Image from 'next/image'
import bannerImage from '../public/images/index/road.jpg'
import Link from "next/link";

import dreamville_lineup_image from '../public/images/index/dreamville_lineup.jpg'
import ride_image from '../public/images/index/ride.jpg'
import {FormEvent, useState} from "react";
import {FormData} from "../types/formTypes";
import emailForm from "../lib/emailForm";
import Form from "../components/Form";

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

const formFields = [
  {
    name: 'name',
    type: 'text',
    label: 'Name',
    required: true,
  },
  {
    name: 'email',
    type: 'email',
    label: 'Email',
    required: true,
  },
  {
    name: 'feedback',
    type: 'textarea',
    label: "Ride Details",
    required: true,
  }
]

export default function Home() {
  const [message, setMessage] = useState("")
  const handleSubmit = (event: FormEvent<HTMLFormElement>, formData: FormData) => {
    event.preventDefault();
    try {
      emailForm("Martin & Stella - Dreamville Rides", formData)
      setMessage("Thanks for booking your ride! We'll responded to confirm your ride details.")
    } catch(err) {
      setMessage("Sorry, we ran into a problem processing your request. Please contact us at the phone number above.")
    }
  }

  return (
    <>
      <Head>
        <title>Martin & Stella LLC</title>
        <meta name="description" content="Jump Starting Your Next Journey" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={'flex flex-col items-center'}>
        <div className={'h-[80vh] sm:h-[75vh] w-full relative overflow-hidden'}>
          <Image className={'h-full w-full object-cover object-top'} src={ride_image} alt={'Ride share'}/>
          <div className={'absolute bg-black w-full h-full opacity-60 top-0'}/>
          <div className={'w-full flex absolute top-0 z-10 w-full h-full flex flex-col justify-start items-center text-white p-4'}>
            <h1 className={'text-4xl md:text-5xl leading-relaxed md:leading-relaxed my-4 text-center'}>
              Schedule Your Dreamville Festival Ride NOW!
            </h1>
            <h2 className={'text-xl md:text-2xl text-center my-4'}>Give us a call/text at <a href={'tel:9196350595'} className={'underline'}>919-635-0595</a> with your information to book a ride or fill out the form below.</h2>
            <div className={'w-full max-w-md p-4 '}>
              { message ?
                <div className={'text-2xl md:text-3xl my-6 text-center border border-white p-4'}>
                  { message }
                </div>
                :
                <Form  handleSubmit={handleSubmit} formFields={formFields}/>
              }
            </div>
          </div>

        </div>
          <p className={'text-xl md:text-2xl max-w-3xl leading-relaxed md:leading-relaxed my-6  p-4 bg-[rgba(256,256,256,.2)] rounded'}>
            Welcome to RALEIGH! We are kicking off our annual Dreamville Festival Rides to provide an alternative to inflated UBER/LYFT prices for the weekend. We will be giving rides to individuals/groups from their location to a Dreamville shuttle (located in downtown Raleigh) OR to the festival location itself (located at the Dorothea Dix Park). DREAMVILLE ARTISTS WILL ONLY BE PLAYED IN EVERY RIDE VEHICLE! Come turn up with us as we cruise on unto Dreamville!
          </p>


          {/*
        <div className={'h-[400px] relative flex items-center justify-center'}>

          <Image className={'absolute top-0 left-0 object-cover w-full h-full'} src={bannerImage} alt={'Road'}/>
          <div className={'bg-white/80 bg-white rounded shadow p-4 z-10 md:text-2xl text-xl'}>
            No Matter Your Destination, Your Next Journey Begins Here
          </div>
        </div>
        */}
        <Image className={'max-w-2xl w-full'} src={dreamville_lineup_image} alt={'Dreamville Lineup'}/>
        <section className={'flex flex-col  items-center mt-12 border-t border-t-gray-300 p-4 w-full max-w-2xl'}>
          <h2 className={'my-6 text-3xl md:text-4xl text-center '}>Check Out Our Other Services</h2>
          <div className={'flex justify-center items-center flex-wrap'}>
            { links.map(link =>
                <Link
                  href={link.url}
                  key={link.url}
                  className={'min-w-[340px] max-w-[600px] flex-1 m-4 p-4 shadow rounded border border-gray-300 hover:border-gray-500 hover:shadow-2xl'}
                >
                  <h2 className={'text-center text-xl '}>{link.text}</h2>
                </Link>
            )}
          </div>
        </section>
      </div>
    </>
  )
}
