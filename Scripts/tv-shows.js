const genreEl=document.querySelector(".dropdown-menu");
const listedGenre=[{"id":10759,"name":"Action-Adventure"},{"id":16,"name":"Animation"},{"id":35,"name":"Comedy"},{"id":80,"name":"Crime"},{"id":99,"name":"Documentary"},{"id":18,"name":"Drama"},{"id":10751,"name":"Family"},{"id":10762,"name":"Kids"},{"id":9648,"name":"Mystery"},{"id":10763,"name":"News"},{"id":10764,"name":"Reality"},{"id":10765,"name":"Sci-Fi--Fantasy"},{"id":10766,"name":"Soap"},{"id":10767,"name":"Talk"},{"id":10768,"name":"War-Politics"},{"id":37,"name":"Western"}]
var genreId=[];
renderGenreTv();
function renderGenreTv(genre){
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
				getTv(api_url+'&with_genres='+genreId.join(","),genre.name);
				highlightSelection();
				document.querySelector("."+genre.name).classList.add("beautify");
			}
			);
			genreEl.appendChild(t);
			
		})
}
const tvbase_url="https://api.themoviedb.org/3/discover/tv?";
const api_key="api_key=5013eb84105d14670f2ab2198877f9a3";
const api_url=tvbase_url+api_key;
function getTv(url,genrename){
	fetch(url).then(input=>{
		return input.json();
	}).then(data=>{
		showTv(data.results, genrename);
	}).catch(error=>{
		console.log(error);
	})
}

function showTv(data,genrename){
	data.forEach(tv=>{
		const tvEl=document.createElement("div");
		tvEl.classList.add("api-tv")
		tvEl.innerHTML= `
			<img  src=${tv.poster_path? "https://image.tmdb.org/t/p/original/"+tv.poster_path: "https://news.uchicago.edu/sites/default/files/images/2022-10/sgr%20A%2A%20ESO%20and%20M.%20Kornmesser%20690.jpg"} />
			<h3>${tv.original_name}</h3>
		`
		var myNewDiv=document.querySelector("."+genrename);
		myNewDiv.append(tvEl);
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
	fetch("https://api.themoviedb.org/3/search/tv?"+"query="+imp+"&api_key=5013eb84105d14670f2ab2198877f9a3")
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
			<h6>${dataunit.original_name}</h6>
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