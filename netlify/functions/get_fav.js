let firebase = require('./firebase')

exports.handler = async function (event) {
    let userId = event.queryStringParameters.userId

    let db = firebase.firestore()
    let favsData = []
    let querySnapshot = await db.collection('favorites').get()
    let favs = querySnapshot.docs
    for (let i = 0; i < favs.length; i++) {
        let id = favs[i].data().id
        let recipe = favs[i].data().recipe
        let Recipe = favs[i].data().Recipe
        let image = favs[i].data().image
     
    favsData.push({
            id: id,
            recipe: recipe,
            Recipe: Recipe,
            image: image,
           
            })
    }

    return {
        statusCode: 200,
        body: JSON.stringify(favsData)
    }
}