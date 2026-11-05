/**
 * Day 10: Asynchronous User Listing UI Binding
 * Author: Safal Shrestha - Full Stack Developer Intern
 */

document.addEventListener("DOMContentLoaded", () => {
  // DOM References
  const usersGrid = document.getElementById("users-grid");
  const loadingSpinner = document.getElementById("loading-spinner");
  const emptyState = document.getElementById("empty-state");
  const searchInput = document.getElementById("search-input");
  const refreshBtn = document.getElementById("refresh-btn");
  const statusBanner = document.getElementById("status-banner");
  const statusText = document.getElementById("status-text");

  // Modal References
  const userModal = document.getElementById("user-modal");
  const openModalBtn = document.getElementById("open-modal-btn");
  const closeModalBtn = document.getElementById("close-modal-btn");
  const cancelModalBtn = document.getElementById("cancel-modal-btn");
  const createUserForm = document.getElementById("create-user-form");

  // Local state
  let usersList = [];
  let searchQuery = "";

  /**
   * Main function to fetch and display users
   */
  async function loadUsers() {
    usersGrid.innerHTML = "";
    emptyState.classList.remove("active");
    loadingSpinner.classList.add("active");

    statusBanner.style.backgroundColor = "rgba(59, 130, 246, 0.1)";
    statusBanner.style.borderColor = "rgba(59, 130, 246, 0.25)";
    statusText.innerHTML = "Fetching user list asynchronously via <code>fetch()</code>...";

    try {
      const result = await fetchUsers();
      usersList = result.data;

      if (result.isFallback) {
        statusBanner.style.backgroundColor = "rgba(245, 158, 11, 0.1)";
        statusBanner.style.borderColor = "rgba(245, 158, 11, 0.3)";
        statusText.innerHTML = `⚠️ Loaded <strong>${usersList.length}</strong> users from local fallback data (Remote network offline).`;
      } else {
        statusBanner.style.backgroundColor = "rgba(16, 185, 129, 0.1)";
        statusBanner.style.borderColor = "rgba(16, 185, 129, 0.3)";
        statusText.innerHTML = `✓ Successfully fetched <strong>${usersList.length}</strong> users from JSONPlaceholder REST API (HTTP 200 OK).`;
      }

      renderUsers();
    } catch (err) {
      statusBanner.style.backgroundColor = "rgba(239, 68, 68, 0.1)";
      statusBanner.style.borderColor = "rgba(239, 68, 68, 0.3)";
      statusText.innerHTML = `✕ Failed to load users: ${err.message}`;
    } finally {
      loadingSpinner.classList.remove("active");
    }
  }

  /**
   * Filters and renders cards into usersGrid
   */
  function renderUsers() {
    usersGrid.innerHTML = "";

    const query = searchQuery.toLowerCase().trim();
    const filtered = usersList.filter(user => {
      const name = (user.name || "").toLowerCase();
      const email = (user.email || "").toLowerCase();
      const company = (user.company?.name || "").toLowerCase();
      return name.includes(query) || email.includes(query) || company.includes(query);
    });

    if (filtered.length === 0) {
      emptyState.classList.add("active");
      return;
    } else {
      emptyState.classList.remove("active");
    }

    filtered.forEach(user => {
      const card = document.createElement("article");
      card.className = "user-card";

      // Initials for avatar
      const initials = (user.name || "User")
        .split(" ")
        .map(n => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase();

      card.innerHTML = `
        <div class="user-card-header">
          <div class="user-avatar">${initials}</div>
          <div class="user-header-text">
            <h3>${user.name}</h3>
            <span class="user-username">@${user.username || "user"}</span>
          </div>
        </div>

        <ul class="user-details">
          <li>
            <span class="detail-icon">📧</span>
            <span><a href="mailto:${user.email}" style="color: inherit;">${user.email}</a></span>
          </li>
          <li>
            <span class="detail-icon">📞</span>
            <span>${user.phone || "N/A"}</span>
          </li>
          <li>
            <span class="detail-icon">🌐</span>
            <span>${user.website || "N/A"}</span>
          </li>
          <li>
            <span class="detail-icon">📍</span>
            <span>${user.address?.city || "Remote"}, ${user.address?.street || ""}</span>
          </li>
        </ul>

        <div class="user-company-badge">
          <span class="company-name">🏢 ${user.company?.name || "Independent"}</span>
          <span class="company-catchphrase">${user.company?.catchPhrase ? `"${user.company.catchPhrase}"` : ""}</span>
        </div>
      `;

      usersGrid.appendChild(card);
    });
  }

  // Search input handler (live debounce)
  searchInput.addEventListener("input", (e) => {
    searchQuery = e.target.value;
    renderUsers();
  });

  // Reload button
  refreshBtn.addEventListener("click", () => {
    searchInput.value = "";
    searchQuery = "";
    loadUsers();
  });

  // Modal open & close
  function toggleModal(open) {
    if (open) {
      userModal.classList.add("active");
      document.getElementById("new-name").focus();
    } else {
      userModal.classList.remove("active");
      createUserForm.reset();
    }
  }

  openModalBtn.addEventListener("click", () => toggleModal(true));
  closeModalBtn.addEventListener("click", () => toggleModal(false));
  cancelModalBtn.addEventListener("click", () => toggleModal(false));

  // Close on outside click
  userModal.addEventListener("click", (e) => {
    if (e.target === userModal) toggleModal(false);
  });

  // Handle POST Form Submission
  createUserForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const submitBtn = document.getElementById("submit-post-btn");
    submitBtn.disabled = true;
    submitBtn.innerText = "Sending POST...";

    const newUserPayload = {
      name: document.getElementById("new-name").value.trim(),
      username: document.getElementById("new-name").value.trim().toLowerCase().replace(/\s+/g, "_"),
      email: document.getElementById("new-email").value.trim(),
      phone: document.getElementById("new-phone").value.trim() || "+977-9800000000",
      company: {
        name: document.getElementById("new-company").value.trim() || "DevPulse Intern Lab",
        catchPhrase: "Crafting scalable architectures"
      },
      address: {
        city: document.getElementById("new-city").value.trim() || "Kathmandu",
        street: "Main Avenue"
      }
    };

    const res = await createUser(newUserPayload);

    submitBtn.disabled = false;
    submitBtn.innerText = "Send POST Request";

    if (res.success) {
      // Prepend to current list
      usersList = [res.data, ...usersList];
      toggleModal(false);
      renderUsers();

      statusBanner.style.backgroundColor = "rgba(16, 185, 129, 0.1)";
      statusBanner.style.borderColor = "rgba(16, 185, 129, 0.3)";
      statusText.innerHTML = `✓ HTTP POST 201 Created: New user <strong>${res.data.name}</strong> added to list!`;
      alert(`🎉 User Created via POST Request!\nServer returned ID: ${res.data.id}`);
    }
  });

  // Initial load
  loadUsers();
});
