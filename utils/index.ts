function mascaraTelefone(phone: string) {
  if (!phone) return ""
  phone = phone.replace(/\D/g,'')
  phone = phone.replace(/(\d{2})(\d)/,"($1) $2")
  phone = phone.replace(/(\d)(\d{4})$/,"$1-$2")
  return phone
}


function formatarTelefoneParaEnvio(phone: string) {
  // Remove tudo que não é número
  const numeros = phone.replace(/\D/g, '');

  // Remove o nono dígito após o DDD se for um celular (número com 11 dígitos começando com 9)
  if (numeros.length === 11 && numeros[2] === '9') {
    return numeros[0] + numeros[1] + numeros.slice(3);
  }

  return numeros;
}

export { mascaraTelefone, formatarTelefoneParaEnvio };