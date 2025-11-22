import type { FormInst, FormRules } from 'naive-ui'
import { useI18n } from 'vue-i18n'
import { useAuth } from './useAuth'

export type AuthMode = 'login' | 'register'

export function useAuthForm() {
  const { t } = useI18n()
  const { submit, isLoading } = useAuth()

  const formRef = ref<FormInst | null>(null)

  const authMode = ref<AuthMode>('login')

  const formValue = ref({
    username: '',
    email: '',
    password: '',
    repeatPassword: '',
  })

  const rules = computed<FormRules>(() => {
    const baseRules = {
      username: {
        required: true,
        message: t('form.username.error'),
        trigger: ['input', 'blur'],
      },
      password: {
        required: true,
        message: t('form.password.error'),
        trigger: ['input', 'blur'],
      },
    }

    if (authMode.value === 'register') {
      return {
        ...baseRules,
        email: {
          required: true,
          trigger: ['input', 'blur'],
          validator: (_rule, value) => {
            if (!value) {
              return new Error(t('form.email.required'))
            }
            const emailRegex = /^[^\s@]+@[^\s@][^\s.@]*\.[^\s@]+$/
            if (!emailRegex.test(value)) {
              return new Error(t('form.email.invalid'))
            }
            return true
          },
        },
        repeatPassword: {
          required: true,
          trigger: ['input', 'blur'],
          validator: (_rule, value) => {
            if (!value) {
              return new Error(t('form.repeatPassword.error'))
            }
            if (value !== formValue.value.password) {
              return new Error(t('form.repeatPassword.mismatchError'))
            }
            return true
          },
        },
      }
    }

    return baseRules
  })

  const submitButtonText = computed(() =>
    authMode.value === 'login' ? t('buttons.login') : t('buttons.createAccount'),
  )

  const handleTabChange = (value: string) => {
    authMode.value = value as AuthMode
    formValue.value = {
      username: '',
      email: '',
      password: '',
      repeatPassword: '',
    }
    formRef.value?.restoreValidation()
  }

  const handleValidateClick = (e: MouseEvent) => {
    e.preventDefault()

    formRef.value?.validate((errors) => {
      if (!errors) {
        const payload = {
          username: formValue.value.username,
          password: formValue.value.password,
          ...(authMode.value === 'register' ? { email: formValue.value.email } : {}),
        }

        submit(authMode.value, payload)
      }
      else {
        console.error(errors)
      }
    })
  }

  return {
    formRef,
    formValue,
    rules,
    authMode,
    submitButtonText,
    isLoading,
    handleTabChange,
    handleValidateClick,
  }
}
