export const studentProfile = {
  name: "Uhanjali",
  tagline: "Computer Science & Engineering",
  semester: "6th Semester",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  initials: "UH",
  streakDays: 7,
  overallProgress: 68
};

export const statsData = [
  {
    id: "subjects",
    label: "Enrolled Subjects",
    value: "6",
    change: "+1 this semester",
    icon: "BookOpen",
    color: "#6366f1",
    bgColor: "rgba(99, 102, 241, 0.12)"
  },
  {
    id: "problems",
    label: "Problems Solved",
    value: "128",
    change: "+14 this week",
    icon: "CheckCircle2",
    color: "#10b981",
    bgColor: "rgba(16, 185, 129, 0.12)"
  },
  {
    id: "studyTime",
    label: "Study Time",
    value: "24h",
    change: "+4.5h vs last week",
    icon: "Clock",
    color: "#f59e0b",
    bgColor: "rgba(245, 158, 11, 0.12)"
  },
  {
    id: "streak",
    label: "Current Streak",
    value: "7 days",
    change: "Personal best! 🔥",
    icon: "Flame",
    color: "#ef4444",
    bgColor: "rgba(239, 68, 68, 0.12)"
  }
];

export const continueLearningCourses = [
  {
    id: "java",
    title: "Java Programming",
    module: "Object-Oriented Programming & Collections",
    progress: 80,
    lessonsCompleted: 24,
    totalLessons: 30,
    category: "Core Language",
    badgeColor: "#6366f1",
    accentGlow: "rgba(99, 102, 241, 0.2)",
    icon: "Coffee",
    nextTopic: "Polymorphism & Abstract Classes"
  },
  {
    id: "dsa",
    title: "Data Structures & Algorithms",
    module: "Trees, Graphs & Dynamic Programming",
    progress: 60,
    lessonsCompleted: 18,
    totalLessons: 30,
    category: "Algorithms",
    badgeColor: "#8b5cf6",
    accentGlow: "rgba(139, 92, 246, 0.2)",
    icon: "Binary",
    nextTopic: "Binary Search Tree Traversal"
  },
  {
    id: "networks",
    title: "Computer Networks",
    module: "OSI Model, TCP/IP & Socket Architecture",
    progress: 50,
    lessonsCompleted: 12,
    totalLessons: 24,
    category: "Systems",
    badgeColor: "#06b6d4",
    accentGlow: "rgba(6, 182, 212, 0.2)",
    icon: "Network",
    nextTopic: "Transport Layer: TCP vs UDP Handshake"
  },
  {
    id: "ml",
    title: "Machine Learning",
    module: "Supervised Learning, Regressions & Neural Nets",
    progress: 40,
    lessonsCompleted: 8,
    totalLessons: 20,
    category: "AI & Data",
    badgeColor: "#ec4899",
    accentGlow: "rgba(236, 72, 153, 0.2)",
    icon: "Brain",
    nextTopic: "Gradient Descent Optimization"
  }
];

export const subjectProgressList = [
  { name: "Java", progress: 80, color: "#6366f1", target: "Exam: Oct 14" },
  { name: "DSA", progress: 60, color: "#8b5cf6", target: "Coding Round: Oct 18" },
  { name: "React", progress: 70, color: "#06b6d4", target: "Project Due: Oct 20" },
  { name: "Networking", progress: 50, color: "#10b981", target: "Lab Exam: Oct 25" },
  { name: "ML", progress: 40, color: "#f59e0b", target: "Seminar: Nov 02" }
];

export const weeklyActivityData = [
  { day: "Mon", hours: 3.5, problems: 4 },
  { day: "Tue", hours: 4.2, problems: 6 },
  { day: "Wed", hours: 5.0, problems: 8 },
  { day: "Thu", hours: 2.8, problems: 3 },
  { day: "Fri", hours: 4.5, problems: 7 },
  { day: "Sat", hours: 6.0, problems: 10 },
  { day: "Sun", hours: 3.0, problems: 5 }
];

export const initialDailyGoals = [
  { id: 1, text: "Complete Java OOP Inheritance quiz", completed: true },
  { id: 2, text: "Solve array sliding window DSA problem", completed: true },
  { id: 3, text: "Revise TCP 3-way handshake in Networks", completed: true },
  { id: 4, text: "Run 2 focused Pomodoro study sessions", completed: false }
];

export const initialQuickNotes = [
  {
    id: 1,
    title: "Java OOP Core Rule",
    content: "Remember: 'final' class cannot be inherited, 'final' method cannot be overridden!",
    date: "Today, 10:15 AM",
    tag: "Exam Tip"
  },
  {
    id: 2,
    title: "Two-pointer Technique",
    content: "For sorted arrays: start at both ends (L=0, R=len-1) to reduce O(N^2) to O(N).",
    date: "Yesterday",
    tag: "DSA"
  }
];

export const todayPracticeChallenge = {
  id: "ch-101",
  title: "Find the Largest Element in an Array",
  difficulty: "Easy",
  topic: "Arrays",
  points: 10,
  timeEstimate: "10 mins",
  description: "Given an unsorted integer array `arr` of size `N`, return the largest numerical element present in the array with optimal O(N) time complexity.",
  examples: [
    { input: "arr = [2, 5, 1, 3, 0]", output: "5", explanation: "The largest element in the array is 5." },
    { input: "arr = [8, 10, 5, 7, 9]", output: "10", explanation: "The largest element is 10." }
  ],
  codeStarter: `// Java Solution
public class Solution {
    public static int findLargest(int[] arr) {
        int maxVal = arr[0];
        for (int i = 1; i < arr.length; i++) {
            if (arr[i] > maxVal) {
                maxVal = arr[i];
            }
        }
        return maxVal;
    }
}`
};
