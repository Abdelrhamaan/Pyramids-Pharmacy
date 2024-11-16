from django.urls import path
from .views import MedicationListView, RefillRequestCreateView, RefillStatisticsView, CreateMedicineView

urlpatterns = [
    path('medications/', MedicationListView.as_view(), name='medication-list'),
    path('refill-request/', RefillRequestCreateView.as_view(), name='refill-request'),
    path('refill-stats/', RefillStatisticsView.as_view(), name='refill-stats'),
    path('medicines/create/', CreateMedicineView.as_view(), name='create_medicine'),

]