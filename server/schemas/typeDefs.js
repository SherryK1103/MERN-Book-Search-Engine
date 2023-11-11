const typeDefs = `
type User {
    _id: ID!
    email: String
}

type Auth {
    token: ID!
    user: User
}

type Query { 
    me: User
}

type Mutation {
    login(email: String!, password: String!): Auth
}


`