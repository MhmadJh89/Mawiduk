from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django.contrib.auth import get_user_model, authenticate
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny
from django.template.loader import render_to_string
from django.contrib.auth.tokens import default_token_generator
from django.contrib.sites.shortcuts import get_current_site
import random
from django.core.mail import get_connection, send_mail
from django.conf import settings
from .models import *
from django.db.models import Q
from .crypto import encrypt_password, decrypt_password
from rest_framework_simplejwt.tokens import RefreshToken

User = get_user_model()

def send_verification_code(user, request):
    import random
    # توليد رمز تحقق من 5 أرقام
    verification_code = ''.join([str(random.randint(0, 9)) for _ in range(5)])
    user.verification_code = verification_code
    user.save()
    
    # إنشاء اتصال باستخدام Console backend
    connection = get_connection(
        # backend='django.core.mail.backends.smtp.EmailBackend'
        backend='django.core.mail.backends.console.EmailBackend')
    
    subject = 'تأكيد الحساب'
    message = f'هذه رسالة من محمد عرفات ... صادرة بموجب تطبيق موعدك ... Moiduk رمز التحقق الخاص بك هو: {verification_code}'
    recipient_list = [user.email]
    send_mail(subject, message, settings.EMAIL_HOST_USER, recipient_list, fail_silently=False,connection=connection)
    # send_mail(email_subject, mes2, settings.EMAIL_HOST_USER, [user.email], fail_silently=True)


def send_verification_code_password_reset(user, request):
    # توليد رمز تحقق من 5 أرقام
    verification_code = ''.join([str(random.randint(0, 9)) for _ in range(5)])
    user.verification_code = verification_code
    user.save()

    # إنشاء اتصال باستخدام Console backend
    connection = get_connection(
        # backend='django.core.mail.backends.smtp.EmailBackend'
        backend='django.core.mail.backends.console.EmailBackend'
    )

    subject = 'تغيير كلمة المرور '
    message = f'قم بكتابة الكود في خانته المخصصة مع كلمة المرور الجديدية وتأكيدها... صادرة بموجب تطبيق موعدك... Moiduk رمز التحقق الخاص بك هو: {verification_code}'
    recipient_list = [user.email]
    send_mail(subject, message, settings.EMAIL_HOST_USER, recipient_list, fail_silently=False,connection=connection)





class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        
        first_name = request.data.get('first_name')
        last_name = request.data.get('last_name')
        phone=request.data.get('phone')
        email = request.data.get('email')
        birth_date=request.data.get('birth_date')
        username = email.split('@')[0]
        password = request.data.get('password')
        encrypted_password = encrypt_password(password)

        if User.objects.filter(email=email).exists():
            return Response({"detail": "البريد الإلكتروني موجود"}, status=409)
        
        if User.objects.filter(phone=phone).exists():
            return Response({"detail": "تم التسجيل برقم الهاتف هذا مسبقاً"}, status=409)

        TemporaryUser.objects.filter(
        Q(email=email) |
        Q(phone=phone)
        ).delete()

        user = TemporaryUser.objects.create(
            username=username,
            email=email,
            password=encrypted_password,
            phone=phone,
            first_name=first_name,
            birth_date=birth_date,
            last_name=last_name,
           
            )
        
        verification_code = ''.join([str(random.randint(0,9)) for _ in range(5)])
        user.verification_code = verification_code
        user.save()
        
        send_verification_code(user, request)
        
        return Response({"detail": "تم إرسال رمز التحقق","username": user.username,}, status=201)




class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        username = User.objects.get(email=email).username
        user = authenticate(username=username, password=password)

        if not user:
            return Response({"detail": "بيانات الدخول غير صحيحة"}, status=400)

        if not user.is_active:
            return Response({"detail": "الحساب غير مفعّل"}, status=403)

        # استخدام JWT بدلاً من Token
        refresh = RefreshToken.for_user(user)
        return Response({
            "token": str(refresh.access_token),
            "username": user.username,
            "first_name": user.first_name,
            "last_name": user.last_name,
           
        }, status=200)


class VerifyView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get('username')
        code = request.data.get('code')
        
        try:
            user = TemporaryUser.objects.get(username=username)
            if user.verification_code == code:
                decrypted_password = decrypt_password(user.password)
               
                real_user=User.objects.create_user(
                    username=username,
                    email=user.email,
                    phone=user.phone,
                    first_name=user.first_name,
                    last_name=user.last_name,
                    is_active=True,
                    verification_code = None,
                    birth_date=user.birth_date,
                    password = decrypted_password)
                
                user.delete()
                return Response({"detail": "تم تفعيل الحساب بنجاح"},status=200)
            return Response({"detail": "رمز التحقق غير صحيح"}, status=400)
        except User.DoesNotExist:
            return Response({"detail": "المستخدم غير موجود"}, status=404)
        

# class AdminDashboardView(APIView):
#     permission_classes = [IsAuthenticated]

#     def get(self, request):
#         if not request.user.is_superuser:
#             return Response({"detail": "غير مصرح بالوصول"}, status=403)
        
#         return Response({"message": "مرحبا بكم في لوحة الإدارة"})

class PasswordResetRequestView(APIView):
    permission_classes = [AllowAny]  # السماح لأي مستخدم بالوصول

    def post(self, request):
        email = request.data.get('email')
        try:
            user = User.objects.get(email=email)
            user.is_active = False
            send_verification_code_password_reset(user, request)  # غير مفعل حتى يتم التحقق من البريد الإلكتروني
            user.save()
            return Response({'username': user.username}, status=201)
        except User.DoesNotExist:
            return Response({"detail": "البريد الإلكتروني غير مسجل لدينا"}, status=400)

class PasswordChangeRequestView(APIView):
    permission_classes = [AllowAny]  

    def post(self, request):
        username = request.data.get('username')
        verification_code = request.data.get('code')
        new_password = request.data.get('password')
        
        try:
            user = User.objects.get(username=username)
            if user.verification_code == verification_code:
                user.is_active = True
                user.verification_code = ''
                user.set_password(new_password)
                user.save()
                return Response({"detail": "تم تغيير كلمة المرور بنجاح"}, status=200)
            else:
                return Response({"detail": "كود التحقق غير صحيح"}, status=400)
        except User.DoesNotExist:
            return Response({"detail": "المستخدم غير موجود"}, status=409)
        

class ProfileView(APIView):
    permission_classes = [AllowAny]

    # def get(self, request):
    #     user = request.user
    #     return Response({
    #         "detail": "تم جلب بيانات الملف الشخصي بنجاح",
    #         "username":   user.username,
    #         "email":      user.email,
    #         "first_name": user.first_name,
    #         "last_name":  user.last_name,
    #         "birth_date": user.birth_date.isoformat() if user.birth_date else None,
    #         "phone":      str(user.phone)
            
    #     }, status=status.HTTP_200_OK)

    def put(self, request):
        email=request.data.get('email')
        current_password = request.data.get('password')
        birth_date=request.data.get('birth_date').strip()
        new_first = request.data.get('first_name', '').strip()
        new_last = request.data.get('last_name', '').strip()
        new_phone = request.data.get('phone', '').strip()
        user = User.objects.get(email=email)
        # التحقق من كلمة المرور
        if not user.check_password(current_password):
            return Response(
                {"detail": "كلمة المرور غير صحيحة"},  status=400 )

        if new_phone and new_phone != user.phone:
          
            conflict = User.objects.filter(
                Q(phone=new_phone)
            ).exclude(pk=user.pk).exists()

            if conflict:
                return Response(
                    {"detail": "رقم الهاتف مستخدم في حساب آخر"}, status=409
                )
            # تحديث رقم الهاتف
            user.phone = new_phone

        # تحديث الاسم الأول والاسم الأخير دائماً
        if new_first:
            user.first_name = new_first
        if new_last:
            user.last_name = new_last
        if birth_date:
            user.birth_date=birth_date

        # لا نسمح بتغيير البريد أو اسم المستخدم:
        # user.email و user.username يظلان كما هما

        user.save()

        return Response(
            {
                "detail": "تم تحديث الملف الشخصي بنجاح",
                "data": {
                    "username": user.username,
                    "email": user.email,
                    "first_name": user.first_name,
                    "last_name": user.last_name,
                    "birth_date": str(user.birth_date),
                    "phone": str(user.phone)
                }
            },
            status=200
        )

# class ShowUserRequestView(APIView):
#     permission_classes = [AllowAny]  

#     def post(self, request):
#         token = request.data.get('token')
       
        
#         try:
#             user = User.objects.get(username=username)
#             if user.verification_code == verification_code:
#                 user.is_active = True
#                 user.verification_code = ''
#                 user.set_password(new_password)
#                 user.save()
#                 return Response({"detail": "تم تغيير كلمة المرور بنجاح"}, status=status.HTTP_200_OK)
#             else:
#                 return Response({"detail": "كود التحقق غير صحيح"}, status=status.HTTP_400_BAD_REQUEST)
#         except User.DoesNotExist:
#             return Response({"detail": "المستخدم غير موجود"}, status=status.HTTP_400_BAD_REQUEST)
