import { createApp } from 'vue'
import Programs from '@/components/Programs.vue'
import UISVGIcon from '@/components/global/UISVGIcon'
createApp(Programs)
  .component('UISVGIcon', UISVGIcon)
  .mount('#programs')
