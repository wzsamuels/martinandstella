import Modal from "../components/Modal";
import {FormEvent, useState} from "react";
import Form from "../components/Form";
import Image from "next/image";
import Button from "../components/Button";
import { FormData } from "../types/formTypes"
import carData from "../data/carData";
import emailForm from "../lib/emailForm";

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
    maxLength:14
  },
  {
    name: 'date',
    type: 'date',
    label: 'Date',
    required: true,
  },
]



const Rental = () => {
  const [showRentalModal, setShowRentalModal] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>, formData: FormData) => {
    event.preventDefault();
    try {
      emailForm("Martin & Stella - Vehicle Rental Email", formData)
      setMessage("Thanks for scheduling your rental! We'll respond to confirm your reservation.")
    } catch(err) {
      setMessage("Sorry, we ran into a problem processing your request. Please contact us with the email address or phone number below.")
    }
  }

  return (
    <div className={'flex flex-col items-center my-4'}>
      <h1 className={'text-3xl my-6'}>Vehicle Rental</h1>
      <div className={'flex flex-wrap justify-center'}>
        { carData.map(car =>
          <div key={car.id} className={'rounded-t-xl shadow-xl border-gray-300 border max-w-[600px] m-4'}>
            <Image className={'rounded-t-xl shadow-xl'} src={car.image} alt={car.model}/>
            <div className={'my-4 px-4'}>
              <h2 className={'text-2xl my-4'}>{car.year} {car.make} {car.model}</h2>
              <h3 className={'text-xl my-4'}>Features</h3>
              <ul className={'my-4 list-disc list-inside'}>
                <li>{car.drive}</li>
                <li>Seats {car.seats}</li>
                <li>{car.fuel}</li>
                <li>{car.highway} MPG Highway</li>
                <li>{car.city} MPG City</li>
              </ul>
              <p>All vehicles are cleaned to perfection and come with a full tank of gas. </p>
              <div className={'flex justify-center my-4'}>
                <Button onClick={() => setShowRentalModal(true)}>Make Reservation</Button>
              </div>

            </div>
          </div>
        )}
      </div>
      <Modal
        show={showRentalModal}
        onClose={() => {setShowRentalModal(false); setMessage("");}}
        title={'Make a Reservation'}
        className={'max-w-lg'}
      >
        <div className={'px-4 pb-4'}>
        { message ?
          <div>
            {message}
          </div>
          :
          <Form formFields={formFields} handleSubmit={handleSubmit}/>
        }
        </div>
      </Modal>
    </div>
  )
}

export default Rental