function load({ url }) {
  return {
    guestName: url.searchParams.get("to") || url.searchParams.get("guest") || "Honored Guest"
  };
}
export {
  load
};
