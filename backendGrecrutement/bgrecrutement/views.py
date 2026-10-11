from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from .serializers import CandidatSerializer, RecruteurSerializer, OffreSerializer, EntretienSerializer, PostulationSerializer, NotificationSerializer, RegisterSerializer
from .models import Candidat, Recruteur, Offre, Entretien, Postulation, Notification, CompteUtilisateur
from rest_framework import status
from django.contrib.auth.hashers import check_password, make_password
from rest_framework_simplejwt.tokens import AccessToken
from datetime import timedelta

from permissions import IsAdministrateur, IsCandidat, IsRecruteur, IsAdministrateurOrRecruteur, IsAdministrateurOrCandidat, AnyRole, GererLesNotification

@api_view(["GET"])
def home(request):
    api_urls = {
        'List': '/list_candidat',
        'DETAILS': '/details_candidat/<str:pk>',
        'Create': '/create-candidat',
        'Update': '/update-candidat/<str:pk>',
        'Delete': '/delete-candidat/</str:pk>',

        'List': '/list_recruteur',
        'DETAILS': '/details_recruteur/<str:pk>',
        'Create': '/create-recruteur',
        'Update': '/update-recruteur/<str:pk>',
        'Delete': '/delete-recruteur/</str:pk>',

        'List': '/list_offre',
        'DETAILS': '/details_offre/<str:pk>',
        'Publier': '/publier_offre',
        'Update': '/update_offre/<str:pk>',
        'Delete': '/delete-offre/</str:pk>',

        'List': '/list_entretien',
        'Add': '/add_entretien',
        'Planifier': '/planifier_entretien',
        'Delete': '/annuler_entretien/</str:pk>',

        'List': '/list_postulation',
        'Postuler': '/postuler',
        'Delete': '/annuler_postulation/</str:pk>',

        'List': '/list_notification',
        'Delete': '/delete_notifications/</str:pk>',

        'register': '/register',

    }      
    # data = {
    #     'message' : 'Welcome to Our Service Recruement'
    # }
    return Response(api_urls)

@api_view(["GET"])
@permission_classes([AnyRole])
def candidaList(request):
    candidat = Candidat.objects.all()
    serializer = CandidatSerializer(candidat, many=True)
    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAdministrateur])
def detailsCandidat(request, pk):
    candidat = Candidat.objects.get(id=pk)
    serializer = CandidatSerializer(candidat, many=False)
    return Response(serializer.data)

@api_view(["POST"])
@permission_classes([IsAdministrateur])
def createCandidat(request):

        serializer = CandidatSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data)


@api_view(["POST"])
@permission_classes([IsAdministrateur])
def updateCandidat(request, pk):
    candidat = Candidat.objects.get(id=pk)
    serializer = CandidatSerializer(candidat, data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(["DELETE"])
@permission_classes([IsAdministrateur])
def deleteCandidat(request, pk):
    candidat = Candidat.objects.get(id=pk)
    candidat.delete()
    # serializer = CandidatSerializer(candidat, many=True)
    return Response(request.data)



# ========================La liste des recruteurs========================================
@api_view(["GET"])
@permission_classes([IsAdministrateurOrRecruteur])
def recruteurList(request):
    recruteur = Recruteur.objects.all()
    serializer = RecruteurSerializer(recruteur, many=True)
    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAdministrateur])
def detailRecruteur(request, pk):
    recruteur = Recruteur.objects.get(id=pk)
    serializer = RecruteurSerializer(recruteur, many=False)
    return Response(serializer.data)

@api_view(["POST"])
@permission_classes([IsAdministrateur])
def createRecruteur(request):

        serializer = RecruteurSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data)

@api_view(["POST"])
@permission_classes([IsAdministrateur])
def updateRecruteur(request, pk):
    recruteur = Recruteur.objects.get(id=pk)
    serializer = RecruteurSerializer(recruteur, data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)


@api_view(["DELETE"])
@permission_classes([IsAdministrateur])
def deleteRecruteur(request, pk):
    recruteur = Recruteur.objects.get(id=pk)
    recruteur.delete()
    # serializer = CandidatSerializer(recruteur, many=True)
    return Response(request.data)



# =========================== la liste des offres===================================
@api_view(["GET"])
@permission_classes([AnyRole])
def offreList(request):
    offre = Offre.objects.all()
    serializer = OffreSerializer(offre, many=True)
    return Response(serializer.data)

@api_view(["GET"])
@permission_classes([IsRecruteur])
def detailsOffre(request, pk):
    offre = Offre.objects.get(id=pk)
    serializer = OffreSerializer(offre, many=False)
    return Response(serializer.data)

@api_view(["POST"])
@permission_classes([IsRecruteur])
def publierOffre(request):

        serializer = OffreSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data)

@api_view(["POST"])
@permission_classes([IsRecruteur])
def updateOffre(request, pk):
    offre = Offre.objects.get(id=pk)
    serializer = OffreSerializer(offre, data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(["DELETE"])
@permission_classes([IsRecruteur])
def deleteOffre(request, pk):
    offre = Offre.objects.get(id=pk)
    offre.delete()
    # serializer = OffreSerializer(offre, many=True)
    return Response(request.data)


# =========================== la liste des Entretien===================================
@api_view(["GET"])
@permission_classes([IsAdministrateurOrRecruteur])
def entretienList(request):
    entretien = Entretien.objects.all()
    serializer = EntretienSerializer(entretien, many=True)
    return Response(serializer.data)


# @api_view(["POST"])
# def add_entretien(request):

#         serializer = EntretienSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
            
#         return Response(serializer.data)


@api_view(["POST"])
@permission_classes([AnyRole])
def add_entretien(request):

    print("========== AJOUT ENTRETIEN ==========")
    print("DONNEES RECUES PAR DJANGO :", request.data)

    serializer = EntretienSerializer(data=request.data)

    print("SERIALIZER :", serializer)

    if serializer.is_valid():

        print("========== SERIALIZER VALIDE ==========")
        print("DONNEES VALIDÉES :", serializer.validated_data)

        entretien = serializer.save()

        print("========== ENTRETIEN SAUVEGARDE ==========")
        print("OBJET :", entretien)
        print("ID :", entretien.id)

        return Response(
            EntretienSerializer(entretien).data,
            status=201
        )

    print("========== ERREURS SERIALIZER ==========")
    print(serializer.errors)

    return Response(
        {
            "error": "Erreur de validation",
            "details": serializer.errors
        },
        status=400
    )
@api_view(["POST"])
@permission_classes([AnyRole])
def planifier_entretien(request):

        serializer = EntretienSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data)

@api_view(["DELETE"])
@permission_classes([IsRecruteur])
def annulerEntretien(request, pk):
    entretien = Entretien.objects.get(id=pk)
    entretien.delete()
    # serializer = EntretienSerializer(entretien, many=True)
    return Response(request.data)


# =========================== la liste des Postulation===================================
@api_view(["GET"])
@permission_classes([IsCandidat])
def postulationList(request):
    postulation = Postulation.objects.all()
    serializer = PostulationSerializer(postulation, many=True)
    return Response(serializer.data)

# @api_view(["POST"])
# def postuler(request):

#         serializer = PostulationSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#         return Response(serializer.data)


# @api_view(["POST"])
# def postuler(request):
#     serializer = PostulationSerializer(data=request.data)

#     if not serializer.is_valid():
#         return Response(serializer.errors, status=400)

#     postulation = serializer.save()

#     candidat = postulation.candidat
#     offre = postulation.offre

#     # Vérification de la spécialité
#     compatible = (
#         candidat.specialite.strip().lower()
#         == offre.specialite.strip().lower()
#     )

#     if compatible:
#         Notification.objects.create(
#             candidat=candidat,
#             offre=offre,
#             postulation=postulation,
#             message=(
#                 f"Le candidat {candidat.nom} a postulé "
#                 f"à votre offre {offre.specialite}."
#             ),
#             statut="EN_ATTENTE"
#         )

#     return Response(
#         {
#             "message": "Candidature enregistrée.",
#             "compatible": compatible,
#             "postulation": PostulationSerializer(postulation).data
#         },
#         status=201
#     )




# @api_view(["POST"])
# def postuler(request):

#     candidat_id = request.data.get("candidat")
#     offre_id = request.data.get("offre")

#     if not candidat_id:
#         return Response(
#             {"error": "Le candidat est obligatoire."},
#             status=status.HTTP_400_BAD_REQUEST
#         )

#     if not offre_id:
#         return Response(
#             {"error": "L'offre est obligatoire."},
#             status=status.HTTP_400_BAD_REQUEST
#         )

#     try:
#         candidat = Candidat.objects.get(id=candidat_id)
#     except Candidat.DoesNotExist:
#         return Response(
#             {"error": "Candidat introuvable."},
#             status=status.HTTP_404_NOT_FOUND
#         )

#     try:
#         offre = Offre.objects.get(id=offre_id)
#     except Offre.DoesNotExist:
#         return Response(
#             {"error": "Offre introuvable."},
#             status=status.HTTP_404_NOT_FOUND
#         )

#     # Vérification de la spécialité
#     if not candidat.specialite:
#         return Response(
#             {
#                 "error": "Le candidat n'a pas de spécialité."
#             },
#             status=status.HTTP_400_BAD_REQUEST
#         )

#     if not offre.specialite:
#         return Response(
#             {
#                 "error": "Cette offre n'a pas de spécialité."
#             },
#             status=status.HTTP_400_BAD_REQUEST
#         )

#     compatible = (
#         candidat.specialite.strip().lower()
#         == offre.specialite.strip().lower()
#     )

#     # Vérifier si le candidat a déjà postulé
#     deja_postule = Postulation.objects.filter(
#         candidat=candidat,
#         offre=offre
#     ).exists()

#     if deja_postule:
#         return Response(
#             {
#                 "error": "Vous avez déjà postulé à cette offre."
#             },
#             status=status.HTTP_400_BAD_REQUEST
#         )

#     # Création de la candidature
#     postulation = Postulation.objects.create(
#         candidat=candidat,
#         offre=offre
#     )

#     serializer = PostulationSerializer(postulation)

#     return Response(
#         {
#             "message": "Candidature envoyée avec succès.",
#             "compatible": compatible,
#             "postulation": serializer.data
#         },
#         status=status.HTTP_201_CREATED
#     )



@api_view(["POST"])
@permission_classes([IsCandidat])
def postuler(request):

    candidat_id = request.data.get("candidat")
    offre_id = request.data.get("offre")
    print("========== POSTULER ==========")
    print("CANDIDAT ID REÇU :", candidat_id)
    print("OFFRE ID REÇU :", offre_id)




    # =========================
    # Vérifier le candidat
    # =========================

    if not candidat_id:
        return Response(
            {"error": "Le candidat est obligatoire."},
            status=status.HTTP_400_BAD_REQUEST
        )

    try:
        candidat = Candidat.objects.get(id=candidat_id)

    except Candidat.DoesNotExist:
        return Response(
            {"error": "Candidat introuvable."},
            status=status.HTTP_404_NOT_FOUND
        )

    # =========================
    # Vérifier l'offre
    # =========================
    print("========== CANDIDAT ==========")
    print("ID :", candidat.id)
    print("Nom :", candidat.prenom, candidat.nom)
    print("Spécialité :", candidat.specialite)
    if not offre_id:
        return Response(
            {"error": "L'offre est obligatoire."},
            status=status.HTTP_400_BAD_REQUEST
        )

    try:
        offre = Offre.objects.select_related("recruteur").get(
            id=offre_id
        )

    except Offre.DoesNotExist:
        return Response(
            {"error": "Offre introuvable."},
            status=status.HTTP_404_NOT_FOUND
        )
    print("========== OFFRE ==========")
    print("ID :", offre.id)
    print("Entreprise :", offre.nom_entreprise)
    print("Spécialité :", offre.specialite)
    # =========================
    # Vérifier la spécialité
    # =========================

    if not candidat.specialite:
        return Response(
            {"error": "Le candidat n'a pas de spécialité."},
            status=status.HTTP_400_BAD_REQUEST
        )

    if not offre.specialite:
        return Response(
            {"error": "Cette offre n'a pas de spécialité."},
            status=status.HTTP_400_BAD_REQUEST
        )

    compatible = (
        candidat.specialite.strip().lower()
        == offre.specialite.strip().lower()
    )

    # =========================
    # Vérifier candidature déjà existante
    # =========================

    deja_postule = Postulation.objects.filter(
        candidat=candidat,
        offre=offre
    ).exists()

    if deja_postule:
        return Response(
            {
                "error": "Vous avez déjà postulé à cette offre."
            },
            status=status.HTTP_400_BAD_REQUEST
        )

    # =========================
    # Créer la candidature
    # =========================

    postulation = Postulation.objects.create(
        candidat=candidat,
        offre=offre,
        statut=Postulation.StatutCandidature.NOUVELLE_CANDIDATURE
    )

    # =========================
    # Créer la notification
    # =========================

    notification = None

    if compatible:

        notification = Notification.objects.create(
            postulation=postulation,
            message=(
                f"Nouvelle candidature de "
                f"{candidat.prenom} {candidat.nom} "
                f"pour l'offre "
                f"{offre.nom_entreprise} - "
                f"{offre.specialite}."
            ),
            statut=Notification.Statut.EN_ATTENTE
        )

    # =========================
    # Réponse
    # =========================

    serializer = PostulationSerializer(postulation)

    return Response(
        {
            "message": "Candidature envoyée avec succès.",
            "compatible": compatible,
            "notification": notification is not None,
            "notification_id": (
                notification.id
                if notification
                else None
            ),
            "recruteur": (
                offre.recruteur.id
                if offre.recruteur
                else None
            ),
            "postulation": serializer.data
        },
        status=status.HTTP_201_CREATED
    )


@api_view(["DELETE"])
@permission_classes([IsCandidat])
def annulerPostulaion(request, pk):
    postulation = Postulation.objects.get(id=pk)
    postulation.delete()
    serializer = PostulationSerializer(postulation, many=True)
    return Response(serializer.data)


# @api_view(["POST"])
# def accepterCandidature(request):

#     print("========== ACCEPTER CANDIDATURE ==========")
#     print("DONNEES RECUES :", request.data)

#     postulation_id = request.data.get("postulation")

#     # ====================================
#     # Vérifier l'ID de la postulation
#     # ====================================

#     if not postulation_id:
#         return Response(
#             {"error": "La postulation est obligatoire."},
#             status=status.HTTP_400_BAD_REQUEST
#         )

#     # ====================================
#     # Récupérer la postulation
#     # ====================================

#     try:

#         postulation = Postulation.objects.select_related(
#             "candidat",
#             "offre",
#             "offre__recruteur"
#         ).get(id=postulation_id)

#     except Postulation.DoesNotExist:

#         return Response(
#             {"error": "Postulation introuvable."},
#             status=status.HTTP_404_NOT_FOUND
#         )

#     # ====================================
#     # Récupérer candidat et offre
#     # ====================================

#     candidat = postulation.candidat
#     offre = postulation.offre

#     print("CANDIDAT :", candidat)
#     print("OFFRE :", offre)

#     print(
#         "SPECIALITE CANDIDAT :",
#         candidat.specialite
#     )

#     print(
#         "SPECIALITE OFFRE :",
#         offre.specialite
#     )

#     # ====================================
#     # Vérifier la compatibilité
#     # ====================================

#     if (
#         not candidat.specialite
#         or not offre.specialite
#         or candidat.specialite.lower().strip()
#         != offre.specialite.lower().strip()
#     ):

#         return Response(
#             {
#                 "error": "Le profil du candidat n'est pas compatible avec cette offre.",
#                 "specialite_candidat": candidat.specialite,
#                 "specialite_offre": offre.specialite
#             },
#             status=status.HTTP_400_BAD_REQUEST
#         )

#     # ====================================
#     # Modifier le statut de la postulation
#     # ====================================

#     postulation.statut = "PLANIFIE"
#     postulation.save()

#     print(
#         "STATUT POSTULATION :",
#         postulation.statut
#     )

#     # ====================================
#     # Créer l'entretien
#     # ====================================

#     entretien = Entretien.objects.create(
#         candidat=candidat,
#         recruteur=offre.recruteur,
#         offre=offre,
#         postulation=postulation,
#         statut="PLANIFIE"
#     )


#     # ====================================
#     # Réponse
#     # ====================================

#     serializer = EntretienSerializer(entretien)
#     print("DATE :", request.data.get("date_entretien"))
#     print("DUREE :", request.data.get("duree"))
#     return Response(
#         {
#             "message": "Candidature compatible. Entretien planifié avec succès.",
#             "postulation_id": postulation.id,
#             "postulation_statut": postulation.statut,
#             "entretien": serializer.data
#         },
#         status=status.HTTP_201_CREATED
#     )

# @api_view(["POST"])
# def accepterCandidature(request):

#     print("========== ACCEPTER CANDIDATURE ==========")
#     print("DONNEES RECUES :", request.data)

#     postulation_id = request.data.get("postulation")
#     date_entretien = request.data.get("date_entretien")
#     duree = request.data.get("duree")

#     print("POSTULATION :", postulation_id)
#     print("DATE :", date_entretien)
#     print("DUREE :", duree)

#     # Vérifier les données obligatoires
#     if not postulation_id:
#         return Response(
#             {"error": "La postulation est obligatoire."},
#             status=status.HTTP_400_BAD_REQUEST
#         )

#     if not date_entretien:
#         return Response(
#             {"error": "La date de l'entretien est obligatoire."},
#             status=status.HTTP_400_BAD_REQUEST
#         )

#     if not duree:
#         return Response(
#             {"error": "La durée de l'entretien est obligatoire."},
#             status=status.HTTP_400_BAD_REQUEST
#         )

#     # Récupérer la postulation
#     try:
#         postulation = Postulation.objects.select_related(
#             "candidat",
#             "offre",
#             "offre__recruteur"
#         ).get(id=postulation_id)

#     except Postulation.DoesNotExist:
#         return Response(
#             {"error": "Postulation introuvable."},
#             status=status.HTTP_404_NOT_FOUND
#         )

#     candidat = postulation.candidat
#     offre = postulation.offre

#     print("CANDIDAT :", candidat)
#     print("OFFRE :", offre)

#     print(
#         "SPECIALITE CANDIDAT :",
#         candidat.specialite
#     )

#     print(
#         "SPECIALITE OFFRE :",
#         offre.specialite
#     )

#     # Vérifier la compatibilité
#     if (
#         not candidat.specialite
#         or not offre.specialite
#         or candidat.specialite.lower().strip()
#         != offre.specialite.lower().strip()
#     ):
#         return Response(
#             {
#                 "error": "Le profil du candidat n'est pas compatible avec cette offre.",
#                 "specialite_candidat": candidat.specialite,
#                 "specialite_offre": offre.specialite
#             },
#             status=status.HTTP_400_BAD_REQUEST
#         )

#     # Modifier le statut de la postulation
#     postulation.statut = "PLANIFIE"
#     postulation.save()

#     print("STATUT POSTULATION :", postulation.statut)

#     # Créer l'entretien
#     entretien = Entretien.objects.create(
#         candidat=candidat,
#         recruteur=offre.recruteur,
#         offre=offre,
#         postulation=postulation,
#         statut=Entretien.Statut.PLANIFIE,
#         canal_entretien=Entretien.CanalEntretien.PRESENTIEL,
#         date_entretien=date_entretien,
#         duree=duree
#     )

#     print("ENTRETIEN CRÉÉ :", entretien.id)

#     serializer = EntretienSerializer(entretien)

#     return Response(
#         {
#             "message": "Candidature compatible. Entretien planifié avec succès.",
#             "postulation_id": postulation.id,
#             "postulation_statut": postulation.statut,
#             "entretien": serializer.data
#         },
#         status=status.HTTP_201_CREATED
#     )



@api_view(["POST"])
@permission_classes([IsRecruteur])
def accepterCandidature(request):

    print("========== ACCEPTER CANDIDATURE ==========")
    print("DONNEES RECUES :", request.data)

    postulation_id = request.data.get("postulation")
    date_entretien = request.data.get("date_entretien")
    duree_str = request.data.get("duree")
    lieu_entretien = request.data.get("lieu_entretien")

    print("POSTULATION :", postulation_id)
    print("DATE :", date_entretien)
    print("DUREE RECUE :", duree_str)
    print("Lieu Entretien :", lieu_entretien)

    # ====================================
    # Vérifier les données obligatoires
    # ====================================

    if not postulation_id:
        return Response(
            {"error": "La postulation est obligatoire."},
            status=status.HTTP_400_BAD_REQUEST
        )

    if not date_entretien:
        return Response(
            {"error": "La date de l'entretien est obligatoire."},
            status=status.HTTP_400_BAD_REQUEST
        )

    if not duree_str:
        return Response(
            {"error": "La durée de l'entretien est obligatoire."},
            status=status.HTTP_400_BAD_REQUEST
        )

    # ====================================
    # Convertir la durée
    # ====================================

    try:

        heures, minutes, secondes = map(
            int,
            duree_str.split(":")
        )

        duree = timedelta(
            hours=heures,
            minutes=minutes,
            seconds=secondes
        )

    except (ValueError, AttributeError):

        return Response(
            {
                "error": "La durée doit être au format HH:MM:SS."
            },
            status=status.HTTP_400_BAD_REQUEST
        )

    print("DUREE CONVERTIE :", duree)

    # ====================================
    # Récupérer la postulation
    # ====================================

    try:

        postulation = Postulation.objects.select_related(
            "candidat",
            "offre",
            "offre__recruteur"
        ).get(id=postulation_id)

    except Postulation.DoesNotExist:

        return Response(
            {"error": "Postulation introuvable."},
            status=status.HTTP_404_NOT_FOUND
        )

    # ====================================
    # Récupérer candidat et offre
    # ====================================

    candidat = postulation.candidat
    offre = postulation.offre

    print("CANDIDAT :", candidat)
    print("OFFRE :", offre)

    print(
        "SPECIALITE CANDIDAT :",
        candidat.specialite
    )

    print(
        "SPECIALITE OFFRE :",
        offre.specialite
    )

    # ====================================
    # Vérifier la compatibilité
    # ====================================

    if (
        not candidat.specialite
        or not offre.specialite
        or candidat.specialite.lower().strip()
        != offre.specialite.lower().strip()
    ):

        return Response(
            {
                "error": "Le profil du candidat n'est pas compatible avec cette offre.",
                "specialite_candidat": candidat.specialite,
                "specialite_offre": offre.specialite
            },
            status=status.HTTP_400_BAD_REQUEST
        )

    if not lieu_entretien:
        return Response(
            {"error": "le lieu de l'entretien est obligatoire."},
            status=status.HTTP_400_BAD_REQUEST
        )
    # ====================================
    # Modifier le statut de la postulation
    # ====================================

    postulation.statut = "PLANIFIE"
    postulation.save()

    print(
        "STATUT POSTULATION :",
        postulation.statut
    )

    # ====================================
    # Créer l'entretien
    # ====================================

    entretien = Entretien.objects.create(
        candidat=candidat,
        recruteur=offre.recruteur,
        offre=offre,
        postulation=postulation,
        statut=Entretien.Statut.PLANIFIE,
        canal_entretien=Entretien.CanalEntretien.PRESENTIEL,
        lieu_entretien=lieu_entretien,
        date_entretien=date_entretien,
        duree=duree
    )

    print("ENTRETIEN CRÉÉ :", entretien.id)
    print("DUREE ENREGISTREE :", entretien.duree)

    # ====================================
    # Sérialiser
    # ====================================

    serializer = EntretienSerializer(entretien)

    print("SERIALIZER :", serializer.data)

    return Response(
        {
            "message": "Candidature compatible. Entretien planifié avec succès.",
            "postulation_id": postulation.id,
            "postulation_statut": postulation.statut,
            "entretien": serializer.data
        },
        status=status.HTTP_201_CREATED
    )

@api_view(["POST"])
@permission_classes([IsRecruteur])
def refuserCandidature(request):

    print("========== Refuser CANDIDATURE ==========")
    print("DONNEES RECUES :", request.data)

    postulation_id = request.data.get("postulation")
    date_entretien = request.data.get("date_entretien")
    duree_str = request.data.get("duree")

    print("POSTULATION :", postulation_id)
    print("DATE :", date_entretien)
    print("DUREE RECUE :", duree_str)
    # ====================================
    # Vérifier les données obligatoires
    # ====================================

    if not postulation_id:
        return Response(
            {"error": "La postulation est obligatoire."},
            status=status.HTTP_400_BAD_REQUEST
        )

    if not date_entretien:
        return Response(
            {"error": "La date de l'entretien est obligatoire."},
            status=status.HTTP_400_BAD_REQUEST
        )

    if not duree_str:
        return Response(
            {"error": "La durée de l'entretien est obligatoire."},
            status=status.HTTP_400_BAD_REQUEST
        )

    # ====================================
    # Convertir la durée
    # ====================================

    try:

        heures, minutes, secondes = map(
            int,
            duree_str.split(":")
        )

        duree = timedelta(
            hours=heures,
            minutes=minutes,
            seconds=secondes
        )

    except (ValueError, AttributeError):

        return Response(
            {
                "error": "La durée doit être au format HH:MM:SS."
            },
            status=status.HTTP_400_BAD_REQUEST
        )

    print("DUREE CONVERTIE :", duree)

    # ====================================
    # Récupérer la postulation
    # ====================================

    try:

        postulation = Postulation.objects.select_related(
            "candidat",
            "offre",
            "offre__recruteur"
        ).get(id=postulation_id)

    except Postulation.DoesNotExist:

        return Response(
            {"error": "Postulation introuvable."},
            status=status.HTTP_404_NOT_FOUND
        )

    # ====================================
    # Récupérer candidat et offre
    # ====================================

    candidat = postulation.candidat
    offre = postulation.offre

    print("CANDIDAT :", candidat)
    print("OFFRE :", offre)

    print(
        "SPECIALITE CANDIDAT :",
        candidat.specialite
    )

    print(
        "SPECIALITE OFFRE :",
        offre.specialite
    )

    # ====================================
    # Vérifier la compatibilité
    # ====================================

    if (
        not candidat.specialite
        or not offre.specialite
        or candidat.specialite.lower().strip()
        != offre.specialite.lower().strip()
    ):

        return Response(
            {
                "error": "Le profil du candidat n'est pas compatible avec cette offre.",
                "specialite_candidat": candidat.specialite,
                "specialite_offre": offre.specialite
            },
            status=status.HTTP_400_BAD_REQUEST
        )

    # ====================================
    # Modifier le statut de la postulation
    # ====================================

    postulation.statut = "REFUSE"
    postulation.save()

    print(
        "STATUT POSTULATION :",
        postulation.statut
    )

    # ====================================
    # Créer l'entretien
    # ====================================

    entretien = Entretien.objects.create(
        candidat=candidat,
        recruteur=offre.recruteur,
        offre=offre,
        postulation=postulation,
        statut=Entretien.Statut.REFUSE,
        canal_entretien=Entretien.CanalEntretien.PRESENTIEL,
        date_entretien=date_entretien,
        duree=duree
    )

    print("ENTRETIEN CRÉÉ :", entretien.id)
    print("DUREE ENREGISTREE :", entretien.duree)

    # ====================================
    # Sérialiser
    # ====================================

    serializer = EntretienSerializer(entretien)

    print("SERIALIZER :", serializer.data)

    return Response(
        {
            "message": "Candidature incompatible. Entretien reffuser.",
            "postulation_id": postulation.id,
            "postulation_statut": postulation.statut,
            "entretien": serializer.data
        },
        status=status.HTTP_201_CREATED
    )


# @api_view(["POST"])
# def refuserCandidature(request):

#         serializer = PostulationSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#         return Response(serializer.data)
# =========================== la liste des Notifications===================================

@api_view(["GET"])
@permission_classes([IsRecruteur])
def notificationsList(request):
    notification = Notification.objects.all()
    serializer = NotificationSerializer(notification, many=True)
    return Response(serializer.data)

# @api_view(["DELETE"])
# def deleteNotification(request, pk):
#     notification = Notification.objects.get(id=pk)
#     notification.delete()
#     # serializer = CandidatSerializer(candidat, many=True)
#     return Response(request.data)




@api_view(["POST"])
def register(request):
    print("DONNEES RECUES PAR DJANGO :", request.data)

    data = request.data

    nom = data.get("nom")
    prenom = data.get("prenom")
    email = data.get("email")
    telephone = data.get("telephone")
    adresse = data.get("adresse")
    role = data.get("role")
    password = data.get("password")
    repassword = data.get("repassword")

    # ==========================
    # VALIDATION
    # ==========================

    if not nom or not prenom or not email or not password:
        return Response(
            {"error": "Tous les champs obligatoires doivent être remplis."},
            status=status.HTTP_400_BAD_REQUEST
        )

    if password != repassword:
        return Response(
            {"error": "Les mots de passe ne correspondent pas."},
            status=status.HTTP_400_BAD_REQUEST
        )

    if role not in ["ADMINISTRATEUR", "CANDIDAT", "RECRUTEUR"]:
        return Response(
            {"error": "Rôle invalide."},
            status=status.HTTP_400_BAD_REQUEST
        )

    if role == "CANDIDAT" and not data.get("cin") :
        return Response(
            {"error": "Le CIN est obligatoire pour un candidat."},
            # {"error": "La Specialite est obligatoire pour un candidat."},            
            status=status.HTTP_400_BAD_REQUEST
        )

    if role == "CANDIDAT" and not data.get("specialite") :
        return Response(
            {"error": "La spécialite est obligatoire pour un candidat."},
            # {"error": "La Specialite est obligatoire pour un candidat."},            
            status=status.HTTP_400_BAD_REQUEST
        ) 

    
    if role == "RECRUTEUR" and not data.get("reference_recruteur"):
        return Response(
            {"error": "Le reference est obligatoire pour le recruteur."},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    # ==========================
    # VERIFIER USERNAME
    # ==========================

    username = email

    if CompteUtilisateur.objects.filter(username=username).exists():
        return Response(
            {"error": "Cet utilisateur existe déjà."},
            status=status.HTTP_400_BAD_REQUEST
        )

    # ==========================
    # CREATION CANDIDAT
    # ==========================

    if role == "CANDIDAT":

        cin = data.get("cin")

        specialite = data.get("specialite")

        candidat = Candidat.objects.create(
            nom=nom,
            prenom=prenom,
            email=email,
            telephone=telephone,
            adresse=adresse,
            cin=cin,
            specialite=specialite
        )

        compte = CompteUtilisateur.objects.create(
            username=username,
            password=make_password(password),
            role="CANDIDAT",
            candidat=candidat
        )


    # ==========================
    # CREATION RECRUTEUR
    # ==========================

    elif role == "RECRUTEUR":

        reference_recruteur = data.get(
            "reference_recruteur",
            f"REF-{email}"
        )

        recruteur = Recruteur.objects.create(
            nom=nom,
            prenom=prenom,
            email=email,
            telephone=telephone,
            adresse=adresse,
            reference_recruteur=reference_recruteur
        )

        compte = CompteUtilisateur.objects.create(
            username=username,
            password=make_password(password),
            role="RECRUTEUR",
            recruteur=recruteur
        )

    elif role == "ADMINISTRATEUR":

        compte = CompteUtilisateur.objects.create(
            username=username,
            password=make_password(password),
            role="ADMINISTRATEUR"
        )        

    return Response(
        {
            "message": "Compte créé avec succès.",
            "username": compte.username,
            "role": compte.role
        },
        status=status.HTTP_201_CREATED
    )


    

@api_view(["POST"])
def login(request):

    print("DONNEES LOGIN RECUES :", request.data)

    username = request.data.get("username")
    password = request.data.get("password")

    if not username or not password:
        return Response(
            {"error": "Username et password sont obligatoires."},
            status=status.HTTP_400_BAD_REQUEST
        )

    try:

        compte = CompteUtilisateur.objects.get(
            username=username
        )

        print("COMPTE TROUVE :", compte)
        print("USERNAME DB :", compte.username)
        print("PASSWORD DB :", compte.password)

    except CompteUtilisateur.DoesNotExist:

        print("❌ AUCUN COMPTE TROUVE")

        return Response(
            {"error": "Username ou password incorrect."},
            status=status.HTTP_401_UNAUTHORIZED
        )

    if not check_password(password, compte.password):

        print("❌ MOT DE PASSE INCORRECT")

        return Response(
            {"error": "Username ou password incorrect."},
            status=status.HTTP_401_UNAUTHORIZED
        )

    print("✅ MOT DE PASSE CORRECT")

    access = AccessToken()

    access["user_id"]= compte.id
    access["username"]= compte.username
    access["email"] = compte.username
    access["role"]=compte.role

    return Response(
        {
            "message": "Connexion réussie.",
            "id": compte.id,
            "username": compte.username,
            "email": compte.username,
            "role": compte.role,
            "access": str(access)
        },
        status=status.HTTP_200_OK
    )


# @api_view(["POST"])
# def register(request):

#     data = request.data
#     nom = data.get("nom")
#     prenom = data.get("prenom")
#     email = data.get("email")
#     adresse = data.get("adresse")
#     password = data.get("password")
    

#     if not nom or  prenom or email or adresse or telephone or password:

#         return Response(
#             {"error": "Les champs sont obligatoires"},
#             status=status.HTTP_400_BAD_REQUEST
#         )

#     if password !=repassword:
#         return Response(
#                     {"error": "password invalide"},
#                     status=status.HTTP_400_BAD_REQUEST
#                 )  


#     if role not in ["ADMINISTRATEUR", "CANDIDAT", "RECRUTEUR"]:

#         return Response(
#                     {"error": "Role invalide"},
#                     status=status.HTTP_400_BAD_REQUEST
#                 )   
            
#     if role == "CANDIDAT":

#         cin = data.get("cin")

#         candidat = Candidat.objects.create(
#             nom =nom,
#             prenom = prenom,
#             email= email,
#             telephone = telephone,
#             adresse = adresse,
#             cin = cin,
#         )

#         compteutilisateur= CompteUilisateur.objects.create(
#             username = username,
#             password = make_password(password),
#             role = "CANDIDAT"
#             candidat = candidat
    
#         )

#     elif role == recruteur:

#         reference_recruteur = data.get("reference_recruteur")

#         recruteur = Recruteur.objects.create(
#             nom = nom,
#             prenom=prenom,
#             email =email,
#             telephone=telephone,
#             adresse=adresse,
#             reference_recruteur = reference_recruteur,
#             password =password,
#         )
        
#         compteutilisateur = CompteUilisateur.objects.create(
#            username = username,
#            role = "RECRUTEUR",
#            password = make_password(password),
#            recruteur = recruteur,
    
#         )
        
#     elif role == "administrateur":

#        compteUilisateur = CompteUilisateur.objects.create(
#            username = username,
#            password = make_password(password),
#            role = "Administrateur",
#        )
          
    # serializer = RegisterSerializer(data=request.data)
    # if serializer.is_valid():
    #     serializer.save()
    #     return Response(serializer.data)