import { RiCameraFill, RiDeleteBin2Fill } from "@remixicon/react";
import {
	useCallback,
	useEffect,
	useRef,
	useState,
	type ChangeEvent,
} from "react";

export default function ImageDropper({ defaultThumb }: { defaultThumb?: string }) {
	const ref = useRef<HTMLInputElement>(null);
	const [currentImage, setCurrentImage] = useState<string | null>(defaultThumb ? `${defaultThumb}?${Date.now()}` : null);
	const [pendingDelete, setPendingDelete] = useState(false);

	const handleImage = useCallback((event: ChangeEvent<HTMLInputElement>) => {
		if (!event.target.files?.[0]) {
			setCurrentImage(null);
			return;
		}
		setCurrentImage(URL.createObjectURL(event.target.files[0]));
		setPendingDelete(false);
	}, []);

	return (
		<div className="flex flex-col gap-4 md:col-start-5 md:col-end-8">
			<span className="font-medium">Preview Image</span>
			<label
				htmlFor="preview"
				className="group/preview relative rounded-xl border-1 border-overlay-0 w-full flex-1 cursor-pointer border-dashed overflow-hidden flex hover:bg-black/50"
			>
				{currentImage ? (
					<img
						src={currentImage}
						alt=""
						className="absolute w-full h-full object-cover object-center grow-0 hover:opacity-20 group-hover/preview:-z-1 z-1 "
					/>
				) : (
					""
				)}
				<div className="relative flex flex-col items-center justify-center gap-5 p-5 flex-1">
					<RiCameraFill size={30} />
					<div>Select image</div>
				</div>
				{currentImage ? (
					<button
						type="button"
						className="p-5 h-full flex place-items-center bg-red-400 cursor-pointer"
						onClick={(event) => {
							event.preventDefault();
							event.stopPropagation();

							if (!ref.current) return;
							ref.current.value = "";

							setCurrentImage(null);
							setPendingDelete(true);
							console.log("delete")
						}}
					>
						<RiDeleteBin2Fill />
					</button>
				) : (
					""
				)}
				<input type="checkbox" checked={pendingDelete} className="hidden" id="deleteImage" name="deleteImage" readOnly/>
				<input
					type="file"
					name="preview"
					id="preview"
					className="hidden"
					ref={ref}
					onChange={handleImage}
				/>
			</label>
		</div>
	);
}
