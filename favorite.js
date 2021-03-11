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
      
      
  
      db.collection('users').doc(user.uid).set({
        name: user.displayName,
        email: user.email
      })
  
      let favorite=await db.collection('favorites').where("uid","==",user.uid).get()
      let fav=favorite.docs

      for(let i=0; i<fav.length;i++){
        console.log(fav[i].data())
        let id=fav[i].data().id

        document.querySelector('.mealplan').insertAdjacentHTML('beforeend',`
        <div class="w-1/5 p-4 mealplan-${id}-${user.uid}">
        <img src="${fav[i].data().image}" class="w-full">
        <a  class="recipe-button block text-center text-white bg-green-500 mt-4 px-4 py-2 rounded">${fav[i].data().recipe}</a>
        <a href="#" class="recipe-button block text-center text-white bg-green-500 mt-4 px-4 py-2 rounded">Remove from favorites!</a>

      </div>`)

      document.querySelector(`.mealplan-${id}-${user.uid}`).addEventListener('click',async function(event){
        event.preventDefault()
     
        await db.collection('favorites').doc(`${id}-${user.uid}`).delete()
        document.querySelector(`.mealplan-${id}-${user.uid}`).classList.add('opacity-20')
        
        
        
    })  
            
      
          
  
      // Signed in
      console.log('signed in')
    } 
  }
  else {
      // Signed out
      console.log('signed out')
  
      // Initializes FirebaseUI Auth
      let ui = new firebaseui.auth.AuthUI(firebase.auth())
  
      // FirebaseUI configuration
      let authUIConfig = {
        signInOptions: [
          firebase.auth.EmailAuthProvider.PROVIDER_ID
        ],
        signInSuccessUrl: 'favorite.html'
      }
  
      // Starts FirebaseUI Auth
      ui.start('.sign-in-or-sign-out', authUIConfig)
    }
  })
  