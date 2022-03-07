import colorGenerator from './colorGenerator'

const getIngredients = (drinkInfo) => {
    console.log('herllo')
    let results = [];
    const getAllKeys = Object.keys(drinkInfo);
    
    getAllKeys.forEach((keyName, index) => {
      if (keyName.includes("Ingredient") && drinkInfo[keyName] ) {
        let ingredientInfo = {}
        ingredientInfo['name'] = drinkInfo[keyName]
        ingredientInfo['measurement'] = drinkInfo['strMeasure'+ keyName.replace( /^\D+/g, '')]
        results.push(ingredientInfo);
      }
    })

    const colors = colorGenerator(results.length)

    results.forEach((i, index )=> {
      i['color'] = colors[index]
      return i
    })

    return results

  }

export default getIngredients