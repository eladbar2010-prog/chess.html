// ─────────────────────────────────────────────────────────────────────────────
// Configuration
// ─────────────────────────────────────────────────────────────────────────────
const ANTHROPIC_API_KEY = 'YOUR_API_KEY_HERE';

// ─────────────────────────────────────────────────────────────────────────────
// Piece unicode map
// ─────────────────────────────────────────────────────────────────────────────
const PIECES = {
  wK: '♔', wQ: '♕', wR: '♖', wB: '♗', wN: '♘', wP: '♙',
  bK: '♚', bQ: '♛', bR: '♜', bB: '♝', bN: '♞', bP: '♟',
};

const FILE_NAMES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

// ─────────────────────────────────────────────────────────────────────────────
// Square helpers
// ─────────────────────────────────────────────────────────────────────────────
function sq(r, c)       { return r * 8 + c; }
function row(idx)       { return Math.floor(idx / 8); }
function col(idx)       { return idx % 8; }
function sqName(idx)    { return FILE_NAMES[col(idx)] + (8 - row(idx)); }
function nameToIdx(n)   { return (8 - parseInt(n[1])) * 8 + FILE_NAMES.indexOf(n[0]); }
function colorOf(p)     { return p ? p[0] : null; }
function isWhite(p)     { return p && p[0] === 'w'; }
function opponent(c)    { return c === 'w' ? 'b' : 'w'; }

// ─────────────────────────────────────────────────────────────────────────────
// Game state
// ─────────────────────────────────────────────────────────────────────────────
let state = {};

function initState() {
  const board = Array(64).fill(null);
  const backRow = ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'];
  for (let c = 0; c < 8; c++) {
    board[sq(0, c)] = 'b' + backRow[c];
    board[sq(7, c)] = 'w' + backRow[c];
    board[sq(1, c)] = 'bP';
    board[sq(6, c)] = 'wP';
  }

  state = {
    board,
    turn: 'w',
    castling: { wK: true, wQ: true, bK: true, bQ: true },
    enPassant: null,
    halfMoveClock: 0,
    fullMoveNumber: 1,
    history: [],
    positionHistory: [],
    moveListAlg: [],
    capturedByWhite: [],
    capturedByBlack: [],
    selected: null,
    lastMove: null,
    gameOver: false,
    aiVsAiRunning: false,
    aiVsAiMode: false,
  };
  state.positionHistory.push(positionKey(state));
}

// ─────────────────────────────────────────────────────────────────────────────
// Position key & FEN
// ─────────────────────────────────────────────────────────────────────────────
function positionKey(s) {
  const { wK, wQ, bK, bQ } = s.castling;
  return s.board.join(',') + '|' + s.turn + '|' +
    (wK ? 'K' : '') + (wQ ? 'Q' : '') + (bK ? 'k' : '') + (bQ ? 'q' : '') +
    '|' + (s.enPassant !== null ? sqName(s.enPassant) : '-');
}

function toFEN(s) {
  let fen = '';
  for (let r = 0; r < 8; r++) {
    let empty = 0;
    for (let c = 0; c < 8; c++) {
      const p = s.board[sq(r, c)];
      if (!p) {
        empty++;
      } else {
        if (empty) { fen += empty; empty = 0; }
        fen += isWhite(p) ? p[1] : p[1].toLowerCase();
      }
    }
    if (empty) fen += empty;
    if (r < 7) fen += '/';
  }
  const { wK, wQ, bK, bQ } = s.castling;
  const cast = (wK ? 'K' : '') + (wQ ? 'Q' : '') + (bK ? 'k' : '') + (bQ ? 'q' : '') || '-';
  const ep = s.enPassant !== null ? sqName(s.enPassant) : '-';
  return `${fen} ${s.turn === 'w' ? 'w' : 'b'} ${cast} ${ep} ${s.halfMoveClock} ${s.fullMoveNumber}`;
}

// ─────────────────────────────────────────────────────────────────────────────
// Move generation
// ─────────────────────────────────────────────────────────────────────────────
function pseudoMoves(s, color) {
  const moves = [];

  for (let from = 0; from < 64; from++) {
    const p = s.board[from];
    if (!p || colorOf(p) !== color) continue;
    const type = p[1];
    const r = row(from), c = col(from);

    if (type === 'P') {
      const dir = isWhite(p) ? -1 : 1;
      const startRow = isWhite(p) ? 6 : 1;
      const fwd = sq(r + dir, c);
      if (r + dir >= 0 && r + dir < 8 && !s.board[fwd]) {
        moves.push({ from, to: fwd, piece: p });
        if (r === startRow && !s.board[sq(r + 2 * dir, c)]) {
          moves.push({ from, to: sq(r + 2 * dir, c), piece: p, doublePush: true });
        }
      }
      for (const dc of [-1, 1]) {
        if (c + dc < 0 || c + dc > 7) continue;
        const to = sq(r + dir, c + dc);
        if (s.board[to] && colorOf(s.board[to]) !== color) moves.push({ from, to, piece: p });
        if (s.enPassant === to) moves.push({ from, to, piece: p, enPassant: true });
      }

    } else if (type === 'N') {
      for (const [dr, dc] of [[-2,-1],[-2,1],[-1,-2],[-1,2],[1,-2],[1,2],[2,-1],[2,1]]) {
        const nr = r + dr, nc = c + dc;
        if (nr < 0 || nr > 7 || nc < 0 || nc > 7) continue;
        const to = sq(nr, nc);
        if (!s.board[to] || colorOf(s.board[to]) !== color) moves.push({ from, to, piece: p });
      }

    } else if (type === 'B' || type === 'R' || type === 'Q') {
      const dirs =
        type === 'B' ? [[-1,-1],[-1,1],[1,-1],[1,1]] :
        type === 'R' ? [[-1,0],[1,0],[0,-1],[0,1]] :
                       [[-1,-1],[-1,1],[1,-1],[1,1],[-1,0],[1,0],[0,-1],[0,1]];
      for (const [dr, dc] of dirs) {
        let nr = r + dr, nc = c + dc;
        while (nr >= 0 && nr < 8 && nc >= 0 && nc < 8) {
          const to = sq(nr, nc);
          if (!s.board[to]) {
            moves.push({ from, to, piece: p });
          } else {
            if (colorOf(s.board[to]) !== color) moves.push({ from, to, piece: p });
            break;
          }
          nr += dr; nc += dc;
        }
      }

    } else if (type === 'K') {
      for (const [dr, dc] of [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]]) {
        const nr = r + dr, nc = c + dc;
        if (nr < 0 || nr > 7 || nc < 0 || nc > 7) continue;
        const to = sq(nr, nc);
        if (!s.board[to] || colorOf(s.board[to]) !== color) moves.push({ from, to, piece: p });
      }
      // Castling
      const backR = isWhite(p) ? 7 : 0;
      if (r === backR && c === 4) {
        const ck = isWhite(p) ? s.castling.wK : s.castling.bK;
        const cq = isWhite(p) ? s.castling.wQ : s.castling.bQ;
        if (ck && !s.board[sq(backR,5)] && !s.board[sq(backR,6)])
          moves.push({ from, to: sq(backR, 6), piece: p, castling: 'K' });
        if (cq && !s.board[sq(backR,3)] && !s.board[sq(backR,2)] && !s.board[sq(backR,1)])
          moves.push({ from, to: sq(backR, 2), piece: p, castling: 'Q' });
      }
    }
  }
  return moves;
}

function isInCheck(s, color) {
  let kingIdx = -1;
  for (let i = 0; i < 64; i++) if (s.board[i] === color + 'K') kingIdx = i;
  if (kingIdx < 0) return true;
  return pseudoMoves(s, opponent(color)).some(m => m.to === kingIdx);
}

function squareAttackedBy(s, idx, color) {
  return pseudoMoves(s, color).some(m => m.to === idx);
}

function applyMoveToBoard(board, move, castling) {
  const nb = board.slice();
  const newCastling = { ...castling };
  let newEP = null;
  let captured = null;

  if (nb[move.to]) captured = nb[move.to];

  if (move.enPassant) {
    const capSq = move.to + (isWhite(move.piece) ? 1 : -1) * 8;
    captured = nb[capSq];
    nb[capSq] = null;
  }

  nb[move.to] = move.promotion ? colorOf(move.piece) + move.promotion : move.piece;
  nb[move.from] = null;

  if (move.castling) {
    const r = row(move.from);
    if (move.castling === 'K') { nb[sq(r,5)] = nb[sq(r,7)]; nb[sq(r,7)] = null; }
    else                        { nb[sq(r,3)] = nb[sq(r,0)]; nb[sq(r,0)] = null; }
  }

  // Update castling rights
  if (move.piece === 'wK') { newCastling.wK = false; newCastling.wQ = false; }
  if (move.piece === 'bK') { newCastling.bK = false; newCastling.bQ = false; }
  if (move.piece === 'wR') {
    if (move.from === sq(7,7)) newCastling.wK = false;
    if (move.from === sq(7,0)) newCastling.wQ = false;
  }
  if (move.piece === 'bR') {
    if (move.from === sq(0,7)) newCastling.bK = false;
    if (move.from === sq(0,0)) newCastling.bQ = false;
  }
  if (move.to === sq(7,7)) newCastling.wK = false;
  if (move.to === sq(7,0)) newCastling.wQ = false;
  if (move.to === sq(0,7)) newCastling.bK = false;
  if (move.to === sq(0,0)) newCastling.bQ = false;

  if (move.doublePush) newEP = move.to + (isWhite(move.piece) ? 1 : -1) * 8;

  return { board: nb, castling: newCastling, enPassant: newEP, captured };
}

function legalMoves(s, color) {
  const legal = [];
  for (const m of pseudoMoves(s, color)) {
    if (m.castling) {
      if (isInCheck(s, color)) continue;
      const opp = opponent(color);
      const r = row(m.from);
      const pass = m.castling === 'K' ? [sq(r,5), sq(r,6)] : [sq(r,3), sq(r,2)];
      let safe = true;
      for (const ps of pass) {
        const tmp = s.board.slice();
        tmp[ps] = color + 'K'; tmp[m.from] = null;
        if (squareAttackedBy({ ...s, board: tmp }, ps, opp)) { safe = false; break; }
      }
      if (!safe) continue;
    }
    const res = applyMoveToBoard(s.board, m, s.castling);
    if (!isInCheck({ ...s, board: res.board, castling: res.castling, enPassant: res.enPassant }, color))
      legal.push(m);
  }
  return legal;
}

// ─────────────────────────────────────────────────────────────────────────────
// Algebraic notation
// ─────────────────────────────────────────────────────────────────────────────
function moveToAlgebraic(s, move, legalList) {
  if (move.castling === 'K') return 'O-O';
  if (move.castling === 'Q') return 'O-O-O';

  const type = move.piece[1];
  const toName = sqName(move.to);
  let an = '';

  if (type === 'P') {
    an = (s.board[move.to] || move.enPassant) ? FILE_NAMES[col(move.from)] + 'x' + toName : toName;
    if (move.promotion) an += '=' + move.promotion;
  } else {
    let prefix = type;
    const ambig = legalList.filter(m => m !== move && m.piece === move.piece && m.to === move.to);
    if (ambig.length) {
      if (ambig.every(m => col(m.from) !== col(move.from)))      prefix += FILE_NAMES[col(move.from)];
      else if (ambig.every(m => row(m.from) !== row(move.from))) prefix += (8 - row(move.from));
      else                                                        prefix += sqName(move.from);
    }
    an = prefix + (s.board[move.to] ? 'x' : '') + toName;
  }

  // Check/mate suffix
  const res = applyMoveToBoard(s.board, move, s.castling);
  const ns = { ...s, board: res.board, castling: res.castling, enPassant: res.enPassant, turn: opponent(s.turn) };
  const oLegal = legalMoves(ns, ns.turn);
  if (isInCheck(ns, ns.turn)) an += oLegal.length === 0 ? '#' : '+';
  return an;
}

// ─────────────────────────────────────────────────────────────────────────────
// Execute / undo moves
// ─────────────────────────────────────────────────────────────────────────────
function executeMove(move) {
  const legal = legalMoves(state, state.turn);
  const matched = legal.filter(m =>
    m.from === move.from && m.to === move.to &&
    (m.promotion || null) === (move.promotion || null)
  );
  if (!matched.length) return false;

  const m = matched[0];
  const algStr = moveToAlgebraic(state, m, legal);

  state.history.push({
    board: state.board.slice(),
    castling: { ...state.castling },
    enPassant: state.enPassant,
    halfMoveClock: state.halfMoveClock,
    fullMoveNumber: state.fullMoveNumber,
    capturedByWhite: [...state.capturedByWhite],
    capturedByBlack: [...state.capturedByBlack],
    moveListAlg: [...state.moveListAlg],
    positionHistory: [...state.positionHistory],
    lastMove: state.lastMove,
  });

  const res = applyMoveToBoard(state.board, m, state.castling);

  if (res.captured) {
    if (isWhite(m.piece)) state.capturedByWhite.push(res.captured);
    else                   state.capturedByBlack.push(res.captured);
  }

  state.board        = res.board;
  state.castling     = res.castling;
  state.enPassant    = res.enPassant;
  state.lastMove     = { from: m.from, to: m.to };
  state.halfMoveClock = (m.piece[1] === 'P' || res.captured) ? 0 : state.halfMoveClock + 1;
  if (state.turn === 'b') state.fullMoveNumber++;

  if (state.turn === 'w') {
    state.moveListAlg.push((state.fullMoveNumber - 1) + '. ' + algStr);
  } else {
    const last = state.moveListAlg[state.moveListAlg.length - 1];
    state.moveListAlg[state.moveListAlg.length - 1] = last ? last + ' ' + algStr : '... ' + algStr;
  }

  state.turn = opponent(state.turn);
  state.positionHistory.push(positionKey(state));
  return true;
}

function undoMove() {
  if (!state.history.length) return;
  const snap = state.history.pop();
  Object.assign(state, snap);
  state.turn = opponent(state.turn);
  state.gameOver = false;
}

// ─────────────────────────────────────────────────────────────────────────────
// Game-over detection
// ─────────────────────────────────────────────────────────────────────────────
function checkGameOver() {
  const legal = legalMoves(state, state.turn);
  if (!legal.length) {
    return isInCheck(state, state.turn)
      ? { over: true, reason: 'checkmate', winner: opponent(state.turn) }
      : { over: true, reason: 'stalemate', winner: null };
  }
  if (state.halfMoveClock >= 100) return { over: true, reason: '50-move', winner: null };
  const key = positionKey(state);
  if (state.positionHistory.filter(k => k === key).length >= 3)
    return { over: true, reason: 'repetition', winner: null };
  return { over: false };
}

// ─────────────────────────────────────────────────────────────────────────────
// Stockfish engine
// ─────────────────────────────────────────────────────────────────────────────
let stockfish = null;
let sfCallback = null;

function handleStockfishMsg(e) {
  const msg = typeof e.data === 'string' ? e.data : String(e.data || '');
  if (sfCallback && sfCallback(msg)) sfCallback = null;
}

function sfWaitFor(predicate, command) {
  return new Promise(resolve => {
    sfCallback = msg => { if (predicate(msg)) { resolve(); return true; } return false; };
    if (command) stockfish.postMessage(command);
  });
}

async function initStockfish() {
  try {
    document.getElementById('aiLog').textContent = 'Loading Stockfish engine...';
    const blob = await fetch(
      'https://cdnjs.cloudflare.com/ajax/libs/stockfish.js/10.0.2/stockfish.js'
    ).then(r => r.blob());
    stockfish = new Worker(URL.createObjectURL(blob));
    stockfish.onmessage = handleStockfishMsg;
    await sfWaitFor(m => m === 'uciok', 'uci');
    stockfish.postMessage('setoption name Skill Level value 20');
    stockfish.postMessage('setoption name Threads value 4');
    stockfish.postMessage('setoption name Hash value 128');
    await sfWaitFor(m => m === 'readyok', 'isready');
    document.getElementById('aiLog').textContent = 'Stockfish ready — skill 20, depth 20';
  } catch (err) {
    document.getElementById('aiLog').textContent = 'Stockfish failed to load: ' + err.message;
    console.error('Stockfish init error:', err);
  }
}

function getStockfishMove(fen) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('Stockfish timeout after 30s')), 30000);
    sfCallback = msg => {
      if (msg.startsWith('bestmove')) {
        clearTimeout(timer);
        const mv = msg.split(' ')[1];
        resolve(mv && mv !== '(none)' ? mv : null);
        return true;
      }
      return false;
    };
    stockfish.postMessage('position fen ' + fen);
    stockfish.postMessage('go depth 20');
  });
}

// Claude explains the chosen move — cosmetic only, fires after move is played
async function explainMove(moveStr, color, fen) {
  const apiKey = document.getElementById('apiKeyInput').value.trim() || ANTHROPIC_API_KEY;
  if (!apiKey || apiKey === 'YOUR_API_KEY_HERE') return;
  try {
    const resp = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-calls': 'true',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 300,
        messages: [{
          role: 'user',
          content: `You are a chess commentator. Stockfish (depth 20) just played ${moveStr} as ${color === 'w' ? 'White' : 'Black'} from this FEN: ${fen}\n\nIn 2-3 sentences explain the key idea behind this move — what threat it creates, what it defends, or what strategic goal it achieves. Be concise and insightful.`,
        }],
      }),
    });
    if (resp.ok) {
      const data = await resp.json();
      const text = data.content?.[0]?.text || '';
      if (text) document.getElementById('aiLog').textContent = text;
    }
  } catch (_) { /* explanation is cosmetic — silently ignore errors */ }
}

function parseMoveStr(str) {
  if (!str || str.length < 4) return null;
  return {
    from:      nameToIdx(str.slice(0, 2)),
    to:        nameToIdx(str.slice(2, 4)),
    promotion: str.length >= 5 ? str[4].toUpperCase() : null,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Promotion UI
// ─────────────────────────────────────────────────────────────────────────────
function showPromotionModal(move, color, callback) {
  const opts = color === 'w'
    ? [['Q','♕'],['R','♖'],['B','♗'],['N','♘']]
    : [['Q','♛'],['R','♜'],['B','♝'],['N','♞']];
  const container = document.getElementById('promoPieces');
  container.innerHTML = '';
  for (const [p, u] of opts) {
    const el = document.createElement('div');
    el.className = 'promo-piece';
    el.textContent = u;
    el.onclick = () => {
      document.getElementById('promoOverlay').classList.remove('show');
      callback(p);
    };
    container.appendChild(el);
  }
  document.getElementById('promoOverlay').classList.add('show');
}

// ─────────────────────────────────────────────────────────────────────────────
// Rendering
// ─────────────────────────────────────────────────────────────────────────────
function renderBoard() {
  const boardEl = document.getElementById('board');
  boardEl.innerHTML = '';

  const legal = legalMoves(state, state.turn);
  const legalToSet = new Set(
    state.selected !== null ? legal.filter(m => m.from === state.selected).map(m => m.to) : []
  );

  let inCheckKing = -1;
  if (isInCheck(state, state.turn)) {
    for (let i = 0; i < 64; i++) if (state.board[i] === state.turn + 'K') inCheckKing = i;
  }

  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const idx = sq(r, c);
      const p   = state.board[idx];
      const div = document.createElement('div');
      div.className = 'sq ' + ((r + c) % 2 === 0 ? 'light' : 'dark');

      if (idx === state.selected) div.classList.add('selected');
      if (state.lastMove && (idx === state.lastMove.from || idx === state.lastMove.to))
        div.classList.add('last-move');
      if (idx === inCheckKing) div.classList.add('in-check');

      if (p) {
        div.textContent = PIECES[p] || '?';
        div.classList.add(isWhite(p) ? 'white-piece' : 'black-piece');
      }

      if (legalToSet.has(idx)) {
        const marker = document.createElement('div');
        marker.className = (p && colorOf(p) !== state.turn) ? 'capture-ring' : 'move-dot';
        div.appendChild(marker);
      }

      div.addEventListener('click', () => handleSquareClick(idx));
      boardEl.appendChild(div);
    }
  }
}

function renderLabels() {
  const rankEl = document.getElementById('rankLabels');
  const fileEl = document.getElementById('fileLabels');
  rankEl.innerHTML = '';
  fileEl.innerHTML = '';
  for (let r = 0; r < 8; r++) {
    const s = document.createElement('span');
    s.textContent = 8 - r;
    rankEl.appendChild(s);
  }
  for (let c = 0; c < 8; c++) {
    const s = document.createElement('span');
    s.textContent = FILE_NAMES[c];
    fileEl.appendChild(s);
  }
}

function renderSidePanel() {
  document.getElementById('turnDisplay').textContent =
    state.gameOver ? 'Game Over' : (state.turn === 'w' ? 'White' : 'Black') + ' to move';

  const histEl = document.getElementById('moveHistory');
  histEl.textContent = state.moveListAlg.join('\n');
  histEl.scrollTop = histEl.scrollHeight;

  document.getElementById('capturedByWhite').textContent =
    state.capturedByWhite.map(p => PIECES[p] || '').join('');
  document.getElementById('capturedByBlack').textContent =
    state.capturedByBlack.map(p => PIECES[p] || '').join('');
}

function render() {
  renderBoard();
  renderSidePanel();
}

// ─────────────────────────────────────────────────────────────────────────────
// Player interaction
// ─────────────────────────────────────────────────────────────────────────────
function handleSquareClick(idx) {
  if (state.gameOver || state.aiVsAiMode || state.turn === 'b') return;

  const legal = legalMoves(state, state.turn);

  if (state.selected === null) {
    if (state.board[idx] && colorOf(state.board[idx]) === state.turn &&
        legal.some(m => m.from === idx)) {
      state.selected = idx;
      render();
    }
    return;
  }

  if (idx === state.selected) { state.selected = null; render(); return; }

  const candidates = legal.filter(m => m.from === state.selected && m.to === idx);
  if (!candidates.length) {
    if (state.board[idx] && colorOf(state.board[idx]) === state.turn &&
        legal.some(m => m.from === idx)) {
      state.selected = idx;
    } else {
      state.selected = null;
    }
    render();
    return;
  }

  const m = candidates[0];
  const isPromo = m.piece[1] === 'P' && (row(m.to) === 0 || row(m.to) === 7);
  state.selected = null;

  if (isPromo) {
    showPromotionModal(m, state.turn, promo => doPlayerMove({ ...m, promotion: promo }));
  } else {
    doPlayerMove(m);
  }
}

function doPlayerMove(move) {
  if (!executeMove(move)) return;
  render();
  const go = checkGameOver();
  if (go.over) { handleGameOver(go); return; }
  setTimeout(() => doAITurn('b'), 200);
}

// ─────────────────────────────────────────────────────────────────────────────
// AI turn
// ─────────────────────────────────────────────────────────────────────────────
async function doAITurn(color) {
  if (state.gameOver) return;
  if (!stockfish) {
    document.getElementById('aiLog').textContent = 'Stockfish not ready yet — please wait.';
    return;
  }

  document.getElementById('thinkingIndicator').classList.add('show');
  document.getElementById('aiLog').textContent = 'Stockfish calculating (depth 20)...';
  render();

  const fen = toFEN(state);

  try {
    const mvStr = await getStockfishMove(fen);
    document.getElementById('thinkingIndicator').classList.remove('show');

    if (!mvStr) { render(); return; }

    const mv = parseMoveStr(mvStr);
    if (!mv) { render(); return; }

    const piece = state.board[mv.from];
    if (piece && piece[1] === 'P' && (row(mv.to) === 0 || row(mv.to) === 7) && !mv.promotion)
      mv.promotion = 'Q';

    executeMove(mv);
    render();

    const go = checkGameOver();
    if (go.over) { handleGameOver(go); return; }

    // Ask Claude to explain the move — non-blocking, purely cosmetic
    explainMove(mvStr, color, fen);

  } catch (err) {
    document.getElementById('thinkingIndicator').classList.remove('show');
    document.getElementById('aiLog').textContent = 'Engine error: ' + err.message;
    // Fallback: random legal move
    const legal = legalMoves(state, color);
    if (legal.length) {
      const m = legal[Math.floor(Math.random() * legal.length)];
      if (m.piece[1] === 'P' && (row(m.to) === 0 || row(m.to) === 7)) m.promotion = 'Q';
      executeMove(m);
      render();
      const go = checkGameOver();
      if (go.over) handleGameOver(go);
    }
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// AI vs AI
// ─────────────────────────────────────────────────────────────────────────────
async function runAIvsAI() {
  state.aiVsAiRunning = true;
  while (state.aiVsAiRunning && !state.gameOver) {
    await doAITurn(state.turn);
    const go = checkGameOver();
    if (go.over) { handleGameOver(go); break; }
    await new Promise(r => setTimeout(r, 500));
  }
  state.aiVsAiRunning = false;
  document.getElementById('btnStartAI').textContent = 'Start AI vs AI';
}

// ─────────────────────────────────────────────────────────────────────────────
// Game over
// ─────────────────────────────────────────────────────────────────────────────
function handleGameOver(go) {
  state.gameOver = true;
  state.aiVsAiRunning = false;
  render();

  const messages = {
    checkmate:  [(go.winner === 'w' ? 'White' : 'Black') + ' wins!', 'Checkmate'],
    stalemate:  ['Draw', 'Stalemate'],
    '50-move':  ['Draw', '50-move rule'],
    repetition: ['Draw', 'Threefold repetition'],
  };
  const [title, msg] = messages[go.reason] || ['Game Over', ''];
  document.getElementById('gameoverTitle').textContent = title;
  document.getElementById('gameoverMsg').textContent   = msg;
  document.getElementById('gameoverOverlay').classList.add('show');
}

// ─────────────────────────────────────────────────────────────────────────────
// UI controls
// ─────────────────────────────────────────────────────────────────────────────
function newGame() {
  state.aiVsAiRunning = false;
  initState();
  document.getElementById('gameoverOverlay').classList.remove('show');
  document.getElementById('thinkingIndicator').classList.remove('show');
  document.getElementById('aiLog').textContent = 'Stockfish ready — skill 20, depth 20';
  render();
}

document.getElementById('btnNew').addEventListener('click', newGame);

document.getElementById('btnGameoverNew').addEventListener('click', () => {
  document.getElementById('gameoverOverlay').classList.remove('show');
  newGame();
});

document.getElementById('btnUndo').addEventListener('click', () => {
  if (state.aiVsAiMode || state.aiVsAiRunning) return;
  undoMove(); // AI ply
  undoMove(); // player ply
  state.selected = null;
  render();
});

document.getElementById('modeToggle').addEventListener('click', () => {
  state.aiVsAiRunning = false;
  state.aiVsAiMode = !state.aiVsAiMode;
  document.getElementById('modeToggle').classList.toggle('on', state.aiVsAiMode);
  document.getElementById('aiVsAiControls').style.display = state.aiVsAiMode ? 'block' : 'none';
  document.getElementById('btnUndo').disabled = state.aiVsAiMode;
  newGame();
});

document.getElementById('btnStartAI').addEventListener('click', () => {
  if (state.aiVsAiRunning) {
    state.aiVsAiRunning = false;
    document.getElementById('btnStartAI').textContent = 'Start AI vs AI';
  } else {
    document.getElementById('btnStartAI').textContent = 'Stop';
    runAIvsAI();
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// Boot
// ─────────────────────────────────────────────────────────────────────────────
initState();
renderLabels();
render();
initStockfish();
