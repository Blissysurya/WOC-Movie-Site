
let mydata=fetch("https://api.themoviedb.org/3/trending/all/day?api_key=5013eb84105d14670f2ab2198877f9a3")
.then(function(input){
    return input.json();
}).then(function(data){
	renderCards(data.results);
}).catch(function(error){
    console.log(error);
});
const myCards=document.querySelector("#cards-container");
;



function renderCards(data){
    data.forEach(dataunit=>{
        const myDiv=document.createElement("div");
        const myImage=document.createElement("img");
        const myTitle=document.createElement("h3");
		
        
        myImage.classList="card-image";
		myTitle.classList="title-break";
        
		myTitle.style.color="#ffc300"
		
        myImage.src="https://image.tmdb.org/t/p/original/"+dataunit.poster_path;
        myTitle.innerText=dataunit.original_title || dataunit.original_name;
		
        
        myDiv.appendChild(myImage);
        myDiv.appendChild(myTitle);
		
        
        myCards.appendChild(myDiv);
		
	});
};
const myTVCards=document.querySelector(".tv-cards");
function renderTVShows(data){
	data.forEach(dataunit=>{
		const myDiv2=document.createElement("div");
		const myImage2=document.createElement("img");
		const myTitle2=document.createElement("h3");

		myImage2.classList="card-image2";
		myTitle2.classList="title-break";

		myTitle2.style.color="#ffc300"
		myImage2.src="https://image.tmdb.org/t/p/original/"+dataunit.poster_path;
		myTitle2.innerText=dataunit.original_name || dataunit.original_title;

		myDiv2.appendChild(myImage2);
		myDiv2.appendChild(myTitle2);

		myTVCards.appendChild(myDiv2);

	})
};

fetch("https://api.themoviedb.org/3/tv/popular?api_key=5013eb84105d14670f2ab2198877f9a3")
.then(function(input){
    return input.json();
}).then(function(data){
    renderTVShows(data.results);
}).catch(function(error){
    console.log(error);
});
const myTopMovies=document.querySelector(".movie-cards");
function renderTopRatedMovies(data){
	data.forEach(dataunit=>{
		const myDiv3=document.createElement("div");
		const myImage3=document.createElement("img");
		const myTitle3=document.createElement("h3");
		
		myImage3.classList="card-image3";
		myTitle3.classList="title-break";

		myTitle3.style.color="#ffc300"
		myImage3.src="https://image.tmdb.org/t/p/original/"+dataunit.poster_path;
		myTitle3.innerText=dataunit.original_title || dataunit.original_name;
		

		myDiv3.appendChild(myImage3);
		myDiv3.appendChild(myTitle3);
		
		myTopMovies.appendChild(myDiv3);

	})
};

fetch("https://api.themoviedb.org/3/movie/top_rated?api_key=5013eb84105d14670f2ab2198877f9a3")
.then(function(input){
    return input.json();
}).then(function(data){
    renderTopRatedMovies(data.results);
}).catch(function(error){
    console.log(error);
});


document.getElementById("search_here").addEventListener("click",function search_results(){
	
let imp=document.querySelector("#type_something").value;
fetch("https://api.themoviedb.org/3/search/movie?"+"query="+imp+"&api_key=5013eb84105d14670f2ab2198877f9a3")
.then(function(input){
	return input.json();
}).then(data=>{
	searchAnswer(data.results);
}).catch(error=>{
	console.log(error);
})})

 const myBoxDiv=document.querySelector(".search_box");
document.getElementById("type_something").addEventListener("keypress",(e)=>{e.preventDefault()})
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
		smallAnch.href=`cards.html?title=${dataunit.original_title || dataunit.original_name}&image=https://image.tmdb.org/t/p/original/${dataunit.poster_path}&para=${dataunit.overview}`
		
		
		smallAnch.appendChild(smallDiv);
		smallAnch.appendChild(smallImage);

		myBoxDiv.appendChild(smallAnch);
	})
	/*let myArray=document.querySelectorAll(".search_box a");
	myArray.forEach(function(datapiece){
		datapiece.addEventListener("click",function(){
		const myNewDiv2=document.createElement("div");
		const myNewImg=document.createElement("img");
		const headingDiv=document.createElement("div");
		const myNewDiv3=document.createElement("div");

		myNewImg.src=datapiece.img.src;
		myNewDiv3.innerHTML=`
		<p>${datapiece}</p>
		`;
		headingDiv.innerHTML=`
		<h3>${datapiece.original_title}</h3>
		`;
		myNewDiv2.appendChild(myNewImg);
		myNewDiv2.appendChild(headingDiv);
		myNewDiv2.appendChild(myNewDiv3);

		myReqDiv.appendChild(myNewDiv2);

	})}
	)*/
}
function hideSearch(){
	if(document.querySelector("#type_something").value==0){
		document.querySelector(".search_box").style.visibility="hidden";
	}
}
hideSearch();
document.querySelector("#search_here").addEventListener("click",function(){
	if(document.querySelector("#type_something").value!=0){
		document.querySelector(".search_box").style.visibility="visible";
	}
	else{
		document.querySelector(".search_box").style.visibility="hidden"
	}
})


let menu=document.getElementById("myMenu");
function toggleMenu(){
  menu.classList.toggle("open-menu");
}
document.getElementById("person").addEventListener("click",
toggleMenu
)

let fourthrow=fetch("https://api.themoviedb.org/3/movie/upcoming?api_key=5013eb84105d14670f2ab2198877f9a3")
.then(response=>{
	return response.json();
})
.then(responseData=>{
	upcomingMovies(responseData.results)
})
.catch(error=>{
	console.log(error)
})
const upcomingDiv=document.getElementById("upcoming-container");
function upcomingMovies(data){
	data.forEach(dataunit=>{
		const myDiv4=document.createElement("div");
		const myTitle=document.createElement("h3");
		const myImg=document.createElement("img");

		myTitle.classList="title-break";
		myTitle.style.color="#ffc300"
		myImg.src="https://image.tmdb.org/t/p/original/"+dataunit.poster_path;
		myTitle.innerText=dataunit.original_title || dataunit.original_name;
		myImg.classList.add("upcoming-card-image");
		myTitle.classList.add("upcoming-title");
		
		myDiv4.append(myImg);
		myDiv4.append(myTitle);

		upcomingDiv.append(myDiv4);

	})
}







