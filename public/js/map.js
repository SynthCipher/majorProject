// mapboxgl.accessToken = mapToken;
// const map = new mapboxgl.Map({
//   container: "map", // container ID
//   center: listing.geometry.coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
//   zoom: 10, // starting zoom
// });

// console.log(listing.geometry.coordinates);
// // Create a default Marker and add it to the map.
// const marker1 = new mapboxgl.Marker({ color: 'red' })
//   .setLngLat(listing.geometry.coordinates) //listing.germerty .coordinate
//   .setPopup( new mapboxgl.Popup({ offset: 25 })
//   .setHTML(`<h4>${listing.title}</h4><p>Exact location provided after booking</p>`))
//   .addTo(map);



  mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
  container: "map",  // Container ID
  style: "mapbox://styles/mapbox/streets-v12",  // Map style
  center: listing.geometry.coordinates,  // Coordinates from the listing
  zoom: 10,  // Initial zoom level
});

console.log(listing.geometry.coordinates);  // Log the coordinates

// Function to create a custom marker element
function createCustomMarker() {
  const markerElement = document.createElement("div");
  const width = 50; // Width of the custom marker
  const height = 50; // Height of the custom marker
  
  // Use Font Awesome icon inside the div
  markerElement.innerHTML = '<i class="fa-solid fa-house"></i>';
  
  // Optional: Style the icon (you can style the icon size, position, etc.)
  markerElement.querySelector("i").style.fontSize = "30px"; // Size the icon
  markerElement.querySelector("i").style.color = "#ff5050"; // Set color for the icon
  
  // Style the marker element itself (set size)
  markerElement.style.width = `${width}px`;
  markerElement.style.height = `${height}px`;
  markerElement.style.display = "flex";
  markerElement.style.background = "rgba(255, 158, 158, 0.3)";
  markerElement.style.height = "100px";
  markerElement.style.opacity ="0.1";
  markerElement.style.width = "100px";
  markerElement.style.borderRadius = "50%";
  markerElement.style.display = "flex";
  markerElement.style.justifyContent = "center";
  markerElement.style.alignItems = "center";
  markerElement.style.cursor = "pointer"; // Make the marker clickable

  return markerElement;
}

// Create a custom marker with the icon and set its position
const marker1 = new mapboxgl.Marker({
  element: createCustomMarker(), // Create custom marker using the function
})
  .setLngLat(listing.geometry.coordinates) // Set the position of the marker
  .setPopup(
    new mapboxgl.Popup({ offset: 25 })  // Offset for the popup
      .setHTML(`<h4>${listing.title}</h4><p>Exact location provided after booking</p>`)  // Popup content
  )
  .addTo(map);  // Add the marker to the map

// // Optional: Add a click event to the marker
// marker1.getElement().addEventListener('click', () => {
//   alert('You clicked the custom marker!');
// });
