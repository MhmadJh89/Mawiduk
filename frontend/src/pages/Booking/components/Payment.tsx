import { useDispatch, useSelector } from "react-redux";
import Button from "../../../components/ui/Button";
import { setStep } from "../../../redux/slices/stepSlice";
import type { RootState } from "../../../redux/store";
import payImg from "../../../assets/images/pay.jpg";
import { useTranslation } from "react-i18next";
export default function Payment() {
  const dispatch = useDispatch();
  const step = useSelector((state: RootState) => state.step.step);
  const { t } = useTranslation("Booking");
  return (
    <div className="col-span-12 flex gap-10">
      <div className="w-[60%]  max-md:w-[100%]">
        <form action="" className="flex flex-col gap-6 mb-20">
          <input
            type="text"
            className="focus-visible:outline-none p-2 border-solid border-b-1 w-[80%] max-md:w-[100%] text-[20px]"
            placeholder={t("cardNamePH")}
          />
          <input
            type="text"
            className="focus-visible:outline-none p-2 border-solid border-b-1 w-[80%] max-md:w-[100%] text-[20px]"
            placeholder={t("cardNumberPH")}
          />
          <input
            type="text"
            className="focus-visible:outline-none p-2 border-solid border-b-1 w-[80%] max-md:w-[100%] text-[20px]"
            placeholder={t("expireDatePH")}
          />
          <input
            type="text"
            className="focus-visible:outline-none p-2 border-solid border-b-1 w-[80%] max-md:w-[100%] text-[20px]"
            placeholder="CVV"
          />
          <div className="text-[40px] max-md:text-[25px]">{t("or")}</div>
          <input
            type="text"
            className="focus-visible:outline-none p-2 border-solid border-b-1 w-[80%] max-md:w-[100%] text-[20px]"
            placeholder={t("vodafonePH")}
          />
        </form>
        <div className="controls flex gap-5 w-[55%] max-xl:w-[315px] font-bold mt-auto mr-auto min-md:ml-10  max-md:w-full">
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
              step <= 6 ? dispatch(setStep(step + 1)) : "";
              console.log(step);
            }}
          >
            {t("confirmPayment")}
          </Button>
        </div>
      </div>
      <div className="overflow-hidden w-[340px] max-md:w-full h-[470px] rounded-lg rotate-5 max-md:hidden">
        <img
          src={payImg}
          alt=""
          className=" w-[800px] h-[470px] max-w-none rtl:translate-x-[250px] ltr:translate-x-[-250px]"
        />
      </div>
    </div>
  );
}
