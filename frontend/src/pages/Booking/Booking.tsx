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
import { useState } from "react";
import Button from "../../components/ui/Button";
import { setStep } from "../../redux/slices/stepSlice";

const QontoConnector = styled(StepConnector)(() => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: "35px",
    left: "calc(-50% + 35px)",
    right: "calc(50% + 35px)",
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: "#eaeaf0",
    borderTopWidth: 3,
    borderRadius: 1,
  },
}));

export default function Booking() {
  const [login, setLogin] = useState(false);
  const step = useSelector((state: RootState) => state.step.step);
  const dispatch = useDispatch();
  const switchContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <div className="my-5">
            <h2 className="text-[40px] max-md:text-[25px]">Choose a service</h2>
          </div>
        );
      case 1:
        return (
          <div className="my-5">
            <h2 className="text-[40px] max-md:text-[25px]">
              Select a staff member
            </h2>
            <ul className="flex flex-wrap gap-5 text-[#B2BBC6] text-[20px]">
              <li>All</li>
              <li>Sunday</li>
              <li>Monday</li>
              <li>Tuseday</li>
              <li>Wednesday</li>
              <li>Thursday</li>
              <li>Friday</li>
              <li>Saturday</li>
            </ul>
          </div>
        );
      case 2:
        return (
          <div className="my-5">
            <h2 className="text-[40px] max-md:text-[25px]">Pick date & time</h2>
          </div>
        );

      case 3:
        return (
          <div className="my-5">
            <h2 className="text-[40px] max-md:text-[25px]">
              Enter Your details
            </h2>
          </div>
        );
      case 4:
        return (
          <div className="my-5">
            <h2 className="text-[40px] max-md:text-[25px]">
              Confirm your booking
            </h2>
          </div>
        );
      case 5:
        return (
          <div className="my-5">
            <h2 className="text-[40px] max-md:text-[25px]">Payment Details</h2>
          </div>
        );
    }
  };
  return (
    <div className="booking pt-5 pb-20 ">
      <div className="spec-container">
        {step <= 4 && (
          <>
            {" "}
            <h2 className="text-[40px]  max-md:text-[25px] my-5">
              Book Your Appointment _ Step by Step
            </h2>
            <div className="circles  my-5 min-lg:translate-x-[-55px]">
              <Stepper
                activeStep={step}
                alternativeLabel
                connector={<QontoConnector />}
                className="max-w-[900px]"
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
          {switchContent(step)}

          <div className="flex gap-10 max-lg:flex-col-reverse min-lg:grid grid-cols-12">
            {step === 0 && <Services />}
            {step === 1 && <Staff />}
            {step === 2 && <DateTime />}
            {step === 3 && <Details />}
            {step === 4 && <Confirm />}
            {step < 4 && !login && (
              <MyService
                img={serviceImg}
                name="Service name"
                desc="Lorem ipsum dolor sit amet consectetur. Ac mauris enim senectus quam
            ipsum ac ipsum sagittis sit. Nunc turpis leo sed tincidunt laoreet
            eleifend posuere diam. Leo fames aliquam et quisque sed convallis
            eros varius aliquam."
                price={150.0}
              />
            )}
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
        </div>
      </div>
    </div>
  );
}
