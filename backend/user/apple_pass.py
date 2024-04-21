from django.http import FileResponse
from wallet.models import Pass, Barcode, Generic


def build_pass(nickname, serial_nr, to_qr, secret_key):
    cardInfo = Generic()
    cardInfo.addPrimaryField(f'{nickname}', 'MILLION REWARDS CARD', 'BEESMART SMART CARD')
    cardInfo.addSecondaryField('Holder', f'{nickname}', 'CARD HOLDER')
    cardInfo.addAuxiliaryField('profile', 'SOME INFO', 'SOME INFO')
    cardInfo.addBackField('website', f'https://beesmart.propulsion-learn.ch/user/{secret_key}', 'YOUR PROFILE')

    organizationName = 'BeeSmart'
    passTypeIdentifier = 'pass.com.beesmart.com'
    teamIdentifier = '5MJ649KLV6'

    passfile = Pass(cardInfo,
                    passTypeIdentifier=passTypeIdentifier,
                    organizationName=organizationName,
                    teamIdentifier=teamIdentifier)
    passfile.serialNumber = f'{serial_nr}'
    passfile.barcode = Barcode(message=f'{to_qr}', format='PKBarcodeFormatQR')
    passfile.logoText = 'BEESMART'
    passfile.headerField = '@'

    # Including the icon and logo is necessary for the passbook to be valid.
    passfile.addFile('icon.png', open('user/keys/img/icon.png', 'rb'))  # Standard resolution
    passfile.addFile('icon@2x.png', open('user/keys/img/icon@2x.png', 'rb'))  # Retina display
    passfile.addFile('icon@3x.png', open('user/keys/img/icon@3x.png', 'rb'))  # Super retina display

    passfile.addFile('logo.png', open('user/keys/img/logo.png', 'rb'))  # Standard resolution
    passfile.addFile('logo@2x.png', open('user/keys/img/logo@2x.png', 'rb'))  # Retina display
    passfile.addFile('logo@3x.png', open('user/keys/img/logo@3x.png', 'rb'))  # Super retina display

    passfile.addFile('thumbnail.png', open('user/keys/img/thumbnail.png', 'rb'))  # Standard resolution
    passfile.addFile('thumbnail@2x.png', open('user/keys/img/thumbnail@2x.png', 'rb'))  # Retina display
    passfile.addFile('thumbnail@3x.png', open('user/keys/img/thumbnail@3x.png', 'rb'))  # Super retina display

    # Create and output the Passbook file (.pkpass)
    password = 'Admin@123'
    file_name = f'passes/{nickname}.pkpass'
    passfile.create('user/keys/certificate.pem', 'user/keys/mykey.key', 'user/keys/AppleWWDRCA.pem', password,
                    file_name)
    response = FileResponse(open(f'{file_name}', 'rb'), as_attachment=True, filename=f'{nickname}.pkpass')
    return response
