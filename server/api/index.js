const express = require('express')
const app = express()
const ProtectedRoutes = require('express').Router()
const jwt = require('jsonwebtoken')
const secret = '.../secrets'
module.exports = app

app.set('Secret', secret)

// app.post('/authenticate',(req,res)=>{

//   if(true){
//     // req.body.username==="EveretteH"
//       if(true){
//         //req.body.password==='1234'

//       const payload = {

//           check:  true

//         };

//         var token = jwt.sign(payload, app.get('Secret'), {
//               expiresIn: 1440 // expires in 24 hours

//         });

//         res.json({
//           message: 'authentication done ',
//           token: token
//         });

//       }else{
//           res.json({message:"please check your password !"})
//       }

//   }else{

//       res.json({message:"user not found !"})

//   }

// })

// ProtectedRoutes.use((req, res, next) =>{
//   console.log("this is the Request",req.headers)
//   var token = req.headers['access-token'];
//   if (token) {
//     jwt.verify(token, app.get('Secret'), (err, decoded) =>{
//       if (err) {
//         return res.json({ message: 'invalid token' });
//       } else {
//         req.decoded = decoded;
//         next();
//       }
//     });
//   } else {
//     res.send({
//         message: 'No token provided.'
//     });

//   }
// });

// app.use('/', ProtectedRoutes)
app.use('/users', require('./users'))
app.use('/products', require('./products'))

app.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
