import Image from 'next/image'

import Bullet from '/public/icons/bullet.svg'
import Comment from '@/app/dashboard/[dashboardid]/components/Comment'
import Button from '@/components/Button'
import Chip from '@/components/Chip'
import Form from '@/components/Form'
import useModalStore from '@/store/useModalStore'

interface TaskCardContentProps {}

const tags = ['프로젝트', '일반', '백엔드', '상']
const column = 'To Do'
const content =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum finibus nibh arcu, quis consequat ante cursus eget. Cras mattis, nulla non laoreet porttitor, diam justo laoreet eros, vel aliquet diam elit at leo.'
const imgSrc = '/public/images/example-01'
const comments = [
  {
    id: '1',
    profileURL:
      'https://i.namu.wiki/i/DIWQPMFg_xE7JxIv0-4M5PbXco2d-BynsivSWqt6enqDgXOKw0nuZznBUGV-7FtJilQEY7zxodg1kZcYlQXDJw.webp',
    nickName: '정만철',
    createdAt: '2022.12.27 14:00',
    content: '오늘 안에 만들 수 있을까요?',
  },
]

export default function TaskCardContent() {
  const { closeModal } = useModalStore()

  return (
    <div className='rounded-container'>
      <section className='grid grid-cols-1 p-4 md:px-6 md:py-8'>
        <h2 className='md:text:xl text-xl font-bold text-custom-black-200'>
          새로운 일정 관리 Taskify
        </h2>
        <div className='rounded-container grid h-16 grid-cols-2 items-center gap-4 md:h-[155px] md:grid-cols-1'>
          <div className='flex flex-col'>
            <h2 className='text-xs font-semibold text-black'>담당자</h2>
            <div className='flex text-xs font-normal text-custom-black-200'>
              <div className='h-[26px] w-[26px] rounded-full text-white'>B</div>
              배유철
            </div>
          </div>
          <div className='flex flex-col'>
            <h2 className='text-xs font-semibold text-black'>마감일</h2>
            <span className='text-xs font-normal text-custom-black-200'>
              2024.09.11 19:00
            </span>
          </div>
        </div>
        <div className='mb-4 flex w-full flex-col'>
          <div className='flex gap-3'>
            <div className='flex h-[26px] w-[60px] items-center justify-center gap-[6px] rounded-2xl bg-custom-light-violet text-xs font-normal text-custom-violet'>
              <Bullet />
              {column}
            </div>
            <div className='mt-[3px] h-5 w-[1px] bg-custom-gray-300'></div>
            <div className='flex flex-wrap'>
              {tags.map(tag => (
                <li key={tag}>
                  <Chip>{tag}</Chip>
                </li>
              ))}
            </div>
          </div>
        </div>
        <p className='mb-8 text-xs font-normal text-black'>{content}</p>
        <div className='relative mb-6 rounded-md'>
          <Image fill objectFit='cover' src={imgSrc} alt='이미지' />
        </div>
        <Form
          formId='commentForm'
          onSubmit={() => {
            console.log('댓글 제출')
          }}
          className='mb-4'
        >
          <Form.Label>
            <Form.LabelHeader>댓글</Form.LabelHeader>
            <Form.TextArea />
          </Form.Label>
        </Form>
        {comments.map(comment => (
          <li key={comment.id}>
            <Comment comment={comment} />
          </li>
        ))}
      </section>
    </div>
  )
}
