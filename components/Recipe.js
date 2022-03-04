import styles from './recipe.module.css'
import measurementConverter from '../utils/measurementConverter';

const Recipe = (props) => {

    const { drinkInfo } = props

    const getIngredients = () => {
      let resultObj = [];
      const getAllKeys = Object.keys(drinkInfo);

      getAllKeys.forEach(function(keyName) {
        if (keyName.includes("Ingredient") && drinkInfo[keyName] ) {
          let ingredientInfo = {}
          ingredientInfo['name'] = drinkInfo[keyName]
          ingredientInfo['measurement'] = drinkInfo['strMeasure'+ keyName.replace( /^\D+/g, '')]
          resultObj.push(ingredientInfo);
        }
      })
      const chartData = measurementConverter(resultObj)
      console.log('chart data: ', chartData)
      return resultObj
    }

    const displayIngredients = () => {
      const ingredients = getIngredients()
      const list = ingredients.map(ingredient => {
        return (
          <span key={ingredient.name+Math.random(10)} className={styles.legendContainer}>
            <div className={styles.square}></div>
            <div>{`${ingredient.name} (${ingredient.measurement})`}</div>
          </span>
        )
      })
      return list
    }

    return (
      <div>
        <div className={styles.top}>
          <span><img className={styles.thumbnail} src={drinkInfo.strDrinkThumb} alt='drink'/></span>
          <span className={styles.title}>{drinkInfo.strDrink}</span>
        </div>
      <div className={styles.middle}>
        <span className={styles.ingredientHeader}>Ingredients: </span>

        <div className={styles.displayVisuals}>
          <div className={styles.ingredientList}>
            {displayIngredients()}
          </div>
        <div>
              <div className={styles.chart}></div>
            </div>
      </div>
      <div className={styles.instructions}>{drinkInfo.strInstructions}</div>
      </div>
      </div>
    )
}

export default Recipe