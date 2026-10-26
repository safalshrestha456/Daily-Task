/**
 * Day 06: JavaScript Foundation - Core Calculators
 * Curriculum: Variables, Data Types, Operators, Conditions, Loops, Functions
 * Author: Safal Shrestha - Full Stack Developer Intern
 */

// ============================================================================
// 1. GRADE CALCULATOR MODULE
// ============================================================================

/**
 * Calculates grade, GPA, and status based on percentage
 * Demonstrates: Conditions (if-else if-else), Comparisons, Return Values
 * @param {number} percentage 
 * @returns {object} { grade: string, gpa: number, status: string, remark: string }
 */
function determineGradeMetrics(percentage) {
  if (percentage < 0 || percentage > 100 || isNaN(percentage)) {
    return { grade: "N/A", gpa: 0.0, status: "Invalid Input", remark: "Marks must be between 0 and 100" };
  }

  if (percentage >= 90) {
    return { grade: "A+", gpa: 4.0, status: "Passed with Distinction", remark: "Outstanding Performance" };
  } else if (percentage >= 80) {
    return { grade: "A", gpa: 3.6, status: "Passed - First Division", remark: "Excellent Achievement" };
  } else if (percentage >= 70) {
    return { grade: "B+", gpa: 3.2, status: "Passed - First Division", remark: "Very Good Performance" };
  } else if (percentage >= 60) {
    return { grade: "B", gpa: 2.8, status: "Passed - Second Division", remark: "Good Effort" };
  } else if (percentage >= 50) {
    return { grade: "C+", gpa: 2.4, status: "Passed - Second Division", remark: "Satisfactory" };
  } else if (percentage >= 40) {
    return { grade: "C", gpa: 2.0, status: "Passed - Third Division", remark: "Needs Improvement" };
  } else {
    return { grade: "F", gpa: 0.0, status: "Failed", remark: "Must retake evaluation" };
  }
}

/**
 * Calculates student total marks, percentage, and overall grade
 * Demonstrates: Loops (for loop), Array indexing, Arithmetic operators
 * @param {Array<{subject: string, marks: number, fullMarks?: number}>} subjectList 
 */
function calculateStudentGrade(subjectList) {
  let totalMarks = 0;
  let totalFullMarks = 0;
  let hasFailedSubject = false;

  // Using a standard for-loop to iterate through subjects
  for (let i = 0; i < subjectList.length; i++) {
    const item = subjectList[i];
    const full = item.fullMarks || 100;
    
    totalMarks += item.marks;
    totalFullMarks += full;

    // A passing threshold of 40% per subject
    if ((item.marks / full) * 100 < 40) {
      hasFailedSubject = true;
    }
  }

  const percentage = totalFullMarks > 0 ? (totalMarks / totalFullMarks) * 100 : 0;
  const gradeInfo = determineGradeMetrics(percentage);

  // If failed in any individual subject, overall status is Failed
  if (hasFailedSubject && gradeInfo.grade !== "F") {
    gradeInfo.status = "Failed (Backlog in one or more subjects)";
    gradeInfo.grade = "Backlog";
  }

  return {
    totalMarks: parseFloat(totalMarks.toFixed(2)),
    totalFullMarks,
    percentage: parseFloat(percentage.toFixed(2)),
    ...gradeInfo
  };
}


// ============================================================================
// 2. EVEN / ODD CHECKER MODULE
// ============================================================================

/**
 * Checks whether an integer is even or odd
 * Demonstrates: Modulo operator (%), Ternary operator, Strict equality (===)
 * @param {number} num 
 * @returns {object} { number: number, type: "Even" | "Odd", isZero: boolean, isNegative: boolean }
 */
const checkEvenOdd = (num) => {
  if (typeof num !== "number" || isNaN(num) || !Number.isInteger(num)) {
    return { error: "Input must be a valid integer" };
  }

  const isEven = num % 2 === 0;
  const isZero = num === 0;
  const isNegative = num < 0;

  return {
    number: num,
    type: isZero ? "Zero (Even)" : isEven ? "Even" : "Odd",
    isEven,
    isZero,
    isNegative
  };
};

/**
 * Analyzes even and odd numbers within an inclusive range [start, end]
 * Demonstrates: While loop, counter accumulators, arrays
 * @param {number} start 
 * @param {number} end 
 */
function analyzeRangeEvenOdd(start, end) {
  if (start > end) {
    // Swap using destructuring assignment
    [start, end] = [end, start];
  }

  const evens = [];
  const odds = [];
  let current = start;

  // Demonstrating while-loop execution
  while (current <= end) {
    if (current % 2 === 0) {
      evens.push(current);
    } else {
      odds.push(current);
    }
    current++;
  }

  return {
    range: `${start} to ${end}`,
    totalCount: end - start + 1,
    evenCount: evens.length,
    oddCount: odds.length,
    evensList: evens,
    oddsList: odds,
    evenSum: evens.reduce((acc, curr) => acc + curr, 0),
    oddSum: odds.reduce((acc, curr) => acc + curr, 0)
  };
}


// ============================================================================
// 3. SIMPLE INTEREST CALCULATOR MODULE
// ============================================================================

/**
 * Calculates Simple Interest and generates year-by-year schedule
 * Formula: SI = (P * T * R) / 100
 * Total Amount: A = P + SI
 * Demonstrates: Functions, Math arithmetic, do-while loop
 * @param {number} principal - Principal amount (P)
 * @param {number} rate - Annual interest rate in % (R)
 * @param {number} timeInYears - Time period in years (T)
 */
function calculateSimpleInterest(principal, rate, timeInYears) {
  if (principal <= 0 || rate < 0 || timeInYears <= 0) {
    throw new Error("Principal, rate, and time must be positive numbers");
  }

  const interest = (principal * timeInYears * rate) / 100;
  const totalAmount = principal + interest;

  // Generate yearly breakdown using a do-while loop
  const yearlyBreakdown = [];
  let year = 1;
  const yearlyInterest = (principal * 1 * rate) / 100;
  let accumulatedInterest = 0;

  do {
    accumulatedInterest += yearlyInterest;
    yearlyBreakdown.push({
      year: year,
      interestEarnedThisYear: parseFloat(yearlyInterest.toFixed(2)),
      accumulatedInterest: parseFloat(accumulatedInterest.toFixed(2)),
      totalBalance: parseFloat((principal + accumulatedInterest).toFixed(2))
    });
    year++;
  } while (year <= Math.ceil(timeInYears));

  return {
    principal: parseFloat(principal.toFixed(2)),
    ratePercent: parseFloat(rate.toFixed(2)),
    timeYears: parseFloat(timeInYears.toFixed(2)),
    simpleInterest: parseFloat(interest.toFixed(2)),
    totalAmount: parseFloat(totalAmount.toFixed(2)),
    yearlyBreakdown
  };
}


// ============================================================================
// CLI DEMO RUNNER (When executed directly with node)
// ============================================================================
if (typeof require !== "undefined" && require.main === module) {
  console.log("===============================================================");
  console.log("🎓 DAY 06: JAVASCRIPT FOUNDATION CALCULATORS (Safal Shrestha)");
  console.log("===============================================================\n");

  // 1. Grade Calculator Demo
  console.log("--- 1. Grade Calculator Demo ---");
  const studentScores = [
    { subject: "React & Vite Frontend", marks: 88, fullMarks: 100 },
    { subject: "FastAPI & Python Backend", marks: 92, fullMarks: 100 },
    { subject: "GraphQL Schema & Resolvers", marks: 85, fullMarks: 100 },
    { subject: "PostgreSQL & SQLAlchemy", marks: 78, fullMarks: 100 },
    { subject: "Docker & Containerization", marks: 82, fullMarks: 100 }
  ];
  const gradeResult = calculateStudentGrade(studentScores);
  console.log("Scores Evaluated:", studentScores.map(s => `${s.subject}: ${s.marks}/${s.fullMarks}`));
  console.log(`Total: ${gradeResult.totalMarks}/${gradeResult.totalFullMarks}`);
  console.log(`Percentage: ${gradeResult.percentage}% | GPA: ${gradeResult.gpa}`);
  console.log(`Letter Grade: ${gradeResult.grade} | Status: ${gradeResult.status}\n`);

  // 2. Even / Odd Checker Demo
  console.log("--- 2. Even / Odd Checker Demo ---");
  const testNumbers = [14, 27, 0, -8, 103];
  testNumbers.forEach(n => {
    const res = checkEvenOdd(n);
    console.log(`Number ${n} is -> ${res.type}`);
  });

  const rangeReport = analyzeRangeEvenOdd(1, 15);
  console.log(`\nRange Analysis (${rangeReport.range}):`);
  console.log(`Even count: ${rangeReport.evenCount} (Sum: ${rangeReport.evenSum})`);
  console.log(`Odd count:  ${rangeReport.oddCount} (Sum: ${rangeReport.oddSum})\n`);

  // 3. Simple Interest Calculator Demo
  console.log("--- 3. Simple Interest Calculator Demo ---");
  const p = 50000; // NPR 50,000
  const r = 8.5;   // 8.5%
  const t = 3;     // 3 years
  const siResult = calculateSimpleInterest(p, r, t);
  console.log(`Principal: NPR ${siResult.principal} | Rate: ${siResult.ratePercent}% | Time: ${siResult.timeYears} Years`);
  console.log(`Simple Interest Earned: NPR ${siResult.simpleInterest}`);
  console.log(`Total Maturity Amount:  NPR ${siResult.totalAmount}`);
  console.log("Year-by-Year Schedule:");
  console.table(siResult.yearlyBreakdown);
  console.log("\n===============================================================");
}

// Export for module environments / tests
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    determineGradeMetrics,
    calculateStudentGrade,
    checkEvenOdd,
    analyzeRangeEvenOdd,
    calculateSimpleInterest
  };
}
