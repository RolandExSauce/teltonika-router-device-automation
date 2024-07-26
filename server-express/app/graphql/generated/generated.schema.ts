import path from 'path'
import { loadFilesSync } from '@graphql-tools/load-files'
import { mergeTypeDefs } from '@graphql-tools/merge'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { GraphQLSchema } from 'graphql'
import { resolvers } from '../resolvers/resolver'

//look for graphql schema folders, then inside look for .graphql files and merge them
const typesArray = loadFilesSync(path.join(__dirname, '../*.graphql'), {
    extensions: ['graphql'],
    recursive: true,
})

export const typeDefs = mergeTypeDefs(typesArray)
export const schema: GraphQLSchema = makeExecutableSchema({
    typeDefs,
    resolvers,
})
