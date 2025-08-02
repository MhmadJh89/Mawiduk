import NavigateButtons from "./NavigateButtons";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import type { RootState } from "../../../redux/store";

interface MyServiceProps {
  img: string;
  name: string;
  desc: string;
  price: number;
}
export default function MyService({ img, name, desc, price }: MyServiceProps) {
  const { t } = useTranslation("Booking");
  const { id, dateId, staffId, dateInfo, timeInfo } = useSelector(
    (state: RootState) => state.serviceId
  );
  const selectedService = useSelector(
    (state: RootState) => state.services
  ).data.find((i) => {
    return i.id === id;
  });
  const selectedStaff = useSelector(
    (state: RootState) => state.staff
  ).data.find((i) => {
    return i.id === staffId;
  });

  useEffect(() => {
    console.log(selectedStaff);
  }, [selectedStaff]);

  return (
    <div
      // style={{boxShadow: "0px 0px 7px 0px #FFFFFF" }}
      className="max-lg:z-50 max-lg:absolute max-lg:top-[50%] max-lg:left-[50%] max-lg:translate-x-[-50%] max-lg:translate-y-[-50%] bg-card w-[250px] max-lg:w-[350px] flex flex-col rounded-lg gap-3  ml-auto col-span-3 "
    >
      <div>
        <img
          src={img}
          className="w-[300px] h-[151px] rounded-lg max-lg:w-full max-lg:h-[200px] mx-auto "
        />
      </div>
      <div className="py-2 px-3 flex flex-col gap-6">
        <h3>{selectedService?.name}</h3>
        <p className="text-[13px]">{desc}</p>
        {selectedStaff && (
          <>
            <span className="block text-end">{selectedStaff?.price} $</span>
            <p>With: {selectedStaff?.name}</p>
          </>
        )}
        {dateInfo && (
          <>
            <p>Date: {dateInfo?.date}</p>
          </>
        )}
        {timeInfo && (
          <>
            <p>Time: {timeInfo?.time}</p>
          </>
        )}
        <hr />
        <div>
          {t("totalT")}: <span>{selectedStaff?.price} $</span>
        </div>
        <div className="max-lg:hidden">
          <NavigateButtons></NavigateButtons>
        </div>
      </div>
    </div>
  );
}
