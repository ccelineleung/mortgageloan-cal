import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Homepage from './components/Homepage';

const App = () => {
    return (
        <>
        <Routes>
        <Route path='/homepage' element={<Homepage/>} />
        </Routes>
        
        </>
    );
}

export default App;