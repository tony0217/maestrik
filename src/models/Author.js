

import { Schema,model} from 'mongoose';


// schema de Author
const  authorSchema = new Schema({
    
    firstName: {
        type:String,
        required:true
    },
    lastName: {
        type:String,
        required:true
    },

    country: String,
    books: [{}] 


});

// exportar el schema
export default model('Author',authorSchema);