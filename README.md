# Crime Incidents Map Web Application

## Overview
This web application provides real-time updates of crime incidents in Prince George’s County. Users can view incidents on an interactive map and access detailed information through a data table. The platform also includes "About" and "Help" pages for additional context and support.

## Features
- **Live Crime Incident Map**: Displays up-to-date crime incidents using data from Prince George’s County's public API.
- **Data Table**: Provides detailed information about each incident, including case ID, street address, date, location, and incident type.
- **Navigation**: Intuitive links to "Home," "About," and "Help" pages.
- **Support and FAQ**: A dedicated help page with a contact form and frequently asked questions.

## File Structure
- **pgc_Home.html**: Main page containing the map and data table.
- **About.html**: Page detailing the project's purpose and mission.
- **Help.html**: Support page with contact information and FAQs.
- **thankyou.html**: Confirmation page displayed after form submission.
- **style.css**: External stylesheet for consistent styling across pages.
- **mapscript.js**: JavaScript file handling data fetching and map interactions.

## Setup and Usage
1. **Access the Application**: Open `pgc_Home.html` in a web browser to view the main interface.
2. **Explore Data**: Interact with the map to view recent crime incidents; details will populate in the adjacent data table.
3. **Navigate**: Use the navigation bar to visit the "About" and "Help" pages for more information or assistance.

## Customization
- **API Token**: Ensure the API token in `mapscript.js` is valid:
  ```javascript
  const appToken = "YOUR_API_TOKEN_HERE";
