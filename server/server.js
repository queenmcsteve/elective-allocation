const express = require("express");
const path = require("path");
const { ApolloServer, gql } = require("apollo-server-express");
const { typeDefs, resolvers } = require("./src/schema/");
const db = require("./src/config/connection.js");
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

//DISABLE lines 28-35 FOR LOCAL HOSTING
// // if we're in production, serve client/build as static assets
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "../client/build")));
// }

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../client/build/index.html"));
// });

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
