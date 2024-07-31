import Link from 'next/link'

import RootHeader from '@/layouts/RootHeader'

/**
 * @JuhyeokC
 * @description
 * theme prop 으로 'dark' 를 내려주면 흰색 로고와 텍스트로 적용됩니다.
 */

export default function LandingPage() {
  return (
    <>
      <RootHeader theme='dark'>
        <RootHeader.Features theme='dark'>
          <div className='flex gap-9'>
            <Link href={'/auth/login'}>로그인</Link>
            <Link href={'/auth/sign'}>회원가입</Link>
          </div>
        </RootHeader.Features>
      </RootHeader>
    </>
  )
}
