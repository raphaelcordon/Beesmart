export const CustomerRegistration = (email, code, business_name, country, city, street, zip, website, password, password_repeat, logo) => {
    const customerRegistration = {
        email: email,
        code: code,
        business_name: business_name,
        country: country,
        city: city,
        street: street,
        zip: zip,
        website: website,
        password: password,
        password_repeat: password_repeat,
        logo: logo,

    }
    return customerRegistration;
}

