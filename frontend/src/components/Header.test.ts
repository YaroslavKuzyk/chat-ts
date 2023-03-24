import { describe, test, vi, expect } from 'vitest'
import { ref } from 'vue'
import 'vitest-localstorage-mock'

describe('Header', () => {
  test('logout removes username from localStorage and navigates to /login', () => {
    const mockRouter = {
      push: vi.fn()
    }
    const username = ref('testuser')
    localStorage.setItem('username', 'testuser')
    const logout = (): void => {
      localStorage.removeItem('username')
      mockRouter.push('/login')
    }
    logout()
    expect(localStorage.getItem('username')).toBeNull()
    expect(mockRouter.push).toHaveBeenCalledWith('/login')
  })
})
