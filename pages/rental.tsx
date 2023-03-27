import Modal from "../components/Modal";
import {FormEvent, useEffect, useState} from "react";
import Form from "../components/Form";
import { getStripe } from '../utils/stripe-client';
import Image from "next/image";
import Button from "../components/Button";
import { FormData } from "../types/formTypes"
import carData from "../data/carData";
import emailForm from "../lib/emailForm";
import { useRouter } from 'next/router'


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
  {
    name: 'price',
    type: 'number',
    label: 'Payment Amount ($)',
    required: true
  }
]



const Rental = () => {
  const [showRentalModal, setShowRentalModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [carSelection, setCarSelection] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    console.log(query)
    if (query.get('success')) {
      setShowPaymentModal(true);
      emailForm("Martin & Stella - Car Rental Reservation", {name: query.get('name'), phone: query.get('phone'), email: query.get('email'), date: query.get('date'), car: query.get('car')})
      setMessage('Thanks for making a car rental reservation with us! We\'ll respond shorty to confirm you reservation!');
      router.replace('/rental', undefined, { shallow: true });
    }

    if (query.get('canceled')) {
      setShowPaymentModal(true);
      setMessage('Order canceled -- continue to shop around and checkout when you’re ready.');
     router.replace('/rental', undefined, { shallow: true });
    }
  }, [router]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>, formData: FormData) => {
    event.preventDefault();
    try {
      console.log('posting');

      const res: Response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        credentials: 'same-origin',
        body: JSON.stringify({carSelection, ...formData})
      });

      if (!res.ok) {
        console.log('Error in postData');
        throw Error(res.statusText);
      }

      const { sessionId } = await res.json();
      console.log(sessionId)

      const stripe = await getStripe();
      stripe?.redirectToCheckout({ sessionId });
      //setLoading(false)

      //setMessage("Thanks for making a car rental reservation with us! We'll respond shorty to confirm you reservation!")
      setMessage("Taking you to the payment page...");
    } catch(err) {
      setMessage(`Sorry, we ran into a problem processing your request. Please contact us with the email address or phone number below. Error details: ${err}`)
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
                <Button onClick={() => { setShowRentalModal(true); setCarSelection(`${car.year}-${car.make}-${car.model}`);}}>Make Reservation</Button>
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

      <Modal
        show={showPaymentModal}
        onClose={() => { setShowPaymentModal(false);  setMessage("");}}
        title={'Payment Results'}
        className={'max-w-lg '}
      >
        <div className={'px-4 pb-4'}>
          {message}
        </div>
      </Modal>
    </div>
  )
}

export default Rental