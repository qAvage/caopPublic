<template lang="pug">
ul.accordion
  li.accordion-item(v-for="i in accordionList")
    .accordion-title.u-no-select(
      @click="toggle(i, accordionList)"
      :class="{'is-active' : i.active}")
      h4 {{ i.title }}
      UISVGIcon(icon="plus")
    transition(
      name="accordion"
      @enter="start"
      @after-enter="end"
      @before-leave="start"
      @after-leave="end")
      .accordion-content(v-if="i.active")
        p {{ i.content }}
</template>

<script>
import UISVGIcon from './global/UISVGIcon'
import axios from 'axios'

export default {
  name: 'AppAccordion',
  components: {
    UISVGIcon
  },
  data () {
    return {
      accordionList: []
    }
  },
  computed: {
  },
  methods: {
    toggle (item, list) {
      if (item.active === false) {
        list.forEach(element => {
          element.active = false
        })
        item.active = true
      } else {
        item.active = false
      }
    },
    start (el) {
      el.style.height = el.scrollHeight + 'px'
    },
    end (el) {
      el.style.height = ''
    }
  },
  mounted () {
    axios
      .get('/json/accordion.json')
      .then(response => { this.accordionList = response.data })
  }
}
</script>
