"use client";

const Sharebutton = ({ company }: { company: string }) => {
  return (
    <div>
      <button
        onClick={() => {
          // open the share dialog
          if (navigator.share) {
            navigator
              .share({
                title: `Ta en titt på denne stillingsannonsen til ${company} på ITxBERGEN sin nettside.`,
                url: `https://www.itxbergen.no/karrieredag/404`,
              })
              .then(() => console.log("Successful share"))
              .catch((error) => console.log("Error sharing", error));

            document.getElementById("shareButton")!.innerHTML =
              "Velg hvordan du vil dele stillingen";

            setTimeout(() => {
              document.getElementById("shareButton")!.innerHTML =
                "Del stillingen på nytt";
            }, 3000);
          } else {
            // fallback to copy to clipboard
            const url = window.location.href;
            const el = document.createElement("textarea");
            el.value = url;
            document.body.appendChild(el);
            el.select();
            document.execCommand("copy");
            document.body.removeChild(el);

            // change id to "shareButton" to show the text for 3 seconds
            document.getElementById("shareButton")!.innerHTML =
              "Lenke kopiert til utklippstavlen";

            setTimeout(() => {
              document.getElementById("shareButton")!.innerHTML =
                "Del stillingen på nytt";
            }, 3000);
          }
        }}
        className="mt-4 bg-gray-200 hover:bg-gray-300 text-gray-800 w-[60%] md:w-full font-semibold py-2 px-4 flex justify-center items-center rounded focus:outline-none focus:ring-4 focus:ring-yellow-400"
      >
        <span id="shareButton" className="text-center ">
          Del stillingen
        </span>
      </button>
    </div>
  );
};

export default Sharebutton;
