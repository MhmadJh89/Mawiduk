import StarIcon from "@mui/icons-material/Star";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import Button from "../../../components/ui/Button";
interface ServiceCardProps {
  img?: string;
  rate?: number;
  name: string;
  desc?: string;
  price?: number;
  isBooked?: boolean;
  id: number | string;
  handleId: Function;
  status: string;
}
export default function ServiceCard({
  img,
  name,
  desc,
  status,
  id,
  handleId,
}: ServiceCardProps) {
  const { t } = useTranslation("Booking");
  return (
    <div className="bg-card rounded-lg pl-10 pr-2 py-2 max-md:p-5 flex flex-col gap-3 w-full">
      <div className="flex gap-10 md:justify-between max-md:flex-col-reverse">
        <div>
          <h4 className="text-[20px]">{name}</h4>
          <p className="text-[13px]">{desc}</p>
        </div>
        <img
          src={img}
          className="w-[200px] h-[111px] rounded-lg max-md:w-full max-md:h-[200px] "
        />
      </div>
      <div className="flex md:gap-10 max-md:flex-col">
        <div>Employee: Ahmed n.</div>
        <div>
          {t("serviceDateT")}: <span>jun 20, 2025</span>
        </div>
      </div>
      <div className="flex justify-end max-md:justify-center">
        {status === "pending" ? (
          <div className="controls flex gap-3 font-bold w-[200px]">
            <Button newStyles="bg-white text-black" onClick={() => {}}>
              Cancel
            </Button>
            <Button newStyles="bg-sec text-black" onClick={() => {}}>
              Edit
            </Button>
          </div>
        ) : status === "completed" ? (
          <div className="text-sec px-6">Service Completed</div>
        ) : status === "cancelled" ? (
          <div className="text-[#C42D2D] px-15 max-xl:px-14 max-lg:px-13">
            Cancelled
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
