export const createUser = user => {
    return $.ajax({
      method: 'POST',
      url: '/users',
      data: user
    });
};

export const verifyName = name => {
    return $.ajax({
        method: 'POST',
        url: '/users/verify',
        data: name
    });
};

export const verifyEmail = email => {
    return $.ajax({
        method: 'POST',
        url: '/users/verify',
        data: email
    });
};

export const verifyBio = bio => {
    return $.ajax({
        method: 'POST',
        url: '/users/verify',
        data: bio
    });
};