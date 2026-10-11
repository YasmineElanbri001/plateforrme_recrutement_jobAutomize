from django.urls import path
from .import views
from rest_framework_simplejwt.views import(TokenObtainPairView, TokenRefreshView)

urlpatterns = [
    path('', views.home, name="home"),
    path('list_candidat/', views.candidaList, name="list_candidat"),
    path('details_candidat/<str:pk>/', views.detailsCandidat, name="details_candidat"),
    path('create-candidat/', views.createCandidat, name="create-candidat"),
    path('update-candidat/<str:pk>/', views.updateCandidat, name="update-candidat"),
    path('delete-candidat/<str:pk>/', views.deleteCandidat, name="delete-candidat"),


    path('list_recruteur/', views.recruteurList, name="list_recruteur"),
    path('details-recruteur/<str:pk>/', views.detailRecruteur, name="details_recruteur"),
    path('create-recruteur/', views.createRecruteur, name="create-recruteur"),
    path('update-recruteur/<str:pk>/', views.updateRecruteur, name="update-recruteur"),
    path('delete-recruteur/<str:pk>/', views.deleteRecruteur, name="delete-recruteur"),


    path('list_offre/', views.offreList, name="list_offre"),
    path('list_offre/', views.offreList, name="list_offre"),
    path('details_offre/<str:pk>/', views.detailsOffre, name="details_offret"),
    path('publier_offre/', views.publierOffre, name="publier_offre"),
    path('update_offre/<str:pk>/', views.updateOffre, name="update_offre"),
    path('delete_offre/<str:pk>/', views.deleteOffre, name="delete_offre"),


    path('list_entretien/', views.entretienList, name="list_entretien"),
    path('add_entretien/', views.add_entretien, name="add_entretien"),
    path('planifier_entretien/', views.planifier_entretien, name="planifier_entretien"),
    path('annuler_entretien/<str:pk>/', views.annulerEntretien, name="annuler_entretien"),    


    path('list_postulation/', views.postulationList, name="list_postulation"),
    path('postuler/', views.postuler, name="postuler"),
    path('accepter_candidature/', views.accepterCandidature, name="accepter_candidature"),
    path('refuser_candidature/', views.refuserCandidature, name="refuser_candidature"),

    
    path('list_notification/', views.notificationsList, name="list_notification"),
    # path('delete_notifications/', views.deleteNotification, name="delete_notifications"),    

#   Authentification Utilisateur==============================================

    path('register/', views.register, name="register"),    
    path('login/', views.login, name="login"),    
    path('token/', TokenObtainPairView.as_view(), name="api/token"),
    path('token/refrech', TokenRefreshView.as_view(), name="api/token/refrech")
]
