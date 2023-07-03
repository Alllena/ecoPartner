function addMaskTel(form) {
  const phoneInput = form.querySelector(".input--tel");
  let phoneMask;

  phoneInput.addEventListener("focus", () => {
    let phone = new IMask(phoneInput, {
      mask: "+{375}(00)000-00-00",
      definitions: {
        X: {
          mask: "5",
          displayChar: "+{375}(",
          placeholderChar: "00)000-00-00",
        },
      },
      lazy: false,
      overwrite: "shift",
    });
  });

  phoneInput.addEventListener("blur", () => {
    if (typeof phoneMask !== "undefined") {
      phoneMask.updateOptions({ lazy: true });
      phoneMask.reset();
    }
  });
}

function addInputFocusStyling(form) {
  const inputs = form.querySelectorAll("input");
  inputs.forEach((input) => {
    input.addEventListener("focus", () => {
      const label = document.querySelector(`label[for="${input.id}"]`);
      if (label) {
        label.style.color = "#666666";
      }
      input.style.borderColor = "#666666";
    });
  });
}

function formValidate(form, event) {
  let inputs = form.querySelectorAll("input");
  let isFormValid = true;
  let formName = form.id;

  event.preventDefault();

  inputs.forEach((input) => {
    const label = document.querySelector(`label[for="${input.id}"]`);

    if (!input.checkValidity()) {
      input.style.borderColor = "#e32227";
      label.style.color = "#e32227";
      isFormValid = false;
    }
    if (input.type === "tel" && input.value.includes("_")) {
      input.style.borderColor = "#E32227";
      label.style.color = "#E32227";
      input.value = "";
      isFormValid = false;
    }
  });

  if (isFormValid) {
    formSend(form, isFormValid);
  } else {
  }
}

async function formSend(form, isFormValid) {
  let error = isFormValid;
  // СМОТРЕТЬ ЗДЕСЬ СБОРЩИК ДАННЫХ
  let formData = new FormData(form);
  let formName = form.id;
  let isCookie = getCookie("buhbalans");
  // for (var pair of formData.entries()) {
  //   console.log("entries", pair[0] + ", " + pair[1]);
  // }
  //if form valid and wasn't send last 5 minutes
  if (error && !isCookie) {
    const response = await sendData(formData, formName);
    // console.log(response);

    if (response.ok) {
      let result = await response.json();
      if (result.result === "error") {
        showSendResult(formName, false);
      }
      // console.log(result);
      showSendResult(formName, true);
      form.reset();
    } else {
      showSendResult(formName, false);
    }
  } else if (isCookie) {
    showSendResult(formName, false, true);
  }
}

// !-----Дописать сообщение об отправке
function showSendResult(formName, status, isCookie) {}

async function sendData(data, formName) {
  let fileName =
    formName === "calcPrice" ? "sendmail.php" : "sendmailphone.php";
  return await fetch(fileName, {
    method: "POST",
    body: data,
  });
}

export const formCheck = () => {
  const forms = document.querySelectorAll("form");
  if (!forms) {
    return;
  }
  forms.forEach((form) => {
    const submitBtn = form.querySelector(".submit-btn");
    addMaskTel(form);
    addInputFocusStyling(form);
    submitBtn.addEventListener("click", (event) => {
      formValidate(form, event);
    });
  });
};
