export const type = 'invalidToken';

const invalidToken = (data: boolean) => {
    return {
        type,
        payload: { invalidToken: data }
    };
};

export default invalidToken;