from django.urls import path

from user.views import CreateCustomerUser, CreateEndUser, VeryfiCustomerUserView, GenerateEndUserCard, MeCustomerUser, \
    MeEndUser, UpdateCustomerUser, DeleteCustomerUser

urlpatterns = [
    path('users/customer/add/', CreateCustomerUser.as_view()),
    path('users/customer/veryfi/', VeryfiCustomerUserView.as_view()),
    path('users/customer/me/', MeCustomerUser.as_view()),
    path('users/customer/update/', UpdateCustomerUser.as_view()),
    path('users/customer/delete/', DeleteCustomerUser.as_view()),
    path('users/enduser/add/', CreateEndUser.as_view()),
    path('users/enduser/veryfi/<str:pk>/', GenerateEndUserCard.as_view()),
    path('users/enduser/me/', MeEndUser.as_view()),
]
