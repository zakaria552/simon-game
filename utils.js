const waitforme = (milisec) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("");
      }, milisec);
    });
}

export default waitforme;