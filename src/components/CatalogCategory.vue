<template lang="pug">
li.mainCategory(:class="[{ tree: isTree }, { active: activeIs }]")
  span(
    @click="$emit('toggle', idx)"
    ) {{ mainCategory.name }}
  ul.subCategories(
    v-if="isTree")
    li(
      v-show="isOpen"
      v-for="subCategory in subCategories")
      span(@click="$emit('filteredSub', subCategory)") {{ subCategory.name }}
</template>

<script>

export default {
  name: 'catalogCategory',
  props: {
    mainCategory: {
    },
    subCategories: {
    },
    subCategory: {
    },
    idx: {
      type: String,
      default: ''
    },
    isOpen: {
      type: Boolean,
      default: false
    },
    activeIs: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isTree: false
    }
  },
  computed: {
  },
  methods: {
  },
  mounted () {
    if (this.subCategories !== null) this.isTree = true
  }
}
</script>
