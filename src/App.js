import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { Header, MainContainer, CreateContainer, Footer } from './components'
import { useStateValue } from './context/StateProvider'
import { getAllFoodItems } from './utils/firebaseFunctions'
import { actionType } from './context/reducer'

const App = () => {
  const [{ foodItems }, dispatch] = useStateValue()

  useEffect(() => {
    const fetchData = async () => {
      await getAllFoodItems().then((data) => {
        dispatch({
          type: actionType.SET_FOOD_ITEMS,
          foodItems: data,
        })
      })
    }
    fetchData()
  }, [dispatch, foodItems])

  return (
    <AnimatePresence mode="wait">
      <div className="flex h-auto w-screen flex-col bg-primary">
        <Header />

        <main className="mt-20 w-full px-4 py-4 md:px-16 ">
          <Routes>
            <Route path="/*" element={<MainContainer />} />
            <Route path="/createItem" element={<CreateContainer />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </AnimatePresence>
  )
}

export default App
