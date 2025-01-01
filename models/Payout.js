const mongoose = require('mongoose');

 
const payoutSchema=new mongoose.Schema({
    PayValue:{
        type:Number,
        required:true
    }
});
const Payout = mongoose.model('Payout_doc', payoutSchema);
module.exports = Payout;
