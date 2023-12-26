import { ApolloClient, ApolloLink, InMemoryCache, concat, createHttpLink, split } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Observable, getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { createClient as createWsClient} from 'graphql-ws'
import { Kind, OperationTypeNode } from "graphql";
const getAuthHeader = async () => {
    try {
        const info = await AsyncStorage.getItem('user');
        const user  = JSON.parse(info || "{}");
        if (user.token) {
            return { headers: { Authorization: `Bearer ${user.token}` } };
        }
        return null;
    } catch (error) {
        console.error('Error retrieving token from AsyncStorage:', error);
        return null;
    }
};

const authLink = new ApolloLink((operation, forward) => {
    return new Observable((observer) => {
        getAuthHeader().then((headers) => {
            if (headers) {
                operation.setContext(headers);
            }
            forward(operation).subscribe({
                next: observer.next.bind(observer),
                error: observer.error.bind(observer),
                complete: observer.complete.bind(observer),
            });
        });
    });
});


const httpLink = createHttpLink({
    uri: 'https://joobs-api.onrender.com/graphql'
    // uri: 'http://192.168.1.71:8000/graphql'
});

const wsLink = new GraphQLWsLink(createWsClient({
    url: 'wss://joobs-api.onrender.com/graphql'
    // url: 'ws://192.168.1.71:8000/graphql'
}));

const client = new ApolloClient({
    link: split(isSubscription, wsLink, concat(authLink, httpLink)),
    // link:  httpLink,
    cache: new InMemoryCache(),
});

function isSubscription(operation: any) {
    const definition = getMainDefinition(operation.query);
    return definition.kind === Kind.OPERATION_DEFINITION && definition.operation === OperationTypeNode.SUBSCRIPTION;
}

export default client;