'use strict';

/**
 * Server Routes module
 * @module server/routes/index
 * @param {string} cwd Current working directory
 * @param {object} app Express application
 * @param {object} expressGraphQL Express GraphQL middleware
 * @param {object} buildSchema GraphQL schema builder
 */
module.exports = (cwd, app, expressGraphQL, buildSchema) => {

  /**
   * Server http handlers module.
   * For usage in express server and in cloud functions.
   */
  const handlers = require(`${cwd}/functions/handlers/index`);

  /**
   * Login endpoint mock.
   */
  app.post('/auth/login', handlers.login);

  /**
   * Logout endpoint mock.
   */
  app.post('/auth/logout', handlers.logout);

  /**
   * Signup endpoint mock.
   */
  app.post('/auth/register', handlers.signup);

  /**
   * Schema examples: https://codeburst.io/graphql-server-on-cloud-functions-for-firebase-ae97441399c0
   */

  /**
   * GraphQL schemas as a strings.
   */
  const schemas = require(`${cwd}/functions/graphql/schemas`);

  /**
   * Built GraphQL schemas.
   */
  const gqlSchemaOwner = buildSchema(schemas.owner);
  const gqlSchemaCarrier = buildSchema(schemas.carrier);

  /**
   * GraphQL resolvers.
   */
  const gqlResolversOwner = require(`${cwd}/functions/graphql/resolvers`).express.owner;
  const gqlResolversCarrier = require(`${cwd}/functions/graphql/resolvers`).express.carrier;

  /**
   * GraphQL endpoint mock for owner.
   */
  app.use('/owner/graphql', expressGraphQL({
    schema: gqlSchemaOwner,
    rootValue: gqlResolversOwner,
    graphiql: true
  }));

  /**
   * GraphQL endpoint mock for carrier.
   */
  app.use('/carrier/graphql', expressGraphQL({
    schema: gqlSchemaCarrier,
    rootValue: gqlResolversCarrier,
    graphiql: true
  }));

};
