document.body.innerHTML += `
<a href="#" class="nav-item" onclick="goPage('foodmenu.html')">
  <span>Food</span>
</a>
`;

function goPage(page) {
    window.location.href = page;
}

// Get all the category buttons
const categoryButtons = document.querySelectorAll('.category button');

// Get all the food cards
const foodCards = document.querySelectorAll('.food-card');

// Add a click event listener to each button
categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove 'active' class from all buttons
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add 'active' class to the clicked button
        button.classList.add('active');
        
        // Get the category from the button's data attribute
        const selectedCategory = button.getAttribute('data-category');
        
        // Loop through all food cards and show/hide them based on the category
        foodCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            
            // If the card's category matches the selected one, show it. Otherwise, hide it.
            if (cardCategory === selectedCategory) {
                card.style.display = 'block'; // Or 'flex', 'grid', etc., based on your CSS
            } else {
                card.style.display = 'none';
            }
        });
    });
});


function openCamera() {
  document.getElementById("cameraInput").click();
}

function openCamera() {
  document.getElementById("cameraInput").click();
}

function previewPhoto(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      document.getElementById("photoPreview").innerHTML =
        `<img src="${e.target.result}" alt="product photo">`;
    };
    reader.readAsDataURL(file);
  }
}


let codeReader;
let isScanning = false;

const videoElement = document.getElementById('video');
const resultElement = document.getElementById('result');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');

// File: scanner.js

/**
 * นี่คือฟังก์ชันตัวอย่างที่จะทำงานเมื่อสแกนบาร์โค้ดสำเร็จ
 * คุณต้องนำไปปรับใช้กับไลบรารีสแกนบาร์โค้ดที่คุณใช้อยู่
 * @param {string} decodedText - คือค่าบาร์โค้ดที่สแกนได้
 */
function onScanSuccess(decodedText) {
  console.log(`Barcode scanned: ${decodedText}`);

  // ตรวจสอบว่ามีหน้าต่างแม่ (opener) เปิดอยู่หรือไม่
  if (window.opener && !window.opener.closed) {
    // เรียกใช้ฟังก์ชัน updateBarcodeValue ที่อยู่ใน index.js ของหน้าแม่
    window.opener.updateBarcodeValue(decodedText);
    
    // ปิดหน้าต่าง Popup ของตัวเองเมื่อทำงานเสร็จ
    window.close();
  } else {
    // กรณีที่เปิดหน้านี้ตรงๆ ไม่ได้ผ่านหน้าหลัก
    alert(`Scanned barcode: ${decodedText}`);
  }
}

// --- ตัวอย่างการเรียกใช้ไลบรารีสแกนบาร์โค้ด ---
// โค้ดส่วนนี้จะแตกต่างกันไปตามไลบรารีที่คุณเลือกใช้
// ตัวอย่างสำหรับไลบรารี Html5-qrcode
document.addEventListener('DOMContentLoaded', () => {
  // ตรวจสอบว่ามี element ที่จะใช้แสดงผลกล้องหรือไม่
  if (document.getElementById('reader')) {
    const html5QrCode = new Html5Qrcode("reader");
    html5QrCode.start(
      { facingMode: "environment" }, // ใช้กล้องหลัง
      {
        fps: 10,
        qrbox: { width: 250, height: 250 }
      },
      (decodedText, decodedResult) => {
        // เมื่อสแกนสำเร็จ ให้หยุดการทำงานของกล้อง
        html5QrCode.stop();
        // แล้วเรียกฟังก์ชัน onScanSuccess
        onScanSuccess(decodedText);
      },
      (errorMessage) => {
        // parse error, ignore it.
      })
    .catch((err) => {
      console.error("Unable to start scanning.", err);
    });
  }
});
