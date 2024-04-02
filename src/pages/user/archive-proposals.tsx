import nasigoreng from "@/assets/nasigoreng.jpg";
import Layout from "@/components/layout";
import ProposalCard from "@/components/proposal-card";

export default function ArchiveProposals() {
  return (
    <Layout>
      <div className="mb-5 mt-2 flex justify-between">
        <p className="text-2xl font-semibold">Archive Proposals</p>
      </div>
      <ProposalCard
        title="Nasi Goreng Pak Syukur"
        desc="Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid odit impedit commodi iusto veniam sapiente fugiat? Minus expedita deserunt cupiditate?"
        target={10000000}
        collected={5000000}
        image={nasigoreng}
        id={1}
        withOption
        archive
      />
      <ProposalCard
        title="Butik Islami Bu Syukur"
        desc=" Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis maxime non error facere sint ullam delectus repellendus quod quis obcaecati?"
        target={20000000}
        collected={4000000}
        image={nasigoreng}
        id={2}
        withOption
        archive
      />
    </Layout>
  );
}
