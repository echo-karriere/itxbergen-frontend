import { createRequestMachine, createListenLogic, DOMAIN, MSG_DISCONNECT, MSG_HEARTBEAT, MSG_RESPONSE, MSG_HANDSHAKE_ACK, MSG_HANDSHAKE_SYN_ACK, MSG_HANDSHAKE_SYN } from "@sanity/comlink";
import { MSG_RESPONSE as MSG_RESPONSE2 } from "@sanity/comlink";
const channelsToComlinkMap = {
  "handshake/syn": MSG_HANDSHAKE_SYN,
  "handshake/syn-ack": MSG_HANDSHAKE_SYN_ACK,
  "handshake/ack": MSG_HANDSHAKE_ACK,
  "channel/response": MSG_RESPONSE,
  "channel/heartbeat": MSG_HEARTBEAT,
  "channel/disconnect": MSG_DISCONNECT,
  "overlay/focus": "visual-editing/focus",
  "overlay/navigate": "visual-editing/navigate",
  "overlay/toggle": "visual-editing/toggle",
  "presentation/toggleOverlay": "presentation/toggle-overlay"
}, comlinkToChannelsMap = {
  [MSG_HANDSHAKE_SYN]: "handshake/syn",
  [MSG_HANDSHAKE_SYN_ACK]: "handshake/syn-ack",
  [MSG_HANDSHAKE_ACK]: "handshake/ack",
  [MSG_RESPONSE]: "channel/response",
  [MSG_HEARTBEAT]: "channel/heartbeat",
  [MSG_DISCONNECT]: "channel/disconnect",
  "visual-editing/focus": "overlay/focus",
  "visual-editing/navigate": "overlay/navigate",
  "visual-editing/toggle": "overlay/toggle",
  "presentation/toggle-overlay": "presentation/toggleOverlay"
}, convertToComlinkEvent = (event) => {
  const { data } = event;
  return data && typeof data == "object" && "domain" in data && "type" in data && "from" in data && "to" in data && (data.domain === "sanity/channels" && (data.domain = DOMAIN), data.to === "overlays" && (data.to = "visual-editing"), data.from === "overlays" && (data.from = "visual-editing"), data.channelId = data.connectionId, delete data.connectionId, data.type = channelsToComlinkMap[data.type] ?? data.type), event;
}, convertToChannelsMessage = (comlinkMessage) => {
  const { channelId, ...rest } = comlinkMessage, message = { ...rest, connectionId: channelId };
  return message.domain === DOMAIN && (message.domain = "sanity/channels"), message.to === "visual-editing" && (message.to = "overlays"), message.from === "visual-editing" && (message.from = "overlays"), message.type = comlinkToChannelsMap[message.type] ?? message.type, message.type === "channel/response" && message.responseTo && !message.data && (message.data = { responseTo: message.responseTo }), (message.type === "handshake/syn" || message.type === "handshake/syn-ack" || message.type === "handshake/ack") && (message.data = { id: message.connectionId }), message;
}, sendAsChannelsMessage = ({ context }, params) => {
  const { sources, targetOrigin } = context, message = convertToChannelsMessage(params.message);
  sources.forEach((source) => {
    source.postMessage(message, { targetOrigin });
  });
}, createCompatibilityActors = () => ({
  listen: createListenLogic(convertToComlinkEvent),
  requestMachine: createRequestMachine().provide({
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
export {
  MSG_RESPONSE2 as MSG_RESPONSE,
  createCompatibilityActors,
  isMaybePresentation,
  isMaybePreviewIframe,
  isMaybePreviewWindow
};
//# sourceMappingURL=index.js.map
