import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import PokemonTrade from './components/PokemonTrade'
import Layout from './components/Layout'
import MainContentExercise from './components/MainContentExercise'
import Home from './components/Home'
import CardInfo from './components/CardInfo'
import Products from './components/Products'
import ProtectedRoute from './components/utilProtectRoute'
import BackOffice from './components/Backoffice'
import Support from './components/Support'
import { UserProvider } from './context/UserContext'
import Chat from './components/Chat'

function App() {

  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />} >
            <Route index element={<Home />} />
            <Route path='/pokemon' element={<PokemonTrade />} />
            <Route path='/exercises' element={<ProtectedRoute><MainContentExercise /></ProtectedRoute>} />
            <Route path='/pokemon/:cardId' element={<CardInfo />} />
            <Route path='/products' element={<Products />} />
            <Route path='/backoffice' element={<ProtectedRoute><BackOffice /></ProtectedRoute>} />
            <Route path='/support' element={<Support />} />
            <Route path='/chat/:chatToken' element={<Chat />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  )
}

export default App
