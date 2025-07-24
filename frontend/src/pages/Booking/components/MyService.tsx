import NavigateButtons from "./NavigateButtons";
import { useTranslation } from "react-i18next";

interface MyServiceProps {
  img: string;
  name: string;
  desc: string;
  price: number;
}
export default function MyService({ img, name, desc, price }: MyServiceProps) {
  const { t } = useTranslation("Booking");
  
  return (
    <div
      // style={{boxShadow: "0px 0px 7px 0px #FFFFFF" }}
      className="max-lg:z-50 max-lg:absolute max-lg:top-[50%] max-lg:left-[50%] max-lg:translate-x-[-50%] max-lg:translate-y-[-50%] bg-card w-[250px] max-lg:w-[350px] h-[420px] max-lg:h-[430px]  flex flex-col py-2 px-3 rounded-lg gap-3  ml-auto col-span-3 "
    >
      <img
        src={img}
        className="w-[300px] h-[151px] rounded-lg max-lg:w-full max-lg:h-[200px] mx-auto "
      />{" "}
      <h3>{name}</h3>
      <p className="text-[13px]">{desc}</p>
      <span className="block text-end">{price} $</span>
      <hr />
      <div>
        {t("totalT")}: <span>{price} $</span>
      </div>
      <div className="max-lg:hidden">
        <NavigateButtons></NavigateButtons>
      </div>
    </div>
  );
}
