import * as mongoose from 'mongoose';

export const ManagerSchema = new mongoose.Schema({
    managerName:String,
    password:String,
});