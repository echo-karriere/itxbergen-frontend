import { StudentOrganisation } from "@/types/student-organisation";

export default function StudentOrganisationDetailsBox({
  organisation,
}: {
  organisation: StudentOrganisation | null;
}) {
  return (
    <div className="w-full md:w-[35%] bg-IXBbg1 rounded-t-3xl rounded-tr-[150px] p-6 shadow-2xl space-y-4">
      <p className="font-bold text-sm">Hvem kan være med?</p>
      <p className="text-sm">{organisation?.participants}</p>

      <p className="font-bold text-sm">E-post</p>
      {organisation?.epost ? (
        <a className="text-sm" href={`mailto:${organisation.epost}`}>
          {organisation.epost}
        </a>
      ) : (
        <p className="text-sm text-gray-500">E-post ikke tilgjengelig</p>
      )}

      <p className="font-bold text-sm">Besøksadresse</p>
      <p className="text-sm">{organisation?.address}</p>
    </div>
  );
}
