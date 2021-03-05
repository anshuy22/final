firebase.auth().onAuthStateChanged(async function (user) {
    let ui = new firebaseui.auth.AuthUI(firebase.auth())
    
    let authUIConfig = {
        signInOptions: [
            firebase.auth.EmailAuthProvider.PROVIDER_ID
        ],
        signInSuccessUrl: "index.html"
    }
    
    ui.start(".sign-in-or-sign-out", authUIConfig)
        
})
