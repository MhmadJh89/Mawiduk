import ServiceCard from "../../../components/ui/ServicesCard";
import serviceImg from "../../../assets/images/barber.jpg";
import HLine from "../../../components/ui/HLine";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchServices } from "../../../redux/Booking/slices/getServices";
import type { AppDispatch, RootState } from "../../../redux/store";
interface ServicesProps {
  handleId: Function;
}
export default function Services({ handleId }: ServicesProps) {
  const { data, loading, error } = useSelector(
    (state: RootState) => state.services
  );
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);
  return (
    <div className="services max-xl:w-full col-span-9">
      <div className="">
        <div className="">
          <div className="mb-5">
            <ServiceCard
              img={serviceImg}
              rate={5}
              name="Service name"
              desc="Lorem ipsum dolor sit amet consectetur. Ac mauris enim senectus quam
            ipsum ac ipsum sagittis sit. Nunc turpis leo sed tincidunt laoreet
            eleifend posuere diam. Leo fames aliquam et quisque sed convallis
            eros varius aliquam."
              isBooked={true}
              price={10.0}
            />
          </div>
          <HLine />
          <div className="flex flex-col gap-5 mt-5">
            {data.map((service) => {
              return (
                <ServiceCard
                  handleId={handleId}
                  img={service.image}
                  rate={5}
                  name={service.name}
                  desc="Lorem ipsum dolor sit amet consectetur. Ac mauris enim senectus quam
              ipsum ac ipsum sagittis sit. Nunc turpis leo sed tincidunt laoreet
              eleifend posuere diam. Leo fames aliquam et quisque sed convallis
              eros varius aliquam."
                  isBooked={false}
                  price={10.0}
                  key={service.id}
                  id={service.id}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
