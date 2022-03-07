import styles from './recipe.module.css'
import measurementConverter from '../utils/measurementConverter';
import getIngredients from '../utils/getIngredients';
import 'chart.js/auto';
import { Pie } from 'react-chartjs-2';


const Recipe = (props) => {

    const { drinkInfo } = props

  const ingredients = getIngredients(drinkInfo)
  const chartData = measurementConverter(ingredients)

    const displayIngredients = () => {
      const list = ingredients.map(ingredient => {
        return (
          <span key={ingredient.name+Math.random(10)} className={styles.legendContainer}>
            <div className={styles.square} style={{backgroundColor: ingredient.color}}></div>
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
        <div className={styles.chart}>
            <Pie
              width={120}
              height={120}
              options={
                {
                  plugins: {
                    legend: {display: false}
                  }
                }
              }
          data={{
            labels: false,
            datasets: [
              {
                data: chartData.map(i => i.quantity),
                label: '',
                borderColor: 'rgba(255, 255, 255, 0)',
                backgroundColor: chartData.map(i => i.color),
                fill: true,
              },
            ],
          }}
        /> 
            </div>
      </div>
      <div className={styles.instructions}>{drinkInfo.strInstructions}</div>
      </div>
      </div>
    )
}

export default Recipe