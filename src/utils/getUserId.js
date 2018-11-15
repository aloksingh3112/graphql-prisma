import jwt from 'jsonwebtoken';


const getUserId=(request)=>{

    const header=request.request.headers.authorization;


    if(!header){
      throw new Error("no token")
    };

    
    
    const decoded=jwt.verify(header,"aloksingh3112");

    console.log(decoded.userId);
    return decoded.userId


}

export {getUserId as default};