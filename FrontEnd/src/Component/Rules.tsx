import * as React from 'react';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import { Home } from './Home';
import { Search_Movie } from './User_Panel/Search_Movie';
import { Admin_Panel } from './Admin_Panel/Admin_Panel';
import { Edit_Movie } from './Admin_Panel/Edit_movie';
import { Admin_Register_login } from './Admin_Panel/Register_Login';

export const Rules= ()=>{

    return(
        <>
        <BrowserRouter>
   
        <Routes>
        <Route path='/' element={<Home/>}/>
       <Route path='/search' element={<Search_Movie/>}/>
       <Route path='/register_login' element={<Admin_Register_login/>}/>
    b  <Route path='/editmovie/:_id' element={<Edit_Movie/>}/>
    <Route path='/admin-panel' element={<Admin_Panel/>}></Route>

        </Routes>
        </BrowserRouter>
        
        </>
    )
}