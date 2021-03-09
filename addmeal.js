firebase.auth().onAuthStateChanged(async function(user) {
    if (user) {
        let db = firebase.firestore()
        let userName = firebase.auth().currentUser.displayName
        document.querySelector('.userName').innerHTML = `
            <a href="#" class="welcome-sign italic text-4xl font-semibold">Welcome ${userName}</a>
        `
        document.querySelector('.sign-in-or-sign-out').innerHTML = `
            <a href="#" class="sign-out-button underline >Sign Out</a>
        `

        document.querySelector('form').addEventListener('click', async function(event) {
          event.preventDefault()

          let mealName = document.querySelector('.mealName').value
          // let ingredientOneName = document.querySelector('.ingredientOne').value
          // let ingredientTwoName = document.querySelector('.ingredientTwo').value
          // let ingredientThreeName = document.querySelector('.ingredientThree').value

          console.log(mealName)
          // console.log(ingredientOneName)
          // console.log(ingredientTwoName)
          // console.log(ingredientThreeName)

          // if (mealName.length > 0) {
          //   let docRef = await db.collection('Meals').add({
          //     text: mealName
          //   })
          // }

          // if (ingredientOneName.length > 0) {
          //   let docRef = await db.collection('ingredients').add({
          //     text: ingredientOneName
          //   })
          // }

          // if (ingredientTwoName.length > 0) {
          //   let docRef = await db.collection('ingredients').add({
          //     text: ingredientTwoName
          //   })
          // }

          // if (ingredientThreeName.length > 0) {
          //   let docRef = await db.collection('ingredients').add({
          //     text: ingredientThreeName
          //   })
          // }
        })


        document.querySelector('.sign-out-button').addEventListener('click', function(event) {
            event.preventDefault()
            firebase.auth().signOut() 
            document.location.href = 'signin.html'
        }) 
       
      
      // Signed in
      console.log('signed in')
    } else {

      document.querySelector('form').classList.add('hidden')
      document.querySelector('#links').classList.add('hidden')

      // Signed out
      console.log('signed out')
  
      // Initializes FirebaseUI Auth
      let ui = new firebaseui.auth.AuthUI(firebase.auth())
  
      // FirebaseUI configuration
      let authUIConfig = {
        signInOptions: [
          firebase.auth.EmailAuthProvider.PROVIDER_ID
        ],
        signInSuccessUrl: 'addmeal.html'
      }
  
      // Starts FirebaseUI Auth
      ui.start('.sign-in-or-sign-out', authUIConfig)
    }
  })