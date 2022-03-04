const getIngredients = (drinkInfo) => {
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
    return resultObj
  }

export default getIngredients