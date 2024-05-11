const arr = ['JavaScript', 'Python', 'Ruby', 'Java', 'C++', 'C#'];

// for (let i = 0; i < arr.length; i++) {
//   console.log(`${i + 1}. ${arr[i]}`);
// }
console.log('---');
arr.forEach((item, index) => {
  console.log(`${index + 1}. ${item}`);
});