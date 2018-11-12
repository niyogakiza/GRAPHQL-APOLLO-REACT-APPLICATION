import React, { Fragment } from 'react'
import RepositoryItem from './RepositoryItem'
import { Loading } from "../Loading"
import {FetchMore} from '../FetchMore'
import Issues from '../../components/Issues/Index'

const getUpdateQuery = entry => (previousResult, {fetchMoreResult}) => {
    if (!fetchMoreResult) {
        return previousResult
    }
    return {
        ...previousResult,
        [entry]: {
            ...previousResult[entry],
            repositories: {
                ...previousResult[entry].repositories,
                ...fetchMoreResult[entry].repositories,
                edges: [
                    ...previousResult[entry].repositories.edges,
                    ...fetchMoreResult[entry].repositories.edges
                ]
            }
        }
    }
}


const RepositoryList = ({ repositories, fetchMore, loading, entry }) => (
    <Fragment>
        {repositories.edges.map(({ node }) => (
            <div key={node.id} className='RepositoryItem'>
                <RepositoryItem {...node}/>
                <Issues
                    repositoryName={node.name}
                    repositoryOwner={node.owner.login}
                />
            </div>
        ))}
        <FetchMore
            loading={loading}
            hasNextPage={repositories.pageInfo.hasNextPage}
            variable={{
                cursor: repositories.pageInfo.endCursor
            }}
            updateQuery={getUpdateQuery(entry)}
            fetchmore={fetchMore}
        >
            Repositories
        </FetchMore>
        {loading
            ? (<Loading/>)
            : (repositories.pageInfo.hasNextPage && (
            <button
                type='button'
                onClick={() => fetchMore({
                    variables: {
                        cursor: repositories.pageInfo.endCursor
                    },
                    getUpdateQuery
                })}
            >
                More Repositories
            </button>
        ))}
    </Fragment>
)
export default RepositoryList
