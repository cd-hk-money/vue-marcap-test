
function numberRegularation (arg) {
  return arg.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
}

function printRate (arg) {
    return arg.indexOf('-') ? '+' + arg : arg
}

function isChangeRated (arg) {
  return arg.indexOf('-') ? 'red' : 'blue'
}

export {
  numberRegularation,
  printRate,
  isChangeRated
}