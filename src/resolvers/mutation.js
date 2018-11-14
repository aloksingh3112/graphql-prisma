import uuidv4 from 'uuid/v4';
const Mutation={
    async createUser(parent,args,{prisma},info){
        try{
        const useremail= await prisma.exists.User({email:args.data.email});
        if(useremail){
           throw new Error("email exists")
        }

        return prisma.mutation.createUser({data:args.data},info)


        }
        catch(err){
            console.log("error is",err)
        }
 
    },

    async deleteUser(parent,args,{prisma},info){

        try{
        const userExist=await prisma.exists.User({id:args.id});
        if(!userExist){
            throw new Error("no user exist");
        }

        const deletedUser=await prisma.mutation.deleteUser({where:{
            id:args.id
        }},info);
        return deletedUser;
    }catch(err){
       console.log(err);
    }


    //   const userIndex=db.users.findIndex(user=>user.id===args.id);
    //   if(userIndex==-1){
    //       throw new Error("no user found");
    //   }
    //   const deletedUser=db.users.splice(userIndex,1);

    //    db.posts=db.posts.filter((post)=>{
    //        const match = post.author==args.id;
    //        if(match){
    //             db.comments=db.comments.filter(comment=>{
    //                  return comment.post!=post.id
    //             }) 
    //        }
    //        return !match
    //    })

    //    db.comments=db.comments.filter((comment)=>comment.author!=args.id);
     

    //    return deletedUser[0];
    },
    
     updateUser(parent,args,{db},info){
         const user=db.users.find((user)=>user.id==args.id);
         if(!user){
             throw new Error("no user exist");
         }

         if(typeof args.data.email ==="string" ){
             const emailTaken=db.users.some(user=>user.email==args.data.email);
             if(emailTaken){
                 throw new Error("email already taken")
             }
             user.email=args.data.email
             
         }
         if(typeof args.data.name==="string"){
             const nametaken=db.users.some(user=>user.name===args.data.name);
             if(nametaken){
                 throw new Error("name already exist");
             }
             user.name=args.data.name
         }
         if(typeof args.data.age!=undefined){
             user.age=args.data.age
         }

         return user;



     },
  
    
    createPost(parent,args,{db,pubsub},info){
        console.log(args.author);
        const userExis=db.users.some((user)=>user.id=args.data.author);
         if(!userExis){
             throw new Error('user not existed')
         }
         const post={
             id:uuidv4(),
             ...args.data
        }
        
        db.posts.push(post);
        if(post.isPublished){
            pubsub.publish('post1',{
                post:{
                    mutation:"CREATED",
                    data:post
                }
            })
        }
        return post;
    },

    deletePost(parent,args,{db,pubsub},info){
     const findIndex=db.posts.findIndex(post=>post.id==args.id);
     if(findIndex==-1){
         throw new Error("no post exist")
        }
     const deletedPost=db.posts.splice(findIndex,1);

     db.comments=db.comments.filter(comment=>comment.post!==args.id);

     if(deletedPost[0].isPublished){
        pubsub.publish('post1',{
            post:{
                mutation:"DETETED",
                data:deletedPost[0]
            }
        })
     }
     return deletedPost[0];



    },
    updatePost(parent,args,{db,pubsub},info){
       const post=db.posts.find((post)=>post.id==args.id);
       const originalPost={...post};
       if(!post){
           throw new Error("no post is there");
       }
       if(typeof args.data.title !=undefined){
           post.title=args.data.title
       }
       if(typeof args.data.body !=undefined){
        post.body=args.data.body
      }
      if(typeof args.data.isPublished !=undefined){
        post.isPublished=args.data.isPublished
        if(originalPost.isPublished && !post.isPublished){
            pubsub.publish('post1',{
                post:{
                    mutation:"DELETED",
                    data:originalPost
                }
            })
        }
        else if(!originalPost.isPublished && post.isPublished){
           pubsub.publish('post1',{
               post:{
                   mutation:"CREATED",
                   data:post
               }
           })    
        }
        else if(post.isPublished){
            pubsub.publish('post1',{
                post:{
                    mutation:"UPDATED",
                    data:post
                }
            })
        }
    }
       return post;

    },

    createComment(parent,args,{db,pubsub},info){
        const isUser=db.users.some((user)=>user.id==args.data.author);
        if(!isUser){
            throw new Error('user not existed')
        }
        const isPost=db.posts.some((post)=>post.id==args.data.post);
        if(!isPost){
            throw new Error("post does ot existed")
        }
        const comment={
            id:uuidv4(),
            ...args.data
        }
        db.comments.push(comment);
         pubsub.publish(`comment ${args.data.post}`,{
             comment:{
                 mutation:"CREATED",
                 data:comment
             }
         })
        return comment;

    }

}

export {Mutation as default};