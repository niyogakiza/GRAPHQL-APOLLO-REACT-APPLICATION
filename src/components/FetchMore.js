import React from 'react'
import { Loading } from "./Loading"
import { ButtonUnobtrusive } from "./Button"

export const FetchMore = ({
    loading,
    hasNextPage,
    variables,
    updateQuery,
    fetchMore,
    children
}) => (
    <div className='FetchMore'>
        {loading
            ? (<Loading/>)
            : (hasNextPage && <ButtonUnobtrusive
                className={'FetchMore-button'}
                onClic={() => fetchMore({ variables, updateQuery})}
        >
            More {children}
        </ButtonUnobtrusive>
            )}

    </div>
)
