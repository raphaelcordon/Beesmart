export const CreateCampaign = (name, value_goal, beginning_date, ending_date, image, logo, style, customer_user_profile) => {
    const createCampaign = {
        name: name,
        value_goal: value_goal,
        beginning_date: beginning_date,
        ending_date: ending_date,
        image: image,
        logo: logo,
        style: style,
        customer_user_profile: customer_user_profile,
    }
    return createCampaign;
}

