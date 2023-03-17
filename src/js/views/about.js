import Flickity from 'flickity'
import { debounce } from '../utils'
require('flickity-as-nav-for')

const aboutCarousel = document.querySelector('.about-carousel')
const mainAboutCarousel = aboutCarousel.querySelector('.carousel-about-page')
const navAboutCarousel = aboutCarousel.querySelector('.carousel-nav')
const aboutNavBtn = document.getElementById('about-carousel-buttons')
const aboutPrevBtn = aboutNavBtn.querySelector('.prev')
const aboutNextBtn = aboutNavBtn.querySelector('.next')

const initWindowWidth = window.innerWidth

let flag = ''
/**
 * About-carousel
 *
 */
const flktyAboutCommon = new Flickity(mainAboutCarousel, {
  prevNextButtons: false,
  wrapAround: true,
  on: {
    ready: function () {
      mainAboutCarousel.classList.remove('no-visible')
    }
  }
})

aboutPrevBtn.addEventListener('click', () => {
  flktyAboutCommon.previous()
})
aboutNextBtn.addEventListener('click', () => {
  flktyAboutCommon.next()
})

const initNavFlickity = () => {
  new Flickity(navAboutCarousel, {
    asNavFor: mainAboutCarousel,
    cellAlign: 'left',
    pageDots: false,
    prevNextButtons: false,
    wrapAround: true,
    on: {
      ready: function () {
        navAboutCarousel.classList.remove('no-visible')
      }
    }
  })
}

const destroyNavFlickity = () => {
  new Flickity(navAboutCarousel).destroy()
}

if (initWindowWidth >= 1240) {
  initNavFlickity()
  flag = 'xl'
} else if (initWindowWidth < 1240 && initWindowWidth >= 992) {
  initNavFlickity()
  flag = 'lg'
} else {
  flag = 'sm'
}

window.addEventListener('resize', debounce(e => {
  if (e.target.innerWidth < 1240 && e.target.innerWidth >= 992) {
    if (flag !== 'lg') {
      destroyNavFlickity()
      initNavFlickity()
    }
    flag = 'lg'
  } else if (e.target.innerWidth >= 1240) {
    if (flag !== 'xl') {
      destroyNavFlickity()
      initNavFlickity()
    }
    flag = 'xl'
  } else {
    if (flag !== 'sm') {
      destroyNavFlickity()
    }
    flag = 'sm'
  }
}))
