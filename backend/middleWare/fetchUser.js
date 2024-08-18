// How will it work ??
// How will it work ??
// How will it work ??
// How will it work ??

// this middleware will be called whenever any function runs which require
// user to be logged-in, it fetches the user by which the current request is getting made
// authentication-token to be present in request headers to fetch the user, ideally it needs
// to be same as the logged-in one.

var jwt= require('jsonwebtoken');

const JWT_SECRET= 'Iwasagoodboy';

const fetchuser= (req, res, next) =>{
    // Get the user from JWT Token and add ID to the request object
    const token= req.header('auth-token');
    if(!token){
        res.status(401).json({error: "Please authenticate using a valid token"});
    }
    try{
        const data= jwt.verify(token, JWT_SECRET);
        console.log("data is: " );
        console.log(data);
        req.user= data.user;
        next();
    }catch(error){
        res.status(401);
    }
}

module.exports= fetchuser;