/**
 * Day 09: Form Handling, Real-Time Validation & UI Binding
 * Author: Safal Shrestha - Full Stack Developer Intern
 */

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registration-form");
  const jsonOutput = document.getElementById("json-output");
  const validFieldsCount = document.getElementById("valid-fields-count");
  const formStatusPill = document.getElementById("form-status-pill");

  // Input references
  const fields = {
    fullName: document.getElementById("fullName"),
    username: document.getElementById("username"),
    email: document.getElementById("email"),
    phone: document.getElementById("phone"),
    track: document.getElementById("track"),
    password: document.getElementById("password"),
    confirmPassword: document.getElementById("confirmPassword"),
    terms: document.getElementById("terms")
  };

  // State tracker for all 8 required fields
  const fieldStatus = {
    fullName: false,
    username: false,
    email: false,
    phone: false,
    track: false,
    password: false,
    confirmPassword: false,
    gender: false,
    terms: false
  };

  /**
   * Updates UI for a specific field based on validity
   */
  function displayFieldValidation(fieldKey, isValid, message) {
    const group = document.getElementById(`group-${fieldKey}`);
    if (!group) return;

    const errorMsgEl = group.querySelector(".error-msg");

    if (isValid) {
      group.classList.remove("error");
      group.classList.add("success");
      if (errorMsgEl) errorMsgEl.innerText = "";
      fieldStatus[fieldKey] = true;
    } else {
      group.classList.remove("success");
      group.classList.add("error");
      if (errorMsgEl) errorMsgEl.innerText = message;
      fieldStatus[fieldKey] = false;
    }

    updateOverviewStats();
  }

  /**
   * Updates valid count and status pill
   */
  function updateOverviewStats() {
    const totalFields = Object.keys(fieldStatus).length;
    const validCount = Object.values(fieldStatus).filter(Boolean).length;

    validFieldsCount.innerText = `${validCount} / ${totalFields}`;

    if (validCount === totalFields) {
      formStatusPill.innerText = "Ready to Submit";
      formStatusPill.style.color = "#10B981";
    } else if (validCount > 0) {
      formStatusPill.innerText = "In Progress";
      formStatusPill.style.color = "#F59E0B";
    } else {
      formStatusPill.innerText = "Pending";
      formStatusPill.style.color = "#9CA3AF";
    }
  }

  // Bind input and blur events for text/email/phone/select inputs
  ["fullName", "username", "email", "phone", "track"].forEach(key => {
    const el = fields[key];
    if (!el) return;

    const validate = () => {
      const res = validateField(key, el.value);
      displayFieldValidation(key, res.isValid, res.message);
    };

    el.addEventListener("input", validate);
    el.addEventListener("blur", validate);
  });

  // Password validation & strength meter
  fields.password.addEventListener("input", () => {
    const pass = fields.password.value;
    const res = validateField("password", pass);
    displayFieldValidation("password", res.isValid, res.message);

    // Update meter
    const strength = evaluatePasswordStrength(pass);
    const meterFill = document.getElementById("strength-meter-fill");
    const strengthLabel = document.getElementById("strength-label");

    meterFill.style.backgroundColor = strength.color;
    meterFill.style.width = strength.score === 1 ? "33%" : strength.score === 2 ? "66%" : strength.score === 3 ? "100%" : "0%";
    strengthLabel.innerText = strength.label;
    strengthLabel.style.color = strength.color;

    // Update rule checklist highlights
    document.getElementById("chk-len").className = strength.rules.minLength ? "passed" : "";
    document.getElementById("chk-upper").className = strength.rules.hasUpper ? "passed" : "";
    document.getElementById("chk-lower").className = strength.rules.hasLower ? "passed" : "";
    document.getElementById("chk-num").className = strength.rules.hasNumber ? "passed" : "";
    document.getElementById("chk-spec").className = strength.rules.hasSpecial ? "passed" : "";

    // Re-check confirmPassword if already typed
    if (fields.confirmPassword.value) {
      const confRes = validateField("confirmPassword", fields.confirmPassword.value, pass);
      displayFieldValidation("confirmPassword", confRes.isValid, confRes.message);
    }
  });

  // Confirm password
  fields.confirmPassword.addEventListener("input", () => {
    const res = validateField("confirmPassword", fields.confirmPassword.value, fields.password.value);
    displayFieldValidation("confirmPassword", res.isValid, res.message);
  });

  // Gender Radio buttons
  const genderRadios = document.querySelectorAll('input[name="gender"]');
  genderRadios.forEach(radio => {
    radio.addEventListener("change", () => {
      const isSelected = Array.from(genderRadios).some(r => r.checked);
      displayFieldValidation("gender", isSelected, isSelected ? "" : "Please select your gender.");
    });
  });

  // Terms Checkbox
  fields.terms.addEventListener("change", () => {
    displayFieldValidation("terms", fields.terms.checked, fields.terms.checked ? "" : "You must accept the terms.");
  });

  // Toggle Password Show/Hide Buttons
  document.querySelectorAll(".toggle-password-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const targetId = btn.dataset.target;
      const targetInput = document.getElementById(targetId);
      if (!targetInput) return;

      const isPassword = targetInput.type === "password";
      targetInput.type = isPassword ? "text" : "password";
      btn.innerText = isPassword ? "Hide" : "Show";
    });
  });

  // Form Submit Handler
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Trigger validation on all fields
    Object.keys(fields).forEach(key => {
      const el = fields[key];
      if (key === "confirmPassword") {
        const res = validateField("confirmPassword", el.value, fields.password.value);
        displayFieldValidation("confirmPassword", res.isValid, res.message);
      } else if (key === "terms") {
        displayFieldValidation("terms", el.checked, el.checked ? "" : "You must accept the terms.");
      } else {
        const res = validateField(key, el.value);
        displayFieldValidation(key, res.isValid, res.message);
      }
    });

    // Check gender
    const selectedGender = document.querySelector('input[name="gender"]:checked');
    displayFieldValidation("gender", !!selectedGender, selectedGender ? "" : "Please select your gender.");

    // Check overall validity
    const allValid = Object.values(fieldStatus).every(Boolean);

    if (allValid) {
      const payload = {
        fullName: fields.fullName.value.trim(),
        username: fields.username.value.trim(),
        email: fields.email.value.trim(),
        phone: fields.phone.value.trim(),
        internshipTrack: fields.track.value,
        gender: selectedGender.value,
        passwordHash: "[SECURE_BCRYPT_HASH_SIMULATION]",
        acceptedTerms: fields.terms.checked,
        timestamp: new Date().toISOString(),
        clientValidation: "PASSED (RFC-Compliant Regex)"
      };

      jsonOutput.innerHTML = `<code>${JSON.stringify(payload, null, 2)}</code>`;
      alert("🎉 Registration Successful!\nAll regex validations passed. Payload serialized to JSON.");
    } else {
      // Find first error element and scroll into view
      const firstError = document.querySelector(".form-group.error");
      if (firstError) {
        firstError.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  });

  // Reset Button Handler
  form.addEventListener("reset", () => {
    setTimeout(() => {
      document.querySelectorAll(".form-group").forEach(g => {
        g.classList.remove("error", "success");
      });
      document.querySelectorAll(".error-msg").forEach(m => m.innerText = "");
      Object.keys(fieldStatus).forEach(k => fieldStatus[k] = false);
      jsonOutput.innerText = "// Form cleared.";
      updateOverviewStats();
    }, 50);
  });
});
