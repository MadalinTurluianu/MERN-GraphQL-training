import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
} from "graphql";
import { ClientModel, ProjectModel } from "../models/index.js";

const ClientType = new GraphQLObjectType({
  name: "Client",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  }),
});

const ProjectType = new GraphQLObjectType({
  name: "Project",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    client: {
      type: ClientType,
      resolve(parent, args) {
        return ClientModel.findById(parent.clientId);
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    client: {
      type: ClientType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return ClientModel.findById(args.id);
      },
    },

    clients: {
      type: new GraphQLList(ClientType),
      resolve(parent, args) {
        return ClientModel.find();
      },
    },

    project: {
      type: ProjectType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return ProjectModel.findById(args.id);
      },
    },

    projects: {
      type: new GraphQLList(ProjectType),
      resolve(parent, args) {
        return ProjectModel.find();
      },
    },
  },
});

export const schema = new GraphQLSchema({
  query: RootQuery,
});
