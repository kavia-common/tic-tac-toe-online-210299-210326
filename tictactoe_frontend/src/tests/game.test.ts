import { describe, it, expect } from 'vitest';
import { createGameState, makeMove, availableMoves, computeAiMove, type Board } from '../lib/game';

describe('Game Logic', () => {
  it('initializes game correctly', () => {
    const s = createGameState();
    expect(s.board).toHaveLength(9);
    expect(s.board.every((c) => c === null)).toBe(true);
    expect(s.current).toBe('X');
    expect(s.winner).toBeNull();
    expect(s.isDraw).toBe(false);
  });

  it('prevents invalid move index', () => {
    const s = createGameState();
    expect(() => makeMove(s, -1)).toThrow();
    expect(() => makeMove(s, 9)).toThrow();
  });

  it('alternates turns and detects win', () => {
    let s = createGameState();
    s = makeMove(s, 0); // X
    s = makeMove(s, 3); // O
    s = makeMove(s, 1); // X
    s = makeMove(s, 4); // O
    s = makeMove(s, 2); // X wins row
    expect(s.winner).toBe('X');
    expect(s.winningLine).toEqual([0,1,2]);
  });

  it('detects draw', () => {
    // X O X
    // X X O
    // O X O
    let s = createGameState();
    s = makeMove(s, 0); // X
    s = makeMove(s, 1); // O
    s = makeMove(s, 2); // X
    s = makeMove(s, 5); // O
    s = makeMove(s, 3); // X
    s = makeMove(s, 6); // O
    s = makeMove(s, 4); // X
    s = makeMove(s, 8); // O
    s = makeMove(s, 7); // X
    expect(s.isDraw).toBe(true);
    expect(s.winner).toBeNull();
  });

  it('availableMoves returns empty slots', () => {
    let s = createGameState();
    s = makeMove(s, 0);
    s = makeMove(s, 1);
    const avail = availableMoves(s.board);
    expect(avail.includes(0)).toBe(false);
    expect(avail.includes(1)).toBe(false);
    expect(avail).toContain(2);
  });

  it('AI prefers center', () => {
    const s = createGameState(true);
    const move = computeAiMove(s.board, 'O');
    expect(move).toBe(4);
  });

  it('AI can win if possible', () => {
    // O can win at 2
    const board: Board = ['O', 'O', null, null, 'X', null, null, 'X', null];
    const move = computeAiMove(board, 'O');
    expect(move).toBe(2);
  });

  it('AI blocks opponent', () => {
    // X threatens at 2
    const board: Board = ['X', 'X', null, null, 'O', null, null, null, null];
    const move = computeAiMove(board, 'O');
    expect(move).toBe(2);
  });
});
