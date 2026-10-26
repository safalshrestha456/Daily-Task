/**
 * Day 07: Arrays, Objects, Map, Filter, Find, Reduce
 * Assignment: Student Result Analyzer
 * Author: Safal Shrestha - Full Stack Developer Intern
 */

// ============================================================================
// 1. DATASET: BATCH OF FULL STACK INTERNS
// ============================================================================
const sampleStudents = [
  {
    id: "STU-101",
    name: "Safal Shrestha",
    batch: "2026-Q1",
    attendancePercent: 98,
    marks: {
      reactFrontend: 92,
      fastapiBackend: 95,
      graphqlApi: 89,
      postgresqlDb: 90,
      dockerDevops: 94
    }
  },
  {
    id: "STU-102",
    name: "Aarav Sharma",
    batch: "2026-Q1",
    attendancePercent: 92,
    marks: {
      reactFrontend: 84,
      fastapiBackend: 78,
      graphqlApi: 82,
      postgresqlDb: 75,
      dockerDevops: 80
    }
  },
  {
    id: "STU-103",
    name: "Pooja Thapa",
    batch: "2026-Q1",
    attendancePercent: 95,
    marks: {
      reactFrontend: 88,
      fastapiBackend: 91,
      graphqlApi: 94,
      postgresqlDb: 89,
      dockerDevops: 86
    }
  },
  {
    id: "STU-104",
    name: "Rohan Adhikari",
    batch: "2026-Q1",
    attendancePercent: 80,
    marks: {
      reactFrontend: 65,
      fastapiBackend: 58,
      graphqlApi: 62,
      postgresqlDb: 70,
      dockerDevops: 55
    }
  },
  {
    id: "STU-105",
    name: "Anjali KC",
    batch: "2026-Q1",
    attendancePercent: 88,
    marks: {
      reactFrontend: 72,
      fastapiBackend: 68,
      graphqlApi: 74,
      postgresqlDb: 64,
      dockerDevops: 70
    }
  },
  {
    id: "STU-106",
    name: "Bibek Poudel",
    batch: "2026-Q1",
    attendancePercent: 74,
    marks: {
      reactFrontend: 38, // Failed subject (< 40)
      fastapiBackend: 52,
      graphqlApi: 48,
      postgresqlDb: 42,
      dockerDevops: 45
    }
  },
  {
    id: "STU-107",
    name: "Sneha Joshi",
    batch: "2026-Q1",
    attendancePercent: 96,
    marks: {
      reactFrontend: 95,
      fastapiBackend: 88,
      graphqlApi: 91,
      postgresqlDb: 92,
      dockerDevops: 96
    }
  },
  {
    id: "STU-108",
    name: "Kiran Basnet",
    batch: "2026-Q1",
    attendancePercent: 82,
    marks: {
      reactFrontend: 55,
      fastapiBackend: 42,
      graphqlApi: 35, // Failed subject (< 40)
      postgresqlDb: 40,
      dockerDevops: 50
    }
  }
];

// Subject metadata
const SUBJECTS = [
  { key: "reactFrontend", label: "React Frontend" },
  { key: "fastapiBackend", label: "FastAPI Backend" },
  { key: "graphqlApi", label: "GraphQL API" },
  { key: "postgresqlDb", label: "PostgreSQL DB" },
  { key: "dockerDevops", label: "Docker & DevOps" }
];


// ============================================================================
// 2. HELPER: GRADE METRICS
// ============================================================================
function getGradeLetterAndGPA(percentage) {
  if (percentage >= 90) return { grade: "A+", gpa: 4.0, division: "Distinction" };
  if (percentage >= 80) return { grade: "A", gpa: 3.6, division: "Distinction" };
  if (percentage >= 70) return { grade: "B+", gpa: 3.2, division: "First Division" };
  if (percentage >= 60) return { grade: "B", gpa: 2.8, division: "First Division" };
  if (percentage >= 50) return { grade: "C+", gpa: 2.4, division: "Second Division" };
  if (percentage >= 40) return { grade: "C", gpa: 2.0, division: "Third Division" };
  return { grade: "F", gpa: 0.0, division: "Failed" };
}


// ============================================================================
// 3. CORE ANALYZER FUNCTIONS (MAP, FILTER, FIND, REDUCE)
// ============================================================================

/**
 * 1. MAP: Transforms student objects by calculating total marks, percentage,
 * GPA, letter grade, and pass/fail status without mutating source data.
 * @param {Array} students 
 * @returns {Array} Transformed students
 */
function transformStudentResults(students) {
  return students.map(student => {
    // Object.values to get all subject scores as an array
    const markValues = Object.values(student.marks);
    
    // REDUCE within MAP: sum subject scores
    const totalMarks = markValues.reduce((sum, score) => sum + score, 0);
    const totalPossible = markValues.length * 100;
    const percentage = parseFloat(((totalMarks / totalPossible) * 100).toFixed(2));

    // Check if any subject is below passing threshold (40)
    const hasBacklog = markValues.some(score => score < 40);
    const metrics = getGradeLetterAndGPA(percentage);

    const isPassed = !hasBacklog && percentage >= 40;

    return {
      id: student.id,
      name: student.name,
      batch: student.batch,
      attendancePercent: student.attendancePercent,
      marks: { ...student.marks },
      totalMarks,
      totalPossible,
      percentage,
      gpa: isPassed ? metrics.gpa : 0.0,
      grade: isPassed ? metrics.grade : "F",
      division: isPassed ? metrics.division : "Failed (Backlog)",
      isPassed,
      hasBacklog
    };
  });
}

/**
 * 2. FILTER: Filters students by specific performance categories
 * @param {Array} transformedStudents 
 * @param {"all"|"distinction"|"passed"|"failed"} filterType 
 */
function filterStudentsByPerformance(transformedStudents, filterType) {
  switch (filterType) {
    case "distinction":
      return transformedStudents.filter(s => s.isPassed && s.percentage >= 80);
    case "passed":
      return transformedStudents.filter(s => s.isPassed);
    case "failed":
      return transformedStudents.filter(s => !s.isPassed);
    default:
      return transformedStudents;
  }
}

/**
 * 3. FIND: Finds a student by ID or returns undefined
 * @param {Array} students 
 * @param {string} id 
 */
function findStudentById(students, id) {
  return students.find(s => s.id.toLowerCase() === id.trim().toLowerCase());
}

/**
 * 3b. FIND: Identifies the top performing student (highest percentage)
 * @param {Array} transformedStudents 
 */
function findTopPerformingStudent(transformedStudents) {
  if (!transformedStudents || transformedStudents.length === 0) return null;
  
  // Sort descending by percentage and pick first
  const sorted = [...transformedStudents].sort((a, b) => b.percentage - a.percentage);
  return sorted[0];
}

/**
 * 3c. FIND: Finds the student with the highest score in a specified subject
 * @param {Array} students 
 * @param {string} subjectKey 
 */
function findSubjectTopper(students, subjectKey) {
  if (!students.length) return null;
  return students.reduce((highest, current) => {
    return (current.marks[subjectKey] > highest.marks[subjectKey]) ? current : highest;
  }, students[0]);
}

/**
 * 4. REDUCE: Aggregates comprehensive class-wide statistics
 * Computes total enrolled, average percentage, pass rate, highest, lowest,
 * and subject-wise averages.
 * @param {Array} transformedStudents 
 */
function computeClassStatistics(transformedStudents) {
  const totalStudents = transformedStudents.length;
  if (totalStudents === 0) return null;

  // Use REDUCE to aggregate class totals in a single pass
  const classAggregation = transformedStudents.reduce(
    (acc, student) => {
      acc.totalClassPercentage += student.percentage;
      if (student.isPassed) acc.totalPassed++;
      if (student.percentage >= 80 && student.isPassed) acc.totalDistinction++;

      // Track highest and lowest
      if (!acc.highest || student.percentage > acc.highest.percentage) {
        acc.highest = { name: student.name, percentage: student.percentage };
      }
      if (!acc.lowest || student.percentage < acc.lowest.percentage) {
        acc.lowest = { name: student.name, percentage: student.percentage };
      }

      // Aggregate subject marks for subject-wise averages
      SUBJECTS.forEach(sub => {
        acc.subjectTotals[sub.key] = (acc.subjectTotals[sub.key] || 0) + student.marks[sub.key];
      });

      return acc;
    },
    {
      totalClassPercentage: 0,
      totalPassed: 0,
      totalDistinction: 0,
      highest: null,
      lowest: null,
      subjectTotals: {}
    }
  );

  const averagePercentage = parseFloat((classAggregation.totalClassPercentage / totalStudents).toFixed(2));
  const passRate = parseFloat(((classAggregation.totalPassed / totalStudents) * 100).toFixed(2));
  const distinctionRate = parseFloat(((classAggregation.totalDistinction / totalStudents) * 100).toFixed(2));

  // Compute subject-wise averages using REDUCE & MAP
  const subjectAverages = SUBJECTS.map(sub => ({
    subject: sub.label,
    key: sub.key,
    averageScore: parseFloat((classAggregation.subjectTotals[sub.key] / totalStudents).toFixed(2))
  }));

  return {
    totalStudents,
    totalPassed: classAggregation.totalPassed,
    totalFailed: totalStudents - classAggregation.totalPassed,
    passRate,
    distinctionRate,
    averagePercentage,
    topStudent: classAggregation.highest,
    lowestStudent: classAggregation.lowest,
    subjectAverages
  };
}


// ============================================================================
// 5. CLI RUNNER DEMO (Node.js Execution)
// ============================================================================
if (typeof require !== "undefined" && require.main === module) {
  console.log("=================================================================");
  console.log("🎓 DAY 07: STUDENT RESULT ANALYZER (Safal Shrestha)");
  console.log("=================================================================\n");

  // 1. Transform Students using MAP
  console.log("--- 1. TRANSFORMED STUDENT RESULTS (via Array.map) ---");
  const processed = transformStudentResults(sampleStudents);
  console.table(
    processed.map(s => ({
      ID: s.id,
      Name: s.name,
      Total: `${s.totalMarks}/${s.totalPossible}`,
      Percentage: `${s.percentage}%`,
      GPA: s.gpa,
      Grade: s.grade,
      Division: s.division
    }))
  );

  // 2. Class Statistics using REDUCE
  console.log("\n--- 2. CLASS STATISTICS (via Array.reduce) ---");
  const stats = computeClassStatistics(processed);
  console.log(`Total Enrolled:     ${stats.totalStudents} Students`);
  console.log(`Class Average:      ${stats.averagePercentage}%`);
  console.log(`Passed Students:    ${stats.totalPassed} / ${stats.totalStudents} (${stats.passRate}% Pass Rate)`);
  console.log(`Distinction Rate:   ${stats.distinctionRate}%`);
  console.log(`Highest Score:      ${stats.topStudent.name} (${stats.topStudent.percentage}%)`);
  console.log(`Lowest Score:       ${stats.lowestStudent.name} (${stats.lowestStudent.percentage}%)\n`);

  console.log("Subject-wise Class Averages:");
  console.table(stats.subjectAverages);

  // 3. Filter Distinctions using FILTER
  console.log("\n--- 3. DISTINCTION HOLDERS (via Array.filter) ---");
  const distinctions = filterStudentsByPerformance(processed, "distinction");
  console.log(distinctions.map(s => `${s.name} - ${s.percentage}% (${s.grade})`));

  // 4. Filter Failed Students using FILTER
  console.log("\n--- 4. STUDENTS NEEDING SUPPORT (via Array.filter) ---");
  const failed = filterStudentsByPerformance(processed, "failed");
  console.log(failed.map(s => `${s.name} - ${s.percentage}% (Status: ${s.division})`));

  // 5. Find Single Student using FIND
  console.log("\n--- 5. LOOKUP STUDENT (via Array.find) ---");
  const found = findStudentById(sampleStudents, "STU-101");
  console.log("Found Student STU-101:", found ? `${found.name} (${found.attendancePercent}% attendance)` : "Not found");

  // 6. Find Subject Topper using REDUCE
  console.log("\n--- 6. SUBJECT TOPPER FOR FASTAPI (via Array.reduce) ---");
  const backendTopper = findSubjectTopper(sampleStudents, "fastapiBackend");
  console.log(`FastAPI Topper: ${backendTopper.name} with ${backendTopper.marks.fastapiBackend}/100`);

  console.log("\n=================================================================");
}

// Module export
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    sampleStudents,
    SUBJECTS,
    transformStudentResults,
    filterStudentsByPerformance,
    findStudentById,
    findTopPerformingStudent,
    findSubjectTopper,
    computeClassStatistics
  };
}
