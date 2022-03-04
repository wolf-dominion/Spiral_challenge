import { useRouter } from 'next/router'
import Link from 'next/link'
import Recipe from '../../components/Recipe'
import styles from '../../styles/drinks.module.css'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

function DrinkRecipe() {

    const router = useRouter()

    const drinkInfo = router.query

    if (router.isFallback) {
      return <h1>Loading...</h1>
    }

    return (
      <>
        <div className={styles.recipeHeader}>
        <div className={styles.returnContainer}>
            <div className={styles.returnArrow} >
              <ArrowBackIosIcon sx={{ color: "#83bce2" }}/>
            </div>
            <Link href='/drinks'>
              <a className={styles.returnText}>Thirsty</a>
            </Link>
        </div>
          <span className={styles.recipeTitle}>{drinkInfo.strDrink}</span>
          <div></div>
        </div>
        <Recipe drinkInfo={drinkInfo}/>
      </>
    )
  }
  
  export default DrinkRecipe
