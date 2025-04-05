import { Link } from "react-router";
import type { BlogHeader } from "~/types";
import { RiCalendar2Fill } from "@remixicon/react";

const getSign = (num: number) => (num === -1 ? "-" : "+");
const padStart = (num: number) => num.toString().padStart(2, "0");

export const getDateFromISO = (date: string) => {
	const dateObj = new Date(date);
	const timezoneOffset = new Date().getTimezoneOffset();
	dateObj.setMinutes(dateObj.getMinutes() - timezoneOffset);

	const [day, month, year, hour, minute, second] = [
		padStart(dateObj.getDate()),
		padStart(dateObj.getMonth() + 1),
		padStart(dateObj.getFullYear()),
		padStart(dateObj.getHours()),
		padStart(dateObj.getMinutes()),
		padStart(dateObj.getSeconds()),
	];

	return `${day}/${month}/${year} at ${hour}:${minute}:${second} (UTC${getSign(Math.sign(-timezoneOffset))}${Math.abs(timezoneOffset / 60)})`;
};

export default function BlogItem({ data }: { data: BlogHeader }) {
	return (
		<Link to={`blogs/${data.id}`} className="blogItem">
			<div className="w-full rounded-xl flex flex-col overflow-hidden transition hover:bg-surface-0 bg-mantle border-1 border-overlay-0">
				{data.thumbnail ? (
					<img
						src={data.thumbnail}
						alt=""
						className="w-full h-[200px] object-cover"
					/>
				) : (
					""
				)}
				<div className="w-full flex flex-col p-5">
					<div className="text-2xl font-medium no-underline">{data.title}</div>
					<div className="text-sm font-regular text-subtext-0 line-clamp-2">
						{data.description}
					</div>
					<div className="w-full flex gap-2.5 pt-4 items-center">
						<RiCalendar2Fill size={16} />
						<div className="text-xs text-subtext-0">
							{getDateFromISO(data.timestamp)}
						</div>
					</div>
				</div>
			</div>
		</Link>
	);
}
