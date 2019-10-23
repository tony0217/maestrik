import mongoose from 'mongoose';

export async function connect() {

  try {

    await mongoose.connect('mongodb://localhost/maestrik', {

        useNewUrlParser: true,
        useUnifiedTopology: true 
    })

    console.log('>>>> DB is connected');
      
  } catch(e) {
      console.log('something goes wrong!');
      console.log(e);
      
      
  }

}

