/**
* ProgramsItem component
*/

import { h, resolveComponent } from 'vue'

const ProgramsItem = ({ program, cards }, { emit }) => {
  const uiIcon = resolveComponent('UISVGIcon')

  const renderOffers = arr => {
    return h('div', { class: 'content' }, arr.map(el => h('div',
      [
        h(uiIcon, { icon: 'ok' }),
        h('span', el)
      ]
    )))
  }

  const renderProgramsCard = (arr, half) => {
    if (half) return renderOffers(arr)
    else {
      const left = arr.slice(0, arr.length / 2)
      const right = arr.slice(arr.length / 2)
      return [renderOffers(left), renderOffers(right)]
    }
  }

  return h('div', { class: 'program' },
    [
      h('div', { class: 'title' },
        [
          h('h2', program.title),
          h('p', program.description)
        ]),
      h('div', { class: 'cards' },
        cards.map(({ title, half, offers, promotion, price }) => h('div', { class: `${half ? 'half' : 'entire'} card` },
          [
            h('div', { class: 'header' },
              [
                h('h3', title),
                h(uiIcon, { icon: 'percent' })
              ]),
            h('div', { class: 'body' }, renderProgramsCard(offers, half)),
            h('div', { class: 'footer' },
              [
                h('button', { class: ['ui-button', 'btn-primary-md'], onClick: () => emit('callCardsPopup', title) }, 'Записаться'),
                h('div', [
                  h('h4', { class: 'cost' }, 'Стоимость:'),
                  h('h4', { class: 'price' }, `${price} ₽`),
                  h('span', { class: 'promotion' }, `${promotion} ₽`)
                ])
              ])
          ])))])
}

ProgramsItem.props = {
  program: {
    type: Object
  },
  cards: {
    type: Array
  }
}

export default ProgramsItem
