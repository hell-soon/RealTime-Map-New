import type { LoginPayload, RegistrationPayload } from '@/components/02.features/authentication/model/auth'
import { useAuthStore } from '@/components/02.features/authentication/model/auth'

export function useAuth() {
  const authStore = useAuthStore()
  const error = ref<string | null>(null)
  const isLoading = ref(false)

  const submit = async (
    action: 'login' | 'register',
    payload: LoginPayload | RegistrationPayload,
  ) => {
    isLoading.value = true
    error.value = null

    try {
      if (action === 'login') {
        await authStore.login(payload as LoginPayload)
      }
      else {
        await authStore.registration(payload as RegistrationPayload)
      }
    }
    catch (err: any) {
      error.value = err.message || 'An error occurred'
      throw err
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
