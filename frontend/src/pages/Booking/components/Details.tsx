import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import LocalPhoneRoundedIcon from "@mui/icons-material/LocalPhoneRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
export default function Details() {
  return (
    <div className="w-[80%] max-xl:w-full col-span-9">
      <form action="" className="flex flex-col gap-5 ">
        <div className="relative max-sm:self-center max-sm:w-full">
          <input
            type="text"
            className="bg-card w-[500px]  max-lg:w-full rounded-4xl pl-14 focus-visible:outline-none py-4"
            placeholder="Full Name"
          />
          <PersonRoundedIcon className="absolute left-6 top-4"></PersonRoundedIcon>
        </div>
        <div className="relative max-sm:self-center max-sm:w-full">
          <input
            type="text"
            className="bg-card w-[500px] max-lg:w-full rounded-4xl pl-14 focus-visible:outline-none py-4"
            placeholder="Phone Number"
          />
          <LocalPhoneRoundedIcon className="absolute left-6 top-4"></LocalPhoneRoundedIcon>
        </div>

        <div className="relative max-sm:self-center max-sm:w-full">
          <input
            type="email"
            className="bg-card w-[500px] max-lg:w-full rounded-4xl pl-14 focus-visible:outline-none py-4"
            placeholder="Email"
          />
          <EmailRoundedIcon className="absolute left-6 top-4"></EmailRoundedIcon>
        </div>
      </form>
    </div>
  );
}
