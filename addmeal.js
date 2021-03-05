firebase.auth().onAuthStateChanged(async function(user) {
    if (user) {
      let userName = firebase.auth().currentUser.displayName
          document.querySelector('.userName').innerHTML = `
              <a href="#" class="welcome-sign italic text-4xl font-semibold">Welcome ${userName}</a>
          `
          document.querySelector('.sign-in-or-sign-out').innerHTML = `
              <a href="#" class="sign-out-button underline >Sign Out</a>
          `
          document.querySelector('.sign-out-button').addEventListener('click', function(event) {
              event.preventDefault()
              firebase.auth().signOut() 
              document.location.href = 'signin.html'   
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
        signInSuccessUrl: 'addmeal.html'
      }
  
      // Starts FirebaseUI Auth
      ui.start('.sign-in-or-sign-out', authUIConfig)
    }
  })