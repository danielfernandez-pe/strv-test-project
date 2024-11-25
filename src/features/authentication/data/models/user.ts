import mongoose, { Document, Schema, Model } from 'mongoose';
import { UserDOM } from '../../domain/models/userDOM';

const UserSchema: Schema<UserDOM> = new mongoose.Schema({
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

export const User: Model<UserDOM> = mongoose.model<UserDOM>('User', UserSchema);