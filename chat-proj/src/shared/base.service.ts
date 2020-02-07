import 'automapper-ts/dist/automapper';
import { Types, ClientSession } from 'mongoose';
import { ReturnModelType, DocumentType } from '@typegoose/typegoose';

export abstract class BaseService<T> {
    protected model: ReturnModelType<any>; // <typeof T>;
    protected mapper: AutoMapperJs.AutoMapper;

    private get modelName(): string {
        return this.model.modelName;
    }

    private get viewModelName(): string {
        return `${this.model.modelName}Vm`;
    }

    async map<K>(
        object: Partial<DocumentType<T>> | Array<Partial<DocumentType<T>>>,
        isArray: boolean = false, sourceKey?: string, destinationKey?: string): Promise<K> {

        const srcKey = isArray ? `${sourceKey || this.modelName}[]` : sourceKey || this.modelName;
        const destKey = isArray ? `${destinationKey || this.viewModelName}[]` : destinationKey || this.viewModelName;
        return this.mapper.map(srcKey, destKey, object);
    }

    async findAll(filter = {}): Promise<DocumentType<T>[]> {
        return this.model.find(filter).exec();
    }

    async findOne(filter = {}): Promise<DocumentType<T>> {
        return this.model.findOne(filter).exec();
    }

    async findById(id: string): Promise<DocumentType<T>> {
        return this.model.findById(this.toObjectId(id)).exec();
    }

    async create(item: T, options?: object): Promise<DocumentType<T>> {
        return this.model.create([item], options);
    }

    async delete(id: string, options?: object): Promise<DocumentType<T>> {
        return this.model.findByIdAndDelete(this.toObjectId(id), options).exec();
    }

    async update(id: string, item: Partial<DocumentType<T>>, options?: object): Promise<DocumentType<T>> {
        // tslint:disable-next-line: no-unused-expression
        options ? Object.defineProperty(options, 'new', true) : null;
        return this.model.findByIdAndUpdate(this.toObjectId(id), item, options ? options : { new: true }).exec();
    }

    async clearCollection(filter = {}, options?: object): Promise<any> {
        return this.model.deleteMany(filter, options).exec();
    }

    public toObjectId(id: string): Types.ObjectId {
        return Types.ObjectId(id);
    }

    public async startSession(): Promise<ClientSession> {
        return await this.model.startSession();
    }
}
