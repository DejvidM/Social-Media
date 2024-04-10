
import './App.css'
import {BrowserRouter , Routes , Route} from 'react-router-dom'
import Register from './components/Register'
import Main from './components/Main'
import Likes from './components/Likes'
import User from './components/User'
function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Register/>}></Route>
          <Route path='/bright_ideas' element={<Main />} />
          <Route path='/29/:id' element={<Likes/>} />
          <Route path='/user/:id' element={<User/>} />
          
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
