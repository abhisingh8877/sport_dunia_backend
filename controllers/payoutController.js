const Payout = require('../models/Payout');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.updatePayoutRate = async (req, res) => {
  const jwt_secret = process.env.JWT_SECRET_KEY;

  try {
    const { login_type, token, updated_value } = req.body;

    // Validate login type
    if (login_type !== "admin") {
      return res.status(403).json({ message: "Only Admin can change value", isSuccess: false });
    }

    // Validate and decode token
    let value_token;
    try {
      value_token = jwt.verify(token, jwt_secret);
    } catch (error) {
      console.error("Token verification error:", error);
      return res.status(401).json({ message: "Invalid or expired token", isSuccess: false });
    }

    const id_user = value_token.id;

    // Fetch the user
    const user_login_type = await User.findById(id_user);

    if (!user_login_type) {
      return res.status(404).json({ message: "User not found", isSuccess: false });
    }

    if (user_login_type.role !== 'admin') {
      return res.status(403).json({ message: "Unauthorized: Admin access required", isSuccess: false });
    }

    // Upsert the payout record
    const updatedPayout = await Payout.findOneAndUpdate(
      {}, // Filter to match the record; use `{}` to target a single record if unique
      { $set: { PayValue: Number(updated_value) } }, // Update operation
      { upsert: true, new: true } // Insert if not found, and return the updated document
    );

    res.status(200).json({ message: "Payout updated successfully", isSuccess: true, payout: updatedPayout });
  } catch (error) {
    console.error("Error updating or inserting payout:", error);
    res.status(500).json({ message: "An internal error occurred", isSuccess: false });
  }
};

exports.findPayoutRate=async(req,res)=>{
   try
   {
      const checkPayData= await Payout.find({});
      console.log(checkPayData);
       if(checkPayData)
       {
          res.status(200).json({message:"we successfully find Payvalue",isSuccess:true,new_PayValue:checkPayData[0].PayValue});
       }
       else
       {
         res.status(404).json({message:"Their is some error with database",isSuccess:false});
       }
   }
    catch(error)
    {
      res.status(404).json({message:"Their is same error ",isSuccess:false});
    }
 }
    

