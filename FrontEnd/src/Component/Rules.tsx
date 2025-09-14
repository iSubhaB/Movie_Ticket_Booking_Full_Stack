import * as React from 'react';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import { Home } from './Home';
import { Search_Movie } from './User_Panel/Search_Movie';
import { Admin_Panel } from './Admin_Panel/Admin_Panel';
import { Edit_Movie } from './Admin_Panel/Edit_movie';
import { Admin_Register_login } from './Admin_Panel/Register_Login';
import { User_Register } from './User_Panel/User_Register';
import { Book_Movie } from './User_Panel/Book_Movie';
import { Movie_Details } from './Movie_Details';
import { Ticket_details } from './User_Panel/Ticket_Details';
import { Generate_Ticket } from './User_Panel/Generate_Ticket';

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
    <Route path='/user_register' element={<User_Register/>}></Route>
    <Route path='/book-movie' element={<Book_Movie/>}></Route>
    <Route path='/movie-details' element={<Movie_Details/>}></Route>
    <Route path='/ticket-booking' element={<Ticket_details/>}></Route>
     <Route path='/generate-ticket' element={<Generate_Ticket/>}></Route>

        </Routes>
        </BrowserRouter>
        
        </>
    )
}