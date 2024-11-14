import { NextApiRequest, NextApiResponse } from 'next';
import { AuthenticatedRequest, authMiddleware } from '../middleware/auth.middleware';
import prisma from '../prisma';
import bcrypt from 'bcryptjs';

// Get user profile
export const getUserProfile = async (req: AuthenticatedRequest, res: NextApiResponse) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.user.userId },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                address: true,
                number: true,
               
            }
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({ user });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// Update user profile
export const updateUserProfile = async (req: AuthenticatedRequest, res: NextApiResponse) => {
    const { name, address, number } = req.body;

    try {
        const updatedUser = await prisma.user.update({
            where: { id: req.user.userId },
            data: {
                name: name,
                address: address,
                number: number,
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                address: true,
                number: true,
                
            }
        });

        return res.status(200).json({ 
            message: "Profile updated successfully", 
            user: updatedUser 
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// Change password
export const changePassword = async (req: AuthenticatedRequest, res: NextApiResponse) => {
    const { currentPassword, newPassword } = req.body;

    try {
        const user = await prisma.user.findUnique({
            where: { id: req.user.userId },
            select: { password: true }
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Current password is incorrect" });
        }

        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        await prisma.user.update({
            where: { id: req.user.userId },
            data: { password: hashedNewPassword }
        });

        return res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// Delete account
export const deleteAccount = async (req: AuthenticatedRequest, res: NextApiResponse) => {
    try {
        await prisma.user.delete({
            where: { id: req.user.userId }
        });

        return res.status(200).json({ message: "Account deleted successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// Admin only: Get all users
export const getAllUsers = async (req: AuthenticatedRequest, res: NextApiResponse) => {
    if (req.user.role !== 'ADMIN') {
        return res.status(403).json({ message: "Access denied" });
    }

    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                address: true,
                number: true,
                // createdAt: true,
            }
        });

        return res.status(200).json({ users });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// Example of using the middleware
export const protectedRouteHandler = authMiddleware(async (req: AuthenticatedRequest, res: NextApiResponse) => {
    switch (req.method) {
        case 'GET':
            return getUserProfile(req, res);
        case 'PUT':
            return updateUserProfile(req, res);
        case 'DELETE':
            return deleteAccount(req, res);
        default:
            return res.status(405).json({ message: "Method not allowed" });
    }
});

// Admin route handler
export const adminRouteHandler = authMiddleware(async (req: AuthenticatedRequest, res: NextApiResponse) => {
    if (req.user.role !== 'ADMIN') {
        return res.status(403).json({ message: "Access denied" });
    }

    switch (req.method) {
        case 'GET':
            return getAllUsers(req, res);
        default:
            return res.status(405).json({ message: "Method not allowed" });
    }
});