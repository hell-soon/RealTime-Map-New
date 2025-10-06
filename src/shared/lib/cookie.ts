/**
 * Устанавливает cookie.
 * @param name - Имя cookie.
 * @param value - Значение cookie.
 * @param days - Срок жизни cookie в днях.
 */
export function setCookie(name: string, value: string, days: number): void {
  let expires = ''
  if (days) {
    const date = new Date()
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000))
    expires = `; expires=${date.toUTCString()}`
  }
  // Используем SameSite=Lax для безопасности и path=/ чтобы cookie была доступна на всем сайте
  document.cookie = `${name}=${value || ''}${expires}; path=/; SameSite=Lax`
}

/**
 * Получает значение cookie по имени.
 * @param name - Имя cookie.
 * @returns Значение cookie или null, если cookie не найдена.
 */
export function getCookie(name: string): string | null {
  const nameEQ = `${name}=`
  const ca = document.cookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) === ' ')
      c = c.substring(1, c.length)
    if (c.indexOf(nameEQ) === 0)
      return c.substring(nameEQ.length, c.length)
  }
  return null
}
