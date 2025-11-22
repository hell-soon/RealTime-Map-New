<script setup lang="ts">
import type { UInputProps } from '../models/useInput'
import { useInput } from '../models/useInput'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<UInputProps>(), {
  modelValue: '',
  label: '',
})

const emit = defineEmits(['update:modelValue'])

const {
  attrs,
  inputId,
  value,
  isFilled,
  inputType,
  isPasswordVisible,
  showPasswordToggle,
  togglePasswordVisibility,
} = useInput(props, emit)
</script>

<template>
  <div
    class="u-input-wrapper"
    :class="{
      'is-filled': isFilled,
      'has-suffix': showPasswordToggle,
    }"
  >
    <input
      v-bind="attrs"
      :id="inputId"
      v-model="value"
      :type="inputType"
      class="u-input"
      placeholder=" "
    >

    <label
      :for="inputId"
      class="u-input-label"
    >
      {{ label }}
    </label>

    <button
      v-if="showPasswordToggle"
      type="button"
      class="u-input-password-toggle"
      tabindex="-1"
      @click="togglePasswordVisibility"
    >
      <svg
        v-if="isPasswordVisible"
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle
          cx="12"
          cy="12"
          r="3"
        />
      </svg>

      <svg
        v-else
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07-2.3 2.3" />
        <line
          x1="1"
          y1="1"
          x2="23"
          y2="23"
        />
      </svg>
    </button>
  </div>
</template>

<style lang="scss" scoped>
.u-input-wrapper {
  position: relative;
  width: 100%;

  font-family: inherit;
}

.u-input {
  width: 100%;
  border: none;
  border-bottom: 1px solid var(--n-border-color, #ccc);
  padding: 20px 0 5px 0;
  background-color: transparent;
  font-size: 1rem;
  color: var(--text-color, #000);
  outline: none;
  transition: border-color 0.2s ease;

  .u-input-wrapper.has-suffix & {
    padding-right: 30px;
  }

  &:focus {
    border-bottom-color: var(--primary-color, #3498db);
  }

  &::-ms-reveal,
  &::-ms-clear {
    display: none;
  }
}

.u-input-label {
  position: absolute;
  top: 15px;
  left: 0;
  color: var(--n-text-color-disabled, #aaa);
  pointer-events: none;
  transition: all 0.2s ease;
  font-size: 1rem;
}

.u-input:focus ~ .u-input-label,
.u-input-wrapper.is-filled .u-input-label {
  top: -5px;
  left: 0;
  font-size: 0.8rem;
  color: var(--primary-color, #3498db);
}

.u-input-password-toggle {
  position: absolute;
  right: 0;
  bottom: 8px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  color: var(--n-text-color-disabled, #aaa);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s;

  &:hover {
    color: var(--primary-color, #3498db);
  }

  &:focus {
    outline: none;
    color: var(--primary-color, #3498db);
  }
}
</style>
