export default function(x, y) {
  return (((x / y) * 100).toFixed(3)).toString().replace(/\./g, ',')
}