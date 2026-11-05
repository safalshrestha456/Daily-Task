/**
 * Day 10: Asynchronous JavaScript - Fetch API, Promises & Async/Await
 * Author: Safal Shrestha - Full Stack Developer Intern
 */

const BASE_URL = "https://jsonplaceholder.typicode.com/users";

// Fallback mock dataset in case of network unavailability
const FALLBACK_USERS = [
  {
    id: 1,
    name: "Safal Shrestha",
    username: "safal_dev",
    email: "safal@devpulse.io",
    phone: "+977-9841234567",
    website: "safalshrestha.dev",
    company: { name: "DevPulse Technologies", catchPhrase: "Cloud & GraphQL Architectures" },
    address: { street: "Tinkune Marg", city: "Kathmandu", zipcode: "44600" }
  },
  {
    id: 2,
    name: "Aarav Sharma",
    username: "aarav_s",
    email: "aarav@example.com",
    phone: "+977-9811223344",
    website: "aarav.io",
    company: { name: "CloudScale Systems", catchPhrase: "Serverless and Microservices" },
    address: { street: "Lalitpur Lane", city: "Patan", zipcode: "44700" }
  },
  {
    id: 3,
    name: "Pooja Thapa",
    username: "pooja_t",
    email: "pooja@example.com",
    phone: "+977-9800112233",
    website: "poojathapa.me",
    company: { name: "DataFlow Nepal", catchPhrase: "Realtime Analytics & Kafka" },
    address: { street: "Lakeside Road", city: "Pokhara", zipcode: "33700" }
  }
];

/**
 * 1. GET: Fetches list of users from remote REST API using async/await
 * @returns {Promise<Array>}
 */
async function fetchUsers() {
  try {
    const response = await fetch(BASE_URL);
    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status} (${response.statusText})`);
    }
    const data = await response.json();
    return { success: true, data, isFallback: false };
  } catch (error) {
    console.warn("Remote API fetch failed. Using fallback dataset:", error.message);
    return { success: true, data: FALLBACK_USERS, isFallback: true, error: error.message };
  }
}

/**
 * 2. POST: Sends a new user object to the REST endpoint
 * @param {object} newUser 
 * @returns {Promise<object>}
 */
async function createUser(newUser) {
  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify(newUser)
    });

    if (!response.ok) {
      throw new Error(`Failed to create user. Status: ${response.status}`);
    }

    const createdData = await response.json();
    return { success: true, data: createdData };
  } catch (error) {
    console.error("POST Error:", error);
    // Simulate successful client response if offline
    return {
      success: true,
      data: { ...newUser, id: Date.now() },
      simulated: true
    };
  }
}

// Module export for Node.js testing
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    fetchUsers,
    createUser,
    FALLBACK_USERS
  };
}
