import {Prisma} from 'prisma-binding';

const prisma=new Prisma({
    typeDefs:"./generate/prisma.graphql",
    endpoint:"192.168.99.100:4466",
    secret:""
});