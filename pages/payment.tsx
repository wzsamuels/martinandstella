import { useEffect, useState} from "react";
import {getStripe} from "../utils/stripe-client";
import {useRouter} from "next/router";
import emailForm from "../lib/emailForm";
import {stripe} from "../utils/stripe";
import Button from "../components/Button";
import payment from '../public/images/payment/payment.jpg'
import Image from "next/image";

export async function getServerSideProps(ctx: { query: { session_id: string; }; }) {
  if(!ctx.query.session_id) {
    return {
      props: {
        customerName: "",
        amount: 0
      }
    }
  }
  const session = await stripe.checkout.sessions.retrieve(ctx.query.session_id);
  console.log(session)

  return {
    props: {
      customerName: session.customer_details?.name,
      amount: session.amount_total ? session.amount_total / 100 : 0,
    }
  }
}

const PaymentPage = ({customerName, amount} : {customerName: string, amount: number}) => {
  const [message, setMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    console.log(query)
    if (query.get('success') && query.get('session_id')) {
      setMessage(`Thanks for making your payment of $${amount.toFixed(2)}, ${customerName}!`);
      emailForm("Martin & Stella - Customer Payment Made", {name: customerName, amount: amount})
      //router.replace('/payment', undefined, { shallow: true });
    }

    if (query.get('canceled')) {
      setMessage('Payment canceled.');
      //router.replace('/payment', undefined, { shallow: true });
    }
  }, [amount, customerName, router]);

  const handlePayment = async () => {
    try {
      console.log('posting');

      const res: Response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        credentials: 'same-origin',
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
    <div className={'flex flex-col items-center'}>
      <h1 className={'my-6 text-3xl md:text-4xl'}>Make a Payment</h1>
      <div className={'flex flex-col sm:flex-row items-center p-0 sm:p-4'}>
        <Image className={'max-w-2xl w-3/4 sm:w-1/2 flex-1 rounded'} src={payment} alt={''}/>
        <div className={'flex-1 p-4'}>
          <h2>Need to make a payment for one of our services? We now offer convenient online credit card payments. Click on the button below to access our secure payment portal.</h2>
          <div className={'flex justify-center w-full'}>
            <Button className={'my-4'} onClick={handlePayment}>Make Payment</Button>
            { message &&
              <div className={'p-4 my-6 border border-black rounded'}>
                {message}
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentPage

/*
  const handleSubmit = async (event: FormEvent<HTMLFormElement>, formData: FormData) => {
    event.preventDefault();
    try {
      console.log('posting');

      const res: Response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        credentials: 'same-origin',
        body: JSON.stringify({...formData})
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
 */