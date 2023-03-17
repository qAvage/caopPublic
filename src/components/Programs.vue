<template lang="pug">
.container
  .heading
    span.ui-title-icon.p-sm Программы
    h1 #[span Программы] нашей клиники
    p Наш медицинский центр предлагает программы диагностики здоровья для мужчин и женщин любых возрастов
  .select-programs.u-no-select
    ProgramsSelectItem.selected-program(
      v-for="program in selectPrograms"
      :program="program"
      :class="{active: currentProgram === program.slug}"
      @choiceProgram="choice($event)")
  transition-group(name="list" tag="div" class="programs")
    ProgramsItem(
      v-for="program in programs"
      :key="program.order"
      :program="program"
      :cards="filtredCards(program.slug)"
      @callCardsPopup="showPopup($event)")
</template>

<script>
import axios from 'axios'
import ProgramsItem from './ProgramsItem'
import ProgramsSelectItem from './ProgramsSelectItem'
import { formKey } from '../js/utils'
import { createApp } from 'vue'
import AppForm from './AppForm.vue'

export default {
  name: 'AppPrograms',
  components: {
    ProgramsItem,
    ProgramsSelectItem
  },
  data () {
    return {
      currentProgram: 'other',
      listPrograms: [],
      cards: []
    }
  },
  computed: {
    selectPrograms () {
      return [
        { slug: 'other', name: 'Акции %', order: 0 },
        { slug: 'for-women', name: 'Для женщин', order: 1 },
        { slug: 'for-men', name: 'Для мужчин', order: 2 }
        // ...this.listPrograms.map(el => ({ ...el }))
      ].sort((a, b) => a.order - b.order)
    },
    programs () {
      return this.listPrograms
        .filter(el => {
          return el.family === this.currentProgram
        })
    }
  },
  methods: {
    choice (slug) {
      this.currentProgram = slug
    },
    filtredCards (certainCard) {
      return this.cards
        .filter(el => el.parent === certainCard)
    },
    showPopup () {
      document.getElementById('form-popup').classList.add('open-popup')
      if (window[formKey] === null) window[formKey] = createApp(AppForm).mount('#app-form-popup')
      document.body.style.overflow = 'hidden'
    }
  },
  mounted () {
    axios
      .get('/json/programs.json')
      .then(({ data: { programs, cards } }) => {
        this.listPrograms = programs
        this.cards = cards
      })
      .catch(() => console.error('Не удалось получить файл настроек'))
  }
}
</script>
