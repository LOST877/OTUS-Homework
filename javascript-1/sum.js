const sum = function (number) {
  if(!this.sum) {
    this.sum = 0;
  }
  if (number) {
    this.sum += number;
  }
  return this.sum;
}