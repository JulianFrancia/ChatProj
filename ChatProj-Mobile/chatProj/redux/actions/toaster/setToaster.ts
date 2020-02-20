export const type = 'setToaster';

const setToaster = (data: any) => {
    return {
        type,
        payload: { toaster: data }
    };
};
export default setToaster;