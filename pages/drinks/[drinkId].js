import { useRouter } from 'next/router'
import Link from 'next/link'

function DrinkRecipe({ drink }) {
    const router = useRouter()
    const drinkId = router.query.drinkId

    if (router.isFallback) {
      return <h1>Loading...</h1>
    }

    return (
      <>
        <Link href='/drinks'>
          <a>Thirsty</a>
        </Link>
        <h1>Recipe details for drink ID: {drinkId}</h1>
      </>
    )
  }
  
  export default DrinkRecipe

  export async function getStaticPaths() {

    const res = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita')
    const data = await res.json()

    console.log('data in paths: ', data)

    const paths = data ? data.drinks.map(drink => {
      return {
        params: {
          drinkId: `${drink.strDrink}`
        }
      }
    }) : []
  
    return {
      paths,
      fallback: true,
    }
  }

  export async function getStaticProps(context) {
    const { params } = context
    const res = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${params.strDrink}`)

    const data = await res.json()
    console.log('data in paths: ', data)

    return {
      props: {
        drink: data.drinks
      }
    }
  }