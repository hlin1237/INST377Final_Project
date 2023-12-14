// Replace "YOURAPPTOKENHERE" with your actual app token
const appToken = "8bXBtSpWDBQfz2iTlipUrmqeJ";

// Keep track of the last retrieved date
let lastRetrievedDate = new Date();

// Function to compare dates
const isCloserToDate = (date1, date2) => {
  const parsedDate1 = new Date(date1);
  const parsedDate2 = new Date(date2);

  // Calculate the difference in milliseconds
  const diff1 = Math.abs(parsedDate1 - lastRetrievedDate);
  const diff2 = Math.abs(parsedDate2 - lastRetrievedDate);

  return diff1 < diff2;
};

// Function to show a popup for new incidents
const showNewIncidentPopup = (date, location) => {
  alert(`New incidents reported on ${date} at ${location}`);
};

// Function to update the last retrieved date
const updateLastRetrievedDate = (date) => {
  lastRetrievedDate = new Date(date);
};

// Construct the API URL with the app token and any additional parameters
const apiUrl = `https://data.princegeorgescountymd.gov/resource/xjru-idbe.json?$limit=50&$$app_token=${appToken}`;

// Make the API call using jQuery
$.ajax({
  url: apiUrl,
  type: "GET",
  dataType: "json",
})
  .done(function (data) {
    console.log(`Retrieved ${data.length} records from the dataset!`);

    // List to hold ten objects
    const tenObjects = [];

    // Loop through the data
    for (let i = 0; i < data.length; i++) {
      const entry = data[i];

      // If the list is not full, add the entry
      if (tenObjects.length < 10) {
        tenObjects.push({
          incident_case_id: entry.incident_case_id,
          street_address: entry.street_address,
          date: entry.date,
          location: entry.location,
          clearance_code_inc_type: entry.clearance_code_inc_type,
        });
      } else {
        // Check if the new entry is closer to the current date
        const closestEntry = tenObjects.find((obj) =>
          isCloserToDate(entry.date, obj.date)
        );

        // If it is closer, replace the existing entry
        if (closestEntry) {
          closestEntry.incident_case_id = entry.incident_case_id;
          closestEntry.street_address = entry.street_address;
          closestEntry.date = entry.date;
          closestEntry.location = entry.location;
          closestEntry.clearance_code_inc_type =
            entry.clearance_code_inc_type;
        }
      }
    }

    // Add data to the table
    tenObjects.forEach((entry) => {
      // Convert date string to Date object
      const dateFromString = new Date(entry.date);

      $("#data-table-body").append(`
      <tr>
        <td>${entry.incident_case_id}</td>
        <td>${entry.street_address}</td>
        <td>${dateFromString.toDateString()}</td>
        <td>${entry.location}</td>
        <td>${entry.clearance_code_inc_type}</td>
      </tr>
    `);
    });

    // Check if there are new incidents
    const newIncidents = data.filter(
      (entry) => new Date(entry.date) > lastRetrievedDate
    );

    if (newIncidents.length > 0) {
      // Show a popup for new incidents
      newIncidents.forEach((incident) => {
        showNewIncidentPopup(incident.date, incident.location);
      });

      // Update the last retrieved date
      updateLastRetrievedDate(newIncidents[0].date);
    }

    // Now the 'tenObjects' array contains the closest entries to the current date.
    console.log("Ten closest objects:", tenObjects);
  })
  .fail(function (jqXHR, textStatus, errorThrown) {
    console.error(`Error: ${textStatus}, ${errorThrown}`);
  });
