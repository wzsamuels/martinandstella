import {FormEvent, useState} from "react";
import useFormData from "../hooks/useFormData";
import Button from "../components/Button";
import Image from "next/image";

import moving1 from '../public/images/moving.jpg'
import moving2 from '../public/images/moving2.jpg'
import emailForm from "../lib/emailForm";
import Form from "../components/Form";

const formFields = [
  {
    name: "name",
    label: "Name",
    type: "text",
    required: true,
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    required: true,
  },
  {
    name: "phone",
    label: "Phone Number",
    type: "tel",
    required: true,
  },
  {
    name: "address",
    label: "Address",
    type: "text",
    required: true
  },
  {
    name: "city",
    label: "City",
    type: "text",
    required: true
  },
  {
    name: "state",
    label: "State",
    type: "text",
    required: true
  },
  {
    name: "zip",
    label: "Zip Code",
    type: "number",
    required: true
  },
  {
    name: "date",
    label: "Date",
    type: "date",
    required: true,
  }
]

const Moving = () => {
  const [formData, handleChange] = useFormData(formFields);
  const [message, setMessage] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formData)
    try {
      emailForm("contact@twinsilverdesign.com", "Martin & Stella - Moving Request", formData)
      setMessage("Thanks for scheduling a move with with us! We'll respond shorty to confirm you reservation!")
    } catch(err) {
      setMessage("Sorry, we ran into a problem processing your request. Please contact us with the email address or phone number below.")
    }
  }

  return (
    <div className={'flex flex-col justify-center items-center mt-6 w-full'}>
      <div className={'relative flex justify-center'}>
        <div className={'mb-6 relative'}>
          <div className={'absolute bg-black/20 z-10 w-full h-full mb-6'}></div>
          <Image className={'w-full max-w-4xl  w-full rounded'} src={moving1} alt={''}/>
        </div>
        <div className={'z-10 absolute top-0 flex flex-col items-center '}>
          <div className={'rounded  px-4 py-2 mb-4'}>
            <h1 className={'md:text-4xl text-3xl my-6 text-center'}>Feeling Crushed by the Stress of Moving?</h1>
            <h2 className={'md:text-3xl text-2xl my-4 text-center'}>Let Us Take Some of the Weight Off!</h2>
          </div>

          <Form
            formFields={formFields}
            handleSubmit={handleSubmit}
            className={'w-full p-4 max-w-lg rounded-xl min-[550px]:bg-white/80 mt-0 max-[550px]:mt-[calc(100%+6em)] max-[500px]:mt-[calc(100%)]'}
          />
        </div>

      </div>

      <div className={'mb-8 mt-0 max-[550px]:mt-[40em] max-[500px]:mt-[36em] max-[470px]:mt-[50em] max-[450px]:mt-[55em] max-[400px]:mt-[58em] relative'}>
        <div className={'bg-white/80 rounded z-20 px-4 py-2 max-w-4xl mx-4 mb-4 rounded mt-8 absolute'}>
          <h2 className={'text-xl md:text-2xl text-center my-4'}>Martin & Stella specializes in both commercial and residential moving.</h2>
          <p className={'text-lg md:text-xl'}>With over 2,000+ moves in and out of
            the North Carolina region, we are the premier moving company for your needs. We have moving trucks of every size and perform local/long distance moves. Whether you&apos;re moving out of your home, office, or business we cover all corners swiftly and efficiently. As we say, let us take the stress out of your day.
          </p>
        </div>


        <div className={'relative'}>
          <div className={'absolute bg-black/20 z-10 w-full h-full'}></div>
          <Image className={'w-full max-w-4xl  w-full rounded '} src={moving2} alt={''}/>
        </div>
      </div>
    </div>
  )
}

export default Moving