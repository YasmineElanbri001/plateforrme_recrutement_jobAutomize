from django.contrib import admin
from .models import Candidat, Recruteur, Offre, Entretien, Notification, Postulation, CompteUtilisateur
# Register your models here.
admin.site.register(Candidat)
admin.site.register(Recruteur)
admin.site.register(Offre)
admin.site.register(Entretien)
admin.site.register(Postulation)
admin.site.register(Notification)
admin.site.register(CompteUtilisateur)
