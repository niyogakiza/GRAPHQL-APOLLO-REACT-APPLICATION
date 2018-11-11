import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { Loading } from './Loading'
import RepositoryList, {REPOSITORY_FRAGMENT} from './repositories/Index'
import {ErrorMessage} from './Error'


const GET_REPOSITORIES_OF_CURRENT_USER = gql`    
    query($cursor: String) {
        viewer {
            repositories(
                first: 5
                orderBy: { direction: DESC, field: STARGAZERS}
                after: $cursor
            ){
                edges{
                    node{
                        ...repository
                    }
                }
                pageInfo {
                    endCursor
                    hasNextPage
                }
            }
        }
    }
    ${REPOSITORY_FRAGMENT}
`
const Profile = () => (
    <Query
        query={GET_REPOSITORIES_OF_CURRENT_USER}
        notifyOnNetworkStatusChange={true}
    >
        {({ data={}, loading, error, fetchMore }) => {
            if (error) return <ErrorMessage error={error}/>
            const {viewer} = data
            if (loading && !viewer) return <Loading/>
            return <RepositoryList
                loading={loading}
                repositories={viewer.repositories}
                fetchMore={fetchMore}
                entry={'viewer'}
            />
        }}
    </Query>
)

export default graphql(GET_REPOSITORIES_OF_CURRENT_USER)(Profile)
