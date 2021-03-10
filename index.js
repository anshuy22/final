firebase.auth().onAuthStateChanged(async function(user) {
  if (user) {
    let userName = firebase.auth().currentUser.displayName
        document.querySelector('.userName').innerHTML = `
            <a href="#" class="welcome-sign italic text-4xl font-semibold">Welcome ${userName}</a>
        `
        document.querySelector('.sign-in-or-sign-out').innerHTML = `
        <a href="#" class="sign-out-button text-green-500 underline">Sign Out</a>
    `
    document.querySelector('.sign-out-button').addEventListener('click', function(event) {
        event.preventDefault()
        firebase.auth().signOut() 
        document.location.href = 'signin.html'   
    })
    function myfunction(){
      var x = document.getElementById("myList");
    }
        document.getElementById('#myList').addEventListener('click', async function(event){
          event.preventDefault()
          let ingredient1 = document.querySelector('#myList').value
       let querySnapshot=await db.collection(meals).get() 
       let meals= docRef.docs
       for(let i=0;i<meals.length;i++){
         for(let j=0;j<=5;j++){
           if(ingredient1==meals[i].Ingredients[j]){
          console.log(meals[i].Recipe)
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
