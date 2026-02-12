import ITxButton from "@/components/utils/itx-button";

export default function SectionButtons() {
	return (
		<>

			<div className="w-full bg-IXBbg py-12 md:py-0 shadow-lg">
				<div className="maxwidth items-center text-center y-auto py-5">

					<div className="space-y-2 space-x-2 pl-3 md:pl-0">
						<ITxButton
							label="For studenter"
							variant="ghost"
							className="w-80"
							href="/karrieredag/studenter"
						/>
						<ITxButton
							label="For bedrifter"
							variant="ghost"
							className="w-80"
							href="/karrieredag/bedrifter"
						/>
					</div>
				</div>
			</div>
		</>
	)
}

