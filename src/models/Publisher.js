

import { Schema, model } from 'mongoose';

// schema de  Publisher
const publisherSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    foundationYear: {
        type: Number,
        required: true
    },
});
// exportar el schema
export default model('Publisher', publisherSchema);