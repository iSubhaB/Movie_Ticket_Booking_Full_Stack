import * as React from 'react';

export const Search_Movie=()=>{
    return(
        <>
       <div>
           <div>
            <input type="text" name='title' placeholder='Serach Your Movie Here' onChange={handel_Change}/>
           </div>
           <div>
            <h1>Result</h1>
           </div>
       </div>
        </>
    )
}