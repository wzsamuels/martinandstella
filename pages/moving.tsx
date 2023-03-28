import {FormEvent, useState} from "react";
import Image from "next/image";
import {FormData} from "../types/formTypes"
import moving1 from '../public/images/moving/moving.jpg'
import moving2 from '../public/images/moving/moving2.jpg'
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
  const [message, setMessage] = useState("");

  const renderForm = () => {
    return (
      <>
        { message ?
          <div className={'w-full p-4 max-w-lg rounded-xl bg-white/80 '}>
            <h3 className={'md:text-2xl text-xl my-6 text-center'}>{message}</h3>
          </div>
          :
          <div className={'w-full p-4 max-w-lg rounded-xl min-[550px]:bg-white/80'}>
            <h3 className={'md:text-2xl text-xl text-center'}>Schedule Your Next Residential or Commercial Move Now</h3>
            <Form
              formFields={formFields}
              handleSubmit={handleSubmit}
            />
          </div>
        }
      </>
    )
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>, formData: FormData) => {
    event.preventDefault();
    console.log(formData)
    try {
      emailForm("Martin & Stella - Moving Request", formData)
      setMessage("Thanks for scheduling a move with with us! We'll respond shorty to confirm you reservation!")
    } catch(err) {
      setMessage("Sorry, we ran into a problem processing your request. Please contact us with the email address or phone number below.")
    }
  }

  return (
    <div className={'flex flex-col justify-center items-center mt-6 w-full'}>
      <div className={'relative flex justify-center '}>
        <div className={'relative'}>
          <div className={'absolute bg-black/20 z-10 w-full h-full mb-6'}></div>
          <Image className={'w-full max-w-4xl  w-full rounded'} src={moving1} alt={''}/>
        </div>
        <div className={'z-10 absolute top-0 flex flex-col justify-center items-center max-[550px]:h-[95%] justify-center'}>
          <div className={'px-4 py-2 m-4 bg-white/80 rounded-xl '}>
            <h1 className={'md:text-4xl text-3xl my-6 text-center'}>Feeling Crushed by the Stress of Moving?</h1>
            <h2 className={'md:text-3xl text-2xl my-4 text-center'}>Let Us Take Some of the Weight Off!</h2>
          </div>

          <div className={'min-[550px]:flex hidden w-full justify-center'}>
            { renderForm() }
          </div>
        </div>

      </div>

      <div className={'max-[550px]:flex hidden w-full justify-center'}>
        { renderForm() }
      </div>

      <div className={'mb-8 relative mt-4'}>
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