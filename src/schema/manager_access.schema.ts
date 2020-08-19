import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const ManagerAccessSchema = new mongoose.Schema({

    access_id: {
        type: String
    },
    manager: {
        type: String
    }
})