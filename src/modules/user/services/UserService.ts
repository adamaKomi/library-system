import type { RegisterUserDto } from "../dtos/RegisterUserDto.js";
import type { User } from "../models/User.js";
import type { UserRepository } from "../repositories/UserRepository.js";

export class UserService{
    constructor(private userRepository: UserRepository){}

    async registerUser(data: RegisterUserDto): Promise<User | null>{
        try {
            const newUser = await this.userRepository.createUser(data);
            return newUser;
        } catch (error) {
            throw new Error('Failed to create user'+ (error instanceof Error? error.message : String(error)));
        }
    }

    async login(email: string, password: string): Promise<User | null>{
        try {
            const user = await this.userRepository.findByEmail(email);

            if(!user){
                return null;
            }

            if(!user.comparePassword(password)){
                return null;
            }

            return user;
        } catch (error) {
            throw new Error('Failed to login'+ (error instanceof Error? error.message : String(error)));
        }
    }

    async suspendUser(id: string): Promise<void>{
        try {
            const user = await this.userRepository.findById(id);
            if(!user){
                throw new Error('User not found');
            }
            await this.userRepository.suspendUser(id);
        } catch (error) {
            console.error('[UserServcie]-[suspendUser] user not found')
            throw error;
        }
    }

    async incrementBookCount(id: string): Promise<void>{
        try {
            const user = await this.userRepository.findById(id);
            if(!user) throw new Error('User not found')
            user.currentBooksCount +=1;
            await this.userRepository.updateUser(user);
        } catch (error) {
            console.error('[UserServcie]-[incrementBookCount] user not found')
            throw error;
        }
    }

    async decrementBookCount(id: string): Promise<void>{
        try {
            const user = await this.userRepository.findById(id);
            if(!user) throw new Error('User not found')
            user.currentBooksCount -=1;
            await this.userRepository.updateUser(user);
        } catch (error) {
            console.error('[UserServcie]-[decrementBookCount] user not found')
            throw error;
        }
    }

}