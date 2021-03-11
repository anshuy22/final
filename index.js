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
    
    // let response = await fetch('http://localhost:8888/.netlify/functions/get_data')
    // let meals = await response.json()

       let querySnapshot=await db.collection('Meals').get() 
       let meals= querySnapshot.docs
       let ingredient1 = document.querySelector('#myList option:checked').text
       let ingredient2 = document.querySelector('#myList1 option:checked').text
       let ingredient3 = document.querySelector('#myList2 option:checked').text

       //let a=[]
       
       for(let i=0;i<meals.length;i++){
         //console.log(meals[i].data().Ingredients)
         let mealid=meals[i].data().recipeId
          let mealimage=meals[i].data().image
          let mealRecipe=meals[i].data().Recipe
          let mealrecipe=meals[i].data().recipe
         for(let j=0;j<meals[i].data().Ingredients.length;j++){
           if(ingredient1==meals[i].data().Ingredients[j] || ingredient2==meals[i].data().Ingredients[j] || ingredient3==meals[i].data().Ingredients[j]){
          // console.log(meals[i].Ingredients)
          // console.log(meals[i].Recipe)
        
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
              
            await db.collection('favorites').doc(`${mealid}-${user.uid}`).set({

              recipe: meals[i].data().recipe,
              image: meals[i].data().image,
              Recipe: meals[i].data().Recipe,
              id:meals[i].data().recipeId,
              uid: user.uid
            
            })
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
