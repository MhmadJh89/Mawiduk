import { useDispatch, useSelector } from "react-redux";
import Button from "../../../components/ui/Button";
import { setStep } from "../../../redux/slices/stepSlice";
import type { RootState } from "../../../redux/store";
import { useTransition } from "react";
import { useTranslation } from "react-i18next";

export default function Confirm() {
  const dispatch = useDispatch();
  const step = useSelector((state: RootState) => state.step.step);
  const { t } = useTranslation("Booking");
  return (
    <div className="col-span-12 flex flex-col gap-20">
      <div className="bg-card w-[700px] p-3 rounded-lg text-[20px] max-lg:w-full">
        <h3>Service Name</h3>
        <p>{t("professional")} : Ahmad M.</p>
        <p>{t("date")} : Monday, March 13</p>
        <p>{t("time")} : 8:00AM</p>
        <p className="font-bold">{t("clientDetails")}</p>
        <p>{t("date")} : Malk Mohamed Elsayed</p>
        <p>{t("phone")} : +20012345678900</p>
        <p>{t("emailPH")} : Malk M.@mail.com </p>
        <p>
          {t("totalT")} : <span>150</span>$
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
            console.log(step);
          }}
        >
          {t("confirmBooking")}
        </Button>
      </div>
    </div>
  );
}
