import Button from "@/components/Button";

interface InvitationProps {
  id: string;
  title: string;
  nickname: string;
}

export default function Invitation({ id, title, nickname }: InvitationProps) {
  return (
    <div>
      <p>이름</p>
      <p>{title}</p>
      <p>초대자</p>
      <p>{nickname}</p>
      <Button>수락</Button>
      <Button>거절</Button>
    </div>
  )
}