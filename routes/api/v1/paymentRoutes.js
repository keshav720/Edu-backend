const express = require("express");
const router = express.Router();
const paymentController = require("../../../src/controllers/payments/paymentController");

router.post("/", paymentController.createPayment );
router.post("/subscription-payment",paymentController.createSubscription);
module.exports = router; 


