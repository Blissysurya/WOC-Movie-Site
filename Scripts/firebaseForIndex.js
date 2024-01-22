
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";
import { getAuth, signOut, signInWithEmailAndPassword, onAuthStateChanged,  } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {  getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import {getDoc, doc, query, collection} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
const firebaseConfig = {
    apiKey: "AIzaSyA2k5Q1J2YZbwmBS23W-fxm22So6liJWuU",
    authDomain: "woc-celluloid.firebaseapp.com",
    projectId: "woc-celluloid",
    storageBucket: "woc-celluloid.appspot.com",
    messagingSenderId: "136134324008",
    appId: "1:136134324008:web:9a07641e21d3fd2873aa1d",
    measurementId: "G-Q89JHE8GRE"
  };

 
 
 // Initialize Firebase
 const app = initializeApp(firebaseConfig);
 const analytics = getAnalytics(app);

const auth = getAuth();
 const db= getFirestore(app);

const signOutElement=document.getElementById("signout");
signOutElement.addEventListener("click",()=>{
    signOut(auth)
    .then(()=>{
        console.log("Sign Out Successful.")
        location.reload();
    }).catch(error=>{
        console.log(error);
    })
})

 const signInForm=document.getElementById("signInForm");
 signInForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    const email= signInForm["emailwalain"].value;
    const password= signInForm["passwordwalain"].value;

    signInWithEmailAndPassword(auth, email, password)
    .then(cred=>{
        const modal=document.getElementById("staticBackdrop");
        signInForm.reset();
        const userId=cred.user;
        getDoc(doc(db,'users',userId.uid))
        .then((document)=>{
            if(document.exists()){
                console.log(document)
            }
            else{
                console.log("Error no doc exists for users collection")
            }
        })
        .catch(err=>{
            console.log(err);
        })
        
    .catch(error=>{
        console.log(error)
    })
       
       // console.log("User Signed In", cred);
    }).catch(error=>{
        console.log(error);
    })
 });
 


 onAuthStateChanged(auth,(user)=>{
    console.log("User State: ",user);
    
    if(user!==null){
   
    const name=document.getElementById("username");
    name.innerText=user.email.split("@",2)[0];
    }
    
 })



/* const user = firebase.auth().currentUser;
 if (user !== null) {
 
 
   const uid = user.uid;
   reactionPage.addEventListener("click",window.location.href=`../movie-review.html?id=${uid}`)
 }*/


 

 // Function to get the current user's UID




//const docRef= collection(db,"ToWatchList");
//getDocs(docRef)
//.then(snapshot=>{
   // let movies=[];
    //snapshot.forEach(snap=>{
      //  movies.push({...snap.data(),id:snap.id})
    //})
    //console.log(movies);
//})
//.catch(error=>{
  //  console.log(error);
//})