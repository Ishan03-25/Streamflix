const z = require("zod");

const signupSchema = z.object({
    username: z.string(),
    email: z.string().email(),
    password: z.string(),
});

const signinSchema = z.object({
    email: z.string().email(),
    password: z.string(),
});

module.exports = { signupSchema, signinSchema };