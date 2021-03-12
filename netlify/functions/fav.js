let firebase = require('./firebase')


exports.handler = async function(event) {
 let db=firebase.firestore()
 console.log(event.body)
let favor= JSON.parse(event.body)
 
//console.log(userId)
  let favId=favor.id 
  let favrecipe=favor.recipe
  let userid=favor.userId 
  let favRecipe=favor.recipe
  let mealimage=favor.image 

// let querySnapshot=await db.collection('favorites')
//                                      .where("uid","==",userid).get()
await db.collection('favorites').doc(`${favId}-${userid}`).set({

              recipe: favrecipe,
              image: mealimage,
              Recipe: favRecipe,
              id:favId,
              uid: userid
            
            })
  return {
    statusCode: 200,
    body: JSON.stringify({})
  }
}