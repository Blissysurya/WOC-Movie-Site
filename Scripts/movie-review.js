// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";
import {getFirestore,collection, getDocs,onSnapshot, addDoc, doc, setDoc, query} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";



// Now you can use the 'uid' variable in this file

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const auth=getAuth();


const searchBar=document.getElementById("colFormLabel");
searchBar.addEventListener("keyup", function search_results(){
    const searchValue=searchBar.value;
    fetch("https://api.themoviedb.org/3/search/movie?"+"query="+searchValue+"&api_key=5013eb84105d14670f2ab2198877f9a3" || "https://api.themoviedb.org/3/search/tv?"+"query="+searchValue+"&api_key=5013eb84105d14670f2ab2198877f9a3" )
    .then(input=>{
        return input.json();
    })
    .then(data=>{
        searchAnswer(data.results)
    })
    .catch(error=>{
        console.log(error);
    })
})

 const myBoxDiv=document.querySelector(".search_box2");
const myListDiv=document.getElementById("list2");
 function searchAnswer(data){
    
   /*myReqDiv.innerHTML="";*/
   myBoxDiv.innerHTML="";
   data.forEach(dataunit=>{
       
       const smallAnch=document.createElement("a");
       const smallImage=document.createElement("img");
       const smallDiv=document.createElement("div");
       smallDiv.innerHTML=`
       <h6>${dataunit.original_title}</h6>
       `;
       smallImage.classList.add("small-image");
       smallAnch.classList.add("clickable");
       
       smallImage.src="https://image.tmdb.org/t/p/original/"+dataunit.poster_path;
       smallAnch.addEventListener("click",function(){
         /*  const myDiv2=document.createElement("div");
		   const myImage2=document.createElement("img");
		    const myTitle2=document.createElement("h3");
            

		    myImage2.classList="card-image2";
            myDiv2.classList="list-element";
		    myImage2.src="https://image.tmdb.org/t/p/original/"+dataunit.poster_path;
		    myTitle2.innerText=dataunit.original_name || dataunit.original_title;

            myDiv2.addEventListener("click",myModal.show())

		   myDiv2.appendChild(myImage2);
		    myDiv2.appendChild(myTitle2);
            
		    myListDiv.appendChild(myDiv2);*/

            myModal.show();

      const myStars=document.querySelectorAll(".star");
      movieRatedList=[];
      myStars.forEach(star=>{
      star.addEventListener("click",()=>{  
        onAuthStateChanged(auth,(user)=>{
          console.log(user.uid)
        
      const addPostToUser = async (Id) => {
      try {
        // Reference to the 'users' collection
        const usersCollection = collection(db, 'users');

        // Reference to the specific user's document
        const userDocRef = doc(usersCollection,user.uid );


        // Reference to the nested 'posts' collection
        const postsCollection = collection(userDocRef, 'Rated');

        // Add a document to the 'posts' collection
        const newPostDocRef = await addDoc(postsCollection, {
          name: dataunit.original_title || dataunit.original_name,
          rating: star.dataset.value
        });

        console.log('Post added with ID: ', newPostDocRef.id);
      } catch (error) {
        console.error('Error adding post: ', error);
      }
    }
    addPostToUser(user.uid);
  })
})
  
  })   



       })
        
       smallAnch.appendChild(smallDiv);
       smallAnch.appendChild(smallImage);
       myBoxDiv.appendChild(smallAnch);




        })}



        





 function hideSearch(){
           if (document.querySelector("#colFormLabel").value == 0) {
               document.querySelector(".search_box2").style.visibility = "hidden";
           }

       }
hideSearch();
document.querySelector("#colFormLabel").addEventListener("keyup",function(){
    if(document.querySelector("#colFormLabel").value!=0){
        document.querySelector(".search_box2").style.visibility="visible";
    }
    else{
        document.querySelector(".search_box2").style.visibility="hidden"
    }
})
const ratingContainer = document.getElementById('rating');
const stars = ratingContainer.getElementsByClassName('star');

for (let i = 0; i < stars.length; i++) {
  stars[i].addEventListener('mouseover', function () {
    highlightStars(i);
  });

  stars[i].addEventListener('mouseout', function () {
    resetStars();
  });

  stars[i].addEventListener('click', function () {
    setRating(i + 1);
  });
}

function highlightStars(index) {
  for (let i = 0; i <= index; i++) {
    stars[i].classList.add('active');
  }
}
function resetStars() {
    for (let i = 0; i < stars.length; i++) {
      stars[i].classList.remove('active');
    }
  }
  
  function setRating(rating) {
    resetStars();
    for (let i = 0; i < rating; i++) {
      stars[i].classList.add('active');
    }
    // You can use 'rating' value as needed, like sending it to the server for storage.
}
const myModal = new bootstrap.Modal(document.getElementById('exampleModal'),{  keyboard: false});
let movieRatedList=[];

onAuthStateChanged(auth,(user)=>{
  const MovieList =async()=>{
    try{
        //const docSnaps=await getDocs(collection(db,"ToWatchList"));
        await onSnapshot(query(collection(doc(collection(db,'users'),user.uid),'Rated')),docSnaps=>{
            
            docSnaps.forEach(doc=>{
                const docSnap= doc.data();
                            
                 movieRatedList.push(docSnap)
            })
            console.log(movieRatedList);
            showMovies(movieRatedList); 
        })
        
    }
    catch(error){
        console.log(error)
    }
}
MovieList();
const showMovies= function(movieList){
    
    const listBox=document.getElementById("movie-rated-items");
    listBox.innerHTML="";
    movieList.forEach(movie=>{
        const listItem=document.createElement("li");

        listItem.innerHTML=`<h6 class="fs-sm-2 fs-md-2 fs-3" >${movie.name}</h6>
        <br/>
        <h6 class="fs-sm-2 fs-md-2 fs-3"> ${movie.rating}</h6>`
        listBox.append(listItem);
    }

    )
} 

})

document.getElementById("colFormLabel").addEventListener("keypress",(e)=>{e.preventDefault()})