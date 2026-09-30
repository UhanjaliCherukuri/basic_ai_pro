export const suggestedQuestionsList = [
  "Explain Java OOP",
  "Give me a DSA problem",
  "Explain React",
  "Create a study plan",
  "What is an API?",
  "Help me prepare for an exam",
  "Explain Computer Networks",
  "What is Machine Learning?"
];

export const fallbackResponse = {
  title: "Demo Mode Notice",
  text: "I'm currently running in demo mode. I can answer questions about Java, DSA, React, APIs, Computer Networks, Machine Learning, and study planning.",
  tips: [
    "Try clicking one of the suggested prompts above",
    "Ask: 'Explain Java OOP' or 'Give me a DSA problem'",
    "Ask: 'Explain React' or 'What is an API?'",
    "Ask: 'Create a study plan for exams'"
  ]
};

export const knowledgeBase = [
  {
    keywords: ["java", "oop", "object oriented", "inheritance", "polymorphism", "encapsulation", "abstraction"],
    summary: "Object-Oriented Programming (OOP) in Java",
    response: `### Object-Oriented Programming (OOP) in Java ☕

Object-Oriented Programming is a paradigm centered around **objects** (data + behavior) rather than actions or functions alone.

#### The 4 Core Pillars of OOP:

1. **Encapsulation 🛡️**
   - Bundling data (variables) and methods into a single unit (class).
   - Keeps internal state private using access modifiers (\`private\`, \`protected\`) and provides public getters & setters.
   \`\`\`java
   public class Student {
       private String name;
       public String getName() { return name; }
       public void setName(String name) { this.name = name; }
   }
   \`\`\`

2. **Inheritance 🧬**
   - Allows a child class to inherit fields and methods from a parent class using the \`extends\` keyword. Promotes code reusability.
   \`\`\`java
   class Animal { void eat() { System.out.println("Eating..."); } }
   class Dog extends Animal { void bark() { System.out.println("Barking!"); } }
   \`\`\`

3. **Polymorphism 🎭**
   - **Compile-time (Overloading):** Same method name with different parameter signatures.
   - **Runtime (Overriding):** Subclass provides a specific implementation of a method already defined in its superclass (\`@Override\`).

4. **Abstraction 🧩**
   - Hiding complex implementation details and showing only the essential features to the user using **Abstract Classes** and **Interfaces**.

💡 **Pro Exam Tip:** Remember that Java does **not** support multiple inheritance with classes (to avoid the Diamond Problem), but does allow it through multiple Interfaces!`
  },
  {
    keywords: ["dsa", "data structure", "algorithm", "problem", "leetcode", "array", "binary tree", "challenge"],
    summary: "DSA Challenge: Two Sum & Array Traversal",
    response: `### Data Structures & Algorithms Problem 💡

Here is a classic, high-frequency interview & exam problem for you:

#### Problem: Two Sum (Optimal Approach)
> Given an array of integers \`nums\` and an integer \`target\`, return *indices of the two numbers such that they add up to \`target\`*.

#### 🔍 Approaches & Complexities:
1. **Brute Force:** Nested loops testing every pair $\\rightarrow$ **$O(N^2)$ Time, $O(1)$ Space**.
2. **Optimal Hash Map:** Track complements as you traverse $\\rightarrow$ **$O(N)$ Time, $O(N)$ Space**.

#### 💻 Optimal Solution (Java):
\`\`\`java
import java.util.HashMap;
import java.util.Map;

public class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (map.containsKey(complement)) {
                return new int[] { map.get(complement), i };
            }
            map.put(nums[i], i);
        }
        throw new IllegalArgumentException("No solution found");
    }
}
\`\`\`

🎯 **Quick Self-Check:**
- What happens if the array contains negative numbers? *(The HashMap approach still works seamlessly!)*
- Ready to try another problem? Ask me for a **Binary Search** or **Linked List** problem!`
  },
  {
    keywords: ["react", "component", "hooks", "state", "props", "virtual dom", "frontend"],
    summary: "React Fundamentals: Architecture & Hooks",
    response: `### Understanding React ⚛️

React is a declarative, component-based JavaScript library developed by Meta for building dynamic user interfaces.

#### Core Concepts Every Student Must Know:

1. **Component-Based Architecture 🧱**
   - UIs are divided into self-contained, reusable building blocks (e.g., \`<Header />\`, \`<Sidebar />\`).

2. **JSX (JavaScript XML) ✨**
   - Syntax extension allowing HTML-like templates directly inside JavaScript code.

3. **State vs. Props 🔄**
   - **Props:** Read-only inputs passed from parent to child component.
   - **State:** Internal, reactive data managed within a component. When state updates, React re-renders the component.

4. **Virtual DOM (VDOM) ⚡**
   - A lightweight in-memory representation of the real DOM. React calculates diffs (reconciliation) and updates only the changed DOM nodes for maximum performance.

5. **Essential React Hooks:**
   - \`useState\`: Manages local component state.
   - \`useEffect\`: Handles side effects (data fetching, timers, event listeners).
   - \`useMemo\` / \`useCallback\`: Performance optimizations to prevent redundant recalculations.

\`\`\`jsx
function Counter() {
  const [count, setCount] = React.useState(0);
  return (
    <button onClick={() => setCount(count + 1)}>
      Clicked {count} times
    </button>
  );
}
\`\`\``
  },
  {
    keywords: ["api", "rest", "endpoint", "http", "json", "request", "response"],
    summary: "What is an API? (Application Programming Interface)",
    response: `### What is an API? 🌐

**API** stands for **Application Programming Interface**. Think of an API like a waiter in a restaurant:
1. You (the client/frontend) sit at a table and look at the menu.
2. You tell the waiter (the API) your order: \`GET /burger\`.
3. The waiter takes the request to the kitchen (the backend server & database).
4. The waiter brings your delicious food back to your table (JSON data payload).

#### Key HTTP Methods in REST APIs:
- **GET:** Retrieve data from the server (e.g., \`GET /api/students\`)
- **POST:** Send new data to create a record (e.g., \`POST /api/students\`)
- **PUT / PATCH:** Update an existing resource
- **DELETE:** Remove a resource

#### Standard HTTP Status Codes:
- **200 OK:** Success!
- **201 Created:** New resource successfully generated.
- **400 Bad Request:** Client sent invalid data.
- **404 Not Found:** Endpoint or resource does not exist.
- **500 Internal Server Error:** Backend crash or unexpected exception.

\`\`\`javascript
// Fetching data in JavaScript
fetch('https://api.example.com/data')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Fetch error:', error));
\`\`\``
  },
  {
    keywords: ["study plan", "schedule", "routine", "timetable", "prepare", "exam", "revision", "plan"],
    summary: "Personalized 7-Day College Exam Study Plan",
    response: `### 7-Day High-Impact College Exam Study Plan 📅

Here is a structured, balanced schedule designed for peak retention using the **Pomodoro technique** and **Active Recall**:

| Day | Focus Area | Sessions | Key Milestone |
|---|---|---|---|
| **Day 1** | Java Core & OOP | 3h (6 Pomodoros) | Master 4 Pillars + Collections Framework |
| **Day 2** | Data Structures | 4h (8 Pomodoros) | Arrays, Linked Lists & 5 LeetCode problems |
| **Day 3** | Algorithms | 4h (8 Pomodoros) | Binary Search, Sorting & Recursion basics |
| **Day 4** | Computer Networks | 3.5h (7 Pomodoros) | OSI 7 Layers, TCP 3-way Handshake & IP Routing |
| **Day 5** | React & Web Dev | 3h (6 Pomodoros) | Components, Hooks, State & API Integration |
| **Day 6** | Machine Learning | 3h (6 Pomodoros) | Supervised vs Unsupervised + Cost Functions |
| **Day 7** | Mock Exam & Flashcards | 4h | Full timed past-year question paper rehearsal |

#### 🧠 3 Golden Study Rules for Success:
1. **Feynman Technique:** Explain complex algorithms out loud as if teaching a beginner.
2. **Pomodoro Discipline:** 25 mins deep work $\\rightarrow$ 5 mins walk/water.
3. **Sleep 7+ Hours:** Memory consolidation occurs during deep REM sleep!`
  },
  {
    keywords: ["network", "networks", "osi", "tcp", "udp", "ip", "layer", "router", "socket"],
    summary: "Computer Networks: OSI 7-Layer Model & Protocols",
    response: `### Computer Networks: The OSI 7-Layer Model 🔌

The **OSI (Open Systems Interconnection)** reference model standardizes network communication into seven functional layers:

1. **Layer 7 - Application:** User-facing interfaces (HTTP, HTTPS, FTP, DNS, SMTP).
2. **Layer 6 - Presentation:** Data formatting, encryption (TLS/SSL), and compression.
3. **Layer 5 - Session:** Manages sessions and dialogues between applications (RPC, NetBIOS).
4. **Layer 4 - Transport:** End-to-end connections, reliability, flow control.
   - **TCP (Transmission Control Protocol):** Connection-oriented, reliable, 3-way handshake.
   - **UDP (User Datagram Protocol):** Connectionless, ultra-fast, used for video streaming & gaming.
5. **Layer 3 - Network:** Logical addressing and routing of packets across networks (IP, ICMP, Routers).
6. **Layer 2 - Data Link:** Physical addressing via MAC addresses, framing, switches.
7. **Layer 1 - Physical:** Raw bits transmitted over physical medium (cables, fiber optics, radio frequencies).

 mnemonic to remember: **A**ll **P**eople **S**eem **T**o **N**eed **D**ata **P**rocessing!`
  },
  {
    keywords: ["machine learning", "ml", "ai", "artificial intelligence", "deep learning", "neural"],
    summary: "Machine Learning Essentials: Types & Workflow",
    response: `### Machine Learning (ML) Essentials 🤖

Machine Learning is a subset of Artificial Intelligence that enables computers to learn patterns from historical data without being explicitly programmed.

#### The 3 Main Types of Machine Learning:

1. **Supervised Learning 🏷️**
   - Trained on labeled input-output pairs.
   - *Regression:* Predict continuous values (e.g., house prices, temperature).
   - *Classification:* Categorize inputs (e.g., spam vs. ham email, disease diagnosis).

2. **Unsupervised Learning 🔍**
   - Discovers hidden patterns in unlabeled data.
   - *Clustering:* K-Means, customer segmentation.
   - *Dimensionality Reduction:* PCA (Principal Component Analysis).

3. **Reinforcement Learning 🎮**
   - An agent learns by taking actions in an environment to maximize cumulative reward (e.g., AlphaGo, self-driving cars, robotics).

#### The Standard ML Lifecycle:
\`\`\`text
Raw Data ➔ Data Preprocessing ➔ Feature Engineering ➔ Model Training ➔ Validation ➔ Deployment
\`\`\`

💡 **Common Loss Function:** Mean Squared Error (MSE) for regression, Binary Cross-Entropy for two-class classification.`
  }
];

export function findAIResponse(userQuery) {
  if (!userQuery || typeof userQuery !== "string") {
    return fallbackResponse.text;
  }

  const queryLower = userQuery.toLowerCase().trim();

  // Check against knowledge base
  for (const entry of knowledgeBase) {
    const matched = entry.keywords.some((kw) => queryLower.includes(kw));
    if (matched) {
      return entry.response;
    }
  }

  // Fallback demo response
  return fallbackResponse.text;
}
