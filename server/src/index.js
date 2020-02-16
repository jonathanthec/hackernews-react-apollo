const { GraphQLServer } = require('graphql-yoga');
const { prisma } = require('./generated/prisma-client');

const resolvers = {
    Query: {
        info: () => `This is the API of a Hackernews Copycat`,
        feed: (root, args, context, info) => {
            return context.prisma.links()
        },
    },
    Mutation: {
        createLink: (root, args, context) => {
            return context.prisma.createLink({
                url: args.url,
                description: args.description
            })
        },
        updateLink: (root, args, context) => {
            return context.prisma.updateLink(
            {
                where: {
                    id: args.id
                },
                data: {
                    url: args.url,
                    description: args.description
                }
            })
        },
        deleteLink: (root, args, context) => {
            return context.prisma.deleteLink({
                id: args.id
            })
        }
    },
}

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: { prisma },
})

server.start(() => console.log(`Server is running on port http://localhost:4000`))