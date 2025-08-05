import CameraAltIcon from "@mui/icons-material/CameraAlt";
import EditIcon from "@mui/icons-material/Edit";
import Button from "../../components/ui/Button";
import Input from "./Components/Input";
import {
  FormControl,
  FormControlLabel,
  MenuItem,
  Select,
  styled,
  Switch,
  type SwitchProps,
} from "@mui/material";
import { useState, type SetStateAction } from "react";
const Profile = () => {
  const [formData, setFormData] = useState({
    fullName: "Ahmed M.",
    phone: "012345678910",
    email: "Ahmed.M@gmail.com",
    type: "email",
  });
  const [originalData, setOriginalData] = useState(formData);
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const [typeValue, setTypeValue] = useState("");
  const [showEdit, setShowEdit] = useState<boolean>(false);
  const typeHandleChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setTypeValue(event.target.value);
  };

  const IOSSwitch = styled((props: SwitchProps) => (
    <Switch
      focusVisibleClassName=".Mui-focusVisible"
      disableRipple
      {...props}
    />
  ))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    "& .MuiSwitch-switchBase": {
      padding: 0,
      margin: 2,
      transitionDuration: "300ms",
      "&.Mui-checked": {
        transform: "translateX(16px)",
        color: "#fff",
        "& + .MuiSwitch-track": {
          backgroundColor: "#d4af37",
          opacity: 1,
          border: 0,
          ...theme.applyStyles("dark", {
            backgroundColor: "#2ECA45",
          }),
        },
        "&.Mui-disabled + .MuiSwitch-track": {
          opacity: 0.5,
        },
      },
      "&.Mui-focusVisible .MuiSwitch-thumb": {
        color: "#33cf4d",
        border: "6px solid #fff",
      },
      "&.Mui-disabled .MuiSwitch-thumb": {
        color: theme.palette.grey[100],
        ...theme.applyStyles("dark", {
          color: theme.palette.grey[600],
        }),
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.7,
        ...theme.applyStyles("dark", {
          opacity: 0.3,
        }),
      },
    },
    "& .MuiSwitch-thumb": {
      boxSizing: "border-box",
      width: 22,
      height: 22,
    },
    "& .MuiSwitch-track": {
      borderRadius: 26 / 2,
      backgroundColor: "#E9E9EA",
      opacity: 1,
      transition: theme.transitions.create(["background-color"], {
        duration: 500,
      }),
      ...theme.applyStyles("dark", {
        backgroundColor: "#39393D",
      }),
    },
  }));

  return (
    <div className="flex flex-col pb-10">
      <div
        className=" w-full h-[280px] flex items-end justify-end"
        style={{
          backgroundImage: 'url("src/assets/images/bg.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <button className="cursor-pointer bg-card w-[30px] h-[30px] flex justify-center items-center rounded-full text-sec -translate-x-1  lg:-translate-x-10 -translate-y-1 ">
          <CameraAltIcon fontSize="small" />
        </button>
      </div>
      <div className="relative w-[900px] max-lg:w-full max-lg:px-[30px] m-auto">
        <div className="relative bottom-18  w-fit max-lg:m-auto">
          <div
            className="w-[120px] h-[120px] rounded-full"
            style={{
              backgroundImage: 'url("src/assets/images/member.jpg")',
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <button className="cursor-pointer bg-card w-[30px] h-[30px] flex justify-center items-center rounded-full text-sec absolute bottom-1 -right-1">
            <CameraAltIcon fontSize="small" />
          </button>
        </div>
        <div className=" flex flex-col">
          <div className="flex justify-end gap-2 max-lg:justify-between">
            <Button
              newStyles="bg-white px-10 py-1 !w-fit text-black"
              onClick={() => {}}
            >
              My Booking
            </Button>
            <button
              onClick={() => {
                setOriginalData(formData);
                setShowEdit(true);
              }}
              className="cursor-pointer bg-card w-[30px] h-[30px] flex justify-center items-center rounded-full text-sec"
            >
              <EditIcon fontSize="small" />
            </button>
          </div>
          <form
            action=""
            className="mt-10 flex justify-between max-lg:flex-col"
          >
            <div className="flex flex-col gap-10">
              <Input
                label="Full name"
                value={formData.fullName}
                type="text"
                name="fullName"
                editable={showEdit}
                onChange={handleFormChange}
              />
              <div className="flex items-center justify-between">
                <span className="font-semibold">Notifications</span>
                <FormControlLabel
                  control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
                  label=""
                  sx={{
                    transform: "lg:translateX(25px)",
                  }}
                />
              </div>
              <FormControl fullWidth>
                <Select
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({ ...formData, type: e.target.value })
                  }
                  displayEmpty
                  disabled={!showEdit}
                  variant="outlined"
                  sx={{
                    backgroundColor: "#fff",
                    borderRadius: 3,
                    width: {
                      xs: "100%",
                      sm: "100%",
                      md: "100%",
                      lg: "400px",
                    },
                    "& .MuiSelect-select": {
                      padding: "6px 10px",
                    },
                  }}
                >
                  <MenuItem value="" disabled>
                    اختر النوع
                  </MenuItem>
                  <MenuItem value="email">email</MenuItem>
                  <MenuItem value="phone">phone</MenuItem>
                  <MenuItem value="email">email</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className=" flex flex-col justify-between">
              <Input
                label="Phone Number"
                value={formData.phone}
                type="text"
                name="phone"
                editable={showEdit}
                onChange={handleFormChange}
              />
              <Input
                label="Email"
                value={formData.email}
                type="text"
                name="email"
                editable={showEdit}
                onChange={handleFormChange}
              />
            </div>
          </form>
          {showEdit ? (
            <div className="flex justify-center gap-5">
              <Button
                newStyles="bg-white w-[120px] px-10 py-1 !w-fit text-black mt-10"
                onClick={() => {
                  setFormData(originalData);
                  setShowEdit(false);
                }}
              >
                Cancel
              </Button>
              <Button
                newStyles="bg-sec w-[120px] px-10 py-1 !w-fit text-black mt-10"
                onClick={() => {
                  setShowEdit(false);
                }}
              >
                Save
              </Button>
            </div>
          ) : (
            <Button
              newStyles="bg-white w-[120px] px-10 py-1 !w-fit text-black mt-10 ml-auto"
              onClick={() => {}}
            >
              Log out
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
