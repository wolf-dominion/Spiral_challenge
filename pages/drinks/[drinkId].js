import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import Recipe from '../../components/Recipe'

function DrinkRecipe() {

    const router = useRouter()
    console.log(router.query)

    const drinkInfo = router.query

    if (router.isFallback) {
      return <h1>Loading...</h1>
    }

    return (
      <>
        <Link href='/drinks'>
          <a>Thirsty</a>
        </Link>
        <Recipe drinkInfo={drinkInfo}/>
      </>
    )
  }
  
  export default DrinkRecipe

  // export async function getStaticPaths() {

  //   // const res = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita')
  //   // const data = await res.json()

  //   // console.log('data in paths: ', data)

  //   // const paths = data ? data.drinks.map(drink => {
  //   //   return {
  //   //     params: {
  //   //       drinkId: `${drink.strDrink}`
  //   //     }
  //   //   }
  //   // }) : []
  
  //   return {
  //     paths: [],
  //     fallback: true,
  //   }
  // }

  // export async function getServerSideProps(context) {
  //   const { params } = context
  //   const res = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${params.strDrink}`)

  //   const data = await res.json()
  //   console.log('data in paths: ', data)

  //   return {
  //     props: {
  //       drink: data.drinks
  //     }
  //   }
  // }