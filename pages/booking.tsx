import event1 from "../public/images/event/event1.jpg"
import event2 from "../public/images/event/event2.jpg"
import event3 from "../public/images/event/event3.jpg"
import event4 from "../public/images/event/event4.jpg"
import event5 from "../public/images/event/event5.jpg"
import event6 from "../public/images/event/event6.jpg"
import Image from "next/image";
import {FormEvent, useState} from "react";
import emailForm from "../lib/emailForm";
import {FormData} from "../types/formTypes";
import Form from "../components/Form";

const images = [
  event1, event2, event3, event4, event5, event6
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
    name: 'phone',
    type: 'tel',
    label: 'Phone',
    required: true,
  },
  {
    name: 'date',
    type: 'date',
    label: 'Date',
    required: true,
  },
]

const Booking = () => {
  const [message, setMessage] = useState("")

  const handleSubmit = (event: FormEvent<HTMLFormElement>, formData: FormData) => {
    event.preventDefault();
    console.log(formData)
    try {
      emailForm( "Martin & Stella - Event Booking", formData)
      setMessage("Thanks for making an event booking with us! We'll respond shorty to confirm you reservation!")
    } catch(err) {
      setMessage("Sorry, we ran into a problem processing your request. Please contact us with the email address or phone number below.")
    }
  }

  return (
    <div className={'flex flex-col items-center p-4'}>
      <h1 className={'md text-4xl text-3xl my-6 text-center'}>A Captivating Event Space</h1>

      <div className={'rounded-xl shadow-lg p-4 w-full max-w-xl'}>
        <h2 className={'md:text-3xl text-2xl text-center'}>Book Your Next Event Today!</h2>
        {
          message ? <div className={'p-4 text-lg'}>{message}</div> :
            <Form
              className={'max-w-xl w-full '}
              handleSubmit={handleSubmit}
              formFields={formFields}
            />
        }
      </div>

      <p className={'text-lg text-center my-8'}>
        Fits 200 people, with over 150 chair, 15 round tables, and 3 rectangle tables.
        Perfect for baby showers , birthday parties, weddings and more!
      </p>
      <div className={'flex flex-wrap items-center justify-center'}>
        { images.map((image, index) =>
          <Image key={index} src={image} alt={""} className={'m-4 rounded'}/>
        )}
      </div>

    </div>
  )
}

export default Booking