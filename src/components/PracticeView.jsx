import React, { useState } from 'react';
import { 
  Code2, 
  Search, 
  Filter, 
  CheckCircle, 
  Play, 
  Sparkles, 
  Trophy, 
  ChevronRight,
  X
} from 'lucide-react';

export default function PracticeView({ onAskAIWithPrompt }) {
  const [filterDifficulty, setFilterDifficulty] = useState('All');
  const [activeChallenge, setActiveChallenge] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [testOutput, setTestOutput] = useState(null);

  const practiceProblems = [
    {
      id: 1,
      title: 'Find the Largest Element in an Array',
      difficulty: 'Easy',
      topic: 'Arrays',
      points: 10,
      acceptance: '92%',
      description: 'Given an integer array nums, return the maximum value in the array with optimal time complexity.',
      code: `// Java Solution
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
}`,
      testCases: 'Input: [2, 5, 1, 3, 0]\nExpected: 5\nStatus: Passed (14ms)'
    },
    {
      id: 2,
      title: 'Two Sum Problem',
      difficulty: 'Easy',
      topic: 'Hash Map',
      points: 15,
      acceptance: '84%',
      description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
      code: `// Java Solution (HashMap)
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
        return new int[]{};
    }
}`,
      testCases: 'Input: nums = [2,7,11,15], target = 9\nExpected: [0, 1]\nStatus: Passed (4ms)'
    },
    {
      id: 3,
      title: 'Valid Parentheses Check',
      difficulty: 'Easy',
      topic: 'Stack',
      points: 15,
      acceptance: '88%',
      description: 'Given a string s containing characters (), {}, and [], determine if the input string is valid using a Stack.',
      code: `// Java Stack Solution
public class Solution {
    public boolean isValid(String s) {
        Stack<Character> stack = new Stack<>();
        for (char c : s.toCharArray()) {
            if (c == '(') stack.push(')');
            else if (c == '{') stack.push('}');
            else if (c == '[') stack.push(']');
            else if (stack.isEmpty() || stack.pop() != c) return false;
        }
        return stack.isEmpty();
    }
}`,
      testCases: 'Input: s = "()[]{}"\nExpected: true\nStatus: Passed (8ms)'
    },
    {
      id: 4,
      title: 'Binary Tree Level Order Traversal',
      difficulty: 'Medium',
      topic: 'Trees / BFS',
      points: 25,
      acceptance: '68%',
      description: 'Given the root of a binary tree, return the level order traversal of its nodes values (i.e., from left to right, level by level).',
      code: `// Java BFS Solution
public List<List<Integer>> levelOrder(TreeNode root) {
    List<List<Integer>> res = new ArrayList<>();
    if (root == null) return res;
    Queue<TreeNode> queue = new LinkedList<>();
    queue.add(root);
    while (!queue.isEmpty()) {
        int levelSize = queue.size();
        List<Integer> currentLevel = new ArrayList<>();
        for (int i = 0; i < levelSize; i++) {
            TreeNode node = queue.poll();
            currentLevel.add(node.val);
            if (node.left != null) queue.add(node.left);
            if (node.right != null) queue.add(node.right);
        }
        res.add(currentLevel);
    }
    return res;
}`,
      testCases: 'Input: root = [3,9,20,null,null,15,7]\nExpected: [[3],[9,20],[15,7]]\nStatus: Passed (2ms)'
    },
    {
      id: 5,
      title: 'Longest Palindromic Substring',
      difficulty: 'Medium',
      topic: 'Dynamic Programming',
      points: 30,
      acceptance: '52%',
      description: 'Given a string s, return the longest palindromic substring in s using expandable center approach or DP matrix.',
      code: `// Java Expand Around Center
public String longestPalindrome(String s) {
    if (s == null || s.length() < 1) return "";
    int start = 0, end = 0;
    for (int i = 0; i < s.length(); i++) {
        int len1 = expandFromCenter(s, i, i);
        int len2 = expandFromCenter(s, i, i + 1);
        int len = Math.max(len1, len2);
        if (len > end - start) {
            start = i - (len - 1) / 2;
            end = i + len / 2;
        }
    }
    return s.substring(start, end + 1);
}`,
      testCases: 'Input: s = "babad"\nExpected: "bab" or "aba"\nStatus: Passed (18ms)'
    }
  ];

  const filtered = practiceProblems.filter((p) => {
    if (filterDifficulty === 'All') return true;
    return p.difficulty === filterDifficulty;
  });

  const handleRunSolution = () => {
    setIsRunning(true);
    setTestOutput(null);
    setTimeout(() => {
      setIsRunning(false);
      setTestOutput(activeChallenge.testCases);
    }, 700);
  };

  return (
    <div className="practice-view-container">
      <div className="view-header-split">
        <div>
          <h1 className="view-title">Coding Practice Arena 📝</h1>
          <p className="view-subtitle">Curated interview and semester lab coding challenges</p>
        </div>

        {/* Difficulty Filter */}
        <div className="difficulty-pills">
          {['All', 'Easy', 'Medium'].map((diff) => (
            <button
              key={diff}
              className={`diff-pill-btn ${filterDifficulty === diff ? 'active' : ''}`}
              onClick={() => setFilterDifficulty(diff)}
            >
              {diff}
            </button>
          ))}
        </div>
      </div>

      {/* Problems List */}
      <div className="problems-table-card card">
        <div className="table-header-row">
          <span className="col-prob">Problem Title</span>
          <span className="col-topic">Topic</span>
          <span className="col-diff">Difficulty</span>
          <span className="col-pts">Points</span>
          <span className="col-action">Action</span>
        </div>

        <div className="problems-list">
          {filtered.map((prob) => (
            <div key={prob.id} className="problem-row-item">
              <div className="col-prob prob-title-box">
                <Code2 size={16} className="text-primary" />
                <span className="prob-title-text">{prob.title}</span>
              </div>
              <div className="col-topic">
                <span className="topic-pill">{prob.topic}</span>
              </div>
              <div className="col-diff">
                <span className={`diff-badge diff-${prob.difficulty.toLowerCase()}`}>
                  {prob.difficulty}
                </span>
              </div>
              <div className="col-pts font-mono">+{prob.points} pts</div>
              <div className="col-action">
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => {
                    setActiveChallenge(prob);
                    setTestOutput(null);
                  }}
                >
                  Solve Demo
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Modal */}
      {activeChallenge && (
        <div className="modal-backdrop" onClick={() => setActiveChallenge(null)}>
          <div className="modal-window" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title-wrap">
                <Code2 size={20} className="text-primary" />
                <h3 className="modal-title">{activeChallenge.title}</h3>
                <span className={`badge diff-${activeChallenge.difficulty.toLowerCase()}`}>
                  {activeChallenge.difficulty}
                </span>
              </div>
              <button
                className="btn-icon modal-close-btn"
                onClick={() => setActiveChallenge(null)}
              >
                <X size={18} />
              </button>
            </div>

            <div className="modal-body">
              <p className="modal-desc">{activeChallenge.description}</p>

              <div className="code-editor-sim">
                <div className="code-editor-header">
                  <span className="editor-filename">Solution.java</span>
                  <span className="editor-lang">Java / DSA</span>
                </div>
                <pre className="code-editor-content">
                  <code>{activeChallenge.code}</code>
                </pre>
              </div>

              {testOutput && (
                <div className="test-result-box success">
                  <div className="result-header">
                    <CheckCircle size={16} className="text-emerald" />
                    <strong>Code Executed Successfully!</strong>
                  </div>
                  <pre className="result-details">{testOutput}</pre>
                </div>
              )}
            </div>

            <div className="modal-footer">
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => {
                  onAskAIWithPrompt(`Explain optimal time & space complexity for ${activeChallenge.title}`);
                  setActiveChallenge(null);
                }}
              >
                <Sparkles size={14} className="text-secondary" /> Ask AI to Explain
              </button>
              <div className="footer-actions">
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => setActiveChallenge(null)}
                >
                  Close
                </button>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={handleRunSolution}
                  disabled={isRunning}
                >
                  {isRunning ? 'Compiling & Running...' : (
                    <>
                      <Play size={14} /> Run Solution
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .practice-view-container {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .view-header-split {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .difficulty-pills {
          display: flex;
          background-color: var(--bg-surface-hover);
          padding: 0.25rem;
          border-radius: var(--radius-md);
          gap: 0.25rem;
        }

        .diff-pill-btn {
          padding: 0.35rem 0.85rem;
          border-radius: var(--radius-sm);
          font-family: var(--font-sans);
          font-size: 0.8rem;
          font-weight: 600;
          border: none;
          background: transparent;
          color: var(--text-secondary);
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .diff-pill-btn.active {
          background-color: var(--bg-surface);
          color: var(--primary);
          box-shadow: var(--shadow-sm);
        }

        .problems-table-card {
          padding: 0;
          overflow: hidden;
        }

        .table-header-row {
          display: flex;
          align-items: center;
          padding: 0.85rem 1.25rem;
          background-color: var(--bg-surface-hover);
          border-bottom: 1px solid var(--border-subtle);
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .problem-row-item {
          display: flex;
          align-items: center;
          padding: 1rem 1.25rem;
          border-bottom: 1px solid var(--border-subtle);
          transition: background-color var(--transition-fast);
        }

        .problem-row-item:hover {
          background-color: var(--bg-surface-hover);
        }

        .problem-row-item:last-child {
          border-bottom: none;
        }

        .col-prob { flex: 2; }
        .col-topic { flex: 1; }
        .col-diff { flex: 0.8; }
        .col-pts { flex: 0.8; }
        .col-action { flex: 0.8; text-align: right; }

        .prob-title-box {
          display: flex;
          align-items: center;
          gap: 0.65rem;
        }

        .prob-title-text {
          font-size: 0.875rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .topic-pill {
          display: inline-block;
          font-size: 0.725rem;
          padding: 0.2rem 0.55rem;
          background-color: var(--bg-surface-hover);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-full);
          color: var(--text-secondary);
        }

        .diff-badge {
          font-size: 0.725rem;
          font-weight: 700;
          padding: 0.2rem 0.55rem;
          border-radius: var(--radius-full);
        }

        .diff-easy {
          background-color: rgba(16, 185, 129, 0.12);
          color: #10b981;
        }

        .diff-medium {
          background-color: rgba(245, 158, 11, 0.12);
          color: #f59e0b;
        }

        @media (max-width: 768px) {
          .col-topic, .col-pts {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
