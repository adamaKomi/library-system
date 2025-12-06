export interface RegisterUserDto {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: string;
    membershipStatus: string;
    membershipExpiryDate: Date;
    maxBooksAllowed: number;
    currentBooksCount: number;
}