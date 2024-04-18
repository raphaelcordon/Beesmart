export const CustomerSettings = (email, business_name, country, city, street, zip, website, password, password_repeat, logo) => {
    const customerSettings = {
        email: email,
        business_name: business_name,
        country: country,
        city: city,
        street: street,
        zip: zip,
        website: website,
        logo: logo,

    }
    return customerSettings;
}

