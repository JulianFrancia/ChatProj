import { BaseModel } from '../../shared/base.model';
import { UserRole } from './user-role.enum';
import { prop, ReturnModelType, getModelForClass } from '@typegoose/typegoose';

export class User extends BaseModel<User> {
    @prop({ required: [true, 'username is required'], minlength: [6, 'Must be at least 6 characters'], unique: true })
    username: string;

    @prop({ required: [true, 'password is required'], minlength: [6, 'Must be at least 6 characters'] })
    password: string;

    @prop({ required: [true, 'email is required'], unique: true })
    email: string;

    @prop({ required: [true, 'nick is required'], minlength: [4, 'Must be at least 4 characters'], unique: true })
    nick: string;

    @prop({ enum: UserRole, default: UserRole.User })
    roles?: UserRole[];

    @prop()
    firstName?: string;

    @prop()
    lastName?: string;

    @prop()
    avatarUrl?: string;

    /* @prop cannot be applied to get & set (virtuals),
        because virtuals do not accept options & schema.loadClass wouldnt load these
     https://typegoose.github.io/typegoose/guides/known-issues/
     */
    // @prop()
    get fullName(): string {
        return `${this.firstName} ${this.lastName}`;
    }

    static get model(): ReturnModelType<typeof User> {
        // return new User().getModelForClass(User, { schemaOptions });
        return getModelForClass(User);
    }

    static get modelName(): string {
        /* BUG: https://github.com/typegoose/typegoose/issues/184 */
        // return this.model.modelName;
        return 'User';
    }
}
