

import { Routes, Route } from 'react-router-dom';
import { Home } from './routes/Home/home';
import { Profile } from './routes/Profile/Profile';


function App() {


    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/profile" element={<Profile/>}/>
        </Routes>
    )
}

export default App
