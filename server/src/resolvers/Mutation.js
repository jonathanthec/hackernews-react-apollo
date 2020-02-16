function createLink(root, args, context){
    return context.prisma.createLink({
        url: args.url,
        description: args.description
    })
}

function updateLink(root, args, context){
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
}

function deleteLink(root, args, context){
    return context.prisma.deleteLink({
        id: args.id
    })
}

module.exports = {
    createLink,
    updateLink,
    deleteLink
}