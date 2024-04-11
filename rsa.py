# RSA ALGORITHM

def find_gcd(a, b):
    temp_a = a
    temp_b = b

    r = 0

    if a == 0:
        return a
    if b == 0:
        return b

    while temp_a != 0 and temp_b != 0:
        r = temp_a % temp_b

        temp_a = temp_b
        temp_b = r

    return temp_b if temp_a == 0 else temp_a


def find_d(a, b):
    if a < b:
        a, b = b, a  # a is always greater than or equal to b. If a is less than b, it swaps their values
    s = 0
    old_s = 1
    t = 1
    old_t = 0
    r = b
    old_r = a
    while r != 0:
        q = old_r // r
        r, old_r = old_r - q * r, r  # computes the next remainder and updates the old remainder
        s, old_s = old_s - q * s, s  # computes the next coefficient s and updates the old coefficient
        t, old_t = old_t - q * t, t  # computes the next coefficient t and updates the old coefficient
    return old_t if old_t > 0 else old_t + a


def encrypt_message(public_key, message):
    e, n = public_key
    encrypted = []

    for letter in message:
        ascii_code = ord(letter)
        print("\nCHAR: ", letter)
        print("ASCII VALUE: ", ascii_code)
        base = ascii_code
        exponent = e
        modulo = n
        c = pow(base, exponent, modulo)
        print("ENCRYPTED VALUE: ", c, "\n")
        encrypted.append(c)

    print(encrypted)
    return encrypted


def decrypt_message(secret_key, encrypted):
    d, n = secret_key
    decrypted = ""
    for c in encrypted:
        base = c
        exponent = d
        modulo = n
        p = pow(base, exponent, modulo)
        decrypted += chr(p)
    return decrypted


p = 13458281 #prime number
q = 15485863 #prime number
e = 65537 #prime exponent

n = p * q
m = (p - 1) * (q - 1)

d = find_d(m, e)
print(d)

message = "Message to encrypt" # Message to encrypt

encrypted = encrypt_message([e, n], message)
print(encrypted)
decrypted = decrypt_message([d, n], encrypted)
print(decrypted)
