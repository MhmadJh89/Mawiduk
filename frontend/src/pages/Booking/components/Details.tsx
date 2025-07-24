import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import LocalPhoneRoundedIcon from "@mui/icons-material/LocalPhoneRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import { useTranslation } from "react-i18next";
export default function Details() {
  const { t } = useTranslation("Booking");
  return (
    <div className="w-[80%] max-xl:w-full col-span-9">
      <form action="" className="flex flex-col gap-5 ">
        <div className="relative max-sm:self-center max-sm:w-full">
          <input
            type="text"
            className="bg-card w-[500px]  max-lg:w-full rounded-4xl ps-14 focus-visible:outline-none py-4"
            placeholder={t("fullNamePH")}
          />
          <PersonRoundedIcon className="absolute start-6 top-4"></PersonRoundedIcon>
        </div>
        <div className="relative max-sm:self-center max-sm:w-full">
          <input
            type="text"
            className="bg-card w-[500px] max-lg:w-full rounded-4xl ps-14 focus-visible:outline-none py-4"
            placeholder={t("phoneNumberPH")}
          />
          <LocalPhoneRoundedIcon className="absolute start-6 top-4"></LocalPhoneRoundedIcon>
        </div>

        <div className="relative max-sm:self-center max-sm:w-full">
          <input
            type="email"
            className="bg-card w-[500px] max-lg:w-full rounded-4xl ps-14 focus-visible:outline-none py-4"
            placeholder={t("emailPH")}
          />
          <EmailRoundedIcon className="absolute start-6 top-4"></EmailRoundedIcon>
        </div>
      </form>
    </div>
  );
}
