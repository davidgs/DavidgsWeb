function toggleTheme() {
  document.documentElement.setAttribute('data-theme', document.getElementById('themeName').classList.item(0))
  if (document.getElementById('themeName').classList.item(0) == 'fas') {
    document.getElementById('themeName').classList.replace('fas', 'far');
  } else {
    document.getElementById('themeName').classList.replace('far', 'fas');
  }
}