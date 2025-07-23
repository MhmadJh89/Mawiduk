interface MyServiceProps {
  img: string;
  name: string;
  desc: string;
  price: number;
}
import type { RootState } from "../../../redux/store";

import { useDispatch, useSelector } from "react-redux";
import Button from "../../../components/ui/Button";
import { setStep } from "../../../redux/slices/stepSlice";
export default function MyService({ img, name, desc, price }: MyServiceProps) {
  const dispatch = useDispatch();
  const step = useSelector((state: RootState) => state.step.step);
  return (
    <div className="bg-card  h-[700px] flex flex-col py-10 px-3 rounded-lg gap-3 max-xl:w-full ml-auto col-span-3">
      <img
        src={img}
        className="w-[200px] h-[111px] rounded-lg max-md:w-full max-md:h-[200px] mx-auto "
      />{" "}
      <h3>{name}</h3>
      <p>{desc}</p>
      <span className="block text-end">{price} $</span>
      <hr />
      <div>
        Total: <span>{price} $</span>
      </div>
      <div className="controls flex gap-3 font-bold mt-auto">
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
    </div>
  );
}
