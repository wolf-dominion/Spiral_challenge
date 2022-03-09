import { useRouter } from 'next/router'
import Link from 'next/link'
import Recipe from '../../components/Recipe'
import styles from '../../styles/drinks.module.css'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useThirsty } from "../../context/main-data";
import { useEffect, useState } from "react";

function DrinkRecipe() {

    const router = useRouter()
    const drinkInfo = router.query

    const { clickedResult, setClickedResult } = useThirsty()

    const [fetchedData, setFetchedData] = useState(null)

    useEffect(() => {
      const fetchData = async () => {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drinkInfo.drinkId}`);
        const newData = await response.json();
        setFetchedData(newData && newData.drinks && newData.drinks[0] || null);
        console.log('set data: ', newData)
      };
    
      if (clickedResult.length === 0) {
        fetchData();
        console.log('after fetch')
      }


    }, [drinkInfo])

    if (router.isFallback) {
      return <h1>Loading...</h1>
    }

    return (
      <div>
        {fetchedData ?         
        <div>
        <div className={styles.recipeHeader}>
            <div className={styles.returnContainer}>
                <div className={styles.returnArrow} >
                  <ArrowBackIosIcon sx={{ color: "#83bce2" }}/>
                </div>
                <Link href='/drinks'>
                  <a className={styles.returnText}>Thirsty</a>
                </Link>
            </div>
              <span className={styles.recipeTitle}>{fetchedData.strDrink}</span>
            </div>
            <Recipe drinkInfo={fetchedData}/>
        </div>
        :
          <div>
            <div className={styles.recipeHeader}>
            <div className={styles.returnContainer}>
                <div className={styles.returnArrow} >
                  <ArrowBackIosIcon sx={{ color: "#83bce2" }}/>
                </div>
                <Link href='/drinks'>
                  <a className={styles.returnText}>Thirsty</a>
                </Link>
            </div>
              <span className={styles.recipeTitle}>{clickedResult.strDrink}</span>
            </div>
            <Recipe drinkInfo={clickedResult}/>
        </div>
      }

      </div>
    )
  }
  
  export default DrinkRecipe
