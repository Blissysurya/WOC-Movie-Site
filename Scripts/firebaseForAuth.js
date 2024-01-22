import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {  getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

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
 const db=getFirestore();
const auth = getAuth();


const signUpForm=document.getElementById("signUpForm");

  


const buttonSubmit=document.querySelector(".go-on");





 async function userCreater(){

  try{
    const email=signUpForm["emailwala"].value;
    const password=signUpForm["passwordwala"].value;
    
    const userCredential=await createUserWithEmailAndPassword(auth,email,password);
   
  
    }
  
    
  
  catch(error){
    console.log(error)
  }}
  if(signUpForm!==null){
  signUpForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    
  })
  
  signUpForm.addEventListener("submit",userCreater)
  }


 

  
  