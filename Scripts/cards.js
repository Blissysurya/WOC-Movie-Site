
document.addEventListener('DOMContentLoaded', function () {
    
    const urlParams = new URLSearchParams(window.location.search);
    
    
    const title = urlParams.get('title');
    
    
    const image = urlParams.get('image');
    const paragraph=urlParams.get('para');
   
    const titleElement = document.createElement('h1');
    titleElement.textContent = title;
    const searchDiv=document.createElement("div");
    const paraDiv=document.createElement("div");
    const parag=document.createElement("p");
    parag.textContent=paragraph;

    titleElement.style.color="#ffc300";
   parag.style.color="#ffc300"

    const imgElement = document.createElement('img');
    imgElement.src = image;

    searchDiv.classList.add("searchImage");
    paraDiv.appendChild(parag);
    paraDiv.classList.add("text-block");
    

    const contentDiv = document.getElementById('content');
    contentDiv.appendChild(titleElement);
    searchDiv.appendChild(imgElement);
    contentDiv.appendChild(searchDiv);
    contentDiv.appendChild(paraDiv);
    
});
