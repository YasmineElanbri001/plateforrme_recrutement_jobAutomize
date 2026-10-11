# from django.db import models

# # Create your models here.
# class Utilisateur(models.Model):
#     nom = models.CharField(max_length=15)
#     prenom = models.CharField(max_length=15)
#     email = models.CharField(max_length=100)
#     telephone = models.CharField(max_length=10, blank=True)
#     adresse = models.TextField(blank=True)

#     class Meta:
#         abstract = True

#     def __str__(self):
#         return f"{self.id} {self.nom} {self.prenom}"


# class Candidat(Utilisateur):
#     cin = models.CharField(max_length=20, unique=True)
#     specialite = models.CharField(max_length=255, blank=True)

#     def __str__(self):
#         return f"{self.nom} {self.prenom} {self.email} {self.telephone} {self.adresse} {self.cin} {self.specialite}"


# class Recruteur(Utilisateur):
#     reference_recruteur = models.CharField(max_length=100, unique=True)

#     def __str__(self):
#         return f"{self.id} {self.nom} {self.prenom} {self.email} {self.telephone} {self.adresse} {self.reference_recruteur}"


# class Offre(models.Model):

#     class TypeContrat(models.TextChoices):
#         SUR_SITE = "SUR_SITE", "Sur site"
#         HYBRIDE = "HYBRIDE", "Hybride"
#         A_DISTANCE = "A_DISTANCE", "À distance"


#     type_contrat = models.CharField(
#         max_length=20,
#         choices=TypeContrat.choices,
#         default=TypeContrat.SUR_SITE
#     )

#     nom_entreprise = models.CharField(max_length=100)
#     lieu = models.CharField(max_length=132)
#     specialite = models.CharField(max_length=255)
#     image = models.ImageField(upload_to="Desktop/", blank=True, null=True)
    
#     def __str__(self):
#         return f"{self.id} {self.nom_entreprise} {self.type_contrat}"


# class Postulation(models.Model):

#     class StatutCandidature(models.TextChoices):
#         NOUVELLE_CANDIDATURE = "NOUVELLE_CANDIDATURE","Nouvelle_Candidature"
#         PASSER = "PASSER", "Passer"
#         OCCUPER = "OCCUPER", "Occuper"
#         CONTACTER = "CONTACTER", "Contacter"
#         EN_ATTENTE = "EN_ATTENTE", "En attente"
#         ACCEPTE = "ACCEPTE", "Accepté"
#         REFUSE = "REFUSE", "Refusé"

#     statut = models.CharField(
#         max_length=200,
#         choices=StatutCandidature.choices,
#         default=StatutCandidature.ACCEPTE
#     )    
#     offre = models.ForeignKey(Offre, null=False, related_name='postulations', on_delete=models.CASCADE)
#     candidat = models.ForeignKey(Candidat, related_name='postulations', on_delete= models.CASCADE)
#     date_candidature = models.DateTimeField(auto_now_add=True)

#     def __str__(self):
#         return f"{self.id} {self.statut} {self.date_candidature}"  
    

# class Entretien(models.Model):

#     class Statut(models.TextChoices):
#         PLANIFIE = "PLANIFIE", "Planifie"
#         PASSER = "PASSER", "Passer"
#         ABSCENT = "ABSCENT", "Abscent"
#         OCCUPER = "OCCUPER", "Occuper"
#         CONTACTER = "CONTACTER", "Contacter"
#         EN_ATTENTE = "EN_ATTENTE", "En attente"
#         ACCEPTE = "ACCEPTE", "Accepté"
#         REFUSE = "REFUSE", "Refusé"

#     statut = models.CharField(
#         max_length=20,
#         choices=Statut.choices,
#         default=Statut.EN_ATTENTE
#     )

#     class CanalEntretien(models.TextChoices):
#         PRESENTIEL = "PRESENTIEL", "Présentiel"
#         A_DISTANCE = "A_DISTANCE", "À distance"

#     canal_entretien = models.CharField(
#         max_length=20,
#         choices=CanalEntretien.choices,
#         default=CanalEntretien.PRESENTIEL
#     )

#     duree =models.CharField(max_length=10)
#     date_entretien = models.DateTimeField(auto_now_add=True)
#     duree = models.DurationField()
#     recruteur = models.ForeignKey(
#         Recruteur,
#         on_delete=models.CASCADE,
#         related_name='entretiens'
#     )

#     candidat = models.ForeignKey(
#         Candidat,
#         on_delete=models.CASCADE,
#         related_name="entretiens"
#     )

#     offre = models.ForeignKey(
#         Offre,
#         on_delete=models.CASCADE,
#         related_name="entretiens"
#     )
#     postulation = models.ForeignKey(Postulation, related_name='entretiens', on_delete= models.CASCADE)

#     def __str__(self):
#         return f"Entretien -{self.id} - {self.candidat} - {self.offre}"  
    

# class Notification(models.Model):
#     day_date = models.DateTimeField
#     message = models.CharField(max_length=255)
#     statut = models.CharField(max_length=15)
    
#     class Statut(models.TextChoices):
#         PASSER = "PASSER", "Passer"
#         OCCUPER = "OCCUPER", "Occuper"
#         CONTACTER = "CONTACTER", "Contacter"
#         EN_ATTENTE = "EN_ATTENTE", "En attente"
#         ACCEPTE = "ACCEPTE", "Accepté"
#         REFUSE = "REFUSE", "Refusé"

#     statut = models.CharField(
#         max_length=20,
#         choices=Statut.choices,
#         default=Statut.EN_ATTENTE
#     )
#     postulation = models.ForeignKey(Postulation, related_name='notifications', on_delete= models.CASCADE)
    
#     def __str__(self):
#         return f"{self.id} {self.candidat} {self.offre} {self.day_date} {self.message}"    



from django.db import models


# =========================
# UTILISATEUR
# =========================

class Utilisateur(models.Model):
    nom = models.CharField(max_length=15)
    prenom = models.CharField(max_length=15)
    email = models.CharField(max_length=100)
    telephone = models.CharField(max_length=30, blank=True)
    adresse = models.TextField(blank=True)

    class Meta:
        abstract = True

    def __str__(self):
        return f"{self.id} {self.nom} {self.prenom}"


# =========================
# CANDIDAT
# =========================

class Candidat(Utilisateur):
    cin = models.CharField(max_length=20, unique=True)
    specialite = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return (
            f"{self.nom} {self.prenom} "
            f"{self.email} {self.telephone} "
            f"{self.adresse} {self.cin} "
            f"{self.specialite}"
        )


# =========================
# RECRUTEUR
# =========================

class Recruteur(Utilisateur):
    reference_recruteur = models.CharField(
        max_length=100,
        unique=True
    )

    def __str__(self):
        return (
            f"{self.id} {self.nom} {self.prenom} "
            f"{self.email} {self.telephone} "
            f"{self.adresse} {self.reference_recruteur}"
        )


# =========================
# OFFRE
# =========================

class Offre(models.Model):

    class TypeContrat(models.TextChoices):
        SUR_SITE = "SUR_SITE", "Sur site"
        HYBRIDE = "HYBRIDE", "Hybride"
        A_DISTANCE = "A_DISTANCE", "À distance"

    type_contrat = models.CharField(
        max_length=20,
        choices=TypeContrat.choices,
        default=TypeContrat.SUR_SITE
    )

    nom_entreprise = models.CharField(max_length=100)

    lieu = models.CharField(max_length=132)

    specialite = models.CharField(max_length=255, blank=True)

    
    # Recruteur qui a publié l'offre
    recruteur = models.ForeignKey(
        Recruteur,
        on_delete=models.CASCADE,
        related_name="offres"
    )

    image = models.ImageField(
        upload_to="Desktop/",
        blank=True,
        null=True
    )
    
    def __str__(self):
        return (
            f"{self.id} "
            f"{self.nom_entreprise} "
            f"{self.lieu}"
            f"{self.specialite}"
            f"{self.type_contrat}"
            f"{self.recruteur}"
            f"{self.image}"
        )


# =========================
# POSTULATION
# =========================

class Postulation(models.Model):

    class StatutCandidature(models.TextChoices):
        NOUVELLE_CANDIDATURE = (
            "NOUVELLE_CANDIDATURE",
            "Nouvelle candidature"
        )
        PASSER = "PASSER", "Passer"
        OCCUPER = "OCCUPER", "Occuper"
        CONTACTER = "CONTACTER", "Contacter"
        EN_ATTENTE = "EN_ATTENTE", "En attente"
        ACCEPTE = "ACCEPTE", "Accepté"
        REFUSE = "REFUSE", "Refusé"

    statut = models.CharField(
        max_length=30,
        choices=StatutCandidature.choices,
        default=StatutCandidature.NOUVELLE_CANDIDATURE
    )

    offre = models.ForeignKey(
        Offre,
        null=False,
        related_name="postulations",
        on_delete=models.CASCADE
    )

    candidat = models.ForeignKey(
        Candidat,
        related_name="postulations",
        on_delete=models.CASCADE
    )

    date_candidature = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return (
            f"{self.id} - "
            f"{self.candidat.nom} {self.candidat.prenom} - "
            f"{self.offre.nom_entreprise} - "
            f"{self.statut}"
        )


# =========================
# ENTRETIEN
# =========================

class Entretien(models.Model):

    class Statut(models.TextChoices):
        PLANIFIE = "PLANIFIE", "Planifié"
        PASSER = "PASSER", "Passé"
        ABSCENT = "ABSCENT", "Absent"
        OCCUPER = "OCCUPER", "Occupé"
        CONTACTER = "CONTACTER", "Contacté"
        EN_ATTENTE = "EN_ATTENTE", "En attente"
        ACCEPTE = "ACCEPTE", "Accepté"
        REFUSE = "REFUSE", "Refusé"

    statut = models.CharField(
        max_length=20,
        choices=Statut.choices,
        default=Statut.EN_ATTENTE
    )

    class CanalEntretien(models.TextChoices):
        PRESENTIEL = "PRESENTIEL", "Présentiel"
        A_DISTANCE = "A_DISTANCE", "À distance"

    canal_entretien = models.CharField(
        max_length=20,
        choices=CanalEntretien.choices,
        default=CanalEntretien.PRESENTIEL
    )

    duree = models.DurationField()

    date_entretien = models.DateTimeField()

    lieu_entretien = models.CharField(max_length=132)

    recruteur = models.ForeignKey(
        Recruteur,
        on_delete=models.CASCADE,
        related_name="entretiens"
    )

    candidat = models.ForeignKey(
        Candidat,
        on_delete=models.CASCADE,
        related_name="entretiens"
    )

    offre = models.ForeignKey(
        Offre,
        on_delete=models.CASCADE,
        related_name="entretiens"
    )

    postulation = models.ForeignKey(
        Postulation,
        related_name="entretiens",
        on_delete=models.CASCADE
    )

    def __str__(self):
        return (
            f"Entretien - {self.id} - "
            f"{self.candidat} - "
            f"{self.offre}"
        )


# =========================
# NOTIFICATION
# =========================

class Notification(models.Model):

    class Statut(models.TextChoices):
        PLANIFIE = "PLANIFIE", "Planifie"
        PASSER = "PASSER", "Passé"
        OCCUPER = "OCCUPER", "Occupé"
        CONTACTER = "CONTACTER", "Contacté"
        EN_ATTENTE = "EN_ATTENTE", "En attente"
        ACCEPTE = "ACCEPTE", "Accepté"
        REFUSE = "REFUSE", "Refusé"

    # Date automatique de création
    day_date = models.DateTimeField(
        auto_now_add=True
    )

    message = models.CharField(
        max_length=255
    )

    statut = models.CharField(
        max_length=20,
        choices=Statut.choices,
        default=Statut.EN_ATTENTE
    )

    postulation = models.ForeignKey(
        Postulation,
        related_name="notifications",
        on_delete=models.CASCADE
    )

    def __str__(self):
        return (
            f"{self.id} - "
            f"{self.postulation.candidat} - "
            f"{self.postulation.offre} - "
            f"{self.day_date}"
        )

    
class CompteUtilisateur(models.Model):
    
    username = models.CharField(max_length= 60, unique= True)

    nom =models.CharField(max_length=50)    

    prenom = models.CharField(max_length=60)

    email = models.CharField(max_length=100)

    telephone = models.CharField(max_length=50)

    adresse = models.CharField(max_length=100)

    role = models.CharField(max_length=20)

    recruteur = models.ForeignKey(
        Recruteur,
        on_delete=models.CASCADE,
        related_name="compteutilisateur",
        null=True,
        blank=True
    )    

    candidat = models.ForeignKey(
        Candidat,
        related_name="compteutilisateur",
        on_delete=models.CASCADE,
        null=True,
        blank=True
    )   


    password = models.CharField(max_length=100)
    repassword = models.CharField(max_length=100)


    def __str__(self):
        return (
            f"CompteUtilisateur - {self.id} - "
            f"{self.username}"
            f"{self.nom} - "
            f"{self.prenom}"
            f"{self.email}"
            f"{self.adresse}"
            f"{self.role}"
            f"{self.candidat}"
            f"{self.recruteur}"
            f"{self.password}"
            f"{self.repassword}"

        )    