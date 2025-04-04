import { RiGithubFill, RiTwitterFill } from "@remixicon/react";
import { Link, Outlet } from "react-router";

export default function Layout() {
	return (
		<>
			<img
				className="fixed w-full h-full object-cover object-center"
				src={"/Rinami.png"}
				alt=""
			/>
			<div className="absolute w-screen min-h-screen h-auto lg:h-screen lg:overflow-hidden overflow-auto lg:p-2.5 p-0 flex flex-col gap-2.5">
				<div className="bg-base/96 text-text h-full flex-1\ p-5 rounded-xl max-lg:rounded-none border-1 max-lg:border-0 border-overlay-0 overflow-hidden shadow-xl backdrop-blur-md">
					<div className="w-full h-full flex gap-2.5 max-lg:flex-col">
						<div className="w-[250px] max-lg:w-full h-full max-lg:h-auto flex flex-col gap-5 p-5 max-lg:p-0">
							<div className="w-full flex flex-col max-lg:flex-row gap-5">
								<img
									src="/RI.png"
									alt=""
									className="max-lg:w-[50px] w-[150px] aspect-square relative rounded-3xl overflow-hidden shadow-xl"
								/>
								<div className="flex flex-col">
									<Link
										to="/"
										className="w-max font-medium text-2xl hover:underline underline-offset-2"
									>
										FukutoTojido
									</Link>
									<div className="font-medium text-sm text-subtext-0">
										THE iDOLM@STER enjoyer
									</div>
								</div>
							</div>
							<div className="w-full flex gap-2.5">
								<Link
									to="https://github.com/FukutoTojido"
									target="_blank"
									className="hover:drop-shadow-glow p-2 rounded-md hover:bg-white/20 transition-colors"
								>
									<RiGithubFill size={30} />
								</Link>
								<Link
									to="https://twitter.com/FukutoTojido"
									target="_blank"
									className="hover:drop-shadow-glow p-2 rounded-md hover:bg-white/20 transition-colors"
								>
									<RiTwitterFill size={30}/>
								</Link>
							</div>
							<p className="max-lg:hidden">
								Welcome to the blog of an iDOLM@STER enjoyer.
							</p>
							<div className="font-regular text-[10px] text-slate-300 mt-auto max-lg:hidden">
								Bro should I have a copyright here?
							</div>
						</div>
						<div className="border-r-2 border-text my-5 max-lg:hidden" />
						<div className="flex-1 h-full flex flex-col p-5 max-lg:p-0 overflow-hidden">
							<Outlet />
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
