// -------------------- BARCODE SCANNER --------------------
function onScanSuccess(decodedText) {
  console.log(`Barcode scanned: ${decodedText}`);

  if (window.opener && !window.opener.closed) {
    window.opener.updateBarcodeValue(decodedText);
    window.close();
  } else {
    alert(`Scanned barcode: ${decodedText}`);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('reader')) {
    const html5QrCode = new Html5Qrcode("reader");
    html5QrCode.start(
      { facingMode: "environment" },
      { fps: 10, qrbox: { width: 250, height: 250 } },
      (decodedText) => {
        html5QrCode.stop();
        onScanSuccess(decodedText);
      },
      (errorMessage) => { /* ignore */ }
    ).catch((err) => {
      console.error("Unable to start scanning.", err);
    });
  }
});


// ฟังก์ชันเปิด popup scanner
function openBarcodeScanner() {
  window.open("scanner.html", "scannerWindow", "width=400,height=500");
}

// ฟังก์ชันรับค่าจาก scanner.html
function updateBarcodeValue(value) {
  const barcodeDiv = document.getElementById("barcodeDisplay");
  barcodeDiv.innerHTML = `<strong>${value}</strong>`;
}

// ฟังก์ชันเปิด popup scanner
function openBarcodeScanner() {
  window.open("scanner.html", "scannerWindow", "width=400,height=500");
}

// ฟังก์ชันรับค่าจาก scanner.html
function updateBarcodeValue(value) {
  // ถ้ามี input field สำหรับ barcode ให้เติมค่า
  let barcodeInput = document.getElementById("barcodeInput");
  if (barcodeInput) {
    barcodeInput.value = value;
  }

  // ถ้าอยากแสดงที่ div เดิมด้วยก็ใส่เพิ่ม
  const barcodeDiv = document.getElementById("barcodeDisplay");
  barcodeDiv.innerHTML = `<strong>${value}</strong>`;
}

