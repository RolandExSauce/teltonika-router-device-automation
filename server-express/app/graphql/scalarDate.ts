// import { GraphQLScalarType, Kind } from 'graphql';

// export const dateScalar = new GraphQLScalarType({
//   name: 'Date',
//   description: 'Date custom scalar type',
//   //when sent to client
//   serialize(value) {
//     if (value instanceof Date) {
//       const day = String(value.getDate()).padStart(2, '0'); // Get day with leading zero
//       //getMonth() method of the Date object returns the month as a zero-based value, e.g january 0, there
//       const month = String(value.getMonth() + 1).padStart(2, '0'); // Get month with leading zero
//       const year = value.getFullYear(); // Get full year
//       return `${day}-${month}-${year}`; // Format date as "DD-MM-YYYY"
//     }
//     throw new Error('GraphQL Date Scalar serializer expected a `Date` object');
//   },

//   //when client provides data
//   parseValue(value) {
//     if (typeof value === 'number') {
//       return new Date(value); // Convert incoming integer to Date
//     } else if (typeof value === 'string') {
//       return new Date(value); // Convert incoming string to Date
//     }
//     throw new Error('GraphQL Date Scalar parser expected a `number` or `string`');
//   },

//   parseLiteral(ast) {
//     if (ast.kind === Kind.INT) {
//       // Convert hard-coded AST string to integer and then to Date
//       return new Date(parseInt(ast.value, 10));
//     } else if (ast.kind === Kind.STRING) {
//       // Convert hard-coded AST string directly to Date
//       return new Date(ast.value);
//     }
//     // Invalid hard-coded value (not an integer or string)
//     return null;
//   },
// });
