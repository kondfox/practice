'use strict'

const STATES = {
  A: Astate,
  AA: AAstate,
  AB: ABstate,
  AAB: AABstate,
  ABA: ABAstate,
  A_B_A: A_B_Astate
}

function substrCount(n, s) {
  if (!n) return 0
  let initialSeq = { chars: s[0], state: STATES.A, diffIndex: 0, specials: 0 }
  const specials = [...s.slice(1)]
    .reduce((seq, char) => seq.state(seq, char), initialSeq)
    .specials;
  return specials + n;
}

function Astate(seq, char) {
  if (isSameAsPrevious(char, seq)) {
    const chars = seq.chars + char
    return { ...seq, chars, state: STATES.AA, specials: seq.specials + 1 }
  } else {
    const chars = seq.chars + char
    return { ...seq, chars, state: STATES.AB, diffIndex: 1 }
  }
}

function AAstate(seq, char) {
  const chars = seq.chars + char
  if (isSameAsPrevious(char, seq)) {
    const specials = seq.specials + seq.chars.length - seq.diffIndex
    return { ...seq, chars, specials }
  } else {
    return { ...seq, chars, state: STATES.AAB, diffIndex: seq.chars.length }
  }
}

function ABstate(seq, char) {
  if (isSameAsPrevious(char, seq)) {
    const chars = char.repeat(2)
    return { ...seq, chars, state: STATES.AA, diffIndex: 0, specials: seq.specials + 1 }
  } else if (isSameAsFirst(char, seq)) {
    const chars = seq.chars + char
    return { ...seq, chars, state: STATES.ABA, specials: seq.specials + 1 }
  } else {
    const chars = seq.chars.slice(-1) + char
    return { ...seq, chars }
  }
}

function AABstate(seq, char) {
  if (isSameAsPrevious(char, seq)) {
    const chars = char.repeat(2)
    return { ...seq, chars, state: STATES.AA, diffIndex: 0, specials: seq.specials + 1 }
  } else if (isSameAsFirst(char, seq)) {
    const chars = seq.chars + char
    return { ...seq, chars, state: STATES.A_B_A, specials: seq.specials + 1 }
  } else {
    const chars = seq.chars.slice(-1) + char
    return { ...seq, chars, state: STATES.AB, diffIndex: 1 }
  }
}

function ABAstate(seq, char) {
  if (isSameAsPrevious(char, seq)) {
    const chars = char.repeat(2)
    return { ...seq, chars, state: STATES.AA, diffIndex: 0, specials: seq.specials + 1 }
  } else if (isSameAsMiddle(char, seq)) {
    const chars = seq.chars.slice(-2) + char
    return { ...seq, chars, specials: seq.specials + 1 }
  } else {
    const chars = seq.chars.slice(-1) + char
    return { ...seq, chars, state: STATES.AB }
  }
}

function A_B_Astate(seq, char) {
  if (isSameAsPrevious(char, seq)) {
    const specials = seq.specials + seq.chars.length - seq.diffIndex
    if (isMaxLengthDiffChars(seq.chars + char, seq.diffIndex)) {
      const chars = seq.chars.slice(seq.diffIndex + 1) + char
      return { ...seq, chars, state: STATES.AA, diffIndex: 0, specials }
    } else {
      const chars = seq.chars + char
      return { ...seq, chars, specials} 
    }
  } else if (isOneSameCharAfterDiff(seq.chars, seq.diffIndex)) {
    if (isSameAsMiddle(char, seq)) {
      const chars = seq.chars.slice(-2) + char
      return { ...seq, chars, state: STATES.ABA, diffIndex: 1, specials: seq.specials + 1 }
    } else {
      const chars = seq.chars.slice(-1) + char
      return { ...seq, chars, state: STATES.AB, diffIndex: 1 }
    }
  } else {
    const chars = seq.chars.slice(seq.diffIndex + 1) + char
    return { ...seq, chars, state: STATES.AAB, diffIndex: chars.length - 1 }
  }
}

function isSameAsPrevious(char, seq) {
  return char === seq.chars.slice(-1)
}

function isSameAsFirst(char, seq) {
  return char === seq.chars[Math.min(0, seq.diffIndex - 1)]
}

function isSameAsMiddle(char, seq) {
  return char === seq.chars[seq.diffIndex]
}

function isMaxLengthDiffChars(chars, middleIndex) {
  return middleIndex - (chars.length - 1 - middleIndex) == 0
}

function isOneSameCharAfterDiff(chars, diffIndex) {
  return chars.slice(diffIndex + 1).length == 1
}


console.log(substrCount(0, ''), 'should be 0')
console.log(substrCount(8, 'mnonopoo'), ' should be 12')
console.log(substrCount(5, 'asasd'), ' should be 7')
console.log(substrCount(7, 'abcbaba'), ' should be 10')
console.log(substrCount(4, 'aaaa'), ' should be 10')
console.log(substrCount(5, 'aabaa'), ' should be 9')