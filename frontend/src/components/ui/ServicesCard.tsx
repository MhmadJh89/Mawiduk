import StarIcon from "@mui/icons-material/Star";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { useTranslation } from "react-i18next";
interface ServiceCardProps {
  img: string;
  rate: number;
  name: string;
  desc: string;
  price: number;
  isBooked: boolean;
}
export default function ServiceCard({
  img,
  name,
  desc,
  price,
  rate,
  isBooked,
}: ServiceCardProps) {
  const { t } = useTranslation("Booking");
  const rateArr = Array.from({ length: rate }, (_, i) => i);
  return (
    <div className="bg-card rounded-lg pl-10 pr-2 py-2 max-md:p-5 flex flex-col gap-3 xl:max-w-[963px]">
      <div className="flex gap-10 max-md:flex-col-reverse">
        <div>
          <h4 className="text-[20px]">{name}</h4>
          <p className="text-[13px]">{desc}</p>
        </div>
        <img
          src={img}
          className="w-[200px] h-[111px] rounded-lg max-md:w-full max-md:h-[200px] "
        />
      </div>
      {!isBooked && (
        <div className="stars">
          {rateArr.map((i) => {
            return <StarIcon key={i} className="text-amber-300" />;
          })}
        </div>
      )}
      <div className="flex justify-between">
        {!isBooked ? (
          <>
            <div className="text-[25px]">
              <span>{price}</span>$
            </div>
            <button className="cursor-pointer">
              <AddCircleOutlineOutlinedIcon fontSize="large" />
            </button>
          </>
        ) : (
          <div>
            {t("serviceDateT")}: <span>jun 20, 2025</span>
          </div>
        )}
      </div>
    </div>
  );
}
