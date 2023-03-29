import {FormEvent, useState} from "react";
import emailForm from "../lib/emailForm"
import Form from "../components/Form";
import { FormData } from "../types/formTypes";
import Image from 'next/image'
import computer_image from '../public/images/contact/woman_at_computer.jpg'

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
    label: "What's on your mind?",
    required: true,
  }
]

const Contact = () => {
  const [message, setMessage] = useState("")

  const handleSubmit = (event: FormEvent<HTMLFormElement>, formData: FormData) => {
    event.preventDefault();
    try {
      emailForm("Martin & Stella - Customer Contact Email", formData)
      setMessage("Thanks for your feedback! We'll quickly responded to any questions or concerns.")
    } catch(err) {
      setMessage("Sorry, we ran into a problem processing your request. Please contact us with the email address or phone number below.")
    }
  }

  return (
    <div className={'flex flex-col items-center mt-4'}>
      <h1 className={'md:text-4xl text-3xl my-6'}>We&apos;d Love to Hear From You!</h1>
      <div className={'relative max-w-4xl w-full h-screen'}>
        <Image fill className={'object-cover'} src={computer_image} alt={'Woman at computer'}/>
        <div className={'absolute top-0 w-full h-full bg-black/40'}/>
        <div className={'absolute top-0 w-full h-full flex justify-center items-center'}>
          <div className={'max-w-md p-4 rounded-xl shadow-lg w-full bg-white/80'}>
            { message ?
              <div className={'text-xl md:text-2xl'}>
                { message }
              </div>
              :
              <Form handleSubmit={handleSubmit} formFields={formFields}/>
            }
          </div>
        </div>
      </div>

    </div>

  )
}

export default Contact