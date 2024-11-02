import { model, Schema } from 'mongoose';
import { User } from './user.type';

const userEschema = new Schema<User>({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, {
    timestamps: true
});

const userModel = model('User', userEschema);
userModel.syncIndexes();

export const UserModel = userModel;