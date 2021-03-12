let firebase = require('./firebase')


exports.handler = async function(event) {
 let db=firebase.firestore()
 console.log(event.body)
let addmeal= JSON.parse(event.body)
 
//console.log(userId)
let m= addmeal.text 
let ingOneName = addmeal.Ingredient1
let ingTwoName= addmeal.Ingredient2
let ingThreeName=addmeal.Ingredient3
let Recipe= addmeal.Recipe
let image=addmeal.image
let userid=addmeal.userid

// let querySnapshot=await db.collection('favorites')
//                                      .where("uid","==",userid).get()
await db.collection('mealnames').add({
    text: m, 
    Ingredient1: ingOneName,
    Ingredient2: ingTwoName,
    Ingredient3: ingThreeName, 
    Recipe: Recipe,
    image: image,
    userid: userid
  })
  return {
    statusCode: 200,
    body: JSON.stringify({})
  }
}