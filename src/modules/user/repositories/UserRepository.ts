import type { RegisterUserDto } from "../dtos/RegisterUserDto.js";
import { User } from "../models/User.js";

export class UserRepository {

    async createUser(user: RegisterUserDto): Promise<User | null> {
        try {
            const created = await User.create({
                email: user.email,
                password: user.password,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role,
                membershipStatus: user.membershipStatus,
                membershipExpiryDate: user.membershipExpiryDate,
                maxBooksAllowed: user.maxBooksAllowed,
                currentBooksCount: user.currentBooksCount,
            });
            return created;
        } catch (error) {
            console.error('Error creating user:', error);
            return null;
        }
    }

    async findByEmail(email: string): Promise<User | null> {
        try {
            const user = await User.findOne({ where: { email } });
            return user;
        } catch (error) {
            console.error('Error searching user by email:', error);
            return null;
        }
    }

    async findById(id: string): Promise<User | null> {
        try {
            const user: User | null = await User.findByPk(id);
            return user;
        } catch (error) {
            console.error('Error searching user by ID:', error);
            return null;
        }
    }

    async updateUser(user: User): Promise<void> {
        try {
            await User.update({
                email: user.email,
                password: user.password,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role,
                membershipStatus: user.membershipStatus,
                membershipExpiryDate: user.membershipExpiryDate,
                maxBooksAllowed: user.maxBooksAllowed,
                currentBooksCount: user.currentBooksCount,
            }, { where: { id: user.id } });
        } catch (error) {
            console.error('Error updating user:', error);
        }
    }

    async suspendUser(id: string): Promise<void> {
        try {
            await User.update({
                membershipStatus: 'suspended'
            }, { where: { id } });
        } catch (error) {
        console.error('Error suspending user:', error);
    }
    }


}