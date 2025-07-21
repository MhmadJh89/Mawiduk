import { useTranslation } from "react-i18next";
import SwitchLang from "../components/ui/SwitchLang";
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  Card,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const { t } = useTranslation("Login");
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: "#151A20" }}
    >
      <Card
        elevation={10}
        className="p-10 w-full max-w-md"
        style={{ backgroundColor: "#1D242D", borderRadius: "30px" }}
      >
        <SwitchLang />

        <Typography
          variant="h4"
          align="center"
          gutterBottom
          style={{ color: "#fff" }}
        >
          {t('login')}
        </Typography>
        <Typography
          variant="body2"
          align="center"
          gutterBottom
          style={{ color: "#fff" }}
        >
         {t('welcome')}
        </Typography>

        <div className="mt-6 space-y-4">
          <TextField
            fullWidth
            label={t('email')}
            placeholder="Enter your email/phone"
            variant="outlined"
            InputProps={{
              style: {
                borderRadius: 30,
                backgroundColor: "#fff",
                marginBottom: "10px",
              },
            }}
          />

          <TextField
            sx={{direction:'ltr'}}
            fullWidth
            label={t('password')}
            type={showPassword ? "text" : "password"}
            variant="outlined"
            placeholder="••••••••"
            InputProps={{
              style: { borderRadius: 30, backgroundColor: "#fff" },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleTogglePassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <div className="flex items-center justify-between text-sm mt-2">
            <FormControlLabel
              control={<Checkbox style={{ color: "#D4AF37" }} />}
              label={<span style={{ color: "#fff" }}>{t('remember')}</span>}
            />
            <Typography
              variant="body2"
              style={{ color: "#D4AF37", cursor: "pointer" }}
            >
              {t('forgot')}
            </Typography>
          </div>

          <Button
            variant="contained"
            fullWidth
            style={{
              backgroundColor: "#D4AF37",
              color: "#090B0E",
              borderRadius: 30,
              padding: "10px 0",
              marginTop: "10px",
              marginBottom: "10px",
            }}
          >
            {t('login_btn')}
          </Button>

          <Typography
            variant="body2"
            align="center"
            className="mt-6"
            style={{ color: "#fff", marginBottom: "5px" }}
          >
            {t('no_account')}{" "}
            <Link
              className="underline cursor-pointer"
              to="/register"
              style={{ color: "#D4AF37" }}
            >
             {t('register_here')}
            </Link>
          </Typography>
        </div>

        <Typography
          variant="caption"
          align="center"
          display="block"
          className="mt-6"
          style={{ color: "#fff" }}
        >
          © 2021 - 2025 All Rights Reserved.
        </Typography>
      </Card>
    </div>
  );
}
