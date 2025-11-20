import type { User } from './index.type'

export const userApi = {
  getProfile(): Promise<User> {
    return apiService.get<User>('/user/me', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
  },
}
