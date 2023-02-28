// utilities & globals  ..: 

// selector variables
const slides = document.querySelectorAll('.slide')
const prevBtn = document.querySelector('.prev')
const nextBtn = document.querySelector('.next')

// counter variable
let index = slides.length - 1

//  previous and next button functionality ..: 
prevBtn.addEventListener( 'click', () => prevSlide() )
nextBtn.addEventListener( 'click', () => nextSlide() )

let prevSlide = () => {
    // console.log('prev')
    if (index === 0) {
        index = slides.length - 1
        } else {
            index --
        }
    changeSlide()
}      //  add to Anki, 5*s - 

let nextSlide = () => {
    // console.log('next')
    if (index === slides.length - 1) {
        index = 0
        } else {
            index ++
        }
    changeSlide()
}

let changeSlide = () => {
    // console.log(index)

    slides.forEach(item => item.classList.remove('active'))
    slides[index].classList.toggle('active') 

    // show active dot indicator
    let indicators = document.querySelectorAll('.indicatorContainer > div')
            // add to Anki, selector
    indicators.forEach( indicator => {
        indicator.classList.remove('active')
    })
    indicators[index].classList.add('active') 

    // reset slideshow timer on slide change
    resetAutoplay()
}

//  create dot indicators ..: 
const indicatorContainer = document.querySelector('.indicatorContainer')

let buildIndicators = () => {
    // loop/repeat code == number of slides
    for (let i=0; i < slides.length; i++) {

        // create new div
        let element = document.createElement('div')

        // add data attribute based on index number
        element.dataset.i = i + 1
                // add to Anki, 5*s - createElement, dataset

        // add onclick attribute w/ callback function
        element.setAttribute('onclick', 'gotoSlide(this)')

        //  first dot active by default
        if (i == 0) {
            element.classList.toggle('active')
        }

        // add new div as child
        indicatorContainer.appendChild(element)
    }
}

buildIndicators()

// jump to selected slide function ..: 
function gotoSlide(element) {
    let k = element.dataset.i
    index = k-1
    changeSlide()
}

// slideshow autoplay
let timer = setInterval(nextSlide, 4000)

function resetAutoplay() {
    clearInterval(timer)
    timer = setInterval(nextSlide, 4000)
}


//  ========  Reveal on scroll ..:  ==========
let int = 100;

const sr = ScrollReveal({
    distance:'40px',
    duration: 2800,
    // distance: '60px',
    // duration: 2800,
    reset: true
})

sr.reveal(`.section2-p, .section__features, .footer__links, .footer__descr, .section2__button`, {
    origin: 'top',
    interval: int,
})

sr.reveal(`.section__image`, {
    origin: 'left',
})

sr.reveal(`.section2-h1, .section__text__link, .section__text`, {
    origin: 'right',
    interval: int,
}) 

// === Remove loading screen ..: === 
const overlay = document.querySelector('.loading-screen')
const body = document.querySelector('body')

document.addEventListener('DOMContentLoaded', ()=>{
    setTimeout( ()=> {
        overlay.style.opacity = '0'
        // const firstDot = document.querySelector(".indicatorContainer > div:nth-child(1)")
        // gotoSlide(firstDot)
        window.scrollTo(0,0)
        body.style.overflowY = 'auto';
        // overlay.style.display = 'none'

    }, 1000)
    
    setTimeout( () => {
        const firstDot = document.querySelector(".indicatorContainer > div:nth-child(1)")
                // add to Anki, 5*s - selector
        gotoSlide(firstDot)
        resetAutoplay()
    }, 1000)
})