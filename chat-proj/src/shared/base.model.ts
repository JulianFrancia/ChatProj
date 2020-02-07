import { ApiPropertyOptional } from '@nestjs/swagger';
import { prop, pre, modelOptions } from '@typegoose/typegoose';

@modelOptions({
    schemaOptions: {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        toObject: {
            virtuals: true,
            getters: true,
        },
    },
})
// @pre('findOneAndUpdate', function (this: mongoose.Query<BaseModel<any>>,next) {
//     this.update.updatedAt = new Date(Date.now());
//     next();
// })
/* https://github.com/szokodiakos/typegoose/issues/315 */
// @pre<BaseModel<any>>('findOneAndUpdate', function (this: mongoose.Query<any>) {
//     // @ts-ignore
//     this._update.updatedAt = new Date(Date.now());
//     return;
// })
// @pre('findOneAndUpdate', function (next) {
//     this.update.updatedAt = new Date(Date.now());
//     next();
// })
export class BaseModel<T> {
    @prop({ default: Date.now() })
    createdAt?: Date;

    @prop({ default: Date.now() })
    updatedAt?: Date;

    id?: string;
}

// tslint:disable-next-line: max-classes-per-file
export class BaseModelVM {

    @ApiPropertyOptional({ type: String, format: 'date-time' })
    createdAt?: Date;

    @ApiPropertyOptional({ type: String, format: 'date-time' })
    updatedAt?: Date;

    @ApiPropertyOptional()
    id?: string;
}
