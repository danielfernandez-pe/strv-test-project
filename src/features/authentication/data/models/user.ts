import mongoose, { Document, Schema, Model } from 'mongoose';

export interface UserType extends Document {
    _id: string;
    email: string;
    password: string;
}

const UserSchema: Schema<UserType> = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

export const User: Model<UserType> = mongoose.model<UserType>('User', UserSchema);