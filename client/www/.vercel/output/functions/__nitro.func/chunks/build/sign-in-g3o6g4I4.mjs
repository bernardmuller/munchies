import { jsxs, jsx } from 'react/jsx-runtime';
import { useAuth, SignIn } from '@clerk/tanstack-start';
import { useEffect } from 'react';
import { FaGithub } from 'react-icons/fa';
import { a } from './skeleton-B3DVyw4A.mjs';
import './utils-bhneXptQ.mjs';
import 'clsx';
import 'tailwind-merge';

const w = function() {
  const { isSignedIn: s, isLoaded: i } = useAuth();
  return useEffect(() => {
    s && (window.location.href = "/lists");
  }, [s]), jsxs("div", { className: "min-h-screen flex flex-col", children: [jsxs("main", { className: "flex-grow relative", children: [jsx("div", { className: "absolute top-0 left-0 right-0 h-[300px] bg-header", "aria-hidden": "true" }), jsxs("div", { className: "relative flex flex-col items-center z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-full", children: [jsx("div", { className: "w-full text-center pt-16 pb-8", children: jsxs("div", { children: [jsx("h1", { className: "text-2xl text-white font-bold", children: "Munchies" }), jsx("h4", { className: "text-md text-gray-400", children: "Sign in" })] }) }), jsx("div", { className: "relative rounded-lg bg-white shadow-xl min-h-[455px] min-w-[335px] sm:min-w-[374px] md:min-w-[400px]", children: jsx("div", { className: "w-full z-30 flex justify-center", children: i ? jsx(SignIn, { routing: "hash", forceRedirectUrl: window.location.href }) : jsxs("div", { className: "absolute w-full mx-auto p-6 space-y-6", children: [jsxs("div", { className: "space-y-2", children: [jsx(a, { className: "h-8 w-2/3 mx-auto" }), jsx(a, { className: "h-4 w-5/6 mx-auto" })] }), jsxs("div", { className: "flex gap-2 mt-2 pt-2 px-2", children: [jsx(a, { className: "h-8 w-full rounded-lg" }), jsx(a, { className: "h-8 w-full rounded-lg" })] }), jsx("div", { className: "flex items-center justify-center", children: jsx(a, { className: "h-4 w-8" }) }), jsxs("div", { className: "space-y-2", children: [jsx(a, { className: "h-4 w-1/3" }), jsx(a, { className: "h-10 w-full rounded-lg" })] }), jsx(a, { className: "h-10 w-full rounded-lg px-4" }), jsxs("div", { className: "space-y-8 pt-4", children: [jsx(a, { className: "h-4 w-2/3 mx-auto" }), jsx(a, { className: "h-4 w-1/3 mx-auto" })] })] }) }) })] })] }), jsxs("div", { className: "w-full flex flex-col justify-center items-center py-3 gap-2 pt-64 md:pt-0", children: [jsx("a", { href: "https://github.com/bernardmuller/munchies", target: "_blank", rel: "noreferrer", children: jsx(FaGithub, { className: "w-6 h-6" }) }), jsx("p", { className: "text-sm text-gray-400 text-center", children: "\xA9 2024 Munchies. All rights reserved." })] })] });
};

export { w as component };
//# sourceMappingURL=sign-in-g3o6g4I4.mjs.map
