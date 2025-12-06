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
            throw new Error('Failed to create user'+ error);
        }
    }
}