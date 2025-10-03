import Breadcrumbs from "@/components/utils/automatic-breacrumbs";
import Component from "./component"

export default function Page() {
  return (
    <div>
      {/* Section 1 */}
      <div className="bg-white text-black h-auto flex items-center justify-center relative pt-12">
        {/* Content Wrapper */}
        <div className="maxwidth flex flex-col md:flex-row items-center w-full px-6 md:px-32 space-y-12 md:space-y-0 md:space-x-20 mb-12">
          {/* Text Content */}
          <div className="flex flex-col justify-center md:items-start mx-6 md:mx-0 md:w-3/5 text-left space-y-4 md:space-y-4">
            {/* Breadcrumb */}
            <Breadcrumbs customLast="Om ITxBergen" />
            <h1 className="text-3xl md:text-4xl font-bold mb-9">
              Demo
            </h1>
            <Component />
          </div>
        </div>
      </div>
    </div>
  )
}
