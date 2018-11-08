import {Prisma} from 'prisma-binding';

const prisma=new Prisma({
    typeDefs:"src/generate/prisma.graphql",
    endpoint:"http://192.168.99.100:4466",
});

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

 prisma.mutation.updatePost({
     data:{
         body:"i like u",
         isPublish:false
     },
     where:{
         id:"cjo8crlmz001a0868yi2zg07m"
     }
 },'{id title body isPublish}')
 .then(data=>console.log(data));