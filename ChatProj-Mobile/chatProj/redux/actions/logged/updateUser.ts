export const type = 'updateUser';

const updateUser = (data: any) => {
    return {
        type,
        payload: { user: data }
    };
};
export default updateUser;