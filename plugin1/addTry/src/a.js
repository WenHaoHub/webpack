let a = 1;
// console.log(">>>a", b);
let post = new Promise((resolve, reject) => {
  setTimeout(() => {
    // resolve("post detail");
    reject("post detail");
  }, 3000);
});
export {post}

