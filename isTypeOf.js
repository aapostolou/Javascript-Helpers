const isTypeOf = (variable) =>
  Object.prototype.toString.call(variable).slice(8, -1).toLowerCase();
