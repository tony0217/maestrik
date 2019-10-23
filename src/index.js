
import  fetch  from 'node-fetch';
import {ApolloServer}  from 'apollo-server-express';
import {typeDefs}  from './schema/typeDefs';
import {resolvers} from './resolvers/resolvers';
import {connect} from './db/connection';
import express  from 'express';
import cookieParser  from 'cookie-parser';
import session  from 'express-session';



// inicio del server

const startServer = async () =>{
const server = new ApolloServer({typeDefs,resolvers});

const app = express();

//path principal

const path = '/maestrik';

// generar cookie

app.use(cookieParser());
app.use(session({secret: 'maestrik',
				 saveUninitialized: true,
				 resave: true}));


//generar cookie

app.get('/cookie', function(req, res){

	console.log(req.cookies);
	console.log('get================');
	console.log(req.session);
});

// recuperar cookie

function fetchCookie() {
  
  return fetch("http://localhost:4000/cookie")
    .then(req => req.cookies);
}

//fetchCookie(); --> llamar cookie



// injectando express en apollo

server.applyMiddleware({ app ,path });

// escuchando por el puerto 4000

app.listen({ port: 4000 }, () =>
  
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
); 

// conexion con mongoDB

await connect();
}


startServer();

