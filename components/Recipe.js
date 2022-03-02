import styles from './recipe.module.css'

const Recipe = (props) => {

    const { drinkInfo } = props

    return (
        <div className={styles.top}>
        <span><img src={drinkInfo.strDrinkThumb} width='30' height='30' alt='drink'/></span>
        <span className='title'>{drinkInfo.strDrink}</span>
      <div className='middle'>
        <span>Ingredients: </span>
        <div>
          <div className='ingredient-list'>
            <span>{drinkInfo.strIngredient1}</span>
            <span>{drinkInfo.strIngredient2}</span>
            <span>{drinkInfo.strIngredient3}</span>
          </div>
        </div>
      </div>
      <div className='bottom'>

      </div>
      </div>
    )
}

export default Recipe