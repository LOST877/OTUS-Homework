import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { Sequelize } from "sequelize-typescript";
import { DataType } from "sequelize-typescript";

const typeDefs = `#graphql

  # This "Book" type defines the queryable fields for every book in our data source.
  type Movie {
    id: Int!
    poster: String
    title: String!
    type: String
    year: String
    imdbid: String!
    rate: Int!
  }

  type Query {
    movies: [Movie]
  }

  input AddMovieInput {
    Poster: String
    Title: String!
    Type: String
    Year: String
    imdbID: String!
    rate: Int!
  }

  input UpdateMovieRateInput {
    rate: Int!
  }

  type Mutation {
    AddMovie(content: AddMovieInput!): Movie
    UpdateMovie(id: String!, content: UpdateMovieRateInput!): Movie
  }
`;
const resolvers = {
  Query: {
    movies: async () => {
      const dataSource = new MovieDataSource();
      await dataSource.initializeDBConnection();
      return await dataSource.getMovies();
    },
  },
  Mutation: {
    UpdateMovie: async (parent, { content }, contextValue, info) => {
      const dataSource = new MovieDataSource();
      await dataSource.initializeDBConnection();
      return await dataSource.updateMovie(content);
    },
    AddMovie: async(parent, { content }, contextValue, info) => {
      const dataSource = new MovieDataSource();
      await dataSource.initializeDBConnection();
      return await dataSource.createMovie(content);
    }
  },
};
const server = new ApolloServer({
  typeDefs,
  resolvers,
});
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});
console.log(`🚀  Server ready at: ${url}`);

class MovieDataSource {
  private dbConnection;

  constructor() {
  }

  async initializeDBConnection() {
    const sequelize = new Sequelize(
      `postgres://postgres:admin@localhost:5432/top_movies`,
    );

    const movies = sequelize.define("movies", {
      id: {
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      imdbid: {
        type: DataType.STRING,
        allowNull: false,
      },
      year: {
        type: DataType.STRING,
        allowNull: true,
      },
      type: {
        type: DataType.STRING,
        allowNull: true,
      },
      title: {
        type: DataType.STRING,
        allowNull: false,
      },
      poster: {
        type: DataType.STRING,
        allowNull: true,
      },
      rate: {
        type: DataType.INTEGER,
        allowNull: false,
      },
    });

    this.dbConnection = { movies };
  }

  async createMovie(params) {
    const movie = await this.dbConnection.movies.create({
      imdbid: params.imdbID,
      year: params.Year,
      type: params.Type,
      title: params.Title,
      poster: params.Poster,
      rate: params.rate,
    });
    return movie ? movie : null;
  }

  async getMovies() {
    return await this.dbConnection.movies.findAll();
  }

  async updateMovie(params) {
    await this.dbConnection.movies.update(
      {
        rate: params.rate,
      },
      {
        where: {
          id: params.id,
        },
      }
    );
  }
}
