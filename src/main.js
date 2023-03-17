import { formKey, popupCloseKey, openSuccessPopup } from './js/utils'
import { createApp } from 'vue'
import Flickity from 'flickity'
import Accordion from './components/Accordion.vue'
import AppForm from './components/AppForm.vue'

document.addEventListener('DOMContentLoaded', () => {
  const body = document.body
  const header = document.getElementById('the-header')
  const burger = document.getElementById('burger')
  const mobileOverlay = document.getElementById('mobile-overlay')
  const reviewsCarousel = document.getElementById('reviews-carousel')
  const btnTriggerPopup = document.querySelectorAll('.trigger-popup')
  const cookieModal = document.getElementById('cookie-modal')
  const cookieAcceptBtn = document.getElementById('cookie-accept-btn')
  const locationPage = window.location.pathname.split('.html')[0].split('/')[1]
  const navLinks = document.querySelectorAll('[data-page-name]')
  const popups = [
    document.getElementById('form-popup'),
    document.getElementById('success-popup')
  ]
  const servicesCardCarousel = document.getElementById('services-carousel')

  window[formKey] = null
  window[popupCloseKey] = null
  window[openSuccessPopup] = null

  // ---------------------------------------------------------------------------
  // Current nav links
  // ---------------------------------------------------------------------------
  for (let i = 0; i < navLinks.length; i++) {
    if (navLinks[i].dataset.pageName === locationPage) {
      navLinks[i].classList.add('active')
    }
  }

  // ---------------------------------------------------------------------------
  // Mobile menu
  // ---------------------------------------------------------------------------
  /**
   * Toggle mobile menu
   * @description Show or hide mobile menu with overlay on button (burger click)
   */
  let isOpenedMobileMenu = false

  function scrollMenuTrigger () {
    if (window.scrollY > 580) closeMobileMenu()
  }
  const openMobileMenu = () => {
    isOpenedMobileMenu = true
    header.classList.add('opened')
    mobileOverlay.classList.add('overlay')
    window.addEventListener('scroll', scrollMenuTrigger)
  }
  const closeMobileMenu = () => {
    header.classList.remove('opened')
    window.removeEventListener('scroll', scrollMenuTrigger)
    isOpenedMobileMenu = false
  }
  burger.addEventListener('click', function () {
    if (!header.classList.contains('opened')) {
      openMobileMenu()
    } else {
      closeMobileMenu()
    }
  })
  mobileOverlay.addEventListener('click', () => {
    closeMobileMenu()
  })

  // ---------------------------------------------------------------------------
  // Carousel
  // ---------------------------------------------------------------------------
  /**
   * Services-carousel
   *
   */
  if (servicesCardCarousel) {
    new Flickity(servicesCardCarousel, {
      arrowShape: 'M74.0737 98.0898C71.5052 100.637 67.3409 100.637 64.7725 98.0898L20.9263 54.6116C18.3579 52.0647 18.3579 47.9353 20.9263 45.3884L64.7725 1.91019C67.3409 -0.636711 71.5052 -0.63671 74.0737 1.91019C76.6421 4.45709 76.6421 8.58642 74.0737 11.1333L34.8781 50L74.0737 88.8667C76.6421 91.4136 76.6421 95.5429 74.0737 98.0898Z',
      cellAlign: 'left',
      wrapAround: true
    })
  }

  /**
 * Reviews-carousel
 *
 */
  new Flickity(reviewsCarousel, {
    arrowShape: 'M74.0737 98.0898C71.5052 100.637 67.3409 100.637 64.7725 98.0898L20.9263 54.6116C18.3579 52.0647 18.3579 47.9353 20.9263 45.3884L64.7725 1.91019C67.3409 -0.636711 71.5052 -0.63671 74.0737 1.91019C76.6421 4.45709 76.6421 8.58642 74.0737 11.1333L34.8781 50L74.0737 88.8667C76.6421 91.4136 76.6421 95.5429 74.0737 98.0898Z',
    cellAlign: 'left',
    wrapAround: true
  })

  // ---------------------------------------------------------------------------
  // Open popup
  // ---------------------------------------------------------------------------

  const openPopup = () => {
    if (isOpenedMobileMenu) closeMobileMenu()
    popups[0].classList.add('open-popup')
    body.style.overflow = 'hidden'
  }

  window[popupCloseKey] = () => {
    for (let i = 0, l = popups.length; i < l; i++) popups[i].classList.remove('open-popup')
    body.style.overflow = 'visible'
  }

  for (let i = 0; i < btnTriggerPopup.length; i++) {
    btnTriggerPopup[i].addEventListener('click', e => {
      e.preventDefault()
      e.stopPropagation() // TODO: Прочитать про stoppropagation после preventdefault (надо ли)
      if (window[formKey] === null) window[formKey] = createApp(AppForm).mount('#app-form-popup')
      openPopup()
    })
  }

  for (let i = 0, l = popups.length; i < l; i++) {
    const closeTriggers = [
      popups[i].querySelector('.close'),
      popups[i].querySelector('.popup-overlay')
    ]
    closeTriggers.forEach(e => e.addEventListener('click', window[popupCloseKey]))
  }

  window[openSuccessPopup] = () => {
    popups[1].classList.add('open-popup')
    setTimeout(() => popups[1].classList.remove('open-popup'), 3000)
  }

  // ---------------------------------------------------------------------------
  // Instanses vue
  // ---------------------------------------------------------------------------
  createApp(AppForm).mount('#app-form')
  createApp(Accordion).mount('#accordion')

  // ---------------------------------------------------------------------------
  // Cookie confirm
  // ---------------------------------------------------------------------------
  if (localStorage.getItem('cookie-agreement') !== 'confirmed') {
    cookieModal.classList.remove('hide-cookie')
  }
  cookieAcceptBtn.addEventListener('click', () => {
    localStorage.setItem('cookie-agreement', 'confirmed')
    cookieModal.classList.add('hide-cookie')
  })
})

window.addEventListener('load', () => {
  const preload = document.querySelectorAll('.u-preload')
  for (const el of preload) {
    el.classList.remove('u-preload')
  }
})

// Adding a js file to a specific page
let location = window.location.pathname.split('.html')[0]
const nesting = location.split('/')

if (location.slice(-1) !== '/') location += '/'

if (location === '/') import(/* webpackChunkName: "home" */ './js/views/home')
if (location === '/services/') import(/* webpackChunkName: "services" */ './js/views/services')
if (location === '/programs/') import(/* webpackChunkName: "programs" */ './js/views/programs')
if (location === '/price/') import(/* webpackChunkName: "price-list" */ './js/views/price')
if (location === '/doctors/') import(/* webpackChunkName: "doctors" */ './js/views/doctors')
if (location === '/about/') import(/* webpackChunkName: "about" */ './js/views/about')
if (location === '/contacts/') import(/* webpackChunkName: "contacts" */ './js/views/contacts')

if (nesting[1] === 'services' && nesting.length > 2) import(/* webpackChunkName: "each-service" */ './js/views/each-service')
