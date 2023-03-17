<template lang="pug">
.form
  form.u-no-select(
    @submit.prevent="submitForm"
    ref="form"
    @keydown.enter.native="toggleImaskAndValidatePhone('blur')")
    .fields
      .ui-input
        input(
          :class="{error: userNameErr}"
          v-model.trim="name"
          @blur="validateName(flagName)"
          placeholder="Ваше Имя")
        transition(name="error")
          span.p-sm(v-show="userNameErr") {{ userNameErrorText }}
      .ui-input
        input(
          :class="{error: userPhoneErr}"
          v-imask="maskPhone"
          @blur="toggleImaskAndValidatePhone('blur')"
          @focus="toggleImaskAndValidatePhone('focus')"
          @accept="onAccept"
          @complete="onComplete"
          placeholder="Телефон")
        transition(name="error")
          span.p-sm(v-show="userPhoneErr") {{ userPhoneErrorText }}
    .agreement
      button.ui-button.btn-primary-md(type="submit") Записаться
      .ui-checkbox
        .checkbox(
          :class="{error: userAgreementErr, shake: userAgreementShake}"
          @click="agreement = !agreement, userAgreementErr = false, userAgreementShake = false")
          transition(name="error")
            UISVGIcon(
              v-show="agreement"
              icon="checkbox")
        p.p-sm Я ознакомлен и согласен с #[a(href="privacy-policy.pdf" target="_blank") Политикой конфиденциальности]
</template>

<script>
import UISVGIcon from './global/UISVGIcon'
import { IMaskDirective } from 'vue-imask'
import axios from 'axios'
import { popupCloseKey, openSuccessPopup } from '@/js/utils'

export default {
  name: 'AppForm',
  components: {
    UISVGIcon
  },
  data () {
    return {
      name: '',
      phone: '',
      agreement: false,
      userNameValidity: false,
      userNameErrorText: '',
      userPhoneErrorText: '',
      validityPhone: false,
      userPhoneErr: false,
      userNameErr: false,
      userAgreementErr: false,
      userAgreementShake: false,
      flagName: false,
      flagPhone: false,
      min: 2,
      max: 25,
      maskPhone: {
        mask: '+7 (000) 000-00-00',
        lazy: true
      }
    }
  },
  watch: {
    name () {
      this.userNameValidity = false
      this.flagName = true
      this.userNameErr = false
    },
    phone () {
      if (!this.validityPhone) {
        this.flagPhone = true
        this.userPhoneErr = false
      }
    }
  },
  methods: {
    isRequired (v, allowZero = false) {
      if (v === undefined || v === null) return false
      if (typeof v === 'boolean') return v
      if (typeof v === 'number' && !allowZero) return !!v
      return !!v.length
    },
    isBetween (length, min, max) { return length >= min && length <= max },
    isLetter (str) {
      return /^[a-zA-Zа-яА-ЯЁё]+$/.test(str)
    },
    onAccept (e) {
      this.phone = e.detail.unmaskedValue
      this.validityPhone = false
    },
    onComplete (n) {
      this.validityPhone = true
      this.userPhoneErr = false
      this.userPhoneErrorText = ''
      this.phone = n.detail.value
    },
    validateName (flag, callback = () => true) {
      if (!this.isRequired(this.name) && flag) {
        this.userNameErrorText = 'Поле, обязательное для заполнения'
        this.userNameErr = true
      } else if (this.name.length < this.min && flag) {
        this.userNameErrorText = `Имя должно содержать минимум ${this.min} символа`
        this.userNameErr = true
      } else if (this.name.length > this.max && flag) {
        this.userNameErrorText = `Имя должно содержать максимум ${this.max} символов`
        this.userNameErr = true
      } else if (!this.isLetter(this.name) && flag) {
        this.userNameErrorText = 'Имя должно содержать только буквы'
        this.userNameErr = true
      } else {
        this.userNameValidity = true
        callback()
      }
    },
    validatePhone () {
      if (!this.phone) {
        this.userPhoneErrorText = 'Поле, обязательное для заполнения'
        this.userPhoneErr = true
      }
    },
    toggleImaskAndValidatePhone (type) {
      if (type === 'blur' && !this.validityPhone && this.flagPhone) {
        if (this.phone === '') {
          this.userPhoneErrorText = 'Поле, обязательное для заполнения'
        } else if (!this.validityPhone) {
          this.userPhoneErrorText = 'Введите корректный номер телефона'
        }
        this.userPhoneErr = true
      }
      if (type === 'focus' && !this.validityPhone) {
        this.maskPhone = {
          mask: '+7 (000) 000-00-00',
          lazy: false
        }
      }
    },
    validateAgreement () {
      if (this.userNameValidity && this.validityPhone && !this.agreement) {
        this.userAgreementErr = true
        if (!this.userAgreementShake) {
          this.userAgreementShake = true
          setTimeout(() => { this.userAgreementShake = false }, 1e3)
        }
      }
    },
    resetForm () {
      this.$refs.form.reset()
      this.name = ''
      this.phone = ''
      this.agreement = false
      this.flagPhone = false
    },
    submitForm () {
      this.validateName(true, this.validatePhone)
      this.validateAgreement()
      if (this.userNameValidity && this.validityPhone && this.agreement) {
        const form = {
          name: this.name,
          phone: this.phone
        }
        axios
          .post('/mail.php', form)
          .then(() => {
            this.resetForm()
            window[popupCloseKey]()
            window.ym(84287290, 'reachGoal', 'forma-zapisi')
            setTimeout(() => window[openSuccessPopup](), 400)
          })
      }
    }
  },
  directives: {
    imask: IMaskDirective
  }
}

</script>
