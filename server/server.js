const express = require("express");
const mongoose = require("mongoose");
const { ApolloServer, gql } = require("apollo-server-express");
const typeDefs = require("./src/schema/typeDefs");
const resolvers = require("./src/schema/resolvers");
// const { typeDefs, resolvers } = require('./src/schema/');
const db = require("./src/config/connection.js");

const PORT = process.env.PORT || 4000;

const app = express();
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

const serverStart = async () => {
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });
  return app;
};
serverStart();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

db.once("open", () => {
  try {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(
        `Use GraphQL at http://localhost:${PORT}${apolloServer.graphqlPath}`
      );
    });
  } catch (err) {
    console.error(err.message);
  }
});

// async function startServer() {

//     await apolloServer.start()

//     app.use((req, res) => {
//         res.send("hello from apollo server")
//     })

//     app.listen(PORT, () => console.log("server running on port: ", PORT))
// }
// startServer();
