import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import Button from "../../../components/ui/Button";

export default function Payment() {
  return (
    <div className="col-span-12 flex flex-col items-center pt-[70px] text-center">
      <VerifiedOutlinedIcon
        className="text-amber-300"
        sx={{ fontSize: 80 }}
      ></VerifiedOutlinedIcon>
      <h2 className="text-[40px] max-md:text-[21px] mt-10">
        Success! Your booking is confirmeds
      </h2>
      <p className="text-[20px] max-md:text-[17px] ">
        A confirmation has been sent to your email
      </p>
      <div className="w-[270px] mt-20">
        <Button newStyles="bg-white text-black">Back To Home</Button>
      </div>
    </div>
  );
}
