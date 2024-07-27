import { create } from 'zustand'

// authState 타입 정의
interface AuthState {
  isAuthenticated: boolean
  user: { username: string } | null
  login: (username: string, password: string) => void
  logout: () => void
}

// store 생성
const useAuthStore = create<AuthState>(set => ({
  // store내부 기본값 정의
  isAuthenticated: false,
  user: null,

  // store에서 사용할 기본 메서드 정의
  login: (username, password) => {
    // 임시로 아래 정보로 로그인 했을 때 로그인 처리를 합니다.
    if (username === 'user' && password === 'password') {
      set(() => ({
        isAuthenticated: true,
        user: { username: '유저' },
      }))
    } else {
      alert('로그인 실패')
    }
  },

  logout: () => set({ isAuthenticated: false, user: null }),
}))

// 작성한 store export 외부에서 hook으로 사용
export default useAuthStore
