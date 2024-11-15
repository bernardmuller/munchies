import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { useNavigate } from '@tanstack/react-router';
import * as React from 'react';
import React__default, { useMemo, useCallback, forwardRef, useState } from 'react';
import { ChevronLeft, Minus, Trash, Plus } from 'lucide-react';
import { g as g$1 } from './button-DZIqpug3.mjs';
import { n, m as m$1, x } from './card-C2TxHGvX.mjs';
import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query';
import { y, p as p$1, u, i } from './getAllCategories-f73zdoR0.mjs';
import { useAuth } from '@clerk/tanstack-start';
import { c as cleanValue, v as valueTernary, g as getOptionValue$1, a as getOptionLabel$1, u as useStateManager, S as Select, e as ee, $, t as te, b as StateManagedSelect$1 } from './NewIngredientForm-Bb__oI23.mjs';
import { R, h } from './useCategories-BU-wEToM.mjs';
import _extends from '@babel/runtime/helpers/esm/extends';
import _objectSpread from '@babel/runtime/helpers/esm/objectSpread2';
import _toConsumableArray from '@babel/runtime/helpers/esm/toConsumableArray';
import _objectWithoutProperties from '@babel/runtime/helpers/esm/objectWithoutProperties';
import { D, m, p, g } from './input-DPMfAGGT.mjs';
import { a } from './skeleton-B3DVyw4A.mjs';
import { D as De } from '../nitro/nitro.mjs';
import '@radix-ui/react-slot';
import 'class-variance-authority';
import './utils-bhneXptQ.mjs';
import 'clsx';
import 'tailwind-merge';
import '@radix-ui/react-scroll-area';
import 'axios';
import 'zod';
import './getAllIngredients-6sXcg4a7.mjs';
import 'react-hook-form';
import '@hookform/resolvers/zod';
import '@babel/runtime/helpers/esm/slicedToArray';
import '@babel/runtime/helpers/esm/classCallCheck';
import '@babel/runtime/helpers/esm/createClass';
import '@babel/runtime/helpers/esm/inherits';
import '@babel/runtime/helpers/esm/createSuper';
import 'stylis';
import '@babel/runtime/helpers/esm/typeof';
import '@babel/runtime/helpers/esm/taggedTemplateLiteral';
import '@babel/runtime/helpers/esm/defineProperty';
import 'react-dom';
import '@floating-ui/dom';
import 'use-isomorphic-layout-effect';
import 'memoize-one';
import '@radix-ui/react-dialog';
import 'node:http';
import 'node:https';
import 'node:zlib';
import 'node:stream';
import 'node:buffer';
import 'node:util';
import 'node:url';
import 'node:net';
import 'node:fs';
import 'node:path';
import 'vinxi/lib/invariant';
import 'vinxi/lib/path';
import '@tanstack/router-devtools';
import '@clerk/tanstack-start/server';
import 'node:async_hooks';
import 'react-dom/server';

var _excluded = ["allowCreateWhileLoading", "createOptionPosition", "formatCreateLabel", "isValidNewOption", "getNewOptionData", "onCreateOption", "options", "onChange"];
var compareOption = function compareOption() {
  var inputValue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var option = arguments.length > 1 ? arguments[1] : undefined;
  var accessors = arguments.length > 2 ? arguments[2] : undefined;
  var candidate = String(inputValue).toLowerCase();
  var optionValue = String(accessors.getOptionValue(option)).toLowerCase();
  var optionLabel = String(accessors.getOptionLabel(option)).toLowerCase();
  return optionValue === candidate || optionLabel === candidate;
};
var builtins = {
  formatCreateLabel: function formatCreateLabel(inputValue) {
    return "Create \"".concat(inputValue, "\"");
  },
  isValidNewOption: function isValidNewOption(inputValue, selectValue, selectOptions, accessors) {
    return !(!inputValue || selectValue.some(function (option) {
      return compareOption(inputValue, option, accessors);
    }) || selectOptions.some(function (option) {
      return compareOption(inputValue, option, accessors);
    }));
  },
  getNewOptionData: function getNewOptionData(inputValue, optionLabel) {
    return {
      label: optionLabel,
      value: inputValue,
      __isNew__: true
    };
  }
};
function useCreatable(_ref) {
  var _ref$allowCreateWhile = _ref.allowCreateWhileLoading,
    allowCreateWhileLoading = _ref$allowCreateWhile === void 0 ? false : _ref$allowCreateWhile,
    _ref$createOptionPosi = _ref.createOptionPosition,
    createOptionPosition = _ref$createOptionPosi === void 0 ? 'last' : _ref$createOptionPosi,
    _ref$formatCreateLabe = _ref.formatCreateLabel,
    formatCreateLabel = _ref$formatCreateLabe === void 0 ? builtins.formatCreateLabel : _ref$formatCreateLabe,
    _ref$isValidNewOption = _ref.isValidNewOption,
    isValidNewOption = _ref$isValidNewOption === void 0 ? builtins.isValidNewOption : _ref$isValidNewOption,
    _ref$getNewOptionData = _ref.getNewOptionData,
    getNewOptionData = _ref$getNewOptionData === void 0 ? builtins.getNewOptionData : _ref$getNewOptionData,
    onCreateOption = _ref.onCreateOption,
    _ref$options = _ref.options,
    propsOptions = _ref$options === void 0 ? [] : _ref$options,
    propsOnChange = _ref.onChange,
    restSelectProps = _objectWithoutProperties(_ref, _excluded);
  var _restSelectProps$getO = restSelectProps.getOptionValue,
    getOptionValue$1$1 = _restSelectProps$getO === void 0 ? getOptionValue$1 : _restSelectProps$getO,
    _restSelectProps$getO2 = restSelectProps.getOptionLabel,
    getOptionLabel$1$1 = _restSelectProps$getO2 === void 0 ? getOptionLabel$1 : _restSelectProps$getO2,
    inputValue = restSelectProps.inputValue,
    isLoading = restSelectProps.isLoading,
    isMulti = restSelectProps.isMulti,
    value = restSelectProps.value,
    name = restSelectProps.name;
  var newOption = useMemo(function () {
    return isValidNewOption(inputValue, cleanValue(value), propsOptions, {
      getOptionValue: getOptionValue$1$1,
      getOptionLabel: getOptionLabel$1$1
    }) ? getNewOptionData(inputValue, formatCreateLabel(inputValue)) : undefined;
  }, [formatCreateLabel, getNewOptionData, getOptionLabel$1$1, getOptionValue$1$1, inputValue, isValidNewOption, propsOptions, value]);
  var options = useMemo(function () {
    return (allowCreateWhileLoading || !isLoading) && newOption ? createOptionPosition === 'first' ? [newOption].concat(_toConsumableArray(propsOptions)) : [].concat(_toConsumableArray(propsOptions), [newOption]) : propsOptions;
  }, [allowCreateWhileLoading, createOptionPosition, isLoading, newOption, propsOptions]);
  var onChange = useCallback(function (newValue, actionMeta) {
    if (actionMeta.action !== 'select-option') {
      return propsOnChange(newValue, actionMeta);
    }
    var valueArray = Array.isArray(newValue) ? newValue : [newValue];
    if (valueArray[valueArray.length - 1] === newOption) {
      if (onCreateOption) onCreateOption(inputValue);else {
        var newOptionData = getNewOptionData(inputValue, inputValue);
        var newActionMeta = {
          action: 'create-option',
          name: name,
          option: newOptionData
        };
        propsOnChange(valueTernary(isMulti, [].concat(_toConsumableArray(cleanValue(value)), [newOptionData]), newOptionData), newActionMeta);
      }
      return;
    }
    propsOnChange(newValue, actionMeta);
  }, [getNewOptionData, inputValue, isMulti, name, newOption, onCreateOption, propsOnChange, value]);
  return _objectSpread(_objectSpread({}, restSelectProps), {}, {
    options: options,
    onChange: onChange
  });
}

var CreatableSelect = /*#__PURE__*/forwardRef(function (props, ref) {
  var creatableProps = useStateManager(props);
  var selectProps = useCreatable(creatableProps);
  return /*#__PURE__*/React.createElement(Select, _extends({
    ref: ref
  }, selectProps));
});
var CreatableSelect$1 = CreatableSelect;

async function oe(r, i$1) {
  return await u(i.getGrocerylistById(i$1), "GET", void 0, { accessToken: r });
}
function le({ id: r }) {
  const { getToken: i } = useAuth(), u = i({ template: "1_HOUR" }).then((s) => s == null ? void 0 : s.toString());
  return useQuery({ queryKey: y.getGrocerylistById(r), queryFn: async () => {
    const s = await oe(await u, r);
    return s.data ? s.data : null;
  }, enabled: !!u, staleTime: p$1 });
}
async function ce({ id: r, accessToken: i$1 }) {
  return await u(i.deleteItem(r), "DELETE", void 0, { accessToken: i$1 });
}
function me(r) {
  const i = useQueryClient(), { getToken: u } = useAuth();
  return h(), useMutation({ mutationKey: ["delete-item"], mutationFn: async (s) => {
    const n = await u({ template: "1_HOUR" }).then((c) => c == null ? void 0 : c.toString());
    return ce({ id: s, accessToken: n });
  }, onMutate: async (s) => {
    await i.cancelQueries([...y.latestGrocerylistByUserId, ...y.latestGrocerylistByHouseholdId, ...y.getGrocerylistById(r)]);
    const n = await i.getQueryData(y.getGrocerylistById(r));
    return i.setQueryData(y.getGrocerylistById(r), { ...n, items: n.items.filter((c) => c.item_id !== s) }), { prev: n };
  }, onSuccess: () => {
    i.invalidateQueries([...y.latestGrocerylistByUserId, ...y.latestGrocerylistByHouseholdId, ...y.getGrocerylistById(r)]);
  } });
}
const de = ({ options: r, onSelect: i, placeholder: u, onFocus: s }) => jsx(StateManagedSelect$1, { options: r.map((n) => ({ value: n.id, label: n.name })), placeholder: "Search ingredients...", onChange: (n) => {
  const c = r.find((p) => p.id === n.value);
  n && n.value && c && i(c);
}, onFocus: s, className: "my-react-select-container", classNamePrefix: "my-react-select" });
function ue() {
  const { listId: r } = De.useParams(), i = useNavigate({ from: "/lists/$listId" }), [u, s] = React__default.useState(false), { data: n$1, isFetching: c } = le({ id: r }), { data: p$1 } = R(), q = useQueryClient(), F = ee(r), I = me(r), [x$1, f] = useState(""), { data: m$2, isFetching: R$1 } = $(), { toast: C } = h(), y$1 = useMemo(() => {
    if (!n$1) return [];
    const e = n$1.items.reduce((a, d) => (a[d.name] = (a[d.name] || 0) + 1, a), {});
    return n$1.items.reduce((a, d) => (a.some((M) => M.name === d.name) || a.push({ ...d, quantity: e[d.name] }), a), []);
  }, [n$1]), g$2 = async (e) => {
    if (!e) {
      C({ variant: "destructive", title: "Error", description: "Ingredient Id not found." });
      return;
    }
    const a = m$2 == null ? void 0 : m$2.find((d) => d.id === e);
    if (!a) {
      C({ variant: "destructive", title: "Error", description: "Ingredient not found." });
      return;
    }
    await F.mutateAsync({ ...a, ingredientId: a.id });
  }, Q = async (e) => {
    I.mutate(e);
  }, A = (e) => {
    if (n$1) for (const a of n$1.items) a.ingredient_id === e && I.mutate(a.item_id);
  }, E = (e) => {
    s(true), f(e);
  }, O = () => {
    const e = document.querySelector(".page");
    e && window.scrollTo({ top: e.offsetTop, behavior: "smooth" });
  };
  return jsxs(Fragment, { children: [jsx(D, { open: u, onOpenChange: s, children: jsxs(m, { className: "sm:max-w-[425px] bg-white", children: [jsx(p, { children: jsx(g, { className: "text-center mb-4", children: "New Ingredient" }) }), jsx(te, { defaultValue: x$1, categories: (p$1 == null ? void 0 : p$1.length) ? p$1 : [], onClose: () => s(false), onInvalidate: () => {
    q.invalidateQueries(y.ingredients);
  } })] }) }), jsxs("div", { className: "container mx-auto p-4", children: [jsxs(g$1, { variant: "outline", onClick: () => i({ to: "/lists" }), className: "mb-4", children: [jsx(ChevronLeft, { className: "mr-2 h-4 w-4" }), "Back"] }), jsxs("div", { className: "flex flex-col md:flex-row gap-4 min-h-[100vh]", children: [jsxs("div", { className: "w-full md:w-1/2", children: [jsx("h2", { className: "text-xl font-semibold mb-2", children: "Current Grocery List" }), jsx("div", { className: "md:hidden mb-4 page", children: jsx(de, { options: m$2 && m$2.length ? m$2 : [], onSelect: (e) => g$2(e.id), placeholder: "Search and add ingredients...", onFocus: O }) }), jsx(n, { className: "min-h-[75vh]", children: jsxs("div", { className: "space-y-2", children: [!y$1.length && !R$1 && jsx("span", { className: "text-center text-muted-foreground", children: "No items in list." }), c && !y$1.length ? jsx(Fragment, { children: [...Array(3)].map((e, a$1) => jsx(m$1, { children: jsx(x, { className: "p-6 px-7", children: jsxs("div", { className: "flex justify-between items-center", children: [jsxs("div", { className: "flex items-center space-x-2", children: [jsx(a, { className: "h-6 w-6 rounded-sm" }), jsx(a, { className: "h-6 w-24" })] }), jsx(a, { className: "h-6 w-12" })] }) }) }, a$1)) }) : null, y$1.map((e) => jsx(m$1, { children: jsxs(x, { className: "flex items-center justify-between p-4", children: [jsx("span", { className: "flex-grow", children: e.name }), jsxs("div", { className: "flex items-center space-x-2", children: [e.quantity > 1 ? jsx(g$1, { variant: "outline", size: "icon", onClick: () => Q(e.item_id), children: jsx(Minus, { className: "h-4 w-4" }) }) : jsx(g$1, { variant: "outline", size: "icon", onClick: () => A(e.ingredient_id), children: jsx(Trash, { className: "h-4 w-4" }) }), jsx("span", { className: "w-8 text-center", children: e.quantity || 0 }), jsx(g$1, { variant: "outline", size: "icon", onClick: () => {
    g$2(e.ingredient_id);
  }, children: jsx(Plus, { className: "h-4 w-4" }) })] })] }) }, e.item_id))] }) })] }), jsxs("div", { className: "hidden md:block w-full md:w-1/2", children: [jsx("h2", { className: "text-xl font-semibold mb-2", children: "Available Items" }), jsx("div", { className: "mb-4 relative pr-4", children: jsx(CreatableSelect$1, { isClearable: true, options: m$2 == null ? void 0 : m$2.map((e) => ({ value: e.id, label: e.name })), placeholder: "Search for an item...", onCreateOption: E, onChange: (e) => {
    f(e ? e.label.toString() : "");
  }, onInputChange: (e) => f(e), menuShouldScrollIntoView: true, className: "my-react-select-container", classNamePrefix: "my-react-select", styles: { input: (e) => ({ ...e, fontSize: "16px" }), control: (e) => ({ ...e, borderRadius: 8, height: 44 }), indicatorSeparator: (e) => ({ ...e, display: "none" }), menu: (e) => ({ ...e, borderRadius: 8 }) } }) }), jsx(n, { className: "md:h-[calc(100vh-250px)] min-h-75vh]", children: jsx("div", { className: "space-y-2 pr-4", children: m$2 && m$2.length ? m$2.filter((e) => e.name.toLowerCase().includes(x$1.toLowerCase())).map((e) => jsx(m$1, { children: jsxs(x, { className: "flex items-center justify-between p-4", children: [jsx("span", { className: "flex-grow", children: e.name }), jsx(g$1, { variant: "outline", size: "icon", onClick: () => g$2(e.id), children: jsx(Plus, { className: "h-4 w-4" }) })] }) }, e.id)) : null }) })] })] })] })] });
}
const We = () => jsx(ue, {});

export { We as component };
//# sourceMappingURL=_listId-BjR8dpTv.mjs.map
