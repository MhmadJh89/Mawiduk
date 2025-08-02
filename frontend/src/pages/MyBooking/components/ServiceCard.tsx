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
}
export default function ServiceCard({
  img,
  name,
  desc,
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
        <div className="controls flex gap-3 font-bold w-[200px]">
          <Button newStyles="bg-white text-black" onClick={() => {}}>
            Cancel
          </Button>
          <Button newStyles="bg-sec text-black" onClick={() => {}}>
            Edit
          </Button>
        </div>
      </div>
    </div>
  );
}
