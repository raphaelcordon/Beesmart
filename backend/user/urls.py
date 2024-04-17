from django.urls import path

from user.views import CreateCustomerUser, CreateEndUser, VeryfiCustomerUserView, GenerateEndUserCard, MeCustomerUser, \
    MeEndUser

urlpatterns = [
    path('users/customer/add/', CreateCustomerUser.as_view()),
    path('users/customer/veryfi/', VeryfiCustomerUserView.as_view()),
    path('users/customer/me/', MeCustomerUser.as_view()),
    path('users/user/add/', CreateEndUser.as_view()),
    path('users/user/veryfi/<str:pk>/', GenerateEndUserCard.as_view()),
    path('users/enduser/me/', MeEndUser.as_view()),
]
