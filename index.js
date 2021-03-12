firebase.auth().onAuthStateChanged(async function(user) {
  
  if (user) {
    let db=firebase.firestore()
    let userName = firebase.auth().currentUser.displayName
        document.querySelector('.userName').innerHTML = `
        <a href="#" class="welcome-sign italic text-4xl font-semibold">Welcome ${userName}</a>
        <button class="sign-out-button  text-green-500 underline">Sign Out</button>
        
        
    `
    document.querySelector('.sign-out-button').addEventListener('click', function(event) {
        event.preventDefault()
        firebase.auth().signOut() 
        document.location.href = 'signin.html'   
    })
    
    document.querySelector('.start-again').addEventListener('click', async function(event){
      event.preventDefault()
      document.location.reload() 
      //return false

    })

    db.collection('users').doc(user.uid).set({
      name: user.displayName,
      email: user.email
    })

        document.querySelector('form').addEventListener('submit', async function(event){
          event.preventDefault()
    
  let response = await fetch(`s/.netlify/functions/get_data?userId=${user.uid}`)
  let meal = await response.json()
  console.log(meal)

      //  let querySnapshot=await db.collection('Meals').get() 
      //  let meals= querySnapshot.docs
       let ingredient1 = document.querySelector('#myList option:checked').text
       let ingredient2 = document.querySelector('#myList1 option:checked').text
       let ingredient3 = document.querySelector('#myList2 option:checked').text

       
       //let a=[]
       
       for(let i=0;i<meal.length;i++){
         //console.log(meals[i].data().Ingredients)
         let mealid=meal[i].recipeId
          let mealimage=meal[i].image
          let mealRecipe=meal[i].Recipe
          let mealrecipe=meal[i].recipe
         for(let j=0;j<meal[i].Ingredients.length;j++){
           if(ingredient1==meal[i].Ingredients[j] || ingredient2==meal[i].Ingredients[j] || ingredient3==meal[i].Ingredients[j]){
          console.log(meal[i].Ingredients)
          console.log(meal[i].Recipe)
        
          document.querySelector('.mealplan').insertAdjacentHTML('beforeend',`
          <div class="w-1/5 p-4 mealplan-${mealid}-${user.uid}">
          <img src="${mealimage}" class="w-full">
          <a class=" block text-center text-white bg-green-500 mt-4 px-4 py-2 rounded">${mealrecipe}</a>
          <a href="#" class="favorite-button block text-center text-white bg-green-500 mt-4 px-4 py-2 rounded">Add to Favorites!</a>
          <a class=" block text-center text-white bg-green-500 mt-4 px-4 py-2 rounded">${mealRecipe}</a>
         
        
          </div>`)
          document.querySelector(`.mealplan-${mealid}-${user.uid}`).addEventListener('click',async function(event){
            event.preventDefault()
            
              
            document.querySelector(`.mealplan-${mealid}-${user.uid}`).classList.add('opacity-20')
             
      let response = await fetch('/.netlify/functions/fav',{
        method:'POST',
        body: JSON.stringify({
              recipe: mealrecipe,
              image: mealimage,
              Recipe: mealRecipe,
              id:mealid,
              userId: user.uid,


        })

      })

            // await db.collection('favorites').doc(`${mealid}-${user.uid}`).set({

            //   recipe: meal[i].recipe,
            //   image: meal[i].image,
            //   Recipe: meal[i].Recipe,
            //   id:meal[i].recipeId,
            //   uid: user.uid
            
            // })
})
         } 

        }
      
    }
      })
      
      

    
        

    // Signed in
    console.log('signed in')
  } else {
    // Signed out
    console.log('signed out')

    // Initializes FirebaseUI Auth
    let ui = new firebaseui.auth.AuthUI(firebase.auth())

    // FirebaseUI configuration
    let authUIConfig = {
      signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID
      ],
      signInSuccessUrl: 'index.html'
    }

    // Starts FirebaseUI Auth
    ui.start('.sign-in-or-sign-out', authUIConfig)
  }
})
