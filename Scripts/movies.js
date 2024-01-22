const genreEl=document.querySelector(".dropdown-menu");
const listedGenre=[{"id":28,"name":"Action"},{"id":12,"name":"Adventure"},{"id":16,"name":"Animation"},{"id":35,"name":"Comedy"},{"id":80,"name":"Crime"},{"id":99,"name":"Documentary"},{"id":18,"name":"Drama"},{"id":10751,"name":"Family"},{"id":14,"name":"Fantasy"},{"id":36,"name":"History"},{"id":27,"name":"Horror"},{"id":10402,"name":"Music"},{"id":9648,"name":"Mystery"},{"id":10749,"name":"Romance"},{"id":878,"name":"Science-Fiction"},{"id":10770,"name":"TV-Movie"},{"id":53,"name":"Thriller"},{"id":10752,"name":"War"},{"id":37,"name":"Western"}]
var genreId=[];
renderGenreMovies();
function renderGenreMovies(genre){
	listedGenre.forEach(function (genre) {
			const t = document.createElement("li");
			t.classList.add("genre-item");
			t.id = genre.id;
			t.innerText = genre.name;
			t.addEventListener("click", function () {
				if (genreId.length == 0) {
					genreId.push(genre.id);
				}
				else {
					if (genreId.includes(genre.id)) {
						genreId.forEach((id, idx) => {
							genreId.splice(idx, 1);
						});
					}
					else {
						genreId.push(genre.id);
					}
					}
				getMovies(api_url+'&with_genres='+genreId.join(","),genre.name);
				highlightSelection();
				document.querySelector("."+genre.name).classList.add("beautify");
			}
			);
			genreEl.appendChild(t);
			
		})
}
const moviebase_url="https://api.themoviedb.org/3/discover/movie?";
const api_key="api_key=5013eb84105d14670f2ab2198877f9a3";
const api_url=moviebase_url+api_key;
function getMovies(url,genrename){
	fetch(url).then(input=>{
		return input.json();
	}).then(data=>{
		showMovies(data.results, genrename);
	}).catch(error=>{
		console.log(error);
	})
}

function showMovies(data,genrename){
	data.forEach(movie=>{
		const movieEl=document.createElement("div");
		movieEl.classList.add("api-movies")
		movieEl.innerHTML= `
			<img  src=${movie.poster_path? "https://image.tmdb.org/t/p/original/"+movie.poster_path: "https://news.uchicago.edu/sites/default/files/images/2022-10/sgr%20A%2A%20ESO%20and%20M.%20Kornmesser%20690.jpg"} />
			<h3>${movie.original_title}</h3>
		`
		var myNewDiv=document.querySelector("."+genrename);
		myNewDiv.append(movieEl);
	})
}
function highlightSelection(){
	const myhighlights=document.querySelectorAll(".genre-item");
	myhighlights.forEach(item=>{
		item.classList.remove("highlight");
	})
	clearBtn();
	if(genreId.length!=0){
		genreId.forEach(id=>{
			const selectedEl=document.getElementById(id);
			selectedEl.classList.add("highlight");
			selectedEl.style.color="red";
		})
	}
}
function clearBtn(){
	let clearBtn=document.getElementById("clear")
	if(clearBtn){
		clearBtn.classList.add("highlight");
	}
	else{
	let clear=document.createElement("li");
	clear.id="clear";
	clear.innerText="Clear x";
	clear.classList.add("genre-item","highlight");
	clear.addEventListener("click",function(){
		history.go(0);
		
	})
	genreEl.append(clear);
	}
}
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
	function searchAnswer(data){
		myBoxDiv.innerHTML="";
		data.forEach(dataunit=>{
			
			const smallAnch=document.createElement("a");
			const smallImage=document.createElement("img");
			const smallDiv=document.createElement("div");
			smallDiv.innerHTML=`
			<h6>${dataunit.original_title}</h6>
			`
			smallAnch.href=`cards.html?title=${dataunit.original_title || dataunit.original_name}&image=https://image.tmdb.org/t/p/original/${dataunit.poster_path}&para=${dataunit.overview}`
	
			smallImage.classList.add("small-image");
			
			
			smallImage.src="https://image.tmdb.org/t/p/original/"+dataunit.poster_path;
		
			
	
			smallAnch.appendChild(smallDiv);
			smallAnch.appendChild(smallImage);
	
			myBoxDiv.appendChild(smallAnch);
		})
		
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
	document.getElementById("type_something").addEventListener("keypress",(e)=>{e.preventDefault()})