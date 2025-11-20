<script setup lang="ts">
import type { FormInst } from 'naive-ui'
import {
  NButton,
  NForm,
  NFormItem,
  NInput,
} from 'naive-ui'
import { useI18n } from 'vue-i18n'
import { useAuth } from '../models/useAuth'

const { submit } = useAuth()

const formRef = ref<FormInst | null>(null)
const formValue = ref({
  username: '',
  password: '',
})

const { t } = useI18n()

const rules = {
  username: {
    required: true,
    message: t('form.username.error'),
    trigger: 'blur',
  },
  password: {
    required: true,
    message: t('form.password.error'),
    trigger: 'blur',
  },
}

function handleValidateClick() {
  formRef.value?.validate((errors) => {
    if (errors) {
      console.error(errors)
    }
    else {
      submit('login', formValue.value)
    }
  })
}
</script>

<template>
  <n-form
    ref="formRef"
    :model="formValue"
    :rules="rules"
  >
    <n-form-item
      path="username"
    >
      <n-input
        v-model:value="formValue.username"
        :placeholder="t('form.username.title')"
      />
    </n-form-item>

    <n-form-item
      path="password"
    >
      <n-input
        v-model:value="formValue.password"
        type="password"
        show-password-on="click"
        :placeholder="t('form.password.title')"
      />
    </n-form-item>
    <n-form-item>
      <n-button @click="handleValidateClick">
        {{ t('buttons.login') }}
      </n-button>
    </n-form-item>
  </n-form>
</template>
