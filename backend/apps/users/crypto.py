from cryptography.fernet import Fernet
from django.conf import settings

def _get_cipher() -> Fernet:
    """
    يعيد كائن Fernet مبنيًّا على المفتاح الموجود في الإعدادات.
    """
    return Fernet(settings.PASSWORD_ENCRYPTION_KEY)

def encrypt_password(raw_password: str) -> str:
    """
    يستقبل كلمة مرور نصية (plain) ويعيدها مشفرة بصيغة base64 string.
    """
    cipher = _get_cipher()
    token = cipher.encrypt(raw_password.encode())
    return token.decode()

def decrypt_password(token: str) -> str:
    """
    يستقبل السلسلة المشفرة ويُرجع كلمة المرور الأصلية.
    """
    cipher = _get_cipher()
    raw = cipher.decrypt(token.encode())
    return raw.decode()
