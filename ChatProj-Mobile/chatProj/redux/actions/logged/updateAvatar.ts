export const type = 'updateAvatar';

const updateAvatar = (data: string) => {
    return {
        type,
        payload: { avatarUrl: data }
    };
};
export default updateAvatar;