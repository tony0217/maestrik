
import Book from './../models/Book';
import Publisher from './../models/Publisher';
import Author from './../models/Author';




export const resolvers = {

    // querys
    Query: {

        // traer  todos los books

        books: async () => {
            return await Book.find().sort({
                title: "DESC" // ordenados ASC o DESC
            });
        },

     
        // traer book con parametros title

        bookTitle: async (_, args) => {

            const {title} = args
           // console.log('title:', title);
            let book;
            return book = await Book.find(
                {
                    title: title
                },
                "title ISBN synopsis genres publicationYear publisher author",
                function (err, docs) {
                    console.log('docs', docs);
                    return docs
                })

        },

        // traer book con parametros author

        bookAuthor: async (_, args) => {

            const {author}= args;
            const {order} = args;
            // console.log('author:', author.firstName);
            // console.log('order:', order);

            let book;
            return book = await Book.findOne(
                {author: author.firstName},
                "title ISBN synopsis genres publicationYear publisher author",
                function (err, docs) {
                    console.log('docs', docs);
                    return docs
                }).sort({
                    title: order //ordenados ASC o DESC
                });


        },

        // traer book con parametro publisher

        bookPublisher: async (_, args) => {

            const {publisher} = args
            const {order} = args;

            // console.log('order:', order);
            // console.log('Publisher:', publisher);


            let book;
            return book = await Book.find(
                {publisher: publisher},
                "title ISBN synopsis genres publicationYear publisher author",
                function (err, docs) {
                    console.log('docs', docs);
                    return docs
                }).sort({
                    publicationYear: order //ordenados ASC o DESC
                });


        },

        // traer book con parametro publicationYear
        bookPublicationYear: async (_, args) => {
            const {order} = args
            const {publicationYear} = args
            console.log('order:', order);
            console.log('publicationYear:', publicationYear);

            let book;
            return book = await Book.find(
                {publicationYear: publicationYear},
                "title ISBN synopsis genres publicationYear publisher author",
                function (err, docs) {
                    console.log('docs', docs);
                    return docs
                }).sort({
                    title: order //ordenados ASC o DESC
                });


        },

        // traer todos authors
        authors: async (_, args) => {
            const {_auth} = args
            if (_auth == 'maestrik') {
                return await Author.find().sort({
                    title: 1
                });
            } else {
                console.log('No tiene permiso');
            }
        },

        // traer author con ID
        author: async (_, args) => {

            const {_id} = args
            const {_auth} = args
            // console.log('id:', _id);
            // console.log('aut:', _auth);

            if (_auth == 'maestrik') {
                let author;
                return author = await Author.findById(_id);
            } else {
                console.log('No tiene permiso');
            }
        },

        // traer todos publishers

        publishers: async () => {

            return await Publisher.find().sort({
                title: 1
            });

        },
          // traer publisher por ID 
        publisher: async (_, args) => {
            const {_id} = args
           // console.log('id:', _id);
             let publisher;
            return publisher = await Publisher.findById(_id);
        },





    },

    //Mutaciones

    Mutation: {

        // creacion de book

        createBook: async (_, {
            title,
            ISBN,
            synopsis,
            genres,
            publicationYear,
            publisher,
            author
        }) => {
            const book = new Book({
                title,
                ISBN,
                synopsis,
                genres,
                publicationYear,
                publisher,
                author
            })
            await book.save();
            console.log(book);
            return book
        },

        // creacion de publisher
        createPublisher: async (_, {
            name,
            foundationYear
        }) => {
              const publisher = new Publisher({
                name,
                foundationYear
            })
            await publisher.save();
            console.log(publisher);
            return publisher
        },
        // creacion de author
        createAuthor: async (_, {
            firstName,
            lastName,
            books
        }) => {

            console.log('insert', {
                books
            });

            const author = new Author({
                firstName,
                lastName,
                books
            })
            await author.save();
            console.log(author);
            return author
        },
        // actualizar libro
        updateBook: async (_, { _id, book }) => {
             console.log({ book });
            return await Book.findByIdAndUpdate(_id, book, { new: true })
        }
    }


};