// RSA ALGORITHM

const findGCD = (a, b) => {
  let tempA = a;
  let tempB = b;

  let r = 0;

  if (a === 0) return a;
  if (b === 0) return b;

  while (tempA !== 0 && tempB !== 0) {
    r = tempA % tempB;

    tempA = tempB;
    tempB = r;
  }

  return tempA === 0 ? tempB : tempA;
};

const findD = (a, b) => {
  if (a < b) [a, b] = [b, a]; // a is always greater than or equal to b. If a is less than b, it swaps their values
  let s = 0,
    old_s = 1;
  let t = 1,
    old_t = 0;
  let r = b,
    old_r = a;
  while (r != 0) {
    let q = Math.floor(old_r / r);
    [r, old_r] = [old_r - q * r, r]; // computes the next remainder and updates the old remainder
    [s, old_s] = [old_s - q * s, s]; // computes the next coefficient s and updates the old coefficient
    [t, old_t] = [old_t - q * t, t]; // computes the next coefficient t and updates the old coefficient
  }
  return old_t > 0 ? old_t : old_t + a;
};

const encryptMessage = (publicKey, message) => {
  const [e, n] = publicKey;

  const encrypted = [];

  for (const letter of message) {
    const asciiCode = letter.charCodeAt(0);
    console.log("\n", "CHAR: ", letter);
    console.log("ASCII VALUE: ", asciiCode);
    const base = BigInt(asciiCode);
    const exponent = BigInt(e);
    const modulo = BigInt(n);
    const c = base ** exponent % modulo;
    console.log("ENCRYPTED VALUE: ", c, "\n");
    encrypted.push(Number(c));
  }

  console.log(encrypted);
  return encrypted;
};

const decryptMessage = (secretKey, encrypted) => {
  const [d, n] = secretKey;
  let decrypted = "";
  for (const c of encrypted) {
    const base = BigInt(c);
    const exponent = BigInt(d);
    const modulo = BigInt(n);
    let p = Number(base ** exponent % modulo);
    decrypted += String.fromCharCode(p);
  }
  return decrypted;
};

const p = 13; //prime number
const q = 23; //prime number
const e = 5; //prime exponent

const n = p * q;
const m = (p - 1) * (q - 1);

const d = findD(m, e);

const message = "Message to encrypt"; //Message to encrypt

const encrypted = encryptMessage([e, n], message);
console.log(encrypted);
const decrypted = decryptMessage([d, n], encrypted);
console.log(decrypted);
