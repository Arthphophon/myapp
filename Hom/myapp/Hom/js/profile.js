// Avatar upload
const avatar = document.getElementById('avatar');
const avatarInput = document.getElementById('avatarInput');

avatar.addEventListener('click', () => {
  avatarInput.click();
});

avatarInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    avatar.style.backgroundImage = `url(${reader.result})`;
  };
  reader.readAsDataURL(file);
});
