import axios from 'axios'
import { useForm } from 'react-hook-form'

import Close from '/public/icons/close.svg'
import Kebab from '/public/icons/kebab-menu.svg'
import ColumnChip from '@/app/dashboard/[id]/components/ColumnChip'
import Comment from '@/app/dashboard/[id]/components/Comment'
import Button from '@/components/Button'
import Chip from '@/components/Chip'
import ConfirmModalContent from '@/components/ConfirmModalContent'
import DeleteAlertModal from '@/components/DeleteAlertModal'
import Dropdown from '@/components/Dropdown'
import Form from '@/components/Form'
import UserAvatar from '@/components/UserAvatar'
import { useComments } from '@/hooks/useComments'
import api from '@/lib/axiosInstance'
import useModalStore from '@/store/useModalStore'
import type { TaskCard } from '@/types/types'

interface TaskCardContentProps {
  card: TaskCard
  columnTitle: string
  columnId: number
  dashboardId: number
}

interface CommentValue {
  content: string
  cardId: number
  columnId: number
  dashboardId: number
}

export default function TaskCardContent({
  card,
  columnTitle,
  dashboardId,
  columnId,
}: TaskCardContentProps) {
  const { openModal, closeModal } = useModalStore()

  const {
    id: taskCardId,
    title,
    description,
    tags,
    dueDate,
    assignee,
    imageUrl,
    createdAt,
  } = card

  const { comments, loading, error } = useComments(taskCardId)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isLoading },
  } = useForm<CommentValue>({
    defaultValues: {
      cardId: taskCardId,
      columnId: columnId,
      dashboardId: dashboardId,
    },
  })
  const isDisabled = !!(errors.content || isLoading)

  const onEdit = () => {
    closeModal()
    openModal(<div>카드 수정하기 폼</div>)
  }

  const onDelete = async () => {
    closeModal()
    try {
      await api.delete(`cards/${taskCardId}`)
    } catch (error) {
      let errorMessage = ''
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data.message
      } else {
        errorMessage =
          '서버에 문제가 있는거 같아요. 잠시 후에 다시 시도해보시겠어요?'
      }

      openModal(<ConfirmModalContent message={errorMessage} />)
    }
  }

  const onSubmit = async (data: CommentValue) => {
    try {
      await api.post('comments', data)
      setValue('content', '')
    } catch (error) {
      let errorMessage = ''
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data.message
      } else {
        errorMessage =
          '서버에 문제가 있는거 같아요. 잠시 후에 다시 시도해보시겠어요?'
      }
      closeModal()
      openModal(<ConfirmModalContent message={errorMessage} />)
    }
  }

  return (
    <section className='modal-container relative max-w-[730px] p-4 md:px-6 md:py-8'>
      <h2 className='md:text:xl mb-2 mt-10 text-xl font-bold text-custom-black-200 md:mb-6 md:mt-0 md:text-2xl'>
        {title}
      </h2>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-card md:gap-3 xl:gap-6'>
        <div className='rounded-container grid h-16 grid-cols-2 px-4 py-[9px] md:order-2 md:h-[155px] md:w-[180px] md:grid-cols-1'>
          <div className='flex flex-col'>
            <h2 className='mb-1 text-xs font-semibold text-black'>담당자</h2>
            <div className='flex items-center gap-2 text-xs font-normal text-custom-black-200 md:text-sm'>
              <UserAvatar
                card={card}
                className='m-[2px] !h-[22px] !w-[22px] md:mb-[6px] md:!h-8 md:!w-8'
              />
              {assignee && assignee.nickname}
            </div>
          </div>
          <div className='flex flex-col'>
            <h2 className='mb-2 text-xs font-semibold text-black md:mb-[6px]'>
              마감일
            </h2>
            <span className='text-xs font-normal text-custom-black-200 md:text-sm'>
              {dueDate}
            </span>
          </div>
        </div>
        <div className='md:order-1'>
          <div className='mb-4 flex flex-col'>
            <div className='flex gap-3'>
              <ColumnChip>{columnTitle}</ColumnChip>
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
            {description}
          </p>
          <div className='relative mb-6 rounded-md'>
            <img className='rounded-md' src={imageUrl} alt='이미지' />
          </div>
          <Form
            formId='commentForm'
            onSubmit={handleSubmit(onSubmit)}
            className='mb-4 w-full max-w-full md:mb-6'
          >
            <Form.Label className='relative gap-1'>
              <Form.LabelHeader>댓글</Form.LabelHeader>
              <Form.TextArea
                register={register('content', {
                  required: { value: true, message: '댓글을 입력해주세요' },
                })}
                placeholder='댓글 작성하기'
                className='h-[70px] w-full overflow-y-scroll p-3 pr-24 text-xs scrollbar-hide placeholder:text-custom-gray-400 md:h-[110px] md:p-4 md:pr-24 md:text-sm'
              />
              <Button
                form='commentForm'
                color='secondary'
                type='submit'
                className='absolute bottom-3 right-3 hover:bg-custom-gray-100'
                isDisabled={isDisabled}
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
      <Dropdown
        className='right-14 top-4 md:right-[86px] md:top-6'
        position='absolute'
      >
        <Dropdown.Trigger className='flex items-center justify-center'>
          <Kebab className='h-6 w-6 text-custom-black-200 md:h-8 md:w-8' />
        </Dropdown.Trigger>
        <Dropdown.Menu className='w-24 gap-1 p-[6px]'>
          <Dropdown.Item
            className='flex h-8 w-full items-center justify-center hover:bg-custom-light-violet hover:text-custom-violet'
            onClick={onEdit}
          >
            수정하기
          </Dropdown.Item>
          <Dropdown.Item
            className='flex h-8 w-full items-center justify-center hover:bg-custom-light-violet hover:text-custom-violet'
            onClick={() => {
              closeModal()
              openModal(
                <DeleteAlertModal
                  message='정말로 해당 카드를 삭제하시겠습니까?'
                  onDelete={onDelete}
                />
              )
            }}
          >
            삭제하기
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <button
        type='button'
        onClick={closeModal}
        className='absolute right-4 top-4 md:right-8 md:top-6'
      >
        <Close className='h-6 w-6 text-custom-black-200 md:h-8 md:w-8' />
      </button>
    </section>
  )
}
