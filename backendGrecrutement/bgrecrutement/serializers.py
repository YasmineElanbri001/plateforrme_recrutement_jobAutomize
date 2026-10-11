from rest_framework import serializers
from .models import Candidat, Recruteur, Offre, Entretien, Postulation, Notification, CompteUtilisateur, Utilisateur

class CandidatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Candidat
        fields='__all__'
        # fields = ["id", "nom", "prenom", "telephone", "adresse", "cin"]

class RecruteurSerializer(serializers.ModelSerializer):
    class Meta:
        model =Recruteur
        fields='__all__'        


class OffreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Offre
        fields='__all__'           


class EntretienSerializer(serializers.ModelSerializer):
    class Meta:
        model = Entretien
        fields='__all__'         


class PostulationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Postulation
        fields='__all__'            

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields='__all__'              

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompteUtilisateur
        fields='__all__'         


class UtilisateurSerializer(serializers.ModelSerializer):
    class Meta:
        model = Utilisateur
        fields = '__all__'