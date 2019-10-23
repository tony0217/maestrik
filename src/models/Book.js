

import { Schema,model} from 'mongoose';


// schema de  Book
const bookSchema = new Schema({
    
    title: {
        type:String,
        required:true
    },
    ISBN: Number,
    synopsis: String,
    genres: String ,
    publicationYear: Number,
    publisher: [{}],
    author : [{}]

});
// exportar el schema
export default model('Book',bookSchema);