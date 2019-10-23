
import { gql } from 'apollo-server';

export const typeDefs = gql`
 
  #enum   
  enum orderByInput {
    ASC
    DESC
  }
  
  enum typeFieldInput {
    title
    publicationYear
  }
  # Types

  type Info {
    count: Int
    pages: Int
    next: Int
    prev: Int
    }
 
  type Book {
    _id:ID
    title: String
    ISBN: Int
    synopsis: String
    genres: String 
    publicationYear:Int
    publisher: [Publisher]
    author:[Author] 
    info: Info
  }

  type Publisher {
    _id:ID
    name: String
    foundationYear: Int
    info: Info

  }

  type Author {
    _id:ID
    firstName: String
    lastName:String
    country:String
    books:[Book]
    info: Info

  }

  
  # Querys

  type Query {

    #Book
    bookTitle(title: String!): [Book]
    bookAuthor(author: AuthorInput!,typeField:typeFieldInput, order:orderByInput!): [Book]
    bookPublisher(publisher: [PublisherInput]!,typeField:typeFieldInput, order:orderByInput!): [Book]
    bookPublicationYear(publicationYear: Int!,typeField:typeFieldInput, order:orderByInput!): [Book]
    books: [Book]

    #Publisher
    publishers: [Publisher]
    publisher(_id:String!): Publisher
    
    #Author
    authors(_auth:String!): [Author]
    author(_id:ID!, _auth:String!): Author
    
  }

  #inputs
  input BookInput {
    _id:ID
    title: String!
    ISBN: Int!
    synopsis: String!
    genres: String !
    publicationYear:Int!
    publisher:[PublisherInput] ,
    author: [AuthorInput]

  }

  input PublisherInput {
    _id:ID
    name: String
    foundationYear: Int
  }

  input AuthorInput {
    _id:ID
    firstName:String
    lastName:String
    country:String
  }

  

  #Mutations

  type Mutation {
    createBook(title: String!,
               ISBN: Float,
               synopsis: String!,
               genres: String ,
               publicationYear: Int,
               publisher:PublisherInput ,
               author: AuthorInput ):Book!

    createPublisher(name: String!,
    foundationYear: Int):Publisher!

    createAuthor(firstName: String!,
                 lastName: String!,
                 books:[BookInput]):Author!

    updateBook(_id:ID!,book:BookInput! ):Book!

  }


  

`;
