from rest_framework import generics, permissions, status
from .models import Medication, RefillRequest
from .serializers import MedicationSerializer, RefillRequestSerializer
from rest_framework.response import Response
from django.db.models import Count
from rest_framework.pagination import PageNumberPagination

class CustomPagination(PageNumberPagination):
    page_size = 5
    page_size_query_param = 'page_size'
    max_page_size = 100

class MedicationListView(generics.ListAPIView):
    queryset = Medication.objects.all()
    serializer_class = MedicationSerializer
    permission_classes = [permissions.IsAuthenticated]
    pagination_class = CustomPagination
    

class RefillRequestCreateView(generics.CreateAPIView):
    serializer_class = RefillRequestSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class RefillStatisticsView(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        stats = RefillRequest.objects.values('medication__name').annotate(total=Count('id'))
        return Response(stats)




class CreateMedicineView(generics.CreateAPIView):
    queryset = Medication.objects.all()
    serializer_class = MedicationSerializer

    def create(self, request, *args, **kwargs):
        """
        Override the default `create` method to customize the response.
        You can add any custom behavior here if necessary, such as adding
        extra fields to the response.
        """
        # Call the parent's create method to handle saving the data
        response = super().create(request, *args, **kwargs)
        return Response(response.data, status=status.HTTP_201_CREATED)