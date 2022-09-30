import registration from "../Schema/Registration.js";
// import  bcrypt from "bcryptjs";
// import jwt from 'jsonwebtoken';



class sellerController{

  

 static getLocation = async (req, res) => {
    const locations = await Location.find({})
    res.json(locations)
  }




}

export default sellerController ;