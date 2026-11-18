document.addEventListener('DOMContentLoaded', () => {
  const toast = (mensagem, tipo = 'info') => {
    let area = document.getElementById('area-notificacoes');
    if (!area) { area = document.createElement('div'); area.id = 'area-notificacoes'; area.className = 'area-notificacoes'; document.body.appendChild(area); }
    const item = document.createElement('div'); item.className = `notificacao notificacao-${tipo}`; item.setAttribute('role', 'status'); item.textContent = mensagem; area.appendChild(item);
    setTimeout(() => item.remove(), 4500);
  };
  const cadastro = document.getElementById('form-cadastro');
  if (cadastro) cadastro.addEventListener('submit', (e) => {
    const nome = cadastro.querySelector('#nome'); const email = cadastro.querySelector('#email');
    const senha = cadastro.querySelector('#senha'); const confirmar = cadastro.querySelector('#confirmar_senha');
    if (nome.value.trim().length < 3) { e.preventDefault(); nome.focus(); toast('Informe seu nome completo (mínimo de 3 caracteres).', 'erro'); return; }
    if (!email.validity.valid) { e.preventDefault(); email.focus(); toast('Digite um endereço de e-mail válido.', 'erro'); return; }
    if (senha.value.length < 8 || !/[A-Za-z]/.test(senha.value) || !/[0-9]/.test(senha.value)) { e.preventDefault(); senha.focus(); toast('A senha precisa ter 8 caracteres, uma letra e um número.', 'erro'); return; }
    if (senha.value !== confirmar.value) { e.preventDefault(); confirmar.focus(); toast('As senhas não coincidem.', 'erro'); }
  });
  const login = document.getElementById('form-login');
  if (login) login.addEventListener('submit', (e) => {
    const email = login.querySelector('#email'); const senha = login.querySelector('#senha');
    if (!email.validity.valid || !email.value.trim()) { e.preventDefault(); email.focus(); toast('Informe um e-mail válido.', 'erro'); }
    else if (!senha.value) { e.preventDefault(); senha.focus(); toast('Informe sua senha.', 'erro'); }
  });
  document.querySelectorAll('.mensagem-erro').forEach(el => toast(el.textContent.trim(), 'erro'));
});
