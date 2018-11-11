import React from 'react'
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo'
import './index.css';
import App from './App';
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { onError } from 'apollo-link-error'
import { ApolloLink } from 'apollo-link'

const GITHUB_BASE_URL = 'https://api.github.com/graphql'
const GITHUB_PERSONAL_ACCESS_TOKEN = ''
const httpLink = new HttpLink({
    uri: GITHUB_BASE_URL,
    headers: {
        authorization: `Bearer ${GITHUB_PERSONAL_ACCESS_TOKEN}`
    }
})

const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
        // do something with graphql error
    }
    if (networkError){
        // do something with network error
    }
})

const cache = new InMemoryCache()
const link = ApolloLink.from([errorLink, httpLink])

const client = new ApolloClient({
    link,
    cache
})





ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
    document.getElementById('root')
);

