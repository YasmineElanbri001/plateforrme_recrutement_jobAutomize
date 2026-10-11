
# from .models import CompteUtilisateur
# from rest_framework_simplejwt.exceptions import AuthenticationFailed
# from rest_framework.authentication import BaseAuthentication
# class CompteUtilisateurAuthenticationJWT(BaseAuthentication):


#     def authenticate(self, request):
#         print("==================authentification Jwt=================")
#         authorization  = request.headers.get("Authorization")
#         print("Authorization", authorization)

#         if authorization is None:
#             print("Authentification invalide")


#     def get_user(self, validate_token):
#         print("===============authentication JWT=========================")
#         user_id= validate_token("user_id")
#         print("le token contient le user id", user_id)
#         # print("authorization", autorization)

#         if user_id is None:
#             raise AuthenticationFailed(
#                 "le user n'est pas dans le token"
#             )
#         try:
#             user = CompteUtilisateur.objects.get(id = user_id)

#         except CompteUtilisateur.DoesNotExist:
#             raise AuthenticationFailed(
#                 "Authentification n'est pas réussie"
#             )

#         print("l'utilisateur est :", user.username)
#         print("le role de l'utilisateur est:", user.role)
        
#         return user

        
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import AuthenticationFailed

from .models import CompteUtilisateur


class CompteUtilisateurJWTAuthentication(JWTAuthentication):

    def authenticate(self, request):

        print("========== AUTHENTICATE JWT ==========")

        authorization = request.headers.get("Authorization")

        print("AUTHORIZATION :", authorization)

        if authorization is None:
            print("❌ AUCUN TOKEN ENVOYÉ")

        return super().authenticate(request)

    def get_user(self, validated_token):

        print("========== JWT AUTHENTICATION ==========")

        user_id = validated_token.get("user_id")

        print("USER ID DANS TOKEN :", user_id)

        if user_id is None:
            raise AuthenticationFailed(
                "Le token ne contient pas user_id."
            )

        try:
            user = CompteUtilisateur.objects.get(id=user_id)

        except CompteUtilisateur.DoesNotExist:
            raise AuthenticationFailed(
                "Utilisateur introuvable."
            )

        print("UTILISATEUR TROUVÉ :", user.username)
        print("ROLE :", user.role)

        return user