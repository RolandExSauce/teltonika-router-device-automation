import type { CodegenConfig } from '@graphql-codegen/cli'

//codegen to generate typescript
const config: CodegenConfig = {
    overwrite: true,
    schema: './app/graphql/*.graphql',
    generates: {
        './app/graphql/generated/generated__types.ts': {
            plugins: [
                'typescript',
                'typescript-resolvers',
                'typescript-mongodb',
                'typescript-document-nodes',
            ],
        },
        './graphql.schema.json': {
            plugins: ['introspection'],
        },
    },
}
export default config
