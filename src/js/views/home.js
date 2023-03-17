import Flickity from 'flickity'

// Carousel about (common)
const aboutCarousel = document.querySelector('.about-carousel')
const mainAboutCarousel = aboutCarousel.querySelector('.carousel-home-page')
const aboutNavBtn = document.getElementById('about-carousel-buttons')
const aboutPrevBtn = aboutNavBtn.querySelector('.prev')
const aboutNextBtn = aboutNavBtn.querySelector('.next')

const hero = document.getElementById('hero')
const tooltips = hero.querySelectorAll('.tooltip')
const aboutHomeCarousel = document.getElementById('about-home-carousel')

// Doctors carousel (home-page)
const doctorsCardCarousel = document.getElementById('doctors-carousel')

/**
 * About-home-carousel
 *
 */
new Flickity(aboutHomeCarousel, {
  cellAlign: 'left',
  prevNextButtons: false,
  watchCSS: true,
  adaptiveHeight: true,
  wrapAround: true
})

/**
 * About-common-carousel
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

/**
 * Doctors-carousel
 *
 */
new Flickity(doctorsCardCarousel, {
  arrowShape: 'M74.0737 98.0898C71.5052 100.637 67.3409 100.637 64.7725 98.0898L20.9263 54.6116C18.3579 52.0647 18.3579 47.9353 20.9263 45.3884L64.7725 1.91019C67.3409 -0.636711 71.5052 -0.63671 74.0737 1.91019C76.6421 4.45709 76.6421 8.58642 74.0737 11.1333L34.8781 50L74.0737 88.8667C76.6421 91.4136 76.6421 95.5429 74.0737 98.0898Z',
  cellAlign: 'left',
  wrapAround: true
})

// Tooltip

for (let i = 0; i < tooltips.length; i++) {
  const widthTitle = tooltips[i].getElementsByTagName('span')[0].offsetWidth
  const wrapperTooltip = tooltips[i].querySelector('.body')
  wrapperTooltip.style.width = widthTitle + 30 + 'px'
  tooltips[i].addEventListener('mouseover', () => {
    wrapperTooltip.style.height = wrapperTooltip.scrollHeight + 'px'
  })
  tooltips[i].addEventListener('mouseout', () => {
    wrapperTooltip.style.height = 0
  })
}
