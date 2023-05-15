const express = require('express');

//we need secret key from stripe here \/
const stripe = require("stripe")(process.env.SECRET_STRIPE_KEY);
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