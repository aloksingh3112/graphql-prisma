const Query={
    greeting(parent,args,{db},info){
        if(args.name && args.title){
          return `hello ${args.name} and i m ${args.title}`
        }else{
            return 'hello'
        }

    },

    
     user(parent,args,{db,prisma},info){

        const opArgs={};
        if(args.query){
            opArgs.where={
                OR:[{
                    name_contains:args.query
                },{
                    email_contains:args.query
                }
            ]
            }
        }

       return prisma.query.users(opArgs,info)
       

        //  if(!args.query){
        //      return db.users
        //  }
        //  return db.users.filter((user)=>{
        //     return user.name.toLowerCase().includes(args.query.toLowerCase())
        //  })
     },


     post(parent,args,{db,prisma},info){
        const opArgs={};
        if(args.query){
            opArgs.where={
                OR:[{
                    title_contains:args.query
                },
            {
                body_contains:args.query
            }]
            }
        }

         return prisma.query.posts(opArgs,info);
        //  if(!args.query){
        //      return db.posts;
        //  }
        //  return db.posts.filter((post)=>{
        //      return post.title.toLowerCase().includes(args.query.toLowerCase()) ||post.body.toLowerCase().includes(args.query.toLowerCase());
        //  })
     },

     comments(parent,arg,{db,prisma},info){
         return prisma.query.comments(null,info)
     }

}

export {Query as default};