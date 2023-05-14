const express = require('express');


const secretKeyFromStripe = "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";
//we need secret key from stripe here \/
const stripe = require("stripe")("sk_test_51N6iz9AqOUdA7AoGYlqMAwVa0U4wB4vH9sKr4npXniQM63aiHqVtsPFGZXRjrDicDHLzejHCDJXjII0JnTXF0MCK00khQJPRVj");
const { v4:uuidv4 } = require('uuid');

const router = express.Router();

router.get('/', (req, res, next) => {
    console.log("Stripe Route Researcher")
    res.json ({
        message: 'It Works!'
    })
});

router.post("/pay", (req, res, next)=> {
    console.log(req.body.token);
    const {token, amount} = req.body;
    const idempotencyKey = uuidv4();

    console.log("TOKEN: " + token);
    console.log("AMOUNT: " + amount)

    return stripe.customers.create({
        email: token.email,
        source: token
    }).then(customer => {
        stripe.charges.create({
            amount: amount * 100,
            currency: 'usd',
            customer: customer.id,
            receipt_email: token.email
        }, {idempotencyKey})
    }).then(result => {
        res.status(200).json(result)
    }).catch(err=>{
        console.log(err);
    });
});


module.exports = router;