import { NextApiHandler } from 'next';
import { stripe } from '../../utils/stripe';

const CreateCheckoutSession: NextApiHandler = async (req, res) => {
  if (req.method === 'POST') {
    const { price , name, email, phone, date, carSelection} = req.body;

    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        billing_address_collection: 'required',
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product: "prod_NaXQK2F7ihimAx",
              unit_amount: price * 100
            },
            quantity: 1,
          }
        ],
        mode: 'payment',
        success_url: `${req.headers.origin}/rental?success=true&name=${name}&email=${email}&phone=${phone}&date=${date}&car=${carSelection}`,
        cancel_url: `${req.headers.origin}/rental?canceled=true`,
      });

      return res.status(200).json({ sessionId: session.id, ...req.body });
    } catch (err: any) {
      console.log(err);
      res
        .status(500)
        .json({ error: { statusCode: 500, message: err.message } });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
};

export default CreateCheckoutSession;