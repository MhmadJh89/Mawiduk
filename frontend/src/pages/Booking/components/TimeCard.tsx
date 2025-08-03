import { useDispatch } from "react-redux";

interface TimeCardProps {
  time: string;
  onclickFunc: Function;
}
export default function TimeCard({ time, onclickFunc }: TimeCardProps) {
  return (
    <div
      onClick={() => onclickFunc()}
      className="bg-card w-[200px] xl:w-[300px] h-[60px] text-center rounded-lg p-3 text-[24px] max-lg:w-[150px]"
    >
      {time}
    </div>
  );
}
