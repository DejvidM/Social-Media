
import './App.css'
import {BrowserRouter , Routes , Route} from 'react-router-dom'
import Register from './components/Register'
import Main from './components/Main'
function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Register/>}></Route>
          <Route path='/bright_ideas' element={<Main />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
