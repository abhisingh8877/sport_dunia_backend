const express = require('express');
const { updatePayoutRate,findPayoutRate } = require('../controllers/payoutController');

const router = express.Router();

router.post('/update', updatePayoutRate);
router.get('/findPay',findPayoutRate);

module.exports = router;
