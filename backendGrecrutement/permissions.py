from rest_framework.permissions import BasePermission

class IsRecruteur(BasePermission):

    message= "cette fonction est réserver pour le recruteur"

    def has_permission(self, request, view):

        return(

            request.user is not None
            and request.user.role =="RECRUTEUR"
        )



class IsCandidat(BasePermission):
    def has_permission(self, request, view):
        message = "cette fonction est réserver pour le compte Candidat"

        return(

            request.user is not None
            and request.user.role =="CANDIDAT"
        )


class IsAdministrateur(BasePermission):
    def has_permission(self, request, view):

        message = "cette fonction est reserver pour le compte Administrateur"   
        return(
            request.user is not None
            and request.user.role == "ADMINISTRATEUR"
        )

class IsAdministrateurOrRecruteur(BasePermission):

    def has_permission(self, request, view):
        message="cette fonction est reserver pour le compte recruteur et Administrateur"

        return(
            request.user is not None
            and request.user.role in ["ADMINISTRATEUR", "RECRUTEUR"]
        )

class IsAdministrateurOrCandidat(BasePermission):
    def has_permission(self, request, view):
        message = "cette fonction est reserver pour le compte administrateur or candidat"
        return(
            request.user is not None
            and request.user.role in ["ADMINISTRATEUR", "CANDIDAT"]
        )

class GererLesNotification(BasePermission):
    def has_permission(self, request, view):
        message ="cette fonction est reserver pour le compte Recruteur"
        return(
            request.user is not None
            and request.user.role == "RECRUTEUR"
        )

    
class IsRecruteurOrCandidat(BasePermission):
    def has_permission(self, request, view):
        
        return(
            request.user is not None
            and request.user.role in ["RECRUTEUR", "CANDIDAT"]          
        )


class AnyRole(BasePermission):
    def has_permission(self, request, view):
        message = "cette fonction est réserver pour ces comptes"
        return(
            request.user is not None
            and request.user.role in ["RECRUTEUR", "CANDIDAT", "ADMINISTRATEUR"]
        )
class GererLesOffres(BasePermission):
    def has_permission(self, request, view):
        
        return(
            request.user is not None
            and request.user.role == "CANDIDAT"   
        )


class GererLesCandidatures(BasePermission):
    def has_permission(self, request, view):
        
        return(
            request.user is not None
            and request.user.role == "RECRUTEUR"   
        )    

class Postuler(BasePermission):
    def has_permission(self, request, view):
        message = "Seuls les candidats peuvent postuler a cette offre"
        return(
            request.user is not None
            and request.user.role == "CANDIDAT"   
        )    


class list_Notification(BasePermission):
    def has_permission(self, request, view):
        
        return(
            request.user is not None
            and request.user.role == "RECRUTEUR"   
        )
    