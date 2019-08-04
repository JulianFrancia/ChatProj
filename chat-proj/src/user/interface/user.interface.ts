import { Document } from 'mongoose';

export interface User extends Document {
    readonly name: string;
    readonly password: string;
    readonly nick: string;
    readonly imageURL: string;
    readonly creationDate: Date;
}
