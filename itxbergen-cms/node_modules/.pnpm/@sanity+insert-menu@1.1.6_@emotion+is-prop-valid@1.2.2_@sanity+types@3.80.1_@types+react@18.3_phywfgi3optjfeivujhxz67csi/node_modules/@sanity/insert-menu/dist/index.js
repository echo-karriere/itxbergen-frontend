import { jsx, jsxs } from "react/jsx-runtime";
import { c } from "react-compiler-runtime";
import { SearchIcon, UlistIcon, ThLargeIcon } from "@sanity/icons";
import { Box, TabList, Tab, Text, Grid, Stack, MenuItem, Flex, Menu, TextInput, Tooltip, Button } from "@sanity/ui/_visual-editing";
import startCase from "lodash/startCase.js";
import { useReducer, useState } from "react";
import { isValidElementType } from "react-is";
function getSchemaTypeIcon(schemaType) {
  const referenceIcon = isReferenceSchemaType(schemaType) && (schemaType.to ?? []).length === 1 ? schemaType.to[0].icon : void 0;
  return schemaType.icon ?? schemaType.type?.icon ?? referenceIcon;
}
function isReferenceSchemaType(type) {
  return isRecord(type) && (type.name === "reference" || isReferenceSchemaType(type.type));
}
function isRecord(value) {
  return !!value && (typeof value == "object" || typeof value == "function");
}
function fullInsertMenuReducer(state, event) {
  return {
    query: event.type === "change query" ? event.query : state.query,
    groups: event.type === "select group" ? state.groups.map((group) => ({
      ...group,
      selected: event.name === group.name
    })) : state.groups,
    views: event.type === "toggle view" ? state.views.map((view) => ({
      ...view,
      selected: event.name === view.name
    })) : state.views
  };
}
const ALL_ITEMS_GROUP_NAME = "all-items", gridStyle = {
  gridTemplateColumns: "repeat(auto-fill, minmax(118px, 1fr))"
};
function InsertMenu(props) {
  const $ = c(54), showIcons = props.showIcons === void 0 ? !0 : props.showIcons, showFilter = props.filter === void 0 || props.filter === "auto" ? props.schemaTypes.length > 5 : props.filter;
  let t0;
  $[0] !== props.groups || $[1] !== props.labels ? (t0 = props.groups ? [{
    name: ALL_ITEMS_GROUP_NAME,
    title: props.labels["insert-menu.filter.all-items"],
    selected: !0
  }, ...props.groups.map(_temp)] : [], $[0] = props.groups, $[1] = props.labels, $[2] = t0) : t0 = $[2];
  let t1;
  $[3] !== props.views ? (t1 = props.views ?? [{
    name: "list"
  }], $[3] = props.views, $[4] = t1) : t1 = $[4];
  let t2;
  $[5] !== t1 ? (t2 = t1.map(_temp2), $[5] = t1, $[6] = t2) : t2 = $[6];
  let t3;
  $[7] !== t0 || $[8] !== t2 ? (t3 = {
    query: "",
    groups: t0,
    views: t2
  }, $[7] = t0, $[8] = t2, $[9] = t3) : t3 = $[9];
  const [state, send] = useReducer(fullInsertMenuReducer, t3);
  let T0, T1, T2, t4, t5, t6, t7, t8, t9;
  if ($[10] !== props || $[11] !== showFilter || $[12] !== showIcons || $[13] !== state.groups || $[14] !== state.query || $[15] !== state.views) {
    const filteredSchemaTypes = filterSchemaTypes(props.schemaTypes, state.query, state.groups), selectedView = state.views.find(_temp3), showingFilterOrViews = showFilter || state.views.length > 1, showingTabs = state.groups && state.groups.length > 0, showingAnyOptions = showingFilterOrViews || showingTabs;
    T2 = Menu, t9 = 0, T1 = Flex, t6 = "column", t7 = "fill";
    let t102;
    $[25] !== showingAnyOptions ? (t102 = showingAnyOptions ? {
      style: {
        borderBottom: "1px solid var(--card-border-color)"
      },
      paddingBottom: 1
    } : {}, $[25] = showingAnyOptions, $[26] = t102) : t102 = $[26];
    let t112;
    $[27] !== props.labels || $[28] !== showFilter || $[29] !== showingFilterOrViews || $[30] !== state.query || $[31] !== state.views ? (t112 = showingFilterOrViews ? /* @__PURE__ */ jsxs(Flex, { flex: "none", align: "center", paddingTop: 1, paddingX: 1, gap: 1, children: [
      showFilter ? /* @__PURE__ */ jsx(Box, { flex: 1, children: /* @__PURE__ */ jsx(TextInput, { autoFocus: !0, border: !1, fontSize: 1, icon: SearchIcon, onChange: (event) => {
        send({
          type: "change query",
          query: event.target.value
        });
      }, placeholder: props.labels["insert-menu.search.placeholder"], value: state.query }) }) : null,
      state.views.length > 1 ? /* @__PURE__ */ jsx(Box, { flex: "none", children: /* @__PURE__ */ jsx(ViewToggle, { views: state.views, onToggle: (name) => {
        send({
          type: "toggle view",
          name
        });
      }, labels: props.labels }) }) : null
    ] }) : null, $[27] = props.labels, $[28] = showFilter, $[29] = showingFilterOrViews, $[30] = state.query, $[31] = state.views, $[32] = t112) : t112 = $[32];
    let t122;
    $[33] !== showingTabs || $[34] !== state.groups ? (t122 = showingTabs ? /* @__PURE__ */ jsx(Box, { paddingTop: 1, paddingX: 1, children: /* @__PURE__ */ jsx(TabList, { space: 1, children: state.groups.map((group_0) => /* @__PURE__ */ jsx(Tab, { id: `${group_0.name}-tab`, "aria-controls": `${group_0.name}-panel`, label: group_0.title ?? startCase(group_0.name), selected: group_0.selected, onClick: () => {
      send({
        type: "select group",
        name: group_0.name
      });
    } }, group_0.name)) }) }) : null, $[33] = showingTabs, $[34] = state.groups, $[35] = t122) : t122 = $[35], $[36] !== t102 || $[37] !== t112 || $[38] !== t122 ? (t8 = /* @__PURE__ */ jsxs(Box, { ...t102, children: [
      t112,
      t122
    ] }), $[36] = t102, $[37] = t112, $[38] = t122, $[39] = t8) : t8 = $[39], T0 = Box, t4 = 1, t5 = filteredSchemaTypes.length === 0 ? /* @__PURE__ */ jsx(Box, { padding: 2, children: /* @__PURE__ */ jsx(Text, { muted: !0, size: 1, children: props.labels["insert-menu.search.no-results"] }) }) : selectedView ? selectedView.name === "grid" ? /* @__PURE__ */ jsx(Grid, { autoRows: "auto", flex: 1, gap: 1, style: gridStyle, children: filteredSchemaTypes.map((schemaType) => /* @__PURE__ */ jsx(GridMenuItem, { icon: showIcons ? getSchemaTypeIcon(schemaType) : void 0, onClick: () => {
      props.onSelect(schemaType);
    }, previewImageUrl: selectedView.previewImageUrl?.(schemaType.name), schemaType }, schemaType.name)) }) : /* @__PURE__ */ jsx(Stack, { flex: 1, space: 1, children: filteredSchemaTypes.map((schemaType_0) => /* @__PURE__ */ jsx(MenuItem, { icon: showIcons ? getSchemaTypeIcon(schemaType_0) : void 0, onClick: () => {
      props.onSelect(schemaType_0);
    }, text: schemaType_0.title ?? startCase(schemaType_0.name) }, schemaType_0.name)) }) : null, $[10] = props, $[11] = showFilter, $[12] = showIcons, $[13] = state.groups, $[14] = state.query, $[15] = state.views, $[16] = T0, $[17] = T1, $[18] = T2, $[19] = t4, $[20] = t5, $[21] = t6, $[22] = t7, $[23] = t8, $[24] = t9;
  } else
    T0 = $[16], T1 = $[17], T2 = $[18], t4 = $[19], t5 = $[20], t6 = $[21], t7 = $[22], t8 = $[23], t9 = $[24];
  let t10;
  $[40] !== T0 || $[41] !== t4 || $[42] !== t5 ? (t10 = /* @__PURE__ */ jsx(T0, { padding: t4, children: t5 }), $[40] = T0, $[41] = t4, $[42] = t5, $[43] = t10) : t10 = $[43];
  let t11;
  $[44] !== T1 || $[45] !== t10 || $[46] !== t6 || $[47] !== t7 || $[48] !== t8 ? (t11 = /* @__PURE__ */ jsxs(T1, { direction: t6, height: t7, children: [
    t8,
    t10
  ] }), $[44] = T1, $[45] = t10, $[46] = t6, $[47] = t7, $[48] = t8, $[49] = t11) : t11 = $[49];
  let t12;
  return $[50] !== T2 || $[51] !== t11 || $[52] !== t9 ? (t12 = /* @__PURE__ */ jsx(T2, { padding: t9, children: t11 }), $[50] = T2, $[51] = t11, $[52] = t9, $[53] = t12) : t12 = $[53], t12;
}
function _temp3(view_0) {
  return view_0.selected;
}
function _temp2(view, index) {
  return {
    ...view,
    selected: index === 0
  };
}
function _temp(group) {
  return {
    ...group,
    selected: !1
  };
}
const viewToggleIcon = {
  grid: ThLargeIcon,
  list: UlistIcon
}, viewToggleTooltip = {
  grid: "insert-menu.toggle-grid-view.tooltip",
  list: "insert-menu.toggle-list-view.tooltip"
};
function ViewToggle(props) {
  const $ = c(11), viewIndex = props.views.findIndex(_temp4), nextView = props.views[viewIndex + 1] ?? props.views[0], t0 = props.labels[viewToggleTooltip[nextView.name]];
  let t1;
  $[0] !== t0 ? (t1 = /* @__PURE__ */ jsx(Text, { size: 1, children: t0 }), $[0] = t0, $[1] = t1) : t1 = $[1];
  const t2 = viewToggleIcon[nextView.name];
  let t3;
  $[2] !== nextView.name || $[3] !== props ? (t3 = () => {
    props.onToggle(nextView.name);
  }, $[2] = nextView.name, $[3] = props, $[4] = t3) : t3 = $[4];
  let t4;
  $[5] !== t2 || $[6] !== t3 ? (t4 = /* @__PURE__ */ jsx(Button, { mode: "bleed", icon: t2, onClick: t3 }), $[5] = t2, $[6] = t3, $[7] = t4) : t4 = $[7];
  let t5;
  return $[8] !== t1 || $[9] !== t4 ? (t5 = /* @__PURE__ */ jsx(Tooltip, { content: t1, placement: "top", portal: !0, children: t4 }), $[8] = t1, $[9] = t4, $[10] = t5) : t5 = $[10], t5;
}
function _temp4(view) {
  return view.selected;
}
function GridMenuItem(props) {
  const $ = c(19), [failedToLoad, setFailedToLoad] = useState(!1), Icon = props.icon;
  let t0;
  $[0] === Symbol.for("react.memo_cache_sentinel") ? (t0 = {
    overflow: "hidden"
  }, $[0] = t0) : t0 = $[0];
  let t1;
  $[1] === Symbol.for("react.memo_cache_sentinel") ? (t1 = {
    backgroundColor: "var(--card-muted-bg-color)",
    paddingBottom: "66.6%",
    position: "relative"
  }, $[1] = t1) : t1 = $[1];
  let t2;
  $[2] !== Icon ? (t2 = isValidElementType(Icon) ? /* @__PURE__ */ jsx(Flex, { align: "center", justify: "center", style: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%"
  }, children: /* @__PURE__ */ jsx(Text, { size: 1, children: /* @__PURE__ */ jsx(Icon, {}) }) }) : null, $[2] = Icon, $[3] = t2) : t2 = $[3];
  let t3;
  $[4] !== failedToLoad || $[5] !== props.previewImageUrl ? (t3 = !props.previewImageUrl || failedToLoad ? null : /* @__PURE__ */ jsx("img", { src: props.previewImageUrl, style: {
    objectFit: "contain",
    width: "100%",
    height: "100%",
    position: "absolute",
    inset: 0
  }, onError: () => {
    setFailedToLoad(!0);
  } }), $[4] = failedToLoad, $[5] = props.previewImageUrl, $[6] = t3) : t3 = $[6];
  let t4;
  $[7] === Symbol.for("react.memo_cache_sentinel") ? (t4 = /* @__PURE__ */ jsx("div", { style: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    boxShadow: "inset 0 0 0 0.5px var(--card-fg-color)",
    opacity: 0.1
  } }), $[7] = t4) : t4 = $[7];
  let t5;
  $[8] !== t2 || $[9] !== t3 ? (t5 = /* @__PURE__ */ jsxs(Box, { flex: "none", style: t1, children: [
    t2,
    t3,
    t4
  ] }), $[8] = t2, $[9] = t3, $[10] = t5) : t5 = $[10];
  const t6 = props.schemaType.title ?? props.schemaType.name;
  let t7;
  $[11] !== t6 ? (t7 = /* @__PURE__ */ jsx(Box, { flex: 1, padding: 2, children: /* @__PURE__ */ jsx(Text, { size: 1, weight: "medium", children: t6 }) }), $[11] = t6, $[12] = t7) : t7 = $[12];
  let t8;
  $[13] !== t5 || $[14] !== t7 ? (t8 = /* @__PURE__ */ jsxs(Flex, { direction: "column", gap: 1, padding: 1, children: [
    t5,
    t7
  ] }), $[13] = t5, $[14] = t7, $[15] = t8) : t8 = $[15];
  let t9;
  return $[16] !== props.onClick || $[17] !== t8 ? (t9 = /* @__PURE__ */ jsx(MenuItem, { padding: 0, radius: 2, onClick: props.onClick, style: t0, children: t8 }), $[16] = props.onClick, $[17] = t8, $[18] = t9) : t9 = $[18], t9;
}
function filterSchemaTypes(schemaTypes, query, groups) {
  return schemaTypes.filter((schemaType) => passesGroupFilter(schemaType, groups) && passesQueryFilter(schemaType, query));
}
function passesQueryFilter(schemaType, query) {
  const sanitizedQuery = query.trim().toLowerCase();
  return schemaType.title ? schemaType.title?.toLowerCase().includes(sanitizedQuery) : schemaType.name.includes(sanitizedQuery);
}
function passesGroupFilter(schemaType, groups) {
  const selectedGroup = groups.find((group) => group.selected);
  return selectedGroup ? selectedGroup.name === ALL_ITEMS_GROUP_NAME ? !0 : selectedGroup.of?.includes(schemaType.name) : !0;
}
export {
  InsertMenu
};
//# sourceMappingURL=index.js.map
