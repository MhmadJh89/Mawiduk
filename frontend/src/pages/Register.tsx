import {
  TextField,
  Button,
  MenuItem,
  Typography,
  Box,
  Card,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import Grid from "@mui/material/GridLegacy";
import registerImage from "../assets/images/berbere.jpg";
import SwitchLang from "../components/ui/SwitchLang";
import { Link } from "react-router-dom";

const Registration = () => {
  const { t } = useTranslation("Register");

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-[#151A20] text-white">
      {/* Left Section */}
      <div className="flex items-center justify-center px-6 py-10">
        <Card
          sx={{
            width: "100%",
            maxWidth: 450,
            p: 4,
            bgcolor: "#1D242D",
            borderRadius: "30px",
            boxShadow: "none",
          }}
        >
          <div className="mb-8">
            <SwitchLang />
          </div>

          <Box>
            <Typography
              variant="h4"
              sx={{ color: "white" }}
              fontWeight={600}
              gutterBottom
            >
              {t("register")}
            </Typography>
            <Typography variant="body1" color="#d4d9dd" gutterBottom>
            {t("welcome")}
            </Typography>

            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  placeholder={t("first_name")}
                  variant="outlined"
                  size="small"
                  InputProps={{
                    sx: { borderRadius: "30px", bgcolor: "white" },
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  placeholder=    {t("last_name")}
                  variant="outlined"
                  size="small"
                  InputProps={{
                    sx: { borderRadius: "30px", bgcolor: "white" },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  placeholder=    {t("email")}
                  variant="outlined"
                  size="small"
                  InputProps={{
                    sx: { borderRadius: "30px", bgcolor: "white" },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  placeholder=    {t("phone")}
                  variant="outlined"
                  size="small"
                  InputProps={{
                    sx: { borderRadius: "30px", bgcolor: "white" },
                  }}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  select
                  fullWidth
                  label=    {t("month")}
                  variant="outlined"
                  size="small"
                  defaultValue=""
                  InputLabelProps={{ sx: { color: "#6e6e6e" } }}
                  InputProps={{
                    sx: { borderRadius: "30px", bgcolor: "white" },
                  }}
                >
                  {" "}
                  {[...Array(12)].map((_, i) => (
                    <MenuItem key={i} value={i + 1}>
                      {i + 1}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={4}>
                <TextField
                  select
                  fullWidth
                  label=    {t("day")}
                  variant="outlined"
                  size="small"
                  defaultValue=""
                  InputLabelProps={{ sx: { color: "#6e6e6e" } }}
                  InputProps={{
                    sx: { borderRadius: "30px", bgcolor: "white" },
                  }}
                >
                  {" "}
                  {[...Array(31)].map((_, i) => (
                    <MenuItem key={i} value={i + 1}>
                      {i + 1}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={4}>
                <TextField
                  select
                  fullWidth
                  label=    {t("year")}
                  variant="outlined"
                  size="small"
                  defaultValue=""
                  InputLabelProps={{ sx: { color: "#6e6e6e" } }}
                  InputProps={{
                    sx: { borderRadius: "30px", bgcolor: "white" },
                  }}
                >
                  {" "}
                  {Array.from({ length: 100 }, (_, i) => 2025 - i).map(
                    (year) => (
                      <MenuItem key={year} value={year}>
                        {year}
                      </MenuItem>
                    )
                  )}
                </TextField>
              </Grid>

              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{
                    bgcolor: "#D4AF37",
                    borderRadius: "30px",
                    color: "black",
                    textTransform: "none",
                    fontWeight: "bold",
                  }}
                >
                     {t("register_btn")}
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{
                    bgcolor: "white",
                    borderRadius: "30px",
                    textTransform: "none",
                    fontWeight: 500,
                  }}
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
                    className="mr-4"
                  ></img>
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant="body2"
                  align="center"
                  sx={{ mt: 1, marginBottom: "5px" }}
                  color="#d4d9dd"
                >
    {t("have_account")}{" "}
                  <Link to="/login" className="text-[#D4AF37] cursor-pointer">    {t("login_here")}</Link>
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Typography
            variant="caption"
            align="center"
            display="block"
            className="mt-6"
            style={{ color: "#d4d9dd" }}
          >
            © 2021 - 2025 All Rights Reserved.
          </Typography>
        </Card>
      </div>

      {/* Right Section */}
      <div className="hidden md:block relative">
        <img
          src={registerImage}
          alt="pizzeria"
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Registration;
