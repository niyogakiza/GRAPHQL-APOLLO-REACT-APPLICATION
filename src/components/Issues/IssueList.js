import React, {Component} from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import {ErrorMessage} from "../Error";
import {Loading} from "../Loading";
import IssueItem from './IssueItem'
import * as PropTypes from "prop-types";
import { ButtonUnobtrusive } from "../Button";

const ISSUE_STATES = {
    NONE: 'NONE',
    OPEN: 'OPEN',
    CLOSED: 'CLOSES'
};

const GET_ISSUES_OF_REPOSITORY = gql`
    query($repositoryOwner: String!, $repositoryName: String!) {
        repository(name: $repositoryName, owner: $repositoryOwner){
            issues(first: 5){
                edges{
                    node{
                        id
                        number
                        state
                        title
                        url
                        bodyHTML
                    }
                }
            }
        }
    }
`;

const isShow = issueState => issueState !== ISSUE_STATES.NONE;
const TRANSITION_LABELS = {
    [ISSUE_STATES.NONE]: 'Show Open Issues',
    [ISSUE_STATES.OPEN]: 'Show Closed Issues',
    [ISSUE_STATES.CLOSED]: 'Hide Issues'
};
const TRANSITION_STATE = {
    [ISSUE_STATES.NONE]: ISSUE_STATES.OPEN,
    [ISSUE_STATES.OPEN]: ISSUE_STATES.CLOSED,
    [ISSUE_STATES.CLOSED]: ISSUE_STATES.NONE
};

class Issues extends Component {

    state = {
        issueState: ISSUE_STATES.NONE
    };

    onChangeIssueState = nextIssueState =>{
        this.setState({issueState: nextIssueState})
    };

    render() {
        const {issueState} = this.state;
        let {repositoryOwner, repositoryName} = this.props;
        return (
            <div className='Issues'>
                <ButtonUnobtrusive
                    onClick={() => this.onChangeIssueState(TRANSITION_STATE[issueState])}
                >
                    {TRANSITION_LABELS[issueState]}
                </ButtonUnobtrusive>
                {isShow(issueState) && (
                    <Query
                        query={GET_ISSUES_OF_REPOSITORY}
                        variables={{
                            repositoryOwner,
                            repositoryName
                        }}
                    >
                        {({data, loading, error}) => {

                            if (error) return <ErrorMessage error={error}/>;

                            const {repository} = data;

                            if (loading && !repository) return <Loading/>;

                            if (!repository.issues.edges.length) {
                                return <div className='IssueList'>No issues...</div>
                            }

                            return <IssueList issues={repository.issues}/>
                        }}
                    </Query>
                )}

            </div>
        );
    }
}

Issues.propTypes = {
    repositoryOwner: PropTypes.any,
    repositoryName: PropTypes.any
};


const IssueList = ({ issues }) => (
    <div className='IssueList'>
        {issues.edges.map(({ node}) => (
            <IssueItem Key={node.id} issue={node}/>
        ))}
    </div>
);
export default Issues
