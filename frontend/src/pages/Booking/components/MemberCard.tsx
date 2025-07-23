import LocalPhoneRoundedIcon from "@mui/icons-material/LocalPhoneRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
interface MemberCardProps {
  img: string;
  name: string;
  desc: string;
}
export default function MemberCard({ img, name, desc }: MemberCardProps) {
  return (
    <div className="bg-card py-7 px-15 h-[280px] text-center rounded-lg flex-col gap-2 flex relative max-sm:w-full items-center">
      <div className="more absolute top-3 right-3 cursor-pointer">
        <MoreVertRoundedIcon
          className="bg-black text-white rounded-full w-20px h-20px p-2"
          fontSize="large"
        ></MoreVertRoundedIcon>
      </div>
      <img src={img} alt="" className="w-[80px] h-[80px] rounded-full" />
      <h4 className="text-black font-bold text-[25px]">{name}</h4>
      <p className="text-[17px]">{desc}</p>
      <div className="icons flex gap-3">
        <button className="cursor-pointer">
          <LocalPhoneRoundedIcon
            className="bg-black text-white rounded-full w-20px h-20px p-2"
            fontSize="large"
          ></LocalPhoneRoundedIcon>
        </button>
        <button className="cursor-pointer">
          <EmailRoundedIcon
            className="bg-black text-white rounded-full w-20px h-20px p-2"
            fontSize="large"
          ></EmailRoundedIcon>
        </button>
      </div>
    </div>
  );
}
