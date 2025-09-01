import { StudentOrganisation } from "@/types/student-organisation";
import StudentOrganisationSocialLinks from "./student-organisation-social-links";

export default function StudentOrganisationInfoBox({
  organisation,
}: {
  organisation: StudentOrganisation | null;
}) {
  if (!organisation) {
    return (
      <div className="w-full md:w-[55%] bg-white rounded-t-3xl p-6 shadow-2xl">
        <h3 className="text-2xl font-bold text-black mb-4">
          Velg en organisasjon
        </h3>
        <p className="text-gray-600">
          Klikk på en organisasjon for å se mer informasjon.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full md:w-[55%] bg-white rounded-t-3xl p-6 shadow-2xl">
      <h3 className="text-2xl font-bold text-black mb-4">
        {organisation.name}
      </h3>
      <h4 className="font-bold text-black mb-4">{organisation.boxHeader}</h4>
      <p className="text-gray-600">{organisation.boxp1}</p>

      <div className="text-gray-600 mt-4">
        <p>{organisation.boxp2}</p>
        {(organisation.list || []).length > 0 && (
          <ul className="list-disc list-inside mt-2">
            {(organisation.list || []).map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        )}
      </div>

      <StudentOrganisationSocialLinks organisation={organisation} />
    </div>
  );
}
