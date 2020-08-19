import * as mongoose from 'mongoose';

export const TestSchema = new mongoose.Schema({

    testName: {
        type: String,
        default: ''
    },
    testSort: {
        type: Number,
        default: 0
    }
})