import Razorpay from 'razorpay';

const razorpay = new Razorpay({
  key_id: 'rzp_test_eGbNLYUHTjvuHa',
  key_secret: 'UwKnZgEMIjYz6utJfAfz0lpR', 
});

export default async function handler(req, res) {
  // Add CORS headers
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); // Update this for production
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'POST') {
    const { planId } = req.body;

    const plans = {
      'plan_PVBLv1Q3JEmuI0': 50000,  // Dynamic Payment 
      'plan_PVBMP8GvQMJ69f': 20000,  // Economic Payment 
      'plan_PVBN3LFR5TWaZo': 50000,  // Prime Payment
    };

    const amount = plans[planId];

    if (!amount) {
      return res.status(400).json({ error: 'Invalid plan ID' });
    }

    try {
      const options = {
        amount: amount, 
        currency: 'INR',
        receipt: `receipt_${new Date().getTime()}`,
        payment_capture: 1, 
      };

      const order = await razorpay.orders.create(options);

      res.status(200).json(order);
    } catch (error) {
      console.error('Error creating Razorpay order:', error);
      res.status(500).json({ error: 'Error creating Razorpay order' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
