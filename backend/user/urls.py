from django.urls import path

from user.views import CreateCustomerUser, CreateEndUser, VeryfiCustomerUserView, GenerateEndUserCard, MeCustomerUser, \
    MeEndUser, UpdateCustomerUser, DeleteCustomerUser

urlpatterns = [
    path('customer/user/add/', CreateCustomerUser.as_view()),
    path('customer/user/verify/', VeryfiCustomerUserView.as_view()),
    path('customer/user/me/', MeCustomerUser.as_view()),
    path('customer/user/update/', UpdateCustomerUser.as_view()),
    path('customer/user/delete/', DeleteCustomerUser.as_view()),
    path('enduser/user/add/', CreateEndUser.as_view()),
    path('enduser/user/verify/<str:generated_code>/', GenerateEndUserCard.as_view()),
    path('enduser/user/me/', MeEndUser.as_view()),
]
