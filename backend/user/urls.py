from django.urls import path

from user.views import CreateCustomerUser, CreateEndUser, VeryfiCustomerUserView, GenerateEndUserCard, MeCustomerUser, \
    MeEndUser, UpdateCustomerUser, DeleteCustomerUser, EndUserBySecretKey, UpdateEndUser, UserStampsCountView, \
    UserVisitsCountView, NotClaimedVouchersView, UserPointsMoneyCountView, EndUserCard

urlpatterns = [
    path('customer/user/add/', CreateCustomerUser.as_view(), name='Add customer user'),
    path('customer/user/verify/', VeryfiCustomerUserView.as_view(), name='Verify customer user'),
    path('customer/user/me/', MeCustomerUser.as_view(), name='Gets back logged in customer user object'),
    path('customer/user/update/', UpdateCustomerUser.as_view(), name='Update customer user'),
    path('customer/user/delete/', DeleteCustomerUser.as_view(), name='Delete customer user'),
    path('enduser/user/add/', CreateEndUser.as_view(), name='Add end user'),
    path('enduser/user/verify/<str:generated_code>/', GenerateEndUserCard.as_view(), name='Verify end user'),
    path('enduser/user/card/', EndUserCard.as_view(), name='Download users card'),
    path('enduser/user/me/', MeEndUser.as_view(), name='Gets back logged in end user object'),
    path('enduser/user/update/', UpdateEndUser.as_view(), name='Update end user'),
    path('enduser/user/<str:secret_key>/', EndUserBySecretKey.as_view(), name='Gets end user object by secret_key'),

    path('insights/stamps/<int:campaign_id>/', UserStampsCountView.as_view(), name='Get users stamps count'),
    path('insights/points/<int:campaign_id>/', UserPointsMoneyCountView.as_view(), name='Get users points money count'),
    path('insights/visits/<int:campaign_id>/', UserVisitsCountView.as_view(), name='Get users visits count'),
    path('insights/vouchers/<int:campaign_id>/', NotClaimedVouchersView.as_view(), name='Get unclaimed vouchers'),

]
