import { useDispatch, useSelector } from "react-redux";
import Button from "../../../components/ui/Button";
import { setStep } from "../../../redux/Booking/slices/stepSlice";
import type { AppDispatch, RootState } from "../../../redux/store";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { createBooking } from "../../../redux/Booking/slices/createBooking";

export default function Confirm() {
  const dispatch = useDispatch<AppDispatch>();
  const step = useSelector((state: RootState) => state.step.step);
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
    console.log({
      date_time: timeInfo.id,
      service: id,
      note: "",
    });
  }, [id]);
  const { t } = useTranslation("Booking");

  return (
    <div className="col-span-12 flex flex-col gap-20">
      <div className="bg-card w-[700px] p-3 rounded-lg text-[20px] max-lg:w-full">
        <h3>{selectedService?.name}</h3>
        <p>
          {t("professional")} : {selectedStaff?.name}
        </p>
        <p>
          {t("date")} : {dateInfo.date}
        </p>
        <p>
          {t("time")} : {timeInfo.time}
        </p>
        <p className="font-bold">{t("clientDetails")}</p>
        <p>{t("name")} : Malk Mohamed Elsayed</p>
        <p>{t("phone")} : +20012345678900</p>
        <p>{t("emailPH")} : Malk M.@mail.com </p>
        <p>
          {t("totalT")} : <span>{selectedStaff?.price}</span>$
        </p>
      </div>
      <div className="controls flex gap-3 font-bold mt-auto m-auto w-[30%] max-xl:w-[55%] max-sm:w-full">
        <Button
          newStyles="bg-white text-black"
          onClick={() => {
            step > 0 ? dispatch(setStep(step - 1)) : "";
          }}
        >
          {t("back")}
        </Button>
        <Button
          newStyles="bg-sec text-black"
          onClick={() => {
            step <= 4 ? dispatch(setStep(step + 1)) : "";
            dispatch(
              createBooking({
                date_time: timeInfo.id,
                service: id,
                note: "",
              })
            );
          }}
        >
          {t("confirmBooking")}
        </Button>
      </div>
    </div>
  );
}
