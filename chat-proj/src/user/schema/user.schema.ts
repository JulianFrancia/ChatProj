import { Schema } from 'mongoose';

export const UserSchema = new Schema ({
    name: { type: String, required: true},
    password: { type: String, required: true},
    nick: { type: String, required: true},
    imageURL: String,
    creationDate: {
        type: Date,
        default: Date.now,
    },
});
