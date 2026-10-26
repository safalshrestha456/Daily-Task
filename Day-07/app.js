/**
 * Day 07: Client Dashboard Logic (Map, Filter, Find, Reduce)
 * Author: Safal Shrestha - Full Stack Developer Intern
 */

// In-memory student state (initial copy of sample dataset)
let studentsState = [...sampleStudents];
let currentFilter = "all";
let searchQuery = "";

// Initialize dashboard
document.addEventListener("DOMContentLoaded", () => {
  renderDashboard();
});

function renderDashboard() {
  // 1. Transform students using MAP
  const transformed = transformStudentResults(studentsState);

  // 2. Sort descending by percentage to assign ranks
  const ranked = [...transformed].sort((a, b) => b.percentage - a.percentage);

  // 3. Compute class stats using REDUCE
  const stats = computeClassStatistics(ranked);
  updateKPIs(stats);
  updateFilterCounts(ranked);
  renderSubjectBreakdown(stats.subjectAverages);

  // 4. Apply FILTER and SEARCH
  let filtered = filterStudentsByPerformance(ranked, currentFilter);
  if (searchQuery.trim() !== "") {
    const q = searchQuery.toLowerCase().trim();
    // Using filter and string includes
    filtered = filtered.filter(s => s.name.toLowerCase().includes(q) || s.id.toLowerCase().includes(q));
  }

  // 5. Render Table rows via MAP
  renderTable(filtered, ranked);
}

function updateKPIs(stats) {
  if (!stats) return;

  document.getElementById("kpi-total").innerText = stats.totalStudents;
  document.getElementById("kpi-average").innerText = `${stats.averagePercentage}%`;
  document.getElementById("kpi-pass-rate").innerText = `${stats.passRate}%`;
  document.getElementById("kpi-pass-count").innerText = `${stats.totalPassed} Passed / ${stats.totalFailed} Failed`;

  if (stats.topStudent) {
    document.getElementById("kpi-top-student").innerText = stats.topStudent.name;
    document.getElementById("kpi-top-score").innerText = `${stats.topStudent.percentage}%`;
  }
}

function updateFilterCounts(students) {
  document.getElementById("count-all").innerText = students.length;
  document.getElementById("count-dist").innerText = students.filter(s => s.isPassed && s.percentage >= 80).length;
  document.getElementById("count-pass").innerText = students.filter(s => s.isPassed).length;
  document.getElementById("count-fail").innerText = students.filter(s => !s.isPassed).length;
}

function renderTable(displayStudents, allRankedStudents) {
  const tbody = document.getElementById("student-table-body");
  tbody.innerHTML = "";

  if (displayStudents.length === 0) {
    tbody.innerHTML = `<tr><td colspan="14" style="text-align:center; padding: 2rem; color: #9CA3AF;">No student records found matching the active criteria.</td></tr>`;
    return;
  }

  displayStudents.forEach(student => {
    // Find absolute rank from allRankedStudents using findIndex
    const rank = allRankedStudents.findIndex(s => s.id === student.id) + 1;
    const rankClass = rank === 1 ? 'rank-1' : rank === 2 ? 'rank-2' : rank === 3 ? 'rank-3' : '';

    const gradePrefix = student.grade.charAt(0);
    const gradeClass = `badge-grade-${gradePrefix}`;

    const statusPillClass = student.percentage >= 80 && student.isPassed 
      ? 'pill-distinction' 
      : student.isPassed 
        ? 'pill-passed' 
        : 'pill-failed';

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><span class="rank-badge ${rankClass}">${rank}</span></td>
      <td><strong>${student.id}</strong></td>
      <td>${student.name}</td>
      <td>${student.attendancePercent}%</td>
      <td>${student.marks.reactFrontend}</td>
      <td>${student.marks.fastapiBackend}</td>
      <td>${student.marks.graphqlApi}</td>
      <td>${student.marks.postgresqlDb}</td>
      <td>${student.marks.dockerDevops}</td>
      <td><strong>${student.totalMarks}</strong> / ${student.totalPossible}</td>
      <td><strong>${student.percentage}%</strong></td>
      <td>${student.gpa}</td>
      <td><span class="badge-grade ${gradeClass}">${student.grade}</span></td>
      <td><span class="status-pill ${statusPillClass}">${student.division}</span></td>
    `;
    tbody.appendChild(tr);
  });
}

function renderSubjectBreakdown(subjectAverages) {
  const container = document.getElementById("subjects-container");
  container.innerHTML = "";

  subjectAverages.forEach(sub => {
    const card = document.createElement("div");
    card.className = "subject-card";
    card.innerHTML = `
      <div class="subject-name">${sub.subject}</div>
      <div class="subject-score">${sub.averageScore}%</div>
      <div class="progress-bar-bg">
        <div class="progress-bar-fill" style="width: ${Math.min(sub.averageScore, 100)}%;"></div>
      </div>
    `;
    container.appendChild(card);
  });
}

function applyFilter(type) {
  currentFilter = type;
  const buttons = document.querySelectorAll(".filter-btn");
  buttons.forEach(btn => btn.classList.remove("active"));

  const target = Array.from(buttons).find(b => b.innerText.toLowerCase().includes(type));
  if (target) target.classList.add("active");

  renderDashboard();
}

function handleSearch(val) {
  searchQuery = val;
  renderDashboard();
}

function toggleAddModal(show) {
  const modal = document.getElementById("add-modal");
  if (show) {
    modal.classList.add("active");
  } else {
    modal.classList.remove("active");
  }
}

function handleAddNewStudent(e) {
  e.preventDefault();

  const newStudent = {
    id: document.getElementById("new-id").value.trim(),
    name: document.getElementById("new-name").value.trim(),
    batch: "2026-Q1",
    attendancePercent: parseInt(document.getElementById("new-attendance").value, 10) || 90,
    marks: {
      reactFrontend: parseInt(document.getElementById("m-react").value, 10) || 0,
      fastapiBackend: parseInt(document.getElementById("m-fastapi").value, 10) || 0,
      graphqlApi: parseInt(document.getElementById("m-graphql").value, 10) || 0,
      postgresqlDb: parseInt(document.getElementById("m-postgres").value, 10) || 0,
      dockerDevops: parseInt(document.getElementById("m-docker").value, 10) || 0
    }
  };

  // Add to students list immutably using spread
  studentsState = [newStudent, ...studentsState];

  toggleAddModal(false);
  document.getElementById("add-student-form").reset();
  renderDashboard();
}
