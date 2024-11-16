from django.contrib import admin
from .models import Medication, RefillRequest

@admin.register(Medication)
class MedicationAdmin(admin.ModelAdmin):
    list_display = ('name', 'description', 'price')
    search_fields = ('name', 'description')

@admin.register(RefillRequest)
class RefillRequestAdmin(admin.ModelAdmin):
    list_display = ('user', 'medication', 'quantity', 'date_requested')
    list_filter = ('date_requested', 'medication')
    search_fields = ('user__username', 'medication__name')
