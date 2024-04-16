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


class IsOwner(BasePermission):
    def has_object_permission(self, request, view, obj):
        return request.user == obj.author
