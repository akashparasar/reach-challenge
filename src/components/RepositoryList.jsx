import React from 'react'
import RepositoryListItem from './RepositoryListItem';

const RepositoryList = ({ repositories }) => {
    return (
        <div className='my-16 h-full'>
            {repositories && repositories.length > 0 ?
                repositories.map((repository, key) => (
                    <RepositoryListItem key={key} repository={repository} />
                )) :
                <div className='m-6'>
                    No record found.
                </div>
            }
        </div>
    )
}

export default RepositoryList;