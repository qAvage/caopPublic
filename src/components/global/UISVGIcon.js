/**
 * UISVGIcon component
 *
 * @description - Watch for the appropriate icon name from the sprite.svg
 */

import { h } from 'vue'

const UISVGIcon = ({ icon }) => {
  const use = h('use', { 'xlink:href': require('@/assets/images/sprite.svg') + `#${icon}` })
  return h('i', { class: 'ui-icon' }, h('svg', use))
}

UISVGIcon.props = {

  // Icon name from SVG sprite
  icon: {
    type: String,
    default: 'cross'
  }

}

export default UISVGIcon
