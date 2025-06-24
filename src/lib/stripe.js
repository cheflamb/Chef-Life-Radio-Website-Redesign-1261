import { loadStripe } from '@stripe/stripe-js';

// This will be replaced with your actual Stripe publishable key
const stripePromise = loadStripe('pk_test_your_publishable_key_here');

export default stripePromise;