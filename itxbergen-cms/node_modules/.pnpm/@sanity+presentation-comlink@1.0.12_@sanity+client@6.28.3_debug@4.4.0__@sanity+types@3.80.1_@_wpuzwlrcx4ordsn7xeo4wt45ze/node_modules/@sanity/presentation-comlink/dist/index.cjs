"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
var comlink = require("@sanity/comlink");
const channelsToComlinkMap = {
  "handshake/syn": comlink.MSG_HANDSHAKE_SYN,
  "handshake/syn-ack": comlink.MSG_HANDSHAKE_SYN_ACK,
  "handshake/ack": comlink.MSG_HANDSHAKE_ACK,
  "channel/response": comlink.MSG_RESPONSE,
  "channel/heartbeat": comlink.MSG_HEARTBEAT,
  "channel/disconnect": comlink.MSG_DISCONNECT,
  "overlay/focus": "visual-editing/focus",
  "overlay/navigate": "visual-editing/navigate",
  "overlay/toggle": "visual-editing/toggle",
  "presentation/toggleOverlay": "presentation/toggle-overlay"
}, comlinkToChannelsMap = {
  [comlink.MSG_HANDSHAKE_SYN]: "handshake/syn",
  [comlink.MSG_HANDSHAKE_SYN_ACK]: "handshake/syn-ack",
  [comlink.MSG_HANDSHAKE_ACK]: "handshake/ack",
  [comlink.MSG_RESPONSE]: "channel/response",
  [comlink.MSG_HEARTBEAT]: "channel/heartbeat",
  [comlink.MSG_DISCONNECT]: "channel/disconnect",
  "visual-editing/focus": "overlay/focus",
  "visual-editing/navigate": "overlay/navigate",
  "visual-editing/toggle": "overlay/toggle",
  "presentation/toggle-overlay": "presentation/toggleOverlay"
}, convertToComlinkEvent = (event) => {
  const { data } = event;
  return data && typeof data == "object" && "domain" in data && "type" in data && "from" in data && "to" in data && (data.domain === "sanity/channels" && (data.domain = comlink.DOMAIN), data.to === "overlays" && (data.to = "visual-editing"), data.from === "overlays" && (data.from = "visual-editing"), data.channelId = data.connectionId, delete data.connectionId, data.type = channelsToComlinkMap[data.type] ?? data.type), event;
}, convertToChannelsMessage = (comlinkMessage) => {
  const { channelId, ...rest } = comlinkMessage, message = { ...rest, connectionId: channelId };
  return message.domain === comlink.DOMAIN && (message.domain = "sanity/channels"), message.to === "visual-editing" && (message.to = "overlays"), message.from === "visual-editing" && (message.from = "overlays"), message.type = comlinkToChannelsMap[message.type] ?? message.type, message.type === "channel/response" && message.responseTo && !message.data && (message.data = { responseTo: message.responseTo }), (message.type === "handshake/syn" || message.type === "handshake/syn-ack" || message.type === "handshake/ack") && (message.data = { id: message.connectionId }), message;
}, sendAsChannelsMessage = ({ context }, params) => {
  const { sources, targetOrigin } = context, message = convertToChannelsMessage(params.message);
  sources.forEach((source) => {
    source.postMessage(message, { targetOrigin });
  });
}, createCompatibilityActors = () => ({
  listen: comlink.createListenLogic(convertToComlinkEvent),
  requestMachine: comlink.createRequestMachine().provide({
    actions: {
      "send message": sendAsChannelsMessage
    }
  })
});
function isMaybePreviewIframe() {
  return window.self !== window.top;
}
function isMaybePreviewWindow() {
  return !!window.opener;
}
function isMaybePresentation() {
  return isMaybePreviewIframe() || isMaybePreviewWindow();
}
Object.defineProperty(exports, "MSG_RESPONSE", {
  enumerable: !0,
  get: function() {
    return comlink.MSG_RESPONSE;
  }
});
exports.createCompatibilityActors = createCompatibilityActors;
exports.isMaybePresentation = isMaybePresentation;
exports.isMaybePreviewIframe = isMaybePreviewIframe;
exports.isMaybePreviewWindow = isMaybePreviewWindow;
//# sourceMappingURL=index.cjs.map
