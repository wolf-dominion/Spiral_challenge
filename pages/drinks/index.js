import { useState, useEffect } from "react";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function Example() {
  // Set "sleeping" to true.
  const [sleeping, setSleeping] = useState(true);
  const [drinkQuery, setdrinkQuery] = useState('')
  const [drink, setDrink] = useState('')
  // const drink = 'margarita'

  // Do not fetch until sleeping is false.
  const { data, error } = useSWR(
    drink ? `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drink}` : null,
    fetcher
  );

  const handleChange = (e) => {
    setdrinkQuery(e.target.value);
  };

  // After 3 seconds, setSleeping to false.
  useEffect(() => {
    const makeTheDrink = () => {
      console.log('drink', drink, 'drinkquery', drinkQuery)
      setDrink(drinkQuery);
    }

    if (drink !== drinkQuery) makeTheDrink()

  }, [drinkQuery, drink]);

  return (
    <>
      <input onChange={handleChange} value={drinkQuery} placeholder='Find a drink'/>
      { error && <div>failed to load</div> }
      {!data && <div>loading in 3 seconds...</div> }
      <br></br>
      { data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </>
  )
}

// import Link from 'next/link'
// import { useState } from 'react'
// import useSWR from 'swr'

//   const fetcher = async (drink) => {
//     const res = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drink}`)
//     const data = await res.json()
//     console.log('fetcher triggered', drink)
//     console.log('data:', data)
//     return data.drinks
//   }

// function Drinks({ drinks }) {

//   const [drinkQuery, setdrinkQuery] = useState()
//   const [drink, setDrink] = useState(undefined);

//   const handleChange = (e) => {
//     console.log('changed')
//     setdrinkQuery(e.target.value);
//   };

//     const { data, error } = useSWR('drinks', fetcher(drinkQuery))

//     return (
//       <>
//         <h1>Thirsty</h1>
//         <input onChange={handleChange} value={drinkQuery} placeholder='Find a drink'/>
//         <br />

//         {/* {
//           data.drinks.map(drink => {
//             return (
//               <div key={drink.strDrink}>
//                 <Link href={`drinks/${drink.strDrink}`} passHref>
//                   <h2>{drink.strDrink}</h2>
//                 </Link>
//               </div>
//             )
//           })
//         } */}
//       </>
//     )
//   }
  
//   export default Drinks

// // export async function getStaticProps(){
// //   const res = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita')
// //   const data = await res.json()

// //   return {
// //     props: {
// //       drinks: data.drinks
// //     }
// //   }
// // }