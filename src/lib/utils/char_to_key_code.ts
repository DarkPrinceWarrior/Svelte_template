const charToCodeMap: { [key: string]: string } = {
  'a': 'KeyA', 'b': 'KeyB', 'c': 'KeyC', 'd': 'KeyD', 'e': 'KeyE',
  'f': 'KeyF', 'g': 'KeyG', 'h': 'KeyH', 'i': 'KeyI', 'j': 'KeyJ',
  'k': 'KeyK', 'l': 'KeyL', 'm': 'KeyM', 'n': 'KeyN', 'o': 'KeyO',
  'p': 'KeyP', 'q': 'KeyQ', 'r': 'KeyR', 's': 'KeyS', 't': 'KeyT',
  'u': 'KeyU', 'v': 'KeyV', 'w': 'KeyW', 'x': 'KeyX', 'y': 'KeyY',
  'z': 'KeyZ',
  '0': 'Digit0', '1': 'Digit1', '2': 'Digit2', '3': 'Digit3',
  '4': 'Digit4', '5': 'Digit5', '6': 'Digit6', '7': 'Digit7',
  '8': 'Digit8', '9': 'Digit9',
  '!': 'Digit1', '@': 'Digit2', '#': 'Digit3', '$': 'Digit4',
  '%': 'Digit5', '^': 'Digit6', '&': 'Digit7', '*': 'Digit8',
  '(': 'Digit9', ')': 'Digit0',
  '-': 'Minus', '_': 'Minus',
  '=': 'Equal', '+': 'Equal',
  '[': 'BracketLeft', '{': 'BracketLeft',
  ']': 'BracketRight', '}': 'BracketRight',
  '\\': 'Backslash', '|': 'Backslash',
  ';': 'Semicolon', ':': 'Semicolon',
  "'": 'Quote', '"': 'Quote',
  ',': 'Comma', '<': 'Comma',
  '.': 'Period', '>': 'Period',
  '/': 'Slash', '?': 'Slash',
  '`': 'Backquote', '~': 'Backquote',
  ' ': 'Space'
};

export function charToKeyCode(char: string) {
  return charToCodeMap[char.toLowerCase()] || null;
}
