const sum = function (number) {
  if(!this.sum) {
    this.sum = 0;
  }
  if (number) {
    this.sum += number;
    return sum;
  } else {
    const result = this.sum;
    this.sum = 0;
    return result;
  }
}
