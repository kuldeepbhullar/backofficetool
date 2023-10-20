const setAdminTokenAsCookie = require("../src/middleware/setAdminTokenAsCookie");

module.exports = [
  'strapi::errors',
  'strapi::security',
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',

  // setAdminTokenAsCookie,
];

// module.exports = {
//   // Other existing configuration...
//   settings: {
//     // Other existing settings...
//     setAdminTokenAsCookie: {
//       enabled: true,
//       // Adjust the position of the middleware based on your requirement
//       global: true,
//       priority: 1000,
//     },
//   },
// };
