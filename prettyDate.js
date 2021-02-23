const prettyDate = (date = new Date()) => {
  let y = date.getYear();
  let m = date.getMonth() + 1;
  let d = date.getDate();

  let h = date.getHours();
  let min = date.getMinutes();
  let s = date.getSeconds();
	
  return `${d}.${m}.${y} - ${h}:${min}:${s}`
}
