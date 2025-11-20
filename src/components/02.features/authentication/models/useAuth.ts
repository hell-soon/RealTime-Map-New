import type { LoginPayload, RegistrationPayload } from '@/stores/auth'
import { useAuthStore } from '@/stores/auth'

export function useAuth() {
  const authStore = useAuthStore()

  const isLoading = ref(false)

  const submit = async (
    action: 'login' | 'register',
    payload: LoginPayload | RegistrationPayload,
  ) => {
    isLoading.value = true

    try {
      if (action === 'login') {
        await authStore.login(payload as LoginPayload)
      }
      else {
        await authStore.registration(payload as RegistrationPayload)
      }
    }

    finally {
      isLoading.value = false
    }
  }

  return {
    isLoading,
    submit,
  }
}
