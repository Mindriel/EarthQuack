import { buildSchema } from 'graphql'

const schema = buildSchema(`
  type Earthquake {
    id: ID!
	place: String!
	time: Int!
  }

  type Query {
    getEarthquakes(date: String!, countryOrUsaState: String): [Earthquake]
  }

  type Mutation {
    updateEarthquake(id: ID!, place: String, time: Int): ID
    removeEarthquake(id: ID!): ID
  }
`)

export default schema
