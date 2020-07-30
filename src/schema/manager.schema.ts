import * as mongoose from 'mongoose';
//运维人员
export const ManagerSchema = new mongoose.Schema({
    managerName:String,
    password:String,
});