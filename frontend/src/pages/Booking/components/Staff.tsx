import MemberCard from "./MemberCard";
import MemberImg from "../../../assets/images/member.jpg";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../redux/store";
import { fetchStaff } from "../../../redux/Booking/slices/getStaff";
export default function Staff() {
  const { data, loading, error } = useSelector(
    (state: RootState) => state.staff
  );
  const id = useSelector((state: RootState) => state.serviceId.id);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (id) {
      console.log("📥 dispatching fetchStaff with id:", id);
      dispatch(fetchStaff());
    }
  }, [dispatch, id]);
  useEffect(() => {
    console.log("Updated data:", data);
    console.log(id);
  }, [data]);

  return (
    <div className="flex flex-wrap gap-5 xl:gap-6 max-lg:gap-3  w-[90%] xl:w-[100%] max-xl:w-full col-span-9  max-lg:justify-center">
      {id &&
        data.map((employee) => {
          return (
            <MemberCard
              name={employee.name}
              desc="Service"
              img={MemberImg}
              key={employee.id}
              id={employee.id}
            ></MemberCard>
          );
        })}
    </div>
  );
}
