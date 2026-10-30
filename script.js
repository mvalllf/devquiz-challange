// language: JavaScript, file: script.js
document.addEventListener('DOMContentLoaded', () => {
  const VALID_CODE = 'PRESEN2026';
  
  const form = document.getElementById('attendance-form');
  const nimInput = document.getElementById('student-nim');
  const nameInput = document.getElementById('student-name');
  const codeInput = document.getElementById('attendance-code');
  const statusSelect = document.getElementById('student-status');
  const tbody = document.getElementById('attendance-tbody');
  const messageBox = document.getElementById('message-box');
  const clearBtn = document.getElementById('clear-data-btn');

  let attendanceData = JSON.parse(localStorage.getItem('student_attendance')) || [];

  function saveAndRender() {
    localStorage.setItem('student_attendance', JSON.stringify(attendanceData));
    renderTable();
  }

  function showMessage(text, isSuccess) {
    messageBox.textContent = text;
    messageBox.className = `message ${isSuccess ? 'success' : 'error'}`;
    setTimeout(() => {
      messageBox.className = 'message hidden';
    }, 3000);
  }

  function renderTable() {
    if (attendanceData.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="5" style="text-align: center; color: var(--text-muted);">Belum ada data presensi.</td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = attendanceData.map((item, index) => {
      let badgeClass = 'badge-hadir';
      if (item.status === 'Izin') badgeClass = 'badge-izin';
      if (item.status === 'Sakit') badgeClass = 'badge-sakit';

      return `
        <tr>
          <td>${item.timestamp}</td>
          <td>${escapeHTML(item.nim)}</td>
          <td>${escapeHTML(item.name)}</td>
          <td><span class="badge ${badgeClass}">${item.status}</span></td>
          <td>
            <button class="btn btn-danger" onclick="deleteRecord(${index})">Hapus</button>
          </td>
        </tr>
      `;
    }).join('');
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nim = nimInput.value.trim();
    const name = nameInput.value.trim() || 'Muhammad Rifqi Firmansyah';
    const inputCode = codeInput.value.trim();
    const status = statusSelect.value;

    if (inputCode !== VALID_CODE) {
      showMessage('Kode absensi salah! Akses ditolak.', false);
      return;
    }

    const now = new Date();
    const timestamp = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });

    const record = { nim, name, status, timestamp };
    attendanceData.unshift(record);

    saveAndRender();

    nimInput.value = '';
    nameInput.value = '';
    codeInput.value = '';
    statusSelect.value = 'Hadir';

    showMessage('Presensi berhasil dicatat!', true);
  });

  window.deleteRecord = function(index) {
    attendanceData.splice(index, 1);
    saveAndRender();
  };

  clearBtn.addEventListener('click', () => {
    if (attendanceData.length === 0) return;
    if (confirm('Apakah Anda yakin ingin menghapus seluruh data absensi?')) {
      attendanceData = [];
      saveAndRender();
    }
  });

  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, tag => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
    }[tag] || tag));
  }

  renderTable();
});