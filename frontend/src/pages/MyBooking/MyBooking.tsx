import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ServiceCard from "./components/ServiceCard";
import serviceImg from "../../assets/images/barber.jpg";
import Button from "../../components/ui/Button";
import Overlay from "../../components/ui/Overlay";
import { useState } from "react";
import RatePopUp from "./RatePopUp";

const MyBooking = () => {
  const [showRatePopUp, setShowRatePopUp] = useState(true);

  return (
    <div
      className={`spec-container py-5 ${
        showRatePopUp && "h-[100vh] overflow-hidden"
      }`}
    >
      {showRatePopUp && (
        <Overlay
          onClick={() => {
            setShowRatePopUp(false);
          }}
        />
      )}
      {showRatePopUp && <RatePopUp />}
      <h2 className={`text-[25px] max-lg:text-[20px] my-5 `}>My _Booking</h2>
      <p>
        Today's date:{" "}
        {new Date().toLocaleDateString("en-GB", {
          weekday: "long", // Monday
          day: "numeric", // 9
          month: "long", // July
        })}
      </p>
      <hr className="my-5" />
      <div className="flex justify-between items-center gap-5">
        <div className="relative w-[40%] max-lg:w-[100%]">
          <div className="absolute px-5 h-full overflow-hidden">
            <div className="relative h-full">
              <div className="absolute w-[1px] h-[50px] bg-black -rotate-25 right-0 -top-[10px]"></div>
              <SearchIcon className="text-black cursor-pointer relative right-2 top-1"></SearchIcon>
            </div>
          </div>
          <input
            type="text"
            name=""
            id=""
            className="pl-15 py-1 w-full rounded-3xl bg-white focus-visible:outline-none text-black"
            placeholder="Search by Status"
          />
        </div>
        <FormControl
          variant="standard"
          sx={{
            borderColor: "white",
            width: "200px",
            position: "relative",
            bottom: "10px",
          }}
          fullWidth
        >
          <InputLabel
            id="demo-simple-select-label"
            sx={{
              color: "gray",
              "&.Mui-focused": {
                color: "#d4af37", // اللون لما المستخدم يضغط أو يركّز
              },
              fontSize: "12px",
            }}
          >
            <CalendarMonthIcon
              fontSize="small"
              className="relative bottom-[2px]"
            />{" "}
            Service date
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            // value={age}
            label="Age"
            // onChange={handleChange}
            sx={{
              "&:before": {
                borderBottom: "2px solid gray",
              },
              "&:after": {
                borderBottom: "2px solid gray",
              },
              "&.MuiInput-underline:hover:not(.Mui-disabled):before": {
                borderBottomColor: "#d4af37",
              },

              color: "gray",
              "& .MuiSelect-icon": {
                color: "gray",
              },
            }}
          >
            <MenuItem value={10}>01-01-2025</MenuItem>
            <MenuItem value={20}>02-05-2025</MenuItem>
            <MenuItem value={30}>08-06-2025</MenuItem>
          </Select>
        </FormControl>{" "}
      </div>
      <div className="flex flex-col mt-5 gap-4 mb-10">
        <ServiceCard
          name="service name"
          id={1}
          desc="Lorem ipsum dolor sit amet consectetur. Ac mauris enim senectus quam ipsum ac ipsum sagittis sit. Nunc turpis leo sed tincidunt laoreet eleifend posuere diam. Leo fames aliquam et quisque sed convallis eros varius aliquam. "
          isBooked={true}
          img={serviceImg}
          status="pending"
        />
        <ServiceCard
          name="service name"
          id={1}
          desc="Lorem ipsum dolor sit amet consectetur. Ac mauris enim senectus quam ipsum ac ipsum sagittis sit. Nunc turpis leo sed tincidunt laoreet eleifend posuere diam. Leo fames aliquam et quisque sed convallis eros varius aliquam. "
          isBooked={true}
          img={serviceImg}
          status="pending"
        />
        <ServiceCard
          name="service name"
          id={1}
          desc="Lorem ipsum dolor sit amet consectetur. Ac mauris enim senectus quam ipsum ac ipsum sagittis sit. Nunc turpis leo sed tincidunt laoreet eleifend posuere diam. Leo fames aliquam et quisque sed convallis eros varius aliquam. "
          isBooked={true}
          img={serviceImg}
          status="completed"
        />
        <ServiceCard
          name="service name"
          id={1}
          desc="Lorem ipsum dolor sit amet consectetur. Ac mauris enim senectus quam ipsum ac ipsum sagittis sit. Nunc turpis leo sed tincidunt laoreet eleifend posuere diam. Leo fames aliquam et quisque sed convallis eros varius aliquam. "
          isBooked={true}
          img={serviceImg}
          status="cancelled"
        />
      </div>
      <div className="flex justify-end">
        <Button newStyles="bg-white px-10 !w-fit text-black" onClick={() => {}}>
          Add New Booking
        </Button>
      </div>
    </div>
  );
};

export default MyBooking;
