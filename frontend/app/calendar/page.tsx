import SlotsTable from "../slots_table/slots_table"

export default function Page() {
  return (
    <div className="flex align-middle justify-items-center h-full w-full absolute font-sans text-neutral-1">
      <div className="m-auto w-3/5 mt-52 bg-white rounded-lg p-8 px-8">
        <h1 className="leading-9 text-3xl font-bold">Prenez rendez-vous</h1>
        <p className="leading-9 text-base font-normal">
          Choisissez un créneau pour échanger par téléphone avec votre expert.
        </p>
        <SlotsTable />
      </div>
    </div>
  )
}