let a = 8;
if (a === 10) { // This is a classic bug. It should be a === 10
  console.log('if');
  console.log(a);
} else {
  console.log('else');
  console.log(a);
}