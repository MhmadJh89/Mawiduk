import { useDispatch, useSelector } from "react-redux";
import Button from "../../../components/ui/Button";
import { setStep } from "../../../redux/slices/stepSlice";
import type { RootState } from "../../../redux/store";
import payImg from "../../../assets/images/pay.jpg";
export default function Payment() {
  const dispatch = useDispatch();
  const step = useSelector((state: RootState) => state.step.step);

  return (
    <div className="col-span-12 flex gap-10">
      <div className="w-[60%]  max-md:w-[100%]">
        <form action="" className="flex flex-col gap-6 mb-20">
          <input
            type="text"
            className="focus-visible:outline-none p-2 border-solid border-b-1 w-[80%] max-md:w-[100%] text-[20px]"
            placeholder="Enter Name on Card"
          />
          <input
            type="text"
            className="focus-visible:outline-none p-2 border-solid border-b-1 w-[80%] max-md:w-[100%] text-[20px]"
            placeholder="Card Number"
          />
          <input
            type="text"
            className="focus-visible:outline-none p-2 border-solid border-b-1 w-[80%] max-md:w-[100%] text-[20px]"
            placeholder="Expire Date"
          />
          <input
            type="text"
            className="focus-visible:outline-none p-2 border-solid border-b-1 w-[80%] max-md:w-[100%] text-[20px]"
            placeholder="CVV"
          />
          <div className="text-[40px] max-md:text-[25px]">OR</div>
          <input
            type="text"
            className="focus-visible:outline-none p-2 border-solid border-b-1 w-[80%] max-md:w-[100%] text-[20px]"
            placeholder="Enter Vodafone Cash Number"
          />
        </form>
        <div className="controls flex gap-5 w-[55%] max-xl:w-[315px] font-bold mt-auto mr-auto min-md:ml-10  max-md:w-full">
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
              step <= 6 ? dispatch(setStep(step + 1)) : "";
              console.log(step);
            }}
          >
            Comfirm Payment
          </Button>
        </div>
      </div>
      <div className="overflow-hidden w-[340px] max-md:w-full h-[470px] rounded-lg rotate-5 max-md:hidden">
        <img
          src={payImg}
          alt=""
          className="w-[800px] h-[470px] max-w-none translate-x-[-250px]"
        />
      </div>
    </div>
  );
}
