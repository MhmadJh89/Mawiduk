import DateCard from "./DateCard";
import TimeCard from "./TimeCard";

export default function DateTime() {
  return (
    <div className="col-span-9 flex max-lg:flex-wrap max-lg:justify-center">
      <div className="time flex flex-wrap gap-5 max-xl:w-ful content-start max-lg:justify-center">
        <TimeCard />
        <TimeCard />
        <TimeCard />
        <TimeCard />
        <TimeCard />
        <TimeCard />
        <TimeCard />
        <TimeCard />
      </div>
      <div className="max-sm:w-[320px]">
        <DateCard></DateCard>
      </div>
    </div>
  );
}
