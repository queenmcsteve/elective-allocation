const express = require("express");
const mongoose = require("mongoose");
const { ApolloServer, gql } = require("apollo-server-express");
const { typeDefs, resolvers } = require("./src/schema/");
const db = require("./src/config/connection.js");
const auth = require("./src/utils/auth");
const { authMiddleware } = require("./src/utils/auth");

const PORT = process.env.PORT || 4000;

const app = express();
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

const serverStart = async () => {
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });
  return app;
};
serverStart();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

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
