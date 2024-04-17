from rest_framework.permissions import BasePermission, SAFE_METHODS


class IsAdmin(BasePermission):
    def has_permission(self, request, view):
        return bool(
            request.user and
            request.user.is_staff
        )


class IsReadOnly(BasePermission):
    def has_permission(self, request, view):
        return bool(request.method in SAFE_METHODS)


class IsCampaignOwner(BasePermission):
    def has_object_permission(self, request, view, obj):
        customer_user_profile = request.user.customer_user_profile
        return customer_user_profile == obj.customer_user_profile
