from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView

from apps.users.models import CustomUser
from apps.clients.serializers import CustomUserSerializer


class FixedPagination(PageNumberPagination):
    page_size = 20  # عدد ثابت لكل صفحة


class ClientListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if not (request.user.is_superuser or request.user.is_employee):
            return Response({"detail": "You do not have permission to perform this action."}, status=403)

        ordering = request.query_params.get('ordering', 'asc').lower()
        order_field = 'date_joined' if ordering == 'desc' else '-date_joined'

        clients = CustomUser.objects.filter(
            is_superuser=False,
            total_booking__gte=1, ## لعرض الكلاينت الي عندهم حجز واحد على الاٌقل
        ).order_by(order_field)

        paginator = FixedPagination()
        paginated_clients = paginator.paginate_queryset(clients, request)
        serializer = CustomUserSerializer(paginated_clients, many=True)
        return paginator.get_paginated_response(serializer.data)
