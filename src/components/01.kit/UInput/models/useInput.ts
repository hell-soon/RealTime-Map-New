import { computed, ref, useAttrs } from 'vue'

export interface UInputProps {
  modelValue: string | number | null
  label?: string
  type?: 'text' | 'password' | 'email' | 'tel'
}

export function useInput(
  props: UInputProps,
  emit: (event: 'update:modelValue', ...args: any[]) => void,
) {
  const attrs = useAttrs()

  const inputId = computed(
    () => (attrs.id as string) || `u-input-${Math.random().toString(36).slice(2, 7)}`,
  )

  const value = computed({
    get: () => props.modelValue,
    set: (val) => {
      emit('update:modelValue', val)
    },
  })

  const isPasswordVisible = ref(false)

  const togglePasswordVisibility = () => {
    isPasswordVisible.value = !isPasswordVisible.value
  }

  const inputType = computed(() => {
    if (props.type === 'password') {
      return isPasswordVisible.value ? 'text' : 'password'
    }
    return props.type || 'text'
  })

  const showPasswordToggle = computed(() => props.type === 'password')

  const isFilled = computed(() => !!props.modelValue)

  return {
    attrs,
    inputId,
    value,
    isFilled,
    inputType,
    isPasswordVisible,
    showPasswordToggle,
    togglePasswordVisibility,
  }
}
