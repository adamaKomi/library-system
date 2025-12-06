import { DataTypes, Model, UUID } from "sequelize";
import sequelize from "../../../shared/database/connection.js";

export class User extends Model{

    id!: string;
    email!: string;
    password!: string;
    firstName!: string;
    lastName!: string;
    role!: 'member' | 'librarian';
    membershipStatus!: 'active' | 'suspended' | 'expired';
    membershipExpiryDate!: Date;
    maxBooksAllowed!: number; 
    currentBooksCount!: number;
    createdAt!: Date;
    updatedAt!: Date;

    comparePassword(password: string): boolean{
        return this.password === password;
    }

    
}

User.init(
    {
        id:{
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        email:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        firstName:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        role:{
            type: DataTypes.ENUM('member', 'librarian'),
            allowNull: false,
            defaultValue: 'member',
        },
        membershipStatus:{
            type: DataTypes.ENUM('active', 'suspended', 'expired'),
            allowNull: false,
            defaultValue: 'active',
        },
        membershipExpiryDate:{
            type: DataTypes.DATE,
            allowNull: false,
        },
        maxBooksAllowed:{
            type: DataTypes.INTEGER,
            defaultValue: 3,
            allowNull: false,
        },
        currentBooksCount:{
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false,
        }
    },
    {
        sequelize,
        tableName: 'users',
        timestamps: true,
    }
)