import {Prisma} from 'prisma-binding';

const prisma=new Prisma({
    typeDefs:"src/generate/prisma.graphql",
    endpoint:"http://192.168.99.100:4466",
    secret:"aloksingh3112"
});

export {prisma as default};

// prisma.query.users(null,'{id name email}')
//   .then((data)=>{
//       console.log(data);
//   })
// prisma.query.comments(null,'{id text author{id name email}}')
// .then(data=>console.log(data))
// ;

// prisma.mutation.createPost({
//     data:{
//        title:"hello worlls",
//        body:"c ++",
//        isPublish:false,
//        user:{
//            connect:{
//                id:"cjo8crlmz001a0868yi2zg07m"
//            }
//        }
//     }
// } ,'{id title body isPublish user{id name email}}')
//   .then(data=>console.log(data))

//  prisma.mutation.updatePost({
//      data:{
//          body:"i like u",
//          isPublish:false
//      },
//      where:{
//          id:"cjo8crlmz001a0868yi2zg07m"
//      }
//  },'{id title body isPublish}')
//  .then(data=>console.log(data));

// const updatePostForUser=async (postId,data)=>{
//     try{   
//       const userExist=await prisma.exists.Post({
//           id:postId
//       })  
//       if(!userExist){
//           throw new Error("new post available");
//       }  
//     const updatedPost=await prisma.mutation.updatePost({
//         data:{
//             ...data
//         },
//         where:{
//             id:postId
//         }
//     }
//         ,'{ user {id} }');

//    const user=await prisma.query.user({
//        where:{
//            id:updatedPost.user.id
//        }
//    },'{id name email}')
//    return user
// }catch(err){
//     console.log("hggg",err);
// }
// }
// updatePostForUser('cjo8sfczc0008086875r8r1e3',{
//     title:"hello worls i m here"
// }).then(data=>console.log(data));



