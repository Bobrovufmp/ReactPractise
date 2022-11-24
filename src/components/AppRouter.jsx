import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import About from "../pages/About";
import Posts from "../pages/Posts";
import Home from "../pages/Home";
import Error from "../pages/Error";

const AppRouter = () => {
    return (
        <div>
            <Routes>
                <Route path="/about" element={<About/>}/>
                <Route path="/posts" element={<Posts/>}/>
                <Route path='/' element={<Home/>}/>
                <Route path='/error' element={<Error/>}></Route>
                <Route path='*' element={<Navigate replace to="/error"/>}/>
            </Routes>
        </div>
    );
};

export default AppRouter;