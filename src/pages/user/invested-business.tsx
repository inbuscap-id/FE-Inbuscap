import Layout from "@/components/layout";
import ProposalCard from "@/components/proposal-card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function InvestedBusiness() {
  return (
    <Layout loggedin={true}>
      <div className="mb-10 mt-2 flex gap-20">
          <Link to={"/profile"}>
            <Button variant="ghost" className="hover:bg-transparent text-2xl font-semibold hover:font-bold">My Profile</Button>
            </Link>
            <Link to={"/invested-business"}>
            <Button variant="ghost" className="hover:bg-transparent text-2xl font-semibold hover:font-bold">Invested Business</Button>
            </Link>
            <Link to={"/verification"}>
            <Button variant="ghost" className="hover:bg-transparent text-2xl font-semibold hover:font-bold">Verification</Button>
            </Link>
            </div>
      <ProposalCard
        title="Nasi Goreng Pak Syukur"
        desc="Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid odit impedit commodi iusto veniam sapiente fugiat? Minus expedita deserunt cupiditate?"
        target={10000000}
        collected={5000000}
        navigate="../detail-proposal/3"
        withOption
        archive
      />
      <ProposalCard
        title="Butik Islami Bu Syukur"
        desc=" Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis maxime non error facere sint ullam delectus repellendus quod quis obcaecati?"
        target={20000000}
        collected={4000000}
        navigate="../detail-proposal/4"
        withOption
        archive
      />
    </Layout>
  );
}
