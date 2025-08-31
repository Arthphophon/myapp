document.addEventListener("DOMContentLoaded", () => {
  // --- Element Selections ---
  const enableNotify = document.getElementById("enableNotify");
  const notifyBox = document.getElementById("notifyBox");
  const saveBtn = document.getElementById("saveBtn");
  const foodNameInput = document.getElementById("foodName");
  const foodTagInput = document.getElementById("foodTag");
  const foodAmountInput = document.getElementById("foodAmount");
  const produceDateInput = document.getElementById("produceDate");
  const expireDateInput = document.getElementById("expireDate");
  const shelfLifeInput = document.getElementById("shelfLife");
  const notifyDaysInput = document.getElementById("notifyDays");
  const descriptionInput = document.getElementById("description");

  // --- Functions ---
  const calculateExpireDate = () => {
    const produceDate = produceDateInput.value;
    const shelfLife = parseInt(shelfLifeInput.value, 10);
    if (produceDate && shelfLife > 0) {
      const date = new Date(produceDate);
      date.setDate(date.getDate() + shelfLife);
      expireDateInput.value = date.toISOString().split("T")[0];
    }
  };
  
  const resetForm = () => {
    foodNameInput.value = "";
    foodTagInput.value = "";
    foodAmountInput.value = "1";
    produceDateInput.value = "";
    expireDateInput.value = "";
    shelfLifeInput.value = "7";
    enableNotify.checked = false;
    notifyDaysInput.value = "3";
    descriptionInput.value = "";
    notifyBox.style.display = "none";
  };

  // --- Event Listeners ---
  enableNotify.addEventListener("change", () => {
    notifyBox.style.display = enableNotify.checked ? "block" : "none";
  });

  produceDateInput.addEventListener("change", calculateExpireDate);
  shelfLifeInput.addEventListener("input", calculateExpireDate);

  saveBtn.addEventListener("click", () => {
    const foodData = {
      name: foodNameInput.value,
      tag: foodTagInput.value,
      amount: foodAmountInput.value,
      produceDate: produceDateInput.value,
      expireDate: expireDateInput.value,
      shelfLife: shelfLifeInput.value,
      notify: enableNotify.checked,
      notifyDays: enableNotify.checked ? notifyDaysInput.value : null,
      description: descriptionInput.value,
    };

    if (!foodData.name) {
      alert("กรุณากรอกชื่ออาหาร");
      return;
    }
    if (!foodData.produceDate) {
      alert("กรุณาเลือกวันที่ผลิต");
      return;
    }

    console.log("Food Data:", foodData);
    localStorage.setItem("foodData", JSON.stringify(foodData));
    alert("บันทึกเรียบร้อย!");
    resetForm();
  });
});


