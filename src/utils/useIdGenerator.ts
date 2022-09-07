function dec2hex (dec:number) {
  return dec.toString(16).padStart(2, "0")
}

export const useIdGenerator = (len:number=20): string => {
  let arr = new Uint8Array((len) / 2)
  window.crypto.getRandomValues(arr)
  return Array.from(arr, dec2hex).join('')
}
