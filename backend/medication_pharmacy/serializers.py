from rest_framework import serializers
from .models import Medication, RefillRequest

class MedicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Medication
        fields = '__all__'

class RefillRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = RefillRequest
        fields = '__all__'
        read_only_fields = ['user', 'date_requested']
        
        
    
