document.addEventListener("DOMContentLoaded", () => {
  const enableNotify = document.getElementById("enableNotify");
  const notifyBox = document.getElementById("notifyBox");
  const saveBtn = document.getElementById("saveBtn");
  const foodNameInput = document.getElementById("foodName");
  const foodTagInput = document.getElementById("foodTag");
  const foodAmountInput = document.getElementById("foodAmount");
  const produceDateInput = document.getElementById("produceDate");
  const expireDateInput = document.getElementById("expireDate");
  const notifyDaysInput = document.getElementById("notifyDays");
  const descriptionInput = document.getElementById("description");
  const foodImageInput = document.getElementById("foodImage");
  const previewImage = document.getElementById("previewImage");
  const imagePlaceholder = document.getElementById("imagePlaceholder");

  enableNotify.addEventListener("change", () => {
    notifyBox.style.display = enableNotify.checked ? "block" : "none";
  });

  foodImageInput.addEventListener("change", () => {
    const file = foodImageInput.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = e => {
        previewImage.src = e.target.result;
        previewImage.style.display = "block";
        imagePlaceholder.style.display = "none";
      };
      reader.readAsDataURL(file);
    } else {
      previewImage.src = "";
      previewImage.style.display = "none";
      imagePlaceholder.style.display = "flex";
    }
  });

  saveBtn.addEventListener("click", () => {
    const file = foodImageInput.files[0];
    const saveData = (imageData) => {
      const foodData = {
        name: foodNameInput.value,
        tag: foodTagInput.value,
        amount: foodAmountInput.value,
        produceDate: produceDateInput.value,
        expireDate: expireDateInput.value,
        notify: enableNotify.checked,
        notifyDays: enableNotify.checked ? notifyDaysInput.value : null,
        description: descriptionInput.value,
        image: imageData || null
      };
      if (!foodData.name || !foodData.produceDate) {
        alert("กรุณากรอกชื่ออาหารและวันที่ผลิต");
        return;
      }
      localStorage.setItem("foodData", JSON.stringify(foodData));
      alert("บันทึกเรียบร้อย!");
      foodNameInput.value = "";
      foodTagInput.value = "";
      foodAmountInput.value = "1";
      produceDateInput.value = "";
      expireDateInput.value = "";
      enableNotify.checked = false;
      notifyDaysInput.value = "3";
      notifyBox.style.display = "none";
      descriptionInput.value = "";
      foodImageInput.value = "";
      previewImage.src = "";
      previewImage.style.display = "none";
      imagePlaceholder.style.display = "flex";
    };

    if (file) {
      const reader = new FileReader();
      reader.onload = e => saveData(e.target.result);
      reader.readAsDataURL(file);
    } else {
      saveData(null);
    }
  });
});
