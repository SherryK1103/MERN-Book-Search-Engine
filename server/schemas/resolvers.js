const User = require('../models/User');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .select('-__v -password')
                return userData;
            }
            throw new AuthenticationError('Not logged in');
        },
    },
    Mutation: {
        login: async (parent, args, context) => {
            const user = await User.findOne({ email: args.email });
            if (!user) {
                throw new AuthenticationError('Not logged in');
            }

            const correctPw = await user.isCorrectPassword(body.password);

            if (!correctPw) {
                throw new AuthenticationError('Not logged in');
            }
            const token = signToken(user);
            return { token, user };
        }
    }
};