import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { Sequelize } from "sequelize-typescript";
import { DataType } from "sequelize-typescript";

const typeDefs = `#graphql

  # This "Book" type defines the queryable fields for every book in our data source.
  type Movie {
    id: Int!
    Poster: String
    Title: String!
    Type: String
    Year: String
    imdbID: String!
    Rate: Int!
  }

  type Query {
    movies: [Movie]
    movieByImdbid(imdbID: String!): [Movie]
  }

  input AddMovieInput {
    Poster: String
    Title: String!
    Type: String
    Year: String
    imdbID: String!
    Rate: Int!
  }

  input UpdateMovieRateInput {
    rate: Int!
  }

  type Mutation {
    AddMovie(content: AddMovieInput!): Movie
    UpdateMovie(id: Int!, content: UpdateMovieRateInput!): Movie
    DeleteMovie(id: Int!): Movie
  }
`;
const resolvers = {
  Query: {
    movies: async () => {
      const dataSource = new MovieDataSource();
      await dataSource.initializeDBConnection();
      const result = await dataSource.getMovies();
      const movies = result.map((movie) => mapOutputMovie(movie));
      return movies;
    },
    movieByImdbid: async (parent, { imdbID }, contextValue, info) => {
      const dataSource = new MovieDataSource();
      await dataSource.initializeDBConnection();
      const result = await dataSource.getMovieByImdbid(imdbID);
      const movies = result.map((movie) => mapOutputMovie(movie));
      return movies;
    },
  },
  Mutation: {
    UpdateMovie: async (parent, { id, content }, contextValue, info) => {
      const dataSource = new MovieDataSource();
      await dataSource.initializeDBConnection();
      const result = await dataSource.updateMovie(id, content);
      return mapOutputMovie(result);
    },
    AddMovie: async (parent, { content }, contextValue, info) => {
      const dataSource = new MovieDataSource();
      await dataSource.initializeDBConnection();
      const result = await dataSource.createMovie(content);
      return mapOutputMovie(result);
    },
    DeleteMovie: async (parent, { id }, contextValue, info) => {
      const dataSource = new MovieDataSource();
      await dataSource.initializeDBConnection();
      return await dataSource.deleteMovie(id);
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
      rate: params.Rate,
    });
    return movie ? movie : null;
  }

  async getMovies() {
    const movies = await this.dbConnection.movies.findAll(
      {
        order: [['rate', 'ASC']],
      }
    );
    return movies ? movies : null;
  }

  async getMovieByImdbid(id) {
    const movie = await this.dbConnection.movies.findAll(
      {
        where: {
          imdbid: id,
        }
      }
    );
    return movie ? movie : null;
  }

  async updateMovie(id, params) {
    const movie = await this.dbConnection.movies.update(
      {
        rate: params.Rate,
      },
      {
        where: {
          id: id,
        },
      }
    );
    return movie ? movie : null;
  }

  async deleteMovie(id) {
    await this.dbConnection.movies.destroy({
      where: {
        id
      }
    });
    return null;
  }
}

const mapOutputMovie = (output) => {
  return {
    Rate: output.dataValues.rate,
    imdbID: output.dataValues.imdbid,
    Poster: output.dataValues.poster,
    Title: output.dataValues.title,
    Type: output.dataValues.type,
    Year: output.dataValues.year,
    id: output.dataValues.id,
  }
}
