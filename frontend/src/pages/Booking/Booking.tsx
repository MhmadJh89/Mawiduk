import {
  Step,
  StepLabel,
  Stepper,
  stepConnectorClasses,
  StepConnector,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CustomStepIcon from "./components/CustomStepIcon";
import Services from "./components/Services";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import MyService from "./components/MyService";
import serviceImg from "../../assets/images/barber.jpg";
import Staff from "./components/Staff";
import Details from "./components/Details";
import DateTime from "./components/DateTime";
import Confirm from "./components/Confirm";
import Payment from "./components/Payment";
import Success from "./components/Success";
import { useEffect, useState } from "react";
import Button from "../../components/ui/Button";
import { setStep } from "../../redux/slices/stepSlice";
import PostAddIcon from "@mui/icons-material/PostAdd";
import { CircularProgress } from "@mui/material";
import NavigateButtons from "./components/NavigateButtons";
import Overlay from "../../components/ui/Overlay";
import { useTranslation } from "react-i18next";
import SwitchLang from "../../components/ui/SwitchLang";
import i18n from "../../i18n";

const QontoConnector = styled(StepConnector)(() => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: "23px",
    left: "calc(-50% + 16px)", // يعدل بداية الخط
    right: "calc(50% + 16px)", // يعدل نهاية الخط
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: "#eaeaf0",
    borderTopWidth: 3,
    borderRadius: 1,
  },
}));

export default function Booking() {
  const isRTL = i18n.language === "ar";
  const { t } = useTranslation("Booking");
  const [login, setLogin] = useState(false);
  const step = useSelector((state: RootState) => state.step.step);
  const dispatch = useDispatch();
  const [windowSize, setWindowSize] = useState<number>(window.innerWidth);
  const [showMyService, setShowMyService] = useState<boolean>(false);
  useEffect(() => {
    window.addEventListener("resize", () => {
      setWindowSize(window.innerWidth);
    });
  }, []);

  const switchContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <div className="my-5">
            <h2 className="text-[25px] ">{t("servicePageH")}</h2>
          </div>
        );
      case 1:
        return (
          <div className="my-5">
            <h2 className="text-[25px] ">{t("staffPageH")}</h2>
          </div>
        );
      case 2:
        return (
          <div className="my-5">
            <h2 className="text-[25px]">{t("dateTimeH")}</h2>
          </div>
        );

      case 3:
        return (
          <div className="my-5">
            <h2 className="text-[25px]">{t("detailsH")}</h2>
          </div>
        );
      case 4:
        return (
          <div className="my-5">
            <h2 className="text-[25px]">{t("confirmH")}</h2>
          </div>
        );
      case 5:
        return (
          <div className="my-5">
            <h2 className="text-[40px] max-md:text-[25px]">{t("PaymentH")}</h2>
          </div>
        );
    }
  };
  const HideMyService = () => {
    setShowMyService(false);
  };
  return (
    <div
      className={
        "booking pt-5 pb-20 max-w-[1900px]" +
        " " +
        (showMyService && "h-[100vh] overflow-y-hidden")
      }
    >
      {showMyService && <Overlay onClick={HideMyService} />}
      <div className="spec-container">
        {step <= 4 && (
          <>
            <SwitchLang />
            <h2 className="text-[25px] max-lg:text-[20px]   my-5">
              {t("mainTitle")}
            </h2>
            <div className="circles my-5 rtl:min-lg:translate-x-[55px] ltr:min-lg:translate-x-[-55px] ">
              <Stepper
                activeStep={step}
                alternativeLabel
                connector={<QontoConnector />}
                className="max-w-[900px] rtl:scale-x-[-1]"
                sx={{
                  flexDirection: isRTL ? "row-reverse" : "row",
                }}
              >
                <Step>
                  {/* @ts-expect-error: StepIconComponent is deprecated but still works */}
                  <StepLabel StepIconComponent={CustomStepIcon}></StepLabel>
                </Step>
                <Step>
                  {/* @ts-expect-error: StepIconComponent is deprecated but still works */}
                  <StepLabel StepIconComponent={CustomStepIcon}></StepLabel>
                </Step>
                <Step>
                  {/* @ts-expect-error: StepIconComponent is deprecated but still works */}
                  <StepLabel StepIconComponent={CustomStepIcon}></StepLabel>
                </Step>
                <Step>
                  {/* @ts-expect-error: StepIconComponent is deprecated but still works */}
                  <StepLabel StepIconComponent={CustomStepIcon}></StepLabel>
                </Step>
                <Step>
                  {/* @ts-expect-error: StepIconComponent is deprecated but still works */}
                  <StepLabel StepIconComponent={CustomStepIcon}></StepLabel>
                </Step>
              </Stepper>
            </div>
          </>
        )}
        <div className="">
          <div className="flex justify-between">
            {switchContent(step)}
            {step < 4 && windowSize <= 1024 && (
              <div
                className="flex items-center z-50"
                onClick={() => {
                  setShowMyService(!showMyService);
                }}
              >
                <div className="!w-13 !h-13 relative">
                  <CircularProgress
                    sx={{ color: "#D4AF37" }} // أي كود لون تحبه
                    variant="determinate"
                    value={25 * step}
                    className="absolute !w-full !h-full right-0"
                  />
                  <PostAddIcon
                    className="
                bg-card !w-full !h-full p-3 rounded-full 
                
                "
                    fontSize="small"
                  ></PostAddIcon>
                </div>
              </div>
            )}
          </div>
          {step === 1 && (
            <ul className="flex flex-wrap gap-5 mb-3 max-sm:justify-center max-sm:gap-2  max-sm:text-[13px] text-[#B2BBC6] text-[16px]">
              <li className="cursor-pointer">{t("all")}</li>
              <li className="cursor-pointer">{t("sunday")}</li>
              <li className="cursor-pointer">{t("monday")}</li>
              <li className="cursor-pointer">{t("tuesday")}</li>
              <li className="cursor-pointer">{t("wednesday")}</li>
              <li className="cursor-pointer">{t("thursday")}</li>
              <li className="cursor-pointer">{t("friday")}</li>
              <li className="cursor-pointer">{t("saturday")}</li>
            </ul>
          )}
          <div className="flex gap-10 max-lg:flex-col-reverse min-lg:grid grid-cols-12">
            {step === 0 && <Services />}
            {step === 1 && <Staff />}
            {step === 2 && <DateTime />}
            {step === 3 && <Details />}
            {step === 4 && <Confirm />}
            {step < 4 &&
              !login &&
              (windowSize > 1024 ? (
                <MyService
                  img={serviceImg}
                  name="Service name"
                  desc="Lorem ipsum dolor sit amet consectetur. Ac mauris enim senectus quam
              ipsum ac ipsum sagittis sit. "
                  price={150.0}
                />
              ) : (
                showMyService && (
                  <MyService
                    img={serviceImg}
                    name="Service name"
                    desc="Lorem ipsum dolor sit amet consectetur. Ac mauris enim senectus quam
              ipsum ac ipsum sagittis sit. "
                    price={150.0}
                  />
                )
              ))}
            {step < 4 && login && (
              <div className="controls flex gap-3 font-bold col-span-3 w-full max-sm:w-full mb-auto">
                <Button
                  newStyles="bg-white text-black"
                  onClick={() => {
                    step > 0 ? dispatch(setStep(step - 1)) : "";
                  }}
                >
                  Back
                </Button>
                <Button
                  newStyles="bg-sec text-black"
                  onClick={() => {
                    step <= 4 ? dispatch(setStep(step + 1)) : "";
                    console.log(step);
                  }}
                >
                  Next
                </Button>
              </div>
            )}
            {step === 5 && <Payment />}
            {step === 6 && <Success />}
          </div>
          {step < 4 && windowSize <= 1024 && (
            <div className="flex justify-center fixed bottom-0 left-[50%] translate-x-[-50%]">
              <div className="w-[200px] mb-5">
                <NavigateButtons />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
