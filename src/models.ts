// // models.js
// import {fk, many, attr, Model} from 'redux-orm';

// class Book extends Model {
//     toString() {
//         return `Book: ${this.name}`;
//     }
//     // Declare any static or instance methods you need.
// }
// Book.modelName = 'Book';

// // Declare your related fields.
// Book.fields = {
//     id: attr(), // non-relational field for any value; optional but highly recommended
//     name: attr(),
//     authors: many('Author', 'books'),
//     publisher: fk('Publisher', 'books'),
// };

// export default Book;