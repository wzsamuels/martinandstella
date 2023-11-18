import { NextApiHandler } from 'next';
import { stripe } from '../../utils/stripe';

const CreateCheckoutSession: NextApiHandler = async (req, res) => {
  if (req.method === 'POST') {
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        billing_address_collection: 'required',
        line_items: [
          {
            price: process.env.STRIPE_PRODUCT_PRICE,
            quantity: 1,
          }
        ],
        mode: 'payment',
        success_url: `${req.headers.origin}/payment?success=true&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/payment?canceled=true`,
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