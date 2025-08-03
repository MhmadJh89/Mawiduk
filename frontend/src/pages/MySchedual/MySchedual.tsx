import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Tabel from "../../components/ui/Tabel";

const MySchedual = () => {
  return (
    <div className="spec-container py-5">
      <h2 className="text-[25px] max-lg:text-[20px]   my-5">My_schedual</h2>
      <p>
        Today's date:{" "}
        {new Date().toLocaleDateString("en-GB", {
          weekday: "long", // Monday
          day: "numeric", // 9
          month: "long", // July
        })}
      </p>
      <hr className="my-5" />
      <div className="flex justify-center mt-5">
        <div className="w-fit max-lg:w-full">
          <div className="flex items-center gap-5">
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
                Filter by Date
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
                Filter by Status
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

          <TableContainer
            sx={{
              backgroundColor: "transparent",
              boxShadow: "none",
              border: "1px solid #fff",
              borderRadius: "10px",
              width: "100%",
            }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  {["Client", "Service", "Date", "Time", "Status"].map(
                    (header, cellIndex) => (
                      <TableCell
                        key={cellIndex}
                        sx={{
                          position: "sticky",
                          top: 0,
                          backgroundColor: "transparent",
                          color: "white",
                          fontWeight: "bold",
                          zIndex: 1,
                          width:
                            cellIndex !== 4 && cellIndex !== 0
                              ? "265px"
                              : "140px",
                          textAlign: "center",
                        }}
                      >
                        {header}
                      </TableCell>
                    )
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {[
                  [
                    "Abdelrhman M.",
                    "Haircut",
                    "21-7-2025",
                    "10:00 Am",
                    "Confirmed",
                  ],
                  [
                    "Abdelrhman M.",
                    "Haircut",
                    "21-7-2025",
                    "10:00 Am",
                    "Confirmed",
                  ],
                  [
                    "Abdelrhman M.",
                    "Haircut",
                    "21-7-2025",
                    "10:00 Am",
                    "Pending",
                  ],
                  [
                    "Abdelrhman M.",
                    "Haircut",
                    "21-7-2025",
                    "10:00 Am",
                    "Cancelled",
                  ],
                  [
                    "Abdelrhman M.",
                    "Haircut",
                    "21-7-2025",
                    "10:00 Am",
                    "Cancelled",
                  ],
                  [
                    "Abdelrhman M.",
                    "Haircut",
                    "21-7-2025",
                    "10:00 Am",
                    "Confirmed",
                  ],
                  [
                    "Abdelrhman M.",
                    "Haircut",
                    "21-7-2025",
                    "10:00 Am",
                    "Pending",
                  ],
                ].map((row, rowIndex) => (
                  <TableRow key={rowIndex}>
                    {row.map((cell, cellIndex) => {
                      const isStatusCol = cellIndex === 4;
                      const getColor = (status: string) => {
                        if (status === "Pending") return "#d4af37";
                        if (status === "Cancelled") return "#CA1D1D";
                        return "white";
                      };

                      return (
                        <TableCell
                          key={cellIndex}
                          sx={{
                            color: isStatusCol ? getColor(cell) : "white",
                            backgroundColor: "transparent",
                            width:
                              cellIndex !== 4 && cellIndex !== 0
                                ? "265px"
                                : "140px",
                            textAlign: "center",
                          }}
                        >
                          {cell}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
};

export default MySchedual;
