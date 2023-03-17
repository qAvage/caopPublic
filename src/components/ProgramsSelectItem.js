/**
 * ProgramsSelectItem component
 */

import { h } from 'vue'

const ProgramsSelectItem = ({ program }, { emit }) => {
  return h('div', { onClick: () => emit('choiceProgram', program.slug) }, h('span', program.name))
}

ProgramsSelectItem.props = {
  program: {
    type: Object
  }
}

export default ProgramsSelectItem
