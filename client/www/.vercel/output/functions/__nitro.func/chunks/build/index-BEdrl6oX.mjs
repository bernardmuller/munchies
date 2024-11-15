import { jsx, Fragment, jsxs } from 'react/jsx-runtime';
import { g } from './button-DZIqpug3.mjs';
import { b, D, m as m$1, p as p$1, g as g$1 } from './input-DPMfAGGT.mjs';
import { Filter, FilterXIcon, PlusIcon, ArrowLeftIcon, ArrowRightIcon, ArrowUpDown, EllipsisIcon, Trash } from 'lucide-react';
import * as React from 'react';
import React__default, { useState } from 'react';
import { h as h$1, R } from './useCategories-BU-wEToM.mjs';
import { $, e as ee, t as te } from './NewIngredientForm-Bb__oI23.mjs';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { y, u, i } from './getAllCategories-f73zdoR0.mjs';
import { I, C, b as b$1, w } from './dropdown-menu-CXlQBPJa.mjs';
import { useAuth } from '@clerk/tanstack-start';
import { useReactTable, getCoreRowModel, getPaginationRowModel, getSortedRowModel, flexRender } from '@tanstack/react-table';
import { m } from './utils-bhneXptQ.mjs';
import { f, p } from './useLatestGrocerylistByHouseholdId-BJ0_MOz6.mjs';
import '@radix-ui/react-slot';
import 'class-variance-authority';
import '@radix-ui/react-dialog';
import './getAllIngredients-6sXcg4a7.mjs';
import 'zod';
import 'react-hook-form';
import '@hookform/resolvers/zod';
import '@babel/runtime/helpers/esm/objectSpread2';
import '@babel/runtime/helpers/esm/slicedToArray';
import '@babel/runtime/helpers/esm/objectWithoutProperties';
import '@babel/runtime/helpers/esm/extends';
import '@babel/runtime/helpers/esm/classCallCheck';
import '@babel/runtime/helpers/esm/createClass';
import '@babel/runtime/helpers/esm/inherits';
import '@babel/runtime/helpers/esm/createSuper';
import '@babel/runtime/helpers/esm/toConsumableArray';
import 'stylis';
import '@babel/runtime/helpers/esm/typeof';
import '@babel/runtime/helpers/esm/taggedTemplateLiteral';
import '@babel/runtime/helpers/esm/defineProperty';
import 'react-dom';
import '@floating-ui/dom';
import 'use-isomorphic-layout-effect';
import 'memoize-one';
import 'axios';
import '@radix-ui/react-dropdown-menu';
import 'clsx';
import 'tailwind-merge';
import './getLatestGrocerylistByHouseholdId-edhHmGoA.mjs';

async function he({ id: a, accessToken: r }) {
  return await u(i.deleteIngredient(a), "DELETE", void 0, { accessToken: r });
}
function pe() {
  const a = useQueryClient(), { getToken: r } = useAuth();
  return useMutation({ mutationKey: y.deleteIngredient, mutationFn: async (n) => {
    const g = await r({ template: "1_HOUR" }).then((o) => o == null ? void 0 : o.toString());
    return he({ id: n, accessToken: g });
  }, onSuccess: () => {
    a.invalidateQueries(y.ingredients);
  } });
}
const F = React.forwardRef(({ className: a, ...r }, n) => jsx("div", { className: "relative w-full overflow-auto", children: jsx("table", { ref: n, className: m("w-full caption-bottom text-sm", a), ...r }) }));
F.displayName = "Table";
const H = React.forwardRef(({ className: a, ...r }, n) => jsx("thead", { ref: n, className: m("[&_tr]:border-b text-xs md:text-base", a), ...r }));
H.displayName = "TableHeader";
const A = React.forwardRef(({ className: a, ...r }, n) => jsx("tbody", { ref: n, className: m("[&_tr:last-child]:border-0", a), ...r }));
A.displayName = "TableBody";
const fe = React.forwardRef(({ className: a, ...r }, n) => jsx("tfoot", { ref: n, className: m("border-t bg-muted/50 font-medium [&>tr]:last:border-b-0", a), ...r }));
fe.displayName = "TableFooter";
const h = React.forwardRef(({ className: a, ...r }, n) => jsx("tr", { ref: n, className: m("border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted", a), ...r }));
h.displayName = "TableRow";
const L = React.forwardRef(({ className: a, ...r }, n) => jsx("th", { ref: n, className: m("h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0", a), ...r }));
L.displayName = "TableHead";
const x = React.forwardRef(({ className: a, ...r }, n) => jsx("td", { ref: n, className: m("px-4 py-2 align-middle [&:has([role=checkbox])]:pr-0 text-xs md:text-base", a), ...r }));
x.displayName = "TableCell";
const we = React.forwardRef(({ className: a, ...r }, n) => jsx("caption", { ref: n, className: m("mt-4 text-sm text-muted-foreground", a), ...r }));
we.displayName = "TableCaption";
function ye({ columns: a, data: r }) {
  var _a;
  const [n, g$1] = useState([]), o = useReactTable({ data: r, columns: a, getCoreRowModel: getCoreRowModel(), getPaginationRowModel: getPaginationRowModel(), onSortingChange: g$1, getSortedRowModel: getSortedRowModel(), state: { sorting: n } });
  return jsxs("div", { children: [jsx("div", { className: "rounded-md border", children: jsxs(F, { children: [jsx(H, { children: o.getHeaderGroups().map((l) => jsx(h, { children: l.headers.map((s) => jsx(L, { children: s.isPlaceholder ? null : flexRender(s.column.columnDef.header, s.getContext()) }, s.id)) }, l.id)) }), jsx(A, { children: ((_a = o.getRowModel().rows) == null ? void 0 : _a.length) ? o.getRowModel().rows.map((l) => jsx(h, { "data-state": l.getIsSelected() && "selected", children: l.getVisibleCells().map((s, f) => jsx(x, { className: f === 0 ? "w-4" : "", children: flexRender(s.column.columnDef.cell, s.getContext()) }, s.id)) }, l.id)) : jsx(h, { children: jsx(x, { colSpan: a.length, className: "h-24 text-center", children: "No results." }) }) })] }) }), jsxs("div", { className: "flex justify-between pt-4", children: [jsxs("span", { className: "text-sm text-gray-400", children: ["page ", o.getState().pagination.pageIndex + 1, " of", " ", o.getPageCount()] }), jsxs("div", { className: "flex items-center space-x-2", children: [jsx(g, { variant: "outline", onClick: () => o.previousPage(), disabled: !o.getCanPreviousPage(), children: jsx(ArrowLeftIcon, {}) }), jsx(g, { variant: "outline", onClick: () => o.nextPage(), disabled: !o.getCanNextPage(), children: jsx(ArrowRightIcon, {}) })] })] })] });
}
function Ne() {
  const a = pe(), { toast: r } = h$1(), { data: n, isFetching: g$2 } = $(), { data: o } = f({ initialData: null }), { data: l } = p({ initialData: [] }), { data: s } = R(), f$1 = ee(l == null ? void 0 : l.id), B = ee(o == null ? void 0 : o.id), [G, w$1] = React__default.useState(false), [v, C$1] = React__default.useState(""), [y$1, I$1] = React__default.useState(null), T = useQueryClient(), K = (t) => {
    a.mutate(t, { onSuccess: () => {
      T.invalidateQueries(y.ingredients), r({ variant: "success", title: "Success", description: "Ingredient deleted successfully" });
    } });
  }, _ = [{ accessorKey: "#", header: ({ column: t }) => jsxs(g, { variant: "ghost", onClick: () => t.toggleSorting(t.getIsSorted() === "asc"), children: [jsx("span", { className: "text-gray-500", children: "#" }), jsx(ArrowUpDown, { className: "ml-2 h-4 w-4 text-gray-500" })] }), cell: ({ row: t }) => jsx("div", { className: "w-8", children: t.index + 1 }) }, { accessorKey: "name", header: ({ column: t }) => jsxs(g, { variant: "ghost", onClick: () => t.toggleSorting(t.getIsSorted() === "asc"), children: [jsx("span", { className: "text-gray-500", children: "Name" }), jsx(ArrowUpDown, { className: "ml-2 h-4 w-4 text-gray-500" })] }), cell: ({ row: t }) => jsx("div", { className: "w-full", children: t.original.name }) }, { accessorKey: "categoryName", header: "Category" }, { accessorKey: "action", header: () => jsx("div", { className: "w-full flex justify-end ", children: "Action" }), cell: ({ cell: t }) => jsx("div", { className: "w-full flex justify-end", children: jsxs(I, { children: [jsx(C, { children: jsx("div", { className: "h-8", children: jsx(EllipsisIcon, { className: "rotate-90 dark:stroke-white" }) }) }), jsxs(b$1, { className: "px-2 space-y-2 py-2", align: "end", children: [jsxs("div", { className: "flex flex-col", children: [jsxs(w, { className: "h-8", onClick: () => f$1.mutate({ ingredientId: t.row.original.id, name: t.row.original.name, categoryId: t.row.original.categoryId, id: t.row.original.id }), children: [jsx(PlusIcon, { className: "h-4 w-4 mr-2" }), "Add to my list"] }), o && o.id && jsxs(w, { className: "w-full justify-start h-8", onClick: () => B.mutate({ ingredientId: t.row.original.id, name: t.row.original.name, categoryId: t.row.original.categoryId, id: t.row.original.id }), children: [jsx(PlusIcon, { className: "h-4 w-4 mr-2" }), "Add to household list"] })] }), jsxs(w, { className: "flex gap-1 hover:bg-gray-50 w-full justify-start px-2 bg-red-400 hover:bg-red-500", onClick: () => K(t.row.original.id), children: [jsx(Trash, { className: "h-4 w-4" }), jsx("span", { children: "Delete" })] })] })] }) }) }];
  return g$2 && !n ? jsx("div", { className: "flex justify-center items-center", children: "Loading..." }) : jsx(Fragment, { children: jsxs("div", { className: "flex flex-col gap-4 w-full min-h-[50vh] py-4 md:pt-0 px-2 md:px-0 bg-white", children: [jsxs("div", { className: "flex justify-between", children: [jsx("div", { children: jsx(b, { placeholder: "Search items...", value: v, onChange: (t) => C$1(t.target.value) }) }), jsxs("div", { className: "flex items-center gap-2", children: [jsxs(I, { children: [jsx(C, { children: jsx("div", { children: jsx(Filter, {}) }) }), jsx(b$1, { className: "px-2", align: "end", children: s == null ? void 0 : s.map((t) => jsx(w, { className: "p-2", children: jsx("div", { className: "flex gap-1 hover:bg-gray-50 w-full", onClick: () => I$1(t.id), children: t.name }) }, t.id)) })] }), jsx(g, { onClick: () => {
    C$1(""), I$1(null);
  }, variant: "ghost", disabled: !y$1, children: jsx(FilterXIcon, {}) }), jsxs(D, { open: G, onOpenChange: w$1, children: [jsxs(g, { onClick: () => w$1(true), children: [jsx(PlusIcon, {}), jsx("span", { className: "hidden md:block", children: "New Item" })] }), jsxs(m$1, { children: [jsx(p$1, { children: jsx(g$1, { children: "New Item" }) }), jsx(te, { defaultValue: "", categories: s, onClose: () => w$1(false), onInvalidate: () => {
    T.invalidateQueries(y.ingredients);
  } })] })] })] })] }), (n == null ? void 0 : n.length) && jsx(ye, { columns: _, data: n.filter((t) => y$1 !== null ? t.categoryId === y$1 : true).filter((t) => t.name.toLowerCase().includes(v.toLowerCase())) })] }) });
}
const Xe = () => jsx(Ne, {});

export { Xe as component };
//# sourceMappingURL=index-BEdrl6oX.mjs.map
