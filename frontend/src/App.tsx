

import { Routes, Route } from 'react-router-dom';
import { Home } from './routes/Home/home';
import { Profile } from './routes/Profile/Profile';
import { Chess } from './routes/Chess/chess';
import { FlappyBird } from './routes/FlappyBird/flappybird';
import { Messenger } from './routes/Messenger/messenger';
import { Setting } from './routes/Setting_/setting';
import { SearchedProfile } from './routes/SearchedProfile/SearchedProfile';


function App() {


    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path='/profile/:userId' element={<SearchedProfile/>} />
            <Route path='/chess' element={<Chess/>}/>
            <Route path='/flappy_bird' element={<FlappyBird/>}/>
            <Route path='/messenger' element={<Messenger/>}/>
            <Route path='/settings' element={<Setting/>}/>
        </Routes>
    )
}

export default App
