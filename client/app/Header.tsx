import React from "react";

import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { MenuIcon, PlusIcon, XIcon } from "@heroicons/react/outline";
import "./globals.css";

import { usePathname } from "next/navigation";
import Image from "next/image";
import { Button } from "../components/ui/button";

const user = {
	name: "Bernard Muller",
	email: "tom@example.com",
	imageUrl:
		"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};
const navigation = [{ name: "Home", href: "/home", current: true }];
const userNavigation = [
	{ name: "Your Profile", href: "#" },
	{ name: "Settings", href: "#" },
	{ name: "Sign out", href: "#" },
];

function classNames(...classes: any[]) {
	return classes.filter(Boolean).join(" ");
}

const Header = () => {
	const pathname = usePathname();
	const location = pathname.split("/")[1];
	return (
		<div className="bg-gray-800 pb-32">
			<Disclosure as="nav" className="bg-gray-800">
				{({ open }: any) => (
					<>
						<div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
							<div className="border-b border-gray-700">
								<div className="flex items-center justify-between h-16 px-4 sm:px-0">
									<div className="flex items-center">
										<div className="flex-shrink-0">
											<Image
												className="h-8 w-8"
												src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
												alt="Workflow"
												height="32"
												width="32"
											/>
										</div>
										<div className="hidden md:block">
											<div className="ml-10 flex items-baseline space-x-4">
												{navigation.map((item) => (
													<a
														key={item.name}
														href={item.href}
														className={classNames(
															item.href ===
																`/${location}`
																? "bg-gray-900 text-white"
																: "text-gray-300 hover:bg-gray-700 hover:text-white",
															"px-3 py-2 rounded-md text-sm font-medium"
														)}
														aria-current={
															item.href ===
															`/${location}`
																? "page"
																: undefined
														}
													>
														{item.name}
													</a>
												))}
											</div>
										</div>
									</div>
									<div className="hidden md:block">
										<div className="ml-4 flex items-center md:ml-6">
											<Button
												type="button"
												onClick={() => {}}
											>
												Create new plan
												{/* <BellIcon
													className="h-6 w-6"
													aria-hidden="true"
												/> */}
											</Button>

											{/* Profile dropdown */}
											<Menu
												as="div"
												className="ml-3 relative"
											>
												<div>
													<Menu.Button className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
														<span className="sr-only">
															Open user menu
														</span>
														<Image
															className="h-8 w-8 rounded-full"
															src={user.imageUrl}
															alt=""
															height="32"
															width="32"
														/>
													</Menu.Button>
												</div>
												<Transition
													as={Fragment}
													enter="transition ease-out duration-100"
													enterFrom="transform opacity-0 scale-95"
													enterTo="transform opacity-100 scale-100"
													leave="transition ease-in duration-75"
													leaveFrom="transform opacity-100 scale-100"
													leaveTo="transform opacity-0 scale-95"
												>
													<Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
														{userNavigation.map(
															(item) => (
																<Menu.Item
																	key={
																		item.name
																	}
																>
																	{({
																		active,
																	}: any) => (
																		<a
																			href={
																				item.href
																			}
																			className={classNames(
																				active
																					? "bg-gray-100"
																					: "",
																				"block px-4 py-2 text-sm text-gray-700"
																			)}
																		>
																			{
																				item.name
																			}
																		</a>
																	)}
																</Menu.Item>
															)
														)}
													</Menu.Items>
												</Transition>
											</Menu>
										</div>
									</div>
									<div className="-mr-2 flex md:hidden">
										{/* Mobile menu button */}
										<Disclosure.Button className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
											<span className="sr-only">
												Open main menu
											</span>
											{open ? (
												<XIcon
													className="block h-6 w-6"
													aria-hidden="true"
												/>
											) : (
												<MenuIcon
													className="block h-6 w-6"
													aria-hidden="true"
												/>
											)}
										</Disclosure.Button>
									</div>
								</div>
							</div>
						</div>

						<Disclosure.Panel className="border-b border-gray-700 md:hidden">
							<div className="px-2 py-3 space-y-1 sm:px-3">
								{navigation.map((item) => (
									<Disclosure.Button
										key={item.name}
										as="a"
										href={item.href}
										className={classNames(
											item.current
												? "bg-gray-900 text-white"
												: "text-gray-300 hover:bg-gray-700 hover:text-white",
											"block px-3 py-2 rounded-md text-base font-medium"
										)}
										aria-current={
											item.current ? "page" : undefined
										}
									>
										{item.name}
									</Disclosure.Button>
								))}
							</div>
							<div className="pt-4 pb-3 border-t border-gray-700">
								<div className="flex items-center px-5">
									<div className="flex-shrink-0">
										<Image
											className="h-10 w-10 rounded-full"
											src={user.imageUrl}
											alt=""
											height="40"
											width="40"
										/>
									</div>
									<div className="ml-3">
										<div className="text-base font-medium leading-none text-white">
											{user.name}
										</div>
										<div className="text-sm font-medium leading-none text-gray-400">
											{user.email}
										</div>
									</div>
									<button
										type="button"
										className="ml-auto bg-primary flex-shrink-0 p-2 text-white rounded-full hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
									>
										<span className="sr-only">
											Create new plan
										</span>
										<PlusIcon
											className="h-6 w-6"
											aria-hidden="true"
										/>
									</button>
								</div>
								<div className="mt-3 px-2 space-y-1">
									{userNavigation.map((item) => (
										<Disclosure.Button
											key={item.name}
											as="a"
											href={item.href}
											className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
										>
											{item.name}
										</Disclosure.Button>
									))}
								</div>
							</div>
						</Disclosure.Panel>
					</>
				)}
			</Disclosure>
			<header className="py-10">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<h1 className="text-3xl font-bold text-white">Dashboard</h1>
				</div>
			</header>
		</div>
	);
};

export default Header;
