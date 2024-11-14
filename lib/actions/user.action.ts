import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../../lib/prisma"; 

if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in the environment variables");
}

export const signIn = async (req: NextApiRequest, res: NextApiResponse) => {
    const { email, password }: LoginUser = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Please provide both email and password" });
    }
    try {
        const user = await prisma.user.findUnique({
            where: { email },
            select:{
                id:true,
                email:true,
                password:true,
                role:true,
                name:true,
            }
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" });
        }
        const token = jwt.sign({ userId: user.id,email:user.email,role:user.role}, process.env.JWT_SECRET as string, { expiresIn: "24h" });
        const {password:_,...userWithoutPassword} = user;
        return res.status(200).json({ message: "Login successful", user:userWithoutPassword,token });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};
export const signUp = async (req: NextApiRequest, res: NextApiResponse) => {
    const { firstName, lastName, email, password, role, address, number }: SignUpParams = req.body;
    if (!firstName || !lastName || !email || !password || !role || !address || !number) {
        return res.status(400).json({ message: "Please fill out all fields" });
    }
    try {
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                name: `${firstName} ${lastName}`,
                email,
                password: hashedPassword,
                role,
                address,
                number,
            },
            select:{
                id:true,
                email:true,
                role:true,
                name:true,
                address:true,
                number:true
            }
        });

        // You could generate a JWT or session here if needed  const token = jwt.sign(
         const token  = jwt.sign({ 
                userId: user.id,
                email:user.email,
                role: user.role 
            },
            process.env.JWT_SECRET as string ,
            { expiresIn: '24h' }
        );



        return res.status(201).json({ message: "User created successfully", user,token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
