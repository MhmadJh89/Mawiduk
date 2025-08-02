import { useDispatch, useSelector } from "react-redux";
import Button from "../../../components/ui/Button";
import { setStep } from "../../../redux/Booking/slices/stepSlice";
import type { RootState } from "../../../redux/store";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

export default function NavigateButtons() {
  const dispatch = useDispatch();
  const step = useSelector((state: RootState) => state.step.step);
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
    <div className="controls flex gap-3 font-bold ">
      {step > 0 && (
        <Button
          newStyles="bg-white text-black"
          onClick={() => {
            step > 0 ? dispatch(setStep(step - 1)) : "";
          }}
        >
          {t("back")}
        </Button>
      )}
      {
        (step === 0 && selectedService) ||
        (step === 1 && selectedStaff) ||
        (step === 2 && dateInfo && timeInfo) ||
        step === 3 ? (
          <Button
            newStyles="bg-sec text-black"
            onClick={() => {
              if (step === 0 && selectedService) {
                dispatch(setStep(step + 1));
              }
              if (step === 1 && selectedStaff) {
                dispatch(setStep(step + 1));
              }
              if (step === 2 && dateInfo && timeInfo) {
                dispatch(setStep(step + 1));
              }
              if (step === 3) {
                dispatch(setStep(step + 1));
              }
              console.log(step);
            }}
          >
            {t("next")}
          </Button>
        ) : (
          ""
        )

        //   if (step === 1 && selectedStaff) {
        //     dispatch(setStep(step + 1));
        //   }
        //   if (step === 2 && dateInfo && timeInfo) {
        //     dispatch(setStep(step + 1));
        //   }
        //   if (step === 3) {
        //     dispatch(setStep(step + 1));
        //   }

        // <Button
        //   newStyles="bg-sec text-black"
        //   onClick={() => {
        //     if (step === 0 && selectedService) {
        //       dispatch(setStep(step + 1));
        //     }
        //     if (step === 1 && selectedStaff) {
        //       dispatch(setStep(step + 1));
        //     }
        //     if (step === 2 && dateInfo && timeInfo) {
        //       dispatch(setStep(step + 1));
        //     }
        //     if (step === 3) {
        //       dispatch(setStep(step + 1));
        //     }
        //     console.log(step);
        //   }}
        // >
        //   {t("next")}
        // </Button>
      }
    </div>
  );
}
