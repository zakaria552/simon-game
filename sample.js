function waitforme(milisec) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("");
    }, milisec);
  });
}
async function printy() {
  for (let i = 0; i < 10; ++i) {
    await waitforme(1000);
    console.log(i);
  }
  console.log("Loop execution finished!)");
}
printy();
