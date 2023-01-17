import { GraphQLClient } from "graphql-request";

export const graphlQLClient = new GraphQLClient("https://api.zora.co/graphql", {
  method: "POST",
  headers: new Headers({
    "Content-Type": "application/json",
  }),
});
