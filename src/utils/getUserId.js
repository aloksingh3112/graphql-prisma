import jwt from 'jsonwebtoken';


const getUserId=(request,authRequired=true)=>{

    const header=request.request.headers.authorization;


    if(header){
       
    const decoded=jwt.verify(header,"aloksingh3112");
    return decoded.userId
    };

    if(authRequired){
      throw new Error("authorization required")
    }
    return null;

    
   


}

export {getUserId as default};