import stripe

stripe.api_key = 'your_stripe_secret_key'

def create_payment_intent(amount):
    intent = stripe.PaymentIntent.create(
        amount=amount,
        currency='usd',
    )
    return intent.client_secret
