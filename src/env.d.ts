import type MessageSchema from '@/providers/withI18n'

declare module 'vue-i18n' {
  export interface ComposerCustom {
    message: MessageSchema
  }
}

export { }
