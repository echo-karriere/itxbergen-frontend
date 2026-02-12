import ITxButton from "@/components/utils/itx-button";

export default function SectionButtons() {
	return (
		<div className="bg-IXBbg shadow-lg">
			<div className="w-full items-center text-center y-auto py-5">
				<ITxButton
					label="For studenter"
					variant="ghost"
					className="w-80"
					href="/karrieredag"
				/>
				<ITxButton
					label="For studenter"
					variant="ghost"
					className="w-80"
					href="/karrieredag"
				/>
			</div>
		</div>
	)
}

