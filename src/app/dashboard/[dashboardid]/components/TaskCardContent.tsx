import Kebab from '/public/icons/kebab-menu.svg'
import Close from '/public/icons/close.svg'
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
const imgSrc =
  'https://i.namu.wiki/i/DIWQPMFg_xE7JxIv0-4M5PbXco2d-BynsivSWqt6enqDgXOKw0nuZznBUGV-7FtJilQEY7zxodg1kZcYlQXDJw.webp'

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
    <section className='relative max-w-[730px] p-4 md:px-6 md:py-8'>
      <h2 className='md:text:xl mb-2 mt-10 text-xl font-bold text-custom-black-200 md:mb-6 md:mt-0 md:text-2xl'>
        새로운 일정 관리 Taskify
      </h2>
      <div className='md:grid-cols-card grid grid-cols-1 gap-4 md:gap-3 xl:gap-6'>
        <div className='rounded-container grid h-16 grid-cols-2 px-4 py-[9px] md:order-2 md:h-[155px] md:w-[180px] md:grid-cols-1'>
          <div className='flex flex-col'>
            <h2 className='mb-1 text-xs font-semibold text-black'>담당자</h2>
            <div className='flex items-center gap-2 text-xs font-normal text-custom-black-200 md:text-sm'>
              <div className='m-[2px] flex h-[22px] w-[22px] items-center justify-center rounded-full bg-custom-green text-white md:mb-[6px] md:h-8 md:w-8'>
                B
              </div>
              배유철
            </div>
          </div>
          <div className='flex flex-col'>
            <h2 className='mb-2 text-xs font-semibold text-black md:mb-[6px]'>
              마감일
            </h2>
            <span className='text-xs font-normal text-custom-black-200 md:text-sm'>
              2024.09.11 19:00
            </span>
          </div>
        </div>
        <div className='md:order-1'>
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
          <p className='mb-8 text-xs font-normal text-black md:mb-4 md:text-sm'>
            {content}
          </p>
          <div className='relative mb-6 rounded-md'>
            <img className='rounded-md' src={imgSrc} alt='이미지' />
          </div>
          <Form
            formId='commentForm'
            onSubmit={e => {
              e.preventDefault()
              console.log('댓글 제출')
            }}
            className='mb-4 w-full max-w-full md:mb-6'
          >
            <Form.Label className='relative gap-1'>
              <Form.LabelHeader>댓글</Form.LabelHeader>
              <Form.TextArea
                placeholder='댓글 작성하기'
                className='h-[70px] w-full p-3 pr-24 text-xs placeholder:text-custom-gray-400 md:h-[110px] md:p-4 md:pr-24 md:text-sm'
              />
              <Button
                color='secondary'
                type='submit'
                className='absolute bottom-3 right-3'
              >
                입력
              </Button>
            </Form.Label>
          </Form>
          {comments.map(comment => (
            <li key={comment.id}>
              <Comment comment={comment} />
            </li>
          ))}
        </div>
      </div>
      <div className='absolute right-4 top-4 flex items-center gap-4 text-custom-black-200 md:gap-6'>
        <button type='button'>
          <Kebab className='h-5 w-5 md:h-7 md:w-7' />
        </button>
        <button type='button'>
          <Close className='h-6 w-6 md:h-8 md:w-8' />
        </button>
      </div>
    </section>
  )
}
