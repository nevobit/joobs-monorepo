import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

const httpLink = createHttpLink({
    // uri: 'https://joobs-api.onrender.com/graphql'
    uri: 'http://192.168.1.62:8000/graphql'
});

const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
});

export default client;