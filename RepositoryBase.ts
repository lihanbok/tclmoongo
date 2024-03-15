import mongoose = require("mongoose");
import { IRead } from "./IRead";
import { IWrite } from "./IWrite";
import { DocumentQuery } from "mongoose";

export class RepositoryBase<T extends mongoose.Document> implements IRead<T>, IWrite<T> {
    private _model: mongoose.Model<mongoose.Document>;
    constructor(schemaModel: mongoose.Model<mongoose.Document>) {
        this._model = schemaModel;
    }
    create(item: T, callback: (error: any, result: T) => void) {
        this._model.create(item, callback);
    }
    retrieve(callback: (error: any, result: T) => void) {
        this._model.find({}, callback);
    }
    update(_id: mongoose.Types.ObjectId, item: T, callback: (error: any, result: any) => void) {
        this._model.update({ _id: _id }, item, callback);
    }
    delete(_id: string, callback: (error: any, result: any) => void) {
        this._model.remove({ _id: this.toObjectId(_id) }, (err: any) => callback(err, null));
    }
    findById(_id: string, callback: (error: any, result: T) => void): void {
        this._model.findById(_id, callback);
    }
    findOne(conditions: Object, callback: (err: any, res: T) => void): void {
        this._model.findOne(conditions, callback);
    }
    find(cond: Object, fields?: Object, options?: Object, callback?: (err: any, res: T[]) => void): void {
        this._model.find(cond, options, callback);
    }
    private toObjectId(_id: string): mongoose.Types.ObjectId {
        return mongoose.Types.ObjectId.createFromHexString(_id);
    }
}