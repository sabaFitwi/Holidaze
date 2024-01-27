export const updateAuthStatus = (setIsVenueManager) => {
  const venueManager = localStorage.getItem("isVenueManager") === "true";
  setIsVenueManager(venueManager);
};
