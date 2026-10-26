/**
 * Day 06: DOM Interaction & Event Handlers
 * Author: Safal Shrestha - Full Stack Developer Intern
 */

// Tab Switching
function switchTab(tabName) {
  const tabs = ['grade', 'even-odd', 'interest'];
  tabs.forEach(t => {
    document.getElementById(`tab-${t}`).classList.remove('active');
  });

  document.getElementById(`tab-${tabName}`).classList.add('active');

  const btns = document.querySelectorAll('.tab-btn');
  btns.forEach(btn => btn.classList.remove('active'));

  const activeIndex = tabs.indexOf(tabName);
  if (btns[activeIndex]) {
    btns[activeIndex].classList.add('active');
  }
}

// 1. Grade Calculation Handler
function handleGradeCalculation(e) {
  e.preventDefault();

  const marks = [
    { subject: "Frontend Dev", marks: parseFloat(document.getElementById('sub1').value) || 0, fullMarks: 100 },
    { subject: "Backend APIs", marks: parseFloat(document.getElementById('sub2').value) || 0, fullMarks: 100 },
    { subject: "GraphQL Architecture", marks: parseFloat(document.getElementById('sub3').value) || 0, fullMarks: 100 },
    { subject: "Database Management", marks: parseFloat(document.getElementById('sub4').value) || 0, fullMarks: 100 },
    { subject: "DevOps & Docker", marks: parseFloat(document.getElementById('sub5').value) || 0, fullMarks: 100 }
  ];

  const result = calculateStudentGrade(marks);

  document.getElementById('display-grade').innerText = result.grade;
  document.getElementById('display-total').innerText = `${result.totalMarks} / ${result.totalFullMarks}`;
  document.getElementById('display-percentage').innerText = `${result.percentage}%`;
  document.getElementById('display-gpa').innerText = `${result.gpa} / 4.0`;
  document.getElementById('display-status').innerText = `Status: ${result.status}`;
  document.getElementById('display-remark').innerText = result.remark;

  // Visual grade color
  const badge = document.getElementById('display-grade');
  if (result.grade.startsWith('A')) {
    badge.style.background = 'linear-gradient(135deg, #10B981, #059669)';
  } else if (result.grade.startsWith('B')) {
    badge.style.background = 'linear-gradient(135deg, #3B82F6, #1D4ED8)';
  } else if (result.grade.startsWith('C')) {
    badge.style.background = 'linear-gradient(135deg, #F59E0B, #D97706)';
  } else {
    badge.style.background = 'linear-gradient(135deg, #EF4444, #B91C1C)';
  }
}

// 2. Even / Odd Handlers
function handleSingleEvenOdd() {
  const val = parseInt(document.getElementById('single-num').value, 10);
  const out = document.getElementById('single-output-box');

  if (isNaN(val)) {
    out.innerHTML = `<span class="text-orange">Please enter a valid integer!</span>`;
    return;
  }

  const res = checkEvenOdd(val);
  const badgeClass = res.isEven ? 'badge-even' : 'badge-odd';
  out.innerHTML = `The number <strong>${val}</strong> is <span class="${badgeClass}">${res.type}</span>`;
}

function handleRangeAnalysis() {
  const start = parseInt(document.getElementById('range-start').value, 10);
  const end = parseInt(document.getElementById('range-end').value, 10);

  if (isNaN(start) || isNaN(end)) {
    alert("Please enter valid start and end numbers");
    return;
  }

  const report = analyzeRangeEvenOdd(start, end);

  document.getElementById('range-total-count').innerText = report.totalCount;
  document.getElementById('range-even-count').innerText = report.evenCount;
  document.getElementById('range-odd-count').innerText = report.oddCount;

  document.getElementById('even-list-span').innerText = report.evensList.slice(0, 20).join(', ') + (report.evensList.length > 20 ? ' ...' : '');
  document.getElementById('odd-list-span').innerText = report.oddsList.slice(0, 20).join(', ') + (report.oddsList.length > 20 ? ' ...' : '');
  document.getElementById('even-sum-span').innerText = report.evenSum;
  document.getElementById('odd-sum-span').innerText = report.oddSum;
}

// 3. Simple Interest Handler
function handleSICalculation(e) {
  e.preventDefault();

  const p = parseFloat(document.getElementById('si-p').value);
  const r = parseFloat(document.getElementById('si-r').value);
  const t = parseFloat(document.getElementById('si-t').value);

  const res = calculateSimpleInterest(p, r, t);

  document.getElementById('si-interest-display').innerText = `NPR ${res.simpleInterest.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
  document.getElementById('si-total-display').innerText = `NPR ${res.totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;

  const tbody = document.getElementById('si-schedule-tbody');
  tbody.innerHTML = '';

  res.yearlyBreakdown.forEach(row => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>Year ${row.year}</td>
      <td>NPR ${row.interestEarnedThisYear.toLocaleString()}</td>
      <td>NPR ${row.accumulatedInterest.toLocaleString()}</td>
      <td><strong>NPR ${row.totalBalance.toLocaleString()}</strong></td>
    `;
    tbody.appendChild(tr);
  });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  // Trigger initial calculation
  const gradeForm = document.getElementById('grade-form');
  if (gradeForm) {
    gradeForm.dispatchEvent(new Event('submit'));
  }
  const siForm = document.getElementById('si-form');
  if (siForm) {
    siForm.dispatchEvent(new Event('submit'));
  }
});
