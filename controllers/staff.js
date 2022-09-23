import registration from "../Schema/Registration.js";
import Product from "../Schema/Products.js";
import Invoice from "../Schema/costumersInvoice.js";


// process.env.SECRET_KEY
// import  bcrypt from "bcryptjs";

// import authenticate from "../middleware/authenticate.js";
// import jwt from 'jsonwebtoken';
// import  twilio from 'twilio';
// const client = new twilio(process.env.accountSid, process.env.authToken);


class staffController{

    

    // static costumersInvoice = async(req, res) => {

    //     try {
    //        const {  name,aadharNumber,billNumber,selectProduct,quantity,cash,credit,totalAmount} = req.body;
          
    //     if (!totalAmount || !quantity || !name || !selectProduct) {
    //       res.send({ "status": "failed", "message": "All Fields are Required" })

    //     }
    //     let id = "632c826dc67cb89e82e9ce05"
    //       const userLogin = await registration.findOne({_id:id})
    //       if (userLogin )
    //        {

    //         const userProduct = await Product.findOneAndUpdate({name:selectProduct},{ $set: {quantity:quantity}})
            
    //           console.log(userProduct)
                
    //     await registration.findByIdAndUpdate(id, { $push: { costumersInvoice:req.body,
    //         }} )

          
    //        res.send({ "status": "success", "message": "costumersInvoice saved" }) 
    //        }
    //     }
    //    catch (error) {
    //     console.log(error)
    //     return res.status(422).json({error:"not found data"})
    //   }
    //   }
    

      
    static costumersInvoice = async(req, res) => {

      let id = "632c826dc67cb89e82e9ce05"
      // const Invoice = new  Invoice({...req.body,createdby:id})
     
      try {

       
         const { name,
          aadharNumber,
          selectProduct,
          quantity,
          billNumber,
          totalAmount,
          cash,
          credit,} = req.body;
        
      if (!totalAmount || !quantity || !name || !selectProduct) {
        res.send({ "status": "failed", "message": "All Fields are Required" })

      }

     
   
        // const userLogin = await registration.findOne({_id:id})
        // if (userLogin )
        //  {
          const userProduct = await Product.findOneAndUpdate({name:selectProduct},{ $set: {quantity:quantity}})
          console.log(userProduct.quantity - quantity,"80")

       let newQuantity =userProduct.quantity - quantity
          const userNewProduct = await Product.findOneAndUpdate({name:selectProduct},{ $set: {quantity:newQuantity}})
          console.log(userNewProduct)
            



            const lol ={ name,
              aadharNumber,
              selectProduct,
              quantity,
              billNumber,
              totalAmount,
              credit,
              cash,
              createdby:id}
             const invoice = new  Invoice (lol)
            await invoice.save()

        
         res.send({ "status": "success", "message": "costumersInvoice saved" }) 
        //  }
      }
     catch (error) {
      console.log(error)
      return res.status(422).json({error:"not found data"})
    }
    }
  

  static register = async(req, res) => {

    try {
       const {phonenumber,name,email,role} = req.body;
     
    const pimage = req.files['pimage'][0].filename
  
const lol ={phonenumber,name,email,role,pimage}
      const register = new  registration(lol)
        await register.save()
      res.status(201).send({message:"succesfull",})
      }
   catch (error) {
    console.log(error)
    return res.status(422).json({error:"not found data"})
  }
  }

  
 static addLoaction = async (req, res) => {
    const location = new Location(req.body)
    try {
      await location.save()
      res.status(201).send(location)
    } catch (e) {
      res.status(400).send(e)
    }
    console.log(req.body)
    res.send(req.body)
  }

 static getLocation = async (req, res) => {
    const locations = await Location.find({})
    res.json(locations)
  }


  static login = async (req, res) => {
    const { phonenumber } = req.body
    const newPhoneNumber = "+91" + phonenumber
    var params = {
      template: 'Your Login OTP is %token',
      timeout: 300
    };

    messagebird.verify.create(newPhoneNumber, params,
      (err, response) => {
        if (err) {
          // Could not send OTP e.g. Phone number Invalid
          console.log("OTP Send Error:", err);
          res.status(200).send({ "status": "failed", "message": "Unable to Send OTP" })
        } else {
          // OTP Send Success
          console.log("OTP Send Response:", response);
          res.status(200).send({ "status": "success", "message": "OTP Send Successfully", "id": response.id })
        }
      });
  }

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

export default staffController ;