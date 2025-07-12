const zod=require("zod");

const signupBody=zod.object({
    fname:zod.string(),
    lname:zod.string(),
    username:zod.string(),
    password:zod.string()
});

const loginBody=zod.object({
    username:zod.string(),
    password:zod.string()
});

const updateBody=zod.object({
    fname:zod.string().optional(),
    lname:zod.string().optional(),
    username:zod.string().optional(),
    password:zod.string().optional()
});

module.exports={
    signupBody,
    loginBody,
    updateBody
}
