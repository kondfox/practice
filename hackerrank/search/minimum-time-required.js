function minTime(machines, goal) {
  const machineFrequency = frequency(machines)
  const machineSpeeds = Object.keys(machineFrequency).sort((a, b) => a - b)
  let minDays = 1
  let maxDays = Math.ceil((goal / machines.length) * machineSpeeds[machineSpeeds.length - 1])

  while (minDays != maxDays) {
    const midDays = Math.floor((minDays + maxDays) / 2)
    const products = productsOnDay(midDays, machineSpeeds, machineFrequency)
    
    if (products >= goal) {
      maxDays = midDays
    } else {
      minDays = midDays + 1
    }
  }
  return minDays
}

function productsOnDay(day, machineSpeeds, machineFrequency) {
  return machineSpeeds.reduce((p, m) => p + Math.floor(day / m) * machineFrequency[m], 0)
}

function frequency(arr) {
  return arr.reduce((f, m) => {
    f[m] = (f[m] || 0) + 1
    return f
  }, {})
}

console.log(minTime([1, 3, 4], 10), 'should be 7');
console.log(minTime([2, 3], 5), 'should be 6');