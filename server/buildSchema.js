import fs from 'fs-extra';
import path from 'path';
import { graphql } from 'graphql';
import { printSchema } from 'graphql-compose';
import introspectionQuery from 'graphql/utilities/index.js'
import Schema from './schema/index.js';
const __dirname = path.resolve()

async function buildSchema() {
    await fs.ensureFile('./data/schema.graphql.json');
    await fs.ensureFile('./data/schema.graphql');

    fs.writeFileSync(
        path.join(__dirname, './data/schema.graphql.json'),
        JSON.stringify(await graphql(Schema, introspectionQuery.introspectionQuery), null, 2)
    );

    fs.writeFileSync(
        path.join(__dirname, './data/schema.graphql.txt'),
        printSchema(Schema)
    );
}

async function run() {
    await buildSchema();
    console.log('Schema build complete!');
}

run().catch(e => {
    console.log(e);
    process.exit(0);
});