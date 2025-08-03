import { StarIcon } from "lucide-react";
import StarRateIcon from "@mui/icons-material/StarRate";
import React, { useState } from "react";
import { TextField } from "@mui/material";
import Button from "../../components/ui/Button";

const RatePopUp = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  return (
    <div className="z-50 absolute bg-main flex flex-col items-center px-10 py-7 gap-3 rounded-xl left-[50%] top-[50%] translate-[-50%]">
      <h2 className="font-bold text-[20px]">Add A Rating</h2>
      <p className="text-[13px]">your feedback help us improve</p>
      <div className="flex space-x-1">
        {[...Array(5)].map((_, i) => {
          const index = i + 1;
          return (
            <button
              key={index}
              type="button"
              onClick={() => setRating(index)}
              onMouseEnter={() => setHover(index)}
              onMouseLeave={() => setHover(0)}
              className=" cursor-pointer"
            >
              <StarRateIcon
                fontSize="large"
                className={`w-8 h-8 transition-colors ${
                  index <= (hover || rating) ? "text-amber-300" : "text-white"
                }`}
              />
            </button>
          );
        })}
      </div>
      <TextField
        fullWidth
        label={"Share your opinion...."}
        placeholder="Enter your email/phone"
        variant="outlined"
        InputProps={{
          style: {
            borderRadius: 20,
            backgroundColor: "#fff",
            marginBottom: "10px",
          },
        }}
        InputLabelProps={{
          sx: {
            color: "gray",
            fontSize: "12px",
            "&.Mui-focused": {
              color: "#d4af37",
            },
          },
        }}
      />
      <Button newStyles="bg-sec px-10 text-black" onClick={() => {}}>
        Send
      </Button>
    </div>
  );
};

export default RatePopUp;
