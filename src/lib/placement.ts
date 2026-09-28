import type { PlacementQuestion } from '@/types';

/*
 * Placement Test: 15 questions from easy (difficulty 1) to hard (difficulty 5).
 * Two question formats:
 *   - 'translate': Vietnamese question, English answer options
 *   - 'image': Emoji shown, "What is this?" question, English answer options
 *
 * Score determines the child's starting level:
 *   0-4 correct  → Level 1 (Beginner)
 *   5-8 correct  → Level 2 (Elementary)
 *   9-11 correct → Level 3 (Intermediate)
 *   12-13 correct → Level 4 (Upper-Intermediate)
 *   14-15 correct → Level 5 (Advanced)
 */

export const PLACEMENT_QUESTIONS: PlacementQuestion[] = [
  // Difficulty 1 — Colors (easy)
  {
    type: 'translate',
    question: 'Từ nào dưới đây có nghĩa là "Màu đỏ"?',
    emoji: '',
    options: ['Blue', 'Red', 'Green'],
    correctIndex: 1,
    difficulty: 1,
  },
  {
    type: 'image',
    question: 'What is this?',
    emoji: '🔵',
    options: ['Yellow', 'Green', 'Blue'],
    correctIndex: 2,
    difficulty: 1,
  },
  {
    type: 'translate',
    question: 'Từ nào dưới đây có nghĩa là "Màu xanh lá"?',
    emoji: '',
    options: ['Green', 'Red', 'Yellow'],
    correctIndex: 0,
    difficulty: 1,
  },
  // Difficulty 2 — Animals
  {
    type: 'image',
    question: 'What is this?',
    emoji: '🦁',
    options: ['Bear', 'Lion', 'Wolf'],
    correctIndex: 1,
    difficulty: 2,
  },
  {
    type: 'translate',
    question: 'Từ nào dưới đây có nghĩa là "Cá heo"?',
    emoji: '',
    options: ['Shark', 'Dolphin', 'Whale'],
    correctIndex: 1,
    difficulty: 2,
  },
  {
    type: 'image',
    question: 'Nhìn hình và chọn từ đúng',
    emoji: '🦅',
    options: ['Eagle', 'Bat', 'Owl'],
    correctIndex: 0,
    difficulty: 2,
  },
  // Difficulty 3 — Action verbs
  {
    type: 'image',
    question: 'What is this?',
    emoji: '🏃',
    options: ['Fly', 'Run', 'Swim'],
    correctIndex: 1,
    difficulty: 3,
  },
  {
    type: 'translate',
    question: 'Từ nào dưới đây có nghĩa là "Trèo"?',
    emoji: '',
    options: ['Climb', 'Punch', 'Dodge'],
    correctIndex: 0,
    difficulty: 3,
  },
  {
    type: 'translate',
    question: 'Từ nào dưới đây có nghĩa là "Phòng thủ"?',
    emoji: '',
    options: ['Charge', 'Defend', 'Fight'],
    correctIndex: 1,
    difficulty: 3,
  },
  // Difficulty 4 — Sentences / phrases
  {
    type: 'translate',
    question: 'Từ nào dưới đây có nghĩa là "Dũng cảm"?',
    emoji: '',
    options: ['Brave', 'Fast', 'Happy'],
    correctIndex: 0,
    difficulty: 4,
  },
  {
    type: 'image',
    question: 'What is this?',
    emoji: '🛡️',
    options: ['Shield', 'Sword', 'Armor'],
    correctIndex: 0,
    difficulty: 4,
  },
  {
    type: 'translate',
    question: 'Từ nào dưới đây có nghĩa là "Sức mạnh"?',
    emoji: '',
    options: ['Power', 'Fear', 'Joy'],
    correctIndex: 0,
    difficulty: 4,
  },
  // Difficulty 5 — Advanced vocabulary
  {
    type: 'translate',
    question: 'Từ nào dưới đây có nghĩa là "Sự can đảm"?',
    emoji: '',
    options: ['Courage', 'Danger', 'Victory'],
    correctIndex: 0,
    difficulty: 5,
  },
  {
    type: 'image',
    question: 'Nhìn hình và chọn từ đúng',
    emoji: '🦹',
    options: ['Hero', 'Villain', 'Citizen'],
    correctIndex: 1,
    difficulty: 5,
  },
  {
    type: 'translate',
    question: 'Từ nào dưới đây có nghĩa là "Chiến thắng"?',
    emoji: '',
    options: ['Defeat', 'Victory', 'Battle'],
    correctIndex: 1,
    difficulty: 5,
  },
];

export function scoreToLevel(correctCount: number): number {
  if (correctCount <= 4) return 1;
  if (correctCount <= 8) return 2;
  if (correctCount <= 11) return 3;
  if (correctCount <= 13) return 4;
  return 5;
}

export const LEVEL_LABELS: Record<number, string> = {
  1: 'Tân binh',
  2: 'Chiến binh',
  3: 'Dũng sĩ',
  4: 'Anh hùng',
  5: 'Huyền thoại',
};
