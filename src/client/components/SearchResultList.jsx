import React from 'react'
import SearchResult from './SearchResult'

export default function SearchResultList({result}){
    
    return (
        <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
           {
            result.map((result, id) => {
                return <SearchResult result={result} key={id} />
            })
           }
           
        </div>
    )
}
