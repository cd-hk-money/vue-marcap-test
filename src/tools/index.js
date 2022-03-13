
function numberRegularation (arg) {
  return arg.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
}

function printRate (arg) {
  if(!arg.indexOf('-')) {
    return '+' + arg
  }
}

export {
  numberRegularation,
  printRate
}