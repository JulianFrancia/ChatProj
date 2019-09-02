import { SchemaOptions } from 'mongoose';
import { ApiModelPropertyOptional } from '@nestjs/swagger';
import { Typegoose, prop, pre } from 'typegoose';

@pre('findOneAndUpdate', (next) => {
    this.update.updatedAt = new Date(Date.now());
    next();
})
export class BaseModel<T> extends Typegoose {
    @prop({ default: Date.now() })
    createdAt?: Date;

    @prop({ default: Date.now() })
    updatedAt?: Date;

    id?: string;
}

// tslint:disable-next-line: max-classes-per-file
export class BaseModelVM {

    @ApiModelPropertyOptional({ type: String, format: 'date-time' })
    createdAt?: Date;

    @ApiModelPropertyOptional({ type: String, format: 'date-time' })
    updatedAt?: Date;

    @ApiModelPropertyOptional()
    id?: string;
}

export const schemaOptions: SchemaOptions = {
    toJSON: {
        virtuals: true,
        getters: true,
    },
};
