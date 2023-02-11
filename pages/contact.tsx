import {FormEvent, useState} from "react";
import emailForm from "../lib/emailForm"
import Form from "../components/Form";
import { FormData } from "../types/formTypes";

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
      <div className={'w-full max-w-md p-4 rounded-xl shadow-lg'}>
        { message ?
          <div className={'text-xl md:text-2xl'}>
            { message }
          </div>
          :
          <Form handleSubmit={handleSubmit} formFields={formFields}/>
        }
      </div>
    </div>

  )
}

export default Contact