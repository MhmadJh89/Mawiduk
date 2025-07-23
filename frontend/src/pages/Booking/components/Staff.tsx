import MemberCard from "./MemberCard";
import MemberImg from "../../../assets/images/member.jpg";
export default function Staff() {
  return (
    <div className="flex flex-wrap gap-5 xl:gap-6 max-lg:gap-3  w-[90%] xl:w-[100%] max-xl:w-full col-span-9  max-lg:justify-center">
      <MemberCard name="Jack O." desc="Service" img={MemberImg}></MemberCard>
      <MemberCard name="Jack O." desc="Service" img={MemberImg}></MemberCard>

      <MemberCard name="Jack O." desc="Service" img={MemberImg}></MemberCard>
      <MemberCard name="Jack O." desc="Service" img={MemberImg}></MemberCard>
      <MemberCard name="Jack O." desc="Service" img={MemberImg}></MemberCard>
      <MemberCard name="Jack O." desc="Service" img={MemberImg}></MemberCard>
    </div>
  );
}
