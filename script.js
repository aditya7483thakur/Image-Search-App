const accesskey = "OzK2UW9kw61pwDGkB_VwaDExPfloDJMkAady2V0Xp6c"

const input_form = document.querySelector("form")
const outer = document.getElementById("outer")
const input_search = document.querySelector("input")
const show_more = document.querySelector(".show-more")
const outerdiv = document.getElementsByClassName("outerdiv")
const heading = document.getElementsByClassName("heading")

let inputData = ""
let page = 1;

console.log(input_form)
console.log(outer)
console.log(show_more)

const searchImages = async()=>{
    inputData = input_search.value
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accesskey}`
    const response = await fetch(url);
    const data = await response.json();

    const results = data.results

    if(page===1){
        outer.innerHTML = "";
    }

    outerdiv[0].classList.remove("outerdiv")
    heading[0].classList.remove("second")
    heading[0].classList.add("first")

    results.map((result)=>{

        // search-result class created
        const imageWrapper = document.createElement('div')
        imageWrapper.classList.add("search-result")

        //image tag access and set
        const image = document.createElement('img')
        image.src = result.urls.small
        image.alt = result.alt_description

        // anchor tag access and set
        const imageLink = document.createElement("a")
        imageLink.href = result.links.html
        imageLink.target = "_blank"
        imageLink.textContent = result.alt_description

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        outer.appendChild(imageWrapper);
        
    });

    page++
    if(page>1){
        show_more.style.display = "block"
    }
}

input_form.addEventListener("submit",(event)=>{
    event.preventDefault()
    page=1;
    searchImages()
})

show_more.addEventListener("click",(event)=>{
    searchImages()
})
