import MemberCard from "./MemberCard";
import MemberImg from "../../../assets/images/member.jpg";
export default function Staff() {
  return (
    <div className="flex flex-wrap gap-5  w-[80%] max-xl:w-full col-span-9">
      <MemberCard name="Jack O." desc="Service" img={MemberImg}></MemberCard>
      <MemberCard name="Jack O." desc="Service" img={MemberImg}></MemberCard>

      <MemberCard name="Jack O." desc="Service" img={MemberImg}></MemberCard>
      <MemberCard name="Jack O." desc="Service" img={MemberImg}></MemberCard>
      <MemberCard name="Jack O." desc="Service" img={MemberImg}></MemberCard>
      <MemberCard name="Jack O." desc="Service" img={MemberImg}></MemberCard>
      <MemberCard name="Jack O." desc="Service" img={MemberImg}></MemberCard>
    </div>
  );
}
