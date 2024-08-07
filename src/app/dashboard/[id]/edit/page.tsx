import Link from 'next/link'

import Button from '@/components/Button'
import Form from '@/components/Form'

export default function DashboardIdEditPage() {
  return (
    <div>
      <Link href='#'>돌아가기</Link>
      <div className='rounded-lg bg-white'>
        <h1> 대시보드 정보</h1>
        <Form>
          <Form.LabelHeader>대시보드 이름</Form.LabelHeader>
          <Form.Input
            type='text'
            required
            placeholder='대시보드 이름을 입력해주세요'
          />
          <div>
            <p>연두</p>
            <p>보라</p>
            <p>노랑</p>
            <p>파랑</p>
            <p>핑크</p>
          </div>
          <Button type='submit'>변경</Button>
        </Form>
      </div>
      <div className='rounded-lg bg-white'>
        <h1>구성원</h1>
        <Form>
          <Form.LabelHeader>대시보드 이름</Form.LabelHeader>
          <Form.Input
            type='text'
            required
            placeholder='대시보드 이름을 입력해주세요'
          />
          <div>
            <p>연두</p>
            <p>보라</p>
            <p>노랑</p>
            <p>파랑</p>
            <p>핑크</p>
          </div>
          <Button type='submit'>변경</Button>
        </Form>
      </div>
      <div className='rounded-lg bg-white'>
        <h1>초대 내역</h1>
        <p>n 페이지 중 n</p>
        <Button type='button'>초대하기</Button>
      </div>
      <Button color='transparent' type='button'>
        대시보드 삭제하기
      </Button>
    </div>
  )
}
