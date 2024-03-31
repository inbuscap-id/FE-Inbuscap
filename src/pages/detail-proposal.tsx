import Layout from "@/components/layout";
import nasgoreng from "@/assets/nasigoreng.jpg";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { formatRupiah } from "@/utils/format-money";

export default function DetailProposal() {
  // const param = useParams();

  return (
    <>
      <Layout loggedin={true}>
        {/* <p>detail {param.id_proposal}</p> */}

        <div className="w-2/3 mx-auto mb-5">
          <img className="w-full aspect-auto" src={nasgoreng} alt="" />
        </div>
        <div className="flex flex-col">
          <div className="mb-1">
            <p className="text-3xl font-semibold">Bussiness Title</p>
          </div>
          <div className="mb-2">
            <p className="text-2xl">
              {formatRupiah.format(7000000)} / {formatRupiah.format(10000000)}
            </p>
          </div>
          <div className="w-1/2 mb-2">
            <p className="text-lg">70%</p>
            <Progress
              value={70}
              className="mb-4 border border-[#006516] bg-slate-200"
            />
          </div>
          <div className="mb-5">
            <p className="text-lg">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Esse
              quisquam modi dolores doloribus, dolorum animi doloremque
              voluptates! Deleniti sit est nemo consequuntur quaerat officiis
              accusantium architecto maxime amet saepe incidunt, beatae modi
              quis sed velit nostrum praesentium aliquam voluptatum eaque ea cum
              recusandae dignissimos excepturi dicta! Magnam similique eius
              laborum tempora, quia neque accusantium nostrum non laudantium
              nihil ipsam quo, at, vitae aliquam odio culpa necessitatibus
              optio? Tempora aspernatur autem eligendi error, deserunt rerum et
              eos tempore voluptas provident iure similique iste earum iusto
              fuga quas minima nemo accusamus voluptates odit non unde quidem!
              Fugit consectetur tempora aspernatur tenetur quam, eum totam
              assumenda in vitae asperiores repellat. Magnam temporibus
              asperiores doloribus eum provident! Cumque molestiae quis animi
              illo laudantium sunt reprehenderit beatae ullam? Hic enim ipsam
              voluptatem corrupti illum debitis alias vel, veritatis maxime
              dignissimos dolorum aliquam beatae tenetur consectetur quas qui
              est voluptates vitae consequatur dolorem minus quos eos
              exercitationem similique. Et ratione minus unde, earum fugit
              blanditiis laboriosam soluta inventore natus consequatur, quia
              possimus aliquid cupiditate vel excepturi pariatur eligendi
              dignissimos illum reiciendis voluptates eaque, voluptatibus
              adipisci quidem! Modi quidem odio eligendi libero perferendis, et
              voluptatem mollitia praesentium quasi id, fuga nisi iure fugiat
              repellendus quisquam vitae. Maxime.
            </p>
          </div>
          <div>
            <p className="text-2xl font-semibold">Share Profit</p>
            <p className="text-xl">Investor : 30%</p>
            <p className="text-sm">
              Example : profit is 2.000.000, so your profit is 30% x 2.000.000 =
              600.000
            </p>
          </div>
          <div className="mb-5">
            <p className="text-xl">Owner Bussiness : 70%</p>
            <p className="text-sm">
              Example : profit is 2.000.000, so your profit is 70% x 2.000.000 =
              1.400.000
            </p>
          </div>
          <div className="mb-5">
            <p className="text-2xl font-semibold">Proposal File</p>
            <p className="font-bold text-xl text-blue-700">
              bussiness-proposal.pdf
            </p>
          </div>
          <div className="self-end bg-red-100">
            <Button className="w-56 h-12 text-lg bg-[#00AC26] hover:bg-[#006516]">
              Invest
            </Button>
          </div>
        </div>
      </Layout>
    </>
  );
}
