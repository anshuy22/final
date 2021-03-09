firebase.auth().onAuthStateChanged(async function (user) {
  if(user) {
    let db = firebase.firestore()
    console.log("signed in")
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
    document.querySelector('form').addEventListener('submit', async function(event){
      event.preventDefault()
      let mealName = document.querySelector('#mealName').value
      let ingredientOneName = document.querySelector('#ingredientOne').value
      let ingredientTwoName = document.querySelector('#ingredientTwo').value
      let ingredientThreeName = document.querySelector('#ingredientThree').value
      console.log(mealName)
      console.log(ingredientOneName)
      console.log(ingredientTwoName)
      console.log(ingredientThreeName)
      await db.collection('mealnames').add({
        text: mealName, 
        text1: ingredientOneName,
        text2: ingredientTwoName,
        text3: ingredientThreeName, 
        userid: user.uid
      })
    })
    document.querySelector('.userHistory').innerHTML = `
      <a href="#" >${userName}'s Past Meal Creations</a>
    `
    let history = await db.collection('mealnames').where('userid', '==', user.uid).get()
    console.log(`Number of meals added: ${history.size}`)
 
    document.querySelector('#mealHistory').innerHTML = `
    <a href="#" >Total Meals Added: ${history.size}</a>
    `
    let myMeals = history.docs
    for (let i=0; i<myMeals.length; i++) {
      let mealId = myMeals[i].id 
      let meals = myMeals[i].data()
      let mealText = meals.text
      document.querySelector('#myMeals').insertAdjacentHTML('beforeend', `
      <div class="todo-${mealId} py-4 text-xl">
        <a href="#" ></a>
        ${mealText}
      </div>
    `)
    }


  } else {
    let ui = new firebaseui.auth.AuthUI(firebase.auth())

    let authUIConfig = {
            signInOptions: [
                firebase.auth.EmailAuthProvider.PROVIDER_ID
            ],
            signInSuccessUrl: "addmeal.html"
        }

    ui.start(".sign-in-or-sign-out", authUIConfig)
  }
})