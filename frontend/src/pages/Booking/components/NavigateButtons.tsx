import { useDispatch, useSelector } from "react-redux";
import Button from "../../../components/ui/Button";
import { setStep } from "../../../redux/slices/stepSlice";
import type { RootState } from "../../../redux/store";

export default function NavigateButtons() {
  const dispatch = useDispatch();
  const step = useSelector((state: RootState) => state.step.step);

  return (
    <div className="controls flex gap-3 font-bold ">
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
  );
}
