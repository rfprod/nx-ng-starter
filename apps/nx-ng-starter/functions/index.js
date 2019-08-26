const functions = require('firebase-functions');
const admin = require('firebase-admin');

const handlers = require('./handlers/index');

/*
*	Create and Deploy Cloud Functions
*	https://firebase.google.com/docs/functions/write-firebase-functions
*
*	basic usage example
*
* exports.helloWorld = functions.https.onRequest((request, response) => {
*		response.send('Hello from Firebase!');
*	});
*/

/**
 * Initialize admin SDK to access Firebase Realtime Database.
 */
admin.initializeApp(functions.config().firebase);

/**
 * Login endpoint mock.
 */
exports.login = functions.https.onRequest((req, res) => {
  if (req.method !== 'POST') {
    res.status(403).json({error: 'Forbidden method'});
  }
  handlers.login(req, res);
});

/**
 * Logout endpoint mock.
 */
exports.logout = functions.https.onRequest((req, res) => {
  if (req.method !== 'POST') {
    res.status(403).json({error: 'Forbidden method'});
  }
  handlers.logout(req, res);
});

/**
 * Signup endpoint mock.
 */
exports.register = functions.https.onRequest((req, res) => {
  if (req.method !== 'POST') {
    res.status(403).json({error: 'Forbidden method'});
  }
  handlers.signup(req, res);
});

/**
 * GraphQL.
 */

const { buildSchema } = require('graphql');
const bodyParser = require("body-parser");
const express = require("express");
const expressGraphQL = require('express-graphql');

/**
 * GraphQL schemas.
 */
const gqlSchemas = require('./graphql/schemas');

/**
 * GraphQL resolvers.
 */
const gqlResolvers = require('./graphql/resolvers').express;

/**
 * GraphQL owner server.
 */
const graphQLServerOwner = express();

/**
 * Built GraphQL schema, get resolvers.
 */
const gqlSchemaOwner = buildSchema(gqlSchemas.owner);
const gqlResolversOwner = gqlResolvers.owner;

/**
 * GraphQL server mock for owner.
 */
graphQLServerOwner.use('*', bodyParser.json(), expressGraphQL({
  schema: gqlSchemaOwner,
  rootValue: gqlResolversOwner,
  graphiql: true
}));

exports.ownerGraphql = functions.https.onRequest(graphQLServerOwner);

/**
 * GraphQL carrier server.
 */
const graphQLServerCarrier = express();

/**
 * Built GraphQL schema, get resolvers.
 */
const gqlSchemaCarrier = buildSchema(gqlSchemas.carrier);
const gqlResolversCarrier = gqlResolvers.carrier;

/**
 * GraphQL server mock for carrier.
 */
graphQLServerCarrier.use('*', bodyParser.json(), expressGraphQL({
  schema: gqlSchemaCarrier,
  rootValue: gqlResolversCarrier,
  graphiql: true
}));

exports.carrierGraphql = functions.https.onRequest(graphQLServerCarrier);
