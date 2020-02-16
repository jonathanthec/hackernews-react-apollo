const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { APP_SECRET, getUserId } = require('../utils');

function createLink(root, args, context){
    const userId = getUserId(context);
    return context.prisma.createLink({
        url: args.url,
        description: args.description,
        postedBy: { connect: { id: userId }}
    })
}

function updateLink(root, args, context){
    const userId = getUserId(context);
    return context.prisma.updateLink(
    {
        where: {
            id: args.id
        },
        data: {
            url: args.url,
            description: args.description,
            postedBy: { connect: { id: userId }}
        }
    })
}

function deleteLink(root, args, context){
    return context.prisma.deleteLink({
        id: args.id
    })
}

async function signup(root, args, context, info) {
    const hashed = await bcrypt.hash(args.password, 10);
    const user = context.prisma.createUser({ 
        name: args.name,
        email: args.email,
        password: hashed
    });
    const token = jwt.sign({ userId: user.id }, APP_SECRET);

    return {
        token,
        user
    }
}

async function login(root, args, context, info) {
    const user = await context.prisma.user({ email: args.email});
    if(!user) {
        throw new Error('No such user found')
    }
    const valid = await bcrypt.compare(args.password, user.password)
    if(!valid) {
        throw new Error('Invalid password')
    }
    const token = jwt.sign({ userId: user.id }, APP_SECRET)
    return {
        token, user
    }
}

async function vote(root, args, context, info) {
    const userId = getUserId(context);

  const linkExists = await context.prisma.$exists.vote({
    user: { id: userId },
    link: { id: args.linkId },
  })
  if (linkExists) {
    throw new Error(`Already voted for link: ${args.linkId}`)
  }
  
    return context.prisma.createVote({
        link: { connect: { id: args.linkId }},
        user: { connect: { id: userId }}
    })
}

module.exports = {
    createLink,
    updateLink,
    deleteLink,
    signup,
    login,
    vote
}