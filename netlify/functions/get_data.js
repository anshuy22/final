let firebase = require('./firebase')

exports.handler = async function(event) {
  let userId= event.queryStringParameters.userId
  
let db=firebase.firestore()
  let mealsData = []
let querySnapshot=await db.collection('Meals').get()
let meals= querySnapshot.docs
let ing=[]
for(let i=0; i<meals.length;i++){
let mealid=meals[i].data().recipeId
let mealrecipe=meals[i].data().recipe
let mealRecipe=meals[i].data().Recipe
let mealimage=meals[i].data().image
for(let j=0;j<meals[i].data().Ingredients.length;j++){
ing.push(meals[i].data().Ingredients[j])
}

mealsData.push({
recipeId: mealid,
recipe: mealrecipe,
Recipe: mealRecipe,
image: mealimage,
Ingredients: ing
})
ing=[]
}
  return {
    statusCode: 200,
    body: JSON.stringify(mealsData)
  }
}