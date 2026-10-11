from .models import Candidat, Recruteur, Offre, Entretien, Postulation, Notification

# ==========================================================
#     service du candidat
# ===========================================================


def get_all_candidats():
    return Candidat.objects.all()


def get_candidat_by_id(pk):
    return Candidat.objects.get(id=pk)


def create_candidat(data):
    candidat = Candidat.objects.create(**data)
    return candidat


def update_candidat(candidat, data):
    for key, value in data.items():
        setattr(candidat, key, value)

    candidat.save()

    return candidat


def delete_candidat(candidat):
    candidat.delete()


# ====================================================================================
# Le sevice des recruteurs
# ====================================================================================    
def get_all_recruteur():
    return Recruteur.objects.all()


def get_recruteur_by_id(pk):
    return Recruteur.objects.get(id=pk)


def create_recruteur(data):
    recruteur = Recruteur.objects.create(**data)
    return recruteur


def update_recruteur(recruteur, data):
    for key, value in data.items():
        setattr(recruteur, key, value)

    recruteur.save()

    return recruteur


def delete_recruteur(recruteur):
    recruteur.delete()


# ====================================================================================
# Le sevice des Offres
# ====================================================================================    

def get_all_candidats():
    return Candidat.objects.all()


def get_candidat_by_id(pk):
    return Candidat.objects.get(id=pk)


def create_candidat(data):
    candidat = Candidat.objects.create(**data)
    return candidat


def update_candidat(candidat, data):
    for key, value in data.items():
        setattr(candidat, key, value)

    candidat.save()

    return candidat


def delete_candidat(candidat):
    candidat.delete()


# ====================================================================================
# Le sevice des Offres
# ====================================================================================    
def get_all_offre():
    return Offre.objects.all()


def get_offre_by_id(pk):
    return Offre.objects.get(id=pk)


def publier_offre(data):
    offre = Offre.objects.create(**data)
    return offre


def update_offre(offre, data):
    for key, value in data.items():
        setattr(offre, key, value)

    offre.save()

    return offre


def delete_offre(offre):
    offre.delete()


# ========================================================================
# liste des entretien
# ===============================================================================
 
def get_all_entretien():
    return Entretien.objects.all()


def get_entretien_by_id(pk):
    return Entretien.objects.get(id=pk)


def planifier_entretien(data):
    entretien = Entretien.objects.create(**data)
    return entretien

def planifier_entretien(recruteur, data):

    candidat = data["candidat"]
    offre = data["offre"]
    date_entretien = data["date_entretien"]

    # Vérifier qu'un entretien n'existe pas déjà
    entretien_existant = Entretien.objects.filter(
        candidat=candidat,
        offre=offre
    ).exists()

    if entretien_existant:
        raise ValueError(
            "Un entretien existe déjà pour ce candidat et cette offre."
        )

    # Vérifier que le créneau n'est pas déjà pris
    conflit = Entretien.objects.filter(
        recruteur=recruteur,
        date_entretien=date_entretien
    ).exists()

    if conflit:
        raise ValueError(
            "Le recruteur a déjà un entretien à cette date."
        )

    # Création de l'entretien
    entretien = Entretien.objects.create(
        recruteur=recruteur,
        candidat=candidat,
        offre=offre,
        date_entretien=date_entretien,
        statut="PLANIFIE"
    )

    return entretien

def update_entretien(entretien, data):
    for key, value in data.items():
        setattr(entretien, key, value)

    entretien.save()

    return entretien


def delete_entretien(entretien):
    entretien.delete()



# =============================================================================
# Liste des postulations
# ==============================================================================
def get_all_postulation():
    return Postulation.objects.all()


# def postuler_offre(candidat, data):

#     candidat = data["candidat"]
#     offre = data["offre"]

#     offre_existant = Offre.objects.filter(
#         candidat=candidat,
#         offre=offre
#     ).exists()

#     if offre_existant:
#         raise ValueError(
#             "Le candidat et déja postuler à cette offre."
#         )



def postuler_offre(candidat, data):
    candidat = data["candidat"]
    offre = data["offre"]

    offre_existant = Postulation.objects.filter(
        candidat=candidat,
        offre=offre
    ).exists()

    if offre_existant:
        raise ValueError(
            "Le candidat a déjà postulé à cette offre."
        )

    postulation = Postulation.objects.create(
        candidat=candidat,
        offre=offre,
        statut="NOUVELLE_CANDIDATURE"
    )

    return postulation
    # Création de la Candidature
    postulation = Postulation.objects.create(
        candidat=candidat,
        offre=offre,
        statut="NOUVELLE_CANDIDATURE"
    )

    return postulation


def vérifier_compatibiliter():
    if Candidat.specialite != Offre.specialite:
        return False
    else:
        return f"l'offre correspond à ce candidat, donc il peut la postuler"


def update_postulation(postulation, data):
    for key, value in data.items():
        setattr(postulation, key, value)

    postulation.save()
    return postulation

    
def delete_postulation(postulation):
    postulation.delete()


# def accepter_candidature(postulationId, data):


# =====================================================================
# Service des Notifications
# ======================================================================
def recevoir_notification(notification, data):

    candidat = data["candidat"]
    offre = data["offre"]
    postulation = data["postulation"]

    # Vérifier qu'un entretien n'existe pas déjà
    entretien_existant = Notification.objects.filter(
        candidat=candidat,
        offre=offre,
        postulation=postulation,
    ).exists()

    # if entretien_existant:
    #     raise ValueError(
    #         "Un entretien existe déjà pour ce candidat et cette offre."
    #     )

    # Vérifier que le créneau n'est pas déjà pris
    conflit = Candidat.objects.filter(
        offre=offre,
        postulation=postulation
    ).exists()

    if conflit:
        raise ValueError(
            "Le Candidat a déjà postuler à cette offre."
        )

    # Création de l'entretien
    notification = Notification.objects.create(
        candidat=candidat,
        postulation = postulation,
        day_date = day_date,

        date_entretien=date_entretien,
        statut="ACCEPTE"
    )

    return notification


