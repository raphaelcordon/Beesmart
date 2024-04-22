from django.urls import path

from user.views import CreateCustomerUser, CreateEndUser, VeryfiCustomerUserView, GenerateEndUserCard, MeCustomerUser, \
    MeEndUser, UpdateCustomerUser, DeleteCustomerUser, EndUserBySecretKey

urlpatterns = [
    path('customer/user/add/', CreateCustomerUser.as_view(), name='Add customer user'),
    path('customer/user/verify/', VeryfiCustomerUserView.as_view(), name='Verify customer user'),
    path('customer/user/me/', MeCustomerUser.as_view(), name='Gets back logged in customer user object'),
    path('customer/user/update/', UpdateCustomerUser.as_view(), name='Update customer user'),
    path('customer/user/delete/', DeleteCustomerUser.as_view(), name='Delete customer user'),
    path('enduser/user/add/', CreateEndUser.as_view(), name='Add end user'),
    path('enduser/user/verify/<str:generated_code>/', GenerateEndUserCard.as_view(), name='Verify end user'),
    path('enduser/user/me/', MeEndUser.as_view(), name='Gets back logged in end user object'),
    path('enduser/user/<str:secret_key>/', EndUserBySecretKey.as_view(), name='Gets end user object by secret_key'),

]
