// File: scanner.js

/**
 * ฟังก์ชันสำหรับส่งข้อมูลกลับไปหน้าหลัก
 * เมื่อสแกนสำเร็จ เราจะเรียกใช้ฟังก์ชันนี้
 * @param {string} decodedText - ค่าบาร์โค้ดที่สแกนได้
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

// รอให้หน้าเว็บโหลดเสร็จก่อนเริ่มทำงาน
document.addEventListener('DOMContentLoaded', () => {
  const codeReader = new ZXing.BrowserMultiFormatReader();
  let isScanning = false;

  // อ้างอิงถึง element ต่างๆ ใน HTML
  const videoElement = document.getElementById('video');
  const resultElement = document.getElementById('result');
  const startBtn = document.getElementById('startBtn');
  const stopBtn = document.getElementById('stopBtn');

  // ✅ ปุ่มเริ่มสแกน
  startBtn.addEventListener('click', () => {
    if (isScanning) return; // ถ้ากำลังสแกนอยู่แล้วไม่ต้องทำอะไร
    isScanning = true;
    resultElement.textContent = "👉 กำลังค้นหาอุปกรณ์กล้อง...";

    // เริ่มการถอดรหัสจากกล้อง
    codeReader.decodeFromVideoDevice(undefined, 'video', (result, err) => {
      if (result) {
        // --- จุดเชื่อมต่อที่สำคัญ ---
        // 1. หยุดการสแกนทันทีที่เจอข้อมูล
        codeReader.reset();
        isScanning = false;
        resultElement.textContent = "✅ พบข้อมูลแล้ว!";

        // 2. เรียกใช้ฟังก์ชัน onScanSuccess เพื่อส่งข้อมูลกลับไปหน้าหลัก
        onScanSuccess(result.getText());
        // -------------------------
      }
      // ถ้ามี error แต่ไม่ใช่ NotFoundException ให้แสดงใน console
      if (err && !(err instanceof ZXing.NotFoundException)) {
        console.error(err);
      }
    }).catch(err => {
      // จัดการกับ error กรณีไม่พบกล้องหรือไม่ได้รับอนุญาต
      console.error(err);
      resultElement.textContent = "❌ ไม่สามารถเข้าถึงกล้องได้";
      isScanning = false;
    });

    resultElement.textContent = "👉 พร้อมสแกนแล้ว!";
  });

  // ⏹ ปุ่มหยุดสแกน
  stopBtn.addEventListener('click', () => {
    if (!isScanning) return;
    codeReader.reset();
    isScanning = false;
    resultElement.textContent = "⏹ หยุดการสแกนแล้ว";
  });
});