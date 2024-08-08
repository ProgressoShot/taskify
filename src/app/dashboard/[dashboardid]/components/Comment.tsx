import Image from 'next/image'

interface Comment {
  id: string
  profileURL: string
  nickName: string
  createdAt: string
  content: string
}

interface CommentProps {
  comment: Comment
}

export default function Comment({ comment }: CommentProps) {
  const { id, profileURL, nickName, createdAt, content } = comment
  return (
    <div className='flex gap-2'>
      <div className='flex h-[26px] w-[26px] items-center justify-center'>
        <div className='relative h-[22px] w-[22px] rounded-full'>
          <img src={profileURL} fill alt='프로필' objectFit='cover' />
        </div>
      </div>
      <div className='flex flex-col'>
        <div className='mb-2 flex justify-center'>
          <h3 className='mr-2 text-xs font-semibold text-custom-black-200'>
            {nickName}
          </h3>
          <span className='text-[10px] font-normal text-custom-gray-400'>
            {createdAt}
          </span>
        </div>
        <p className='mb-2 text-xs font-normal text-custom-black-200'>
          {content}
        </p>
        <div className='flex gap-2'>
          <button
            className='border-none text-[10px] font-normal text-custom-gray-400 underline'
            onClick={() => {
              console.log('수정')
            }}
          >
            수정
          </button>
          <button
            className='border-none text-[10px] font-normal text-custom-gray-400 underline'
            onClick={() => {
              console.log('삭제')
            }}
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  )
}
