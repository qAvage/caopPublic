<template lang="pug">
.catalog-wrap
  .container-xl
    .title
      h2 Стоимость услуг нашей клиники
      p Наша клиника предлагает ознакомиться с ценами на услуги врачей различной направленности
    .content
      .categories-wraper(v-show="isShowCategories")
        .categories.u-no-select
          ul
            CatalogCategory(
              v-for="mainCategory in mainCategories"
              :idx="mainCategory.order"
              :isOpen="mainCategory.order === opened"
              :activeIs="mainCategory.order === isActive"
              :key="mainCategory.order"
              :mainCategory="mainCategory"
              :subCategories="filteredSubCategories(mainCategory.slug)"
              @toggle="onToggle($event, mainCategory)"
              @filteredSub="show($event)"
            )
      .filter(@click="showCategories()")
        //- UISVGIcon(icon="filter")
        span Фильтр
      .search-wrapper
        input(type="text" placeholder="Поиск" v-model="search")
      .wrapper
        .analyzes(:class="[{showCategories: isShowCategories}, currentWindowWidth > 900 ? 'scroll-bar' : '']")
          span.note(v-if="this.filteredList <= 0") Выберите категорию услуг
          ul
            li(v-for="i in filteredList")
              .name
                span {{ i.name }}
              .price
                span {{ i.price + ' ₽' }}
</template>

<script>
import axios from 'axios'
import CatalogCategory from '@/components/CatalogCategory.vue'
import UISVGIcon from './global/UISVGIcon'

export default {
  name: 'appCatalog',
  components: {
    CatalogCategory,
    UISVGIcon
  },
  data () {
    return {
      currentWindowWidth: '',
      search: '',
      analyzes: [],
      categories: [],
      mainCategories: [],
      subCategories: [],
      opened: '',
      isActive: '',
      everyIsActive: false,
      isShowCategories: true,
      currentAnalyzes: [],
      note: false
    }
  },
  computed: {
    filteredList () {
      return this.currentAnalyzes.filter(e => {
        return e.name.toLowerCase().includes(this.search.toLocaleLowerCase())
      })
    },
    filteredCat () {
      return this.categories.filter(e => {
        return e.parent === null
      })
    }
  },
  methods: {
    onActive () {
      this.search = ''
      this.opened = ''
      this.isActive = ''
      this.everyIsActive = true
      this.currentAnalyzes = this.analyzes
      if (this.currentWindowWidth <= 600) {
        this.isShowCategories = false
      }
    },
    onToggle (id, q) {
      this.search = ''
      const test = this.subCategories.filter(e => {
        return q.slug === e.parent
      })
      if (test.length > 0) {
        const ee = test.map(e => e.slug)
        ee.push(q.slug)
        const subSub = []
        for (const el of ee) {
          const newArra = this.analyzes.filter(e => {
            return e.categorie === el
          })
          for (const i of newArra) {
            subSub.push(i)
          }
        }
        this.currentAnalyzes = subSub
      } else {
        this.currentAnalyzes = this.analyzes.filter(e => {
          return q.slug === e.categorie
        })
        if (this.currentWindowWidth <= 600) {
          this.isShowCategories = false
        }
      }
      this.everyIsActive = false
      if (this.opened === id) this.opened = ''
      else this.opened = id
      if (this.isActive !== id) this.isActive = id
    },
    filteredSubCategories (q) {
      const qwe = this.categories.filter(e => {
        return q === e.parent
      })
      if (qwe.length <= 0) {
        return null
      } else {
        return qwe
      }
    },
    show (q) {
      this.search = ''
      this.currentAnalyzes = this.analyzes.filter(e => {
        return q.slug === e.categorie
      })
      if (this.currentWindowWidth <= 600) {
        this.isShowCategories = false
      }
    },
    showCategories () {
      this.isShowCategories = !this.isShowCategories
    }
  },
  created () {
    this.currentWindowWidth = window.innerWidth
    if (this.currentWindowWidth <= 600) {
      this.note = true
      this.isShowCategories = false
    }
    const debounce = (func, wait, immediate) => {
      let timeout
      return () => {
        const context = this
        const args = arguments
        const later = function () {
          timeout = null
          if (!immediate) func.apply(context, args)
        }
        const callNow = immediate && !timeout
        clearTimeout(timeout)
        timeout = setTimeout(later, wait)
        if (callNow) func.apply(context, args)
      }
    }
    window.addEventListener('resize', debounce(function qwe () {
      this.currentWindowWidth = window.innerWidth
      if (this.currentWindowWidth <= 600 && this.note === false) {
        this.isShowCategories = false
        this.note = true
      } else if (this.currentWindowWidth > 600) {
        this.isShowCategories = true
        this.note = false
      }
    }, 200, false), false)
  },
  async mounted () {
    await axios
      .get('/json/services.json')
      .then(response => (
        this.services = response.data
      ))
    this.analyzes = this.services.analyzes
    this.categories = this.services.categories
    this.mainCategories = this.categories.filter(e => {
      return e.parent === null
    })
    this.subCategories = this.categories.filter(e => {
      return e.parent !== null
    })
    this.currentAnalyzes = this.analyzes.filter(e => {
      return e.current === true
    })
  }
}
</script>
