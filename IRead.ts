import mongoose = require("mongoose");
export interface IRead<T> {
    retrieve: (callback: (error: any, result: any) => void) => void;
    findById: (id: string, callback: (error: any, result: T) => void) => void;
    findOne(cond?: Object, callback?: (err: any, res: T) => void): void;
    find(cond: Object, fields: Object, options: Object, callback?: (err: any, res: T[]) => void): void;
}