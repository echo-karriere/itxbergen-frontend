function generateUrlSecret() {
  if (typeof crypto < "u") {
    const array = new Uint8Array(16);
    crypto.getRandomValues(array);
    let key = "";
    for (let i = 0; i < array.length; i++)
      key += array[i].toString(16).padStart(2, "0");
    return key = btoa(key).replace(/\+/g, "-").replace(/\//g, "_").replace(/[=]+$/, ""), key;
  }
  return Math.random().toString(36).slice(2);
}
export {
  generateUrlSecret
};
//# sourceMappingURL=generateSecret.js.map
