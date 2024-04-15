export default function Footer() {
  return (
    <footer className="w-full bg-[#00ad26] flex justify-center items-center">
      <div className="w-10/12 xl:flex sm:grid text-white justify-between items-center py-10">
        <div>
          <p className="font-lora font-bold xl:text-3xl sm:text-4xl text-2xl">Inbuscap.id</p>
          <p className="font-thin tracking-wider text-xs opacity-80">
            copyright &copy; 2024
          </p>
        </div>
        <div className="xl:flex sm:grid gap-8">
          <div className="leading-8">
            <p className="font-bold">Hubungi Kami</p>
            <p className="font-thin tracking-wider text-sm text-green-100">
              Email : team.management@inbuscap.com
            </p>
            <p className="font-thin tracking-wider text-sm text-green-100">
              Instagram : @inbuscap.id
            </p>
          </div>
          <div className="leading-8">
            <p className="font-bold">Alamat</p>
            <p className="font-thin tracking-wider text-sm text-green-100">
              Jl. Jalan Semangat No. 01, Jakarta
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
