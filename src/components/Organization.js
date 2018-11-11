import React from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'

import REPOSITORY_FRAGMENT from './repositories/fragments'
import RepositoryList from './repositories/RepositoryList'
import {Loading } from './Loading'
import { ErrorMessage } from "./Error"

const GET_REPOSITORIES_OF_ORGANIZATION = gql`
    query($organizationName: String!, $cursor: String){
        organization(login: $organizationName){
            repositories(first: 5, after: $cursor) {
                edges{
                    node{
                        ...repository
                    }
                }
                pageInfo{
                    endCursor
                    hasNextPage
                }
            }
        }
    }
    ${REPOSITORY_FRAGMENT}
`
export const Organization = ({ organizationName }) =>(
    <Query
        variables={{
            organizationName
        }}
        skip={organizationName === ''}
        notifyOnNetworkStatusChange={true}
        query={GET_REPOSITORIES_OF_ORGANIZATION}
    >
        {({ data, loading, error, fetchMore }) => {
            if (error) return <ErrorMessage error={error}/>
            const {organization} = data
            if(loading && !organization) return <Loading/>
            return(
                <RepositoryList
                    loading={loading}
                    repositories={organization.repositories}
                    fetchMore={fetchMore}
                    entry={'organization'}
                />
            )

        }}
    </Query>
)
