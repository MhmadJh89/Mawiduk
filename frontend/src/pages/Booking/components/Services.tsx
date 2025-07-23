import ServiceCard from "../../../components/ui/ServicesCard";
import serviceImg from "../../../assets/images/barber.jpg";
import HLine from "../../../components/ui/HLine";
import MyService from "./MyService";
export default function Services() {
  return (
    <div className="services max-xl:w-full col-span-9">
      <div className="">
        <div className="">
          <div  className="mb-5">
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
            <ServiceCard
              img={serviceImg}
              rate={5}
              name="Service name"
              desc="Lorem ipsum dolor sit amet consectetur. Ac mauris enim senectus quam
            ipsum ac ipsum sagittis sit. Nunc turpis leo sed tincidunt laoreet
            eleifend posuere diam. Leo fames aliquam et quisque sed convallis
            eros varius aliquam."
              isBooked={false}
              price={10.0}
            />
            <ServiceCard
              img={serviceImg}
              rate={5}
              name="Service name"
              desc="Lorem ipsum dolor sit amet consectetur. Ac mauris enim senectus quam
            ipsum ac ipsum sagittis sit. Nunc turpis leo sed tincidunt laoreet
            eleifend posuere diam. Leo fames aliquam et quisque sed convallis
            eros varius aliquam."
              isBooked={false}
              price={10.0}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
