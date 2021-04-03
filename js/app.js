import '../sass/style.scss'

class Doggo{
    constructor(){
        this.apiUrl='https://dog.ceo/api';
        this.imgEl=document.querySelector('.featured-dog img');
        this.backgroundEl=document.querySelector('.featured-dog__background');
        this.tilesEl=document.querySelector('.tiles')
        this.spinnerEl = document.querySelector('.spinner')

        this.init();
    }
    showLoading(){
        this.spinnerEl.classList.add('spinner--visible')
    }
    hideLoading(){
        this.spinnerEl.classList.remove('spinner--visible')
    }
    // listBreeds(){
    //    fetch('https://dog.ceo/api/breeds/list/all')
    //     .then(resp=>resp.json())
    //     .then(data=>{
    //         console.log(data);
    //     });
    // }
    // listBreeds()    

    listBreeds(){
        return fetch(`${this.apiUrl}/breeds/list/all`)
        .then(resp=>resp.json())
        .then(data=>data.message);
    }
    //  listBreeds()
    //  .then(breeds=>console.log(breeds)) ----- powyższa funckja posłużyła za api, dostajemy listę ras

    getRandomImage(){
        return fetch(`${this.apiUrl}/breeds/image/random`)
        .then(resp=>resp.json())
        .then(data=>data.message);}    

    // const imgTag = document.querySelector('img');

    // getRandomImage()
    // .then(imgSrc=>imgTag.setAttribute('src', imgSrc)); 
    // //sprawdzenie czy udaje się pobrać img, które dodaliśmy w body "<img src="" alt="">"

    getRandomImageByBreed(breed){
        return fetch(`${this.apiUrl}/breed/${breed}/images/random`)
        .then(resp=>resp.json())
        .then(data=>data.message);}    

    // const imgTag = document.querySelector('img');

    // getRandomImageByBreed('boxer')
    // .then(imgSrc=>imgTag.setAttribute('src', imgSrc)); 
    init(){
        this.showLoading();
        this.getRandomImage()
        .then(img => this.showImageWhenReady(img));
        this.showAllBreads();
    }   

    showImageWhenReady(image){
        this.imgEl.setAttribute('src', image);
        this.backgroundEl.style.backgroundImage=`url("${image}")`;
        this.hideLoading();
    }

    addBreed(breed, subBreed){
        let name;
        let type;
        if(typeof subBreed === 'undefined'){
            name = breed;
            type = breed;
        } else{
            name = `${breed} ${subBreed}`
            type = `${breed}/${subBreed}`
        }
        const tile = document.createElement('div');
        tile.classList.add('tiles__tile');

        const tileContent = document.createElement('div');
        tileContent.classList.add('tiles__tile-content');
        tileContent.innerText = name;
        tileContent.addEventListener('click', () =>{
            window.scrollTo(0,0);
            this.showLoading();
            this.getRandomImageByBreed(type)
            // .then(img => this.showImageWhenReady(img));
        })
        tile.appendChild(tileContent);
        this.tilesEl.appendChild(tile)
    }

    showAllBreads(){
        this.listBreeds()
        .then(breeds=>{
            for(const breed in breeds){
                if(breeds[breed].length===0){
                    this.addBreed(breed)
                } else{
                    for (const subBreed of breeds[breed]){
                        this.addBreed(breed, subBreed)
                    }
                }
            }
        })
    }
    }
document.addEventListener('DOMContentLoaded',()=>{
    new Doggo();
})