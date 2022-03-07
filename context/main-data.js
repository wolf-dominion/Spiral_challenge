import { createContext, useContext, useState } from 'react'

const ThirstyContext = createContext(undefined)

export function ThirstyProvider({ children }) {

  const [drinkQuery, setDrinkQuery] = useState('')
  const [drink, setDrink] = useState('')
  const [clickedResult, setClickedResult] = useState([])

  return (
    <ThirstyContext.Provider
      value={{
        drinkQuery,
        setDrinkQuery,
        drink,
        setDrink,
        clickedResult,
        setClickedResult,
      }}
    >
      {children}
    </ThirstyContext.Provider>
  )
}

export function useThirsty() {
  const context = useContext(ThirstyContext)

  if (!context)
    throw new Error('useThirsty must be used inside a `ThirstyProvider`')

  return context
}