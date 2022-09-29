// import registration from "../Schema/Registration.js";
import initMB from 'messagebird';
const messagebird = initMB('ZUcVDMrE8WjDTdP0h22BQfXdV');
import Product from "../Schema/Products.js";
import Location from "../Schema/Location.js";
import Registration2 from "../Schema/Registration2.js";
import Invoice from '../Schema/costumersInvoice.js'
import mongoose from 'mongoose';
// import Invoice from '../Schema/costumersInvoice.js'

// process.env.SECRET_KEY
 import  bcrypt from "bcryptjs";

// import authenticate from "../middleware/authenticate.js";
 import jwt from 'jsonwebtoken';
// import  twilio from 'twilio';
// const client = new twilio(process.env.accountSid, process.env.authToken);


class userController{

    
  static register = async(req, res) => {

    try {
       const {phonenumber,name,email,role,password} = req.body;
     
    const pimage = req.files['pimage'][0].filename
    const userLogin = await Registration2.findOne({ phonenumber: phonenumber });
    console.log(userLogin)
    if (userLogin) {
      if (userLogin.phonenumber == phonenumber) {
        console.log(userLogin)
        res.status(201).send({message:"number already register",})
      }
    }
    
else
{const lol = {phonenumber,name,email,role,pimage,password}
const register = new  Registration2(lol)
  await register.save()
res.status(201).send({message:"succesfull",})
}}
catch (error) {
    console.log(error)
    return res.status(422).json({error:"not found data"})
  }
  }

  
//   static registers = async(req, res) => {

//     try {
//        const {phonenumber,name,email,role,password} = req.body;
     
//     const pimage = req.files['pimage'][0].filename
//     const userLogin = await Registration2.findOne({ phonenumber: phonenumber });
//     console.log(userLogin)
//     if (userLogin) {
//       if (userLogin.phonenumber == phonenumber) {
//         console.log(userLogin)
//         res.status(201).send({message:"number already register",})
//       }
//     }
    
// else
// {const lol = {phonenumber,name,email,role,pimage,password}
// const register = new  Registration2(lol)
//   await register.save()
// res.status(201).send({message:"succesfull",})
// }}
//  catch (error) {
//     console.log(error)
//     return res.status(422).json({error:"not found data"})
//   }
//   }


static GetdailyDetails= async(req, res) => {

  try {
     
  const ram =  await Invoice.find({
// to get last 24 hour sells record
    "createdAt":{$lt: new Date(), $gt:new Date(new Date().getTime()-(24*60*60*1000))}
  })

  if (ram) {
    //  console.log(ram)
//  console.log(new Date(new Date().getTime()-(24*60*1000)))
//  console.log(new Date(new Date().getTime()-(24*60*60*1000)))
 
  res.send(ram)

  
  }
    
  } 
  catch (error) {
    console.log(error,{message:"items not added"})
  }

}



  static addProduct = async (req, res) => {
    const product = new Product(req.body)
    try {
      await product.save()
      res.status(201).send(product)
    } catch (e) {
      res.status(400).send(e)
    }
  };

 static addLoaction = async (req, res) => {
    const location = new Location(req.body)
    try {
      await location.save()
      res.status(201).send(location)
    } catch (e) {
      res.status(400).send(e)
    }
    console.log(req.body)
    // res.send(req.body)
  }

 static getLocation = async (req, res) => {
    const locations = await Location.find({})
    res.json(locations)
  }

  static costumersInvoice = async (req, res) => {
    const invoice = await Invoice.find({})
    res.json(invoice)
  }

  
  static changeUserPasswordbyId = async (req, res) => {

    try {
      // const { password, password_confirmation,Oldpassword } = req.body
      const { password, password_confirmation } = req.body
      // const { id } = req.params;
      //  console.log(id)
var id = req.params.id
      // let li ='633520bd0252b9afa1479feb'
    
      //  const id = mongoose.Types.ObjectId(_id);
      //  console.log(id)
      if (password && password_confirmation) {
        if (password !== password_confirmation) {
          res.send({ "status": "failed", "message": "New Password and Confirm New Password doesn't match" })
        }
        const userLogin = await Registration2.findOne({_id:id})
    console.log(userLogin)
      if ( userLogin) {
        //  console.log(userLogin._id)
        // console.log(req.user._id)

        // const isMatch = await bcrypt.compare(Oldpassword,userLogin.password)
        // if (isMatch) {
          const salt = await bcrypt.genSalt(10)
          const newHashPassword = await bcrypt.hash(password, salt)
          await Registration2.findByIdAndUpdate(id, { $set: { password: newHashPassword } })
          res.send({ "status": "success", "message": "Password changed succesfully" })
        }
      // }
        
     else {
      res.send({ "status": "failed", "message": "All Fields are Required" })
    }
  }  }
  catch (error) {
   console.log(error)
   return res.status(422).json({error:"not found data"})
 }
 }





  static editProfile = async (req, res) => {

    try {
      const { phonenumber, email ,name} = req.body
    
      // if (password && password_confirmation) {
      //   if (password !== password_confirmation) {
      //     res.send({ "status": "failed", "message": "New Password and Confirm New Password doesn't match" })
      //   }
        const userLogin = await Registration2.findOne({_id:req.user._id})
    // console.log(userLogin)

      if ( userLogin) {
          await Registration2.findByIdAndUpdate(req.user._id, { $set: {name:name, phonenumber:phonenumber ,email:email}})
          res.send({ "status": "success", "message": "Profile changed succesfully" })
        }
     else {
      res.send({ "status": "failed", "message": "All Fields are Required" })
    }
  }  
  catch (error) {
   console.log(error)
   return res.status(422).json({error:"not found data"})
 }
 }  

  


  static login = async (req, res) => {

    try {
      const { phonenumber, password } = req.body

      if (!phonenumber || !password) {
        return res.status(400).json({ error: "pls filled data" })
      }

      const userLogin = await Registration2.findOne({ phonenumber: phonenumber });
      if (userLogin) {

        const isMatch = await bcrypt.compare(password, userLogin.password)

        // const token = await userLogin.generateAuthToken();
        const token = jwt.sign({ userID: userLogin._id }, process.env.SECRET_KEY, { expiresIn: '1d' })
        // console.log(token); 
        // res.cookie("jwtoken", token,{
        //     expires:new Date(Date.now() + 2589000000),
        //    httpOnly:true});

        !isMatch ? res.status(400).send({ message: "error" }) : res.send({ "status": "success", "message": "Login Success", "token": token })

      }
      else { res.status(400).send({ message: "filled invalid data" }) }

    } catch (error) {
      console.log(error);
    }
  };


  // static login = async (req, res) => {
  //   const { phonenumber } = req.body
  //   const newPhoneNumber = "+91" + phonenumber
  //   var params = {
  //     template: 'Your Login OTP is %token',
  //     timeout: 300
  //   };

  //   messagebird.verify.create(newPhoneNumber, params,
  //     (err, response) => {
  //       if (err) {
  //         // Could not send OTP e.g. Phone number Invalid
  //         console.log("OTP Send Error:", err);
  //         res.status(200).send({ "status": "failed", "message": "Unable to Send OTP" })
  //       } else {
  //         // OTP Send Success
  //         console.log("OTP Send Response:", response);
  //         res.status(200).send({ "status": "success", "message": "OTP Send Successfully", "id": response.id })
  //       }
  //     });
  // }

  static verifyOTP = async (req, res) => {
    const { id, otpcode } = req.body
    messagebird.verify.verify(id, otpcode,
      (err, response) => {
        if (err) {
          // Incorrect OTP
          console.log("OTP Verification Error:", err)
          res.status(200).send({ "status": "failed", "message": "Invalid OTP" })
        } else {
          // Login Success
          console.log("OTP Verification Response:", response)
          res.status(200).send({ "status": "success", "message": "Login Success" })
        }
      });
  }


}

export default userController ;