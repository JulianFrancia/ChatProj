export const loadState = () => {
    try {
        const serializedData = localStorage.getItem('state');
        if (serializedData === null) {
            return undefined; // Si no existe el state en el local storage devolvemos undefined para que cargue el state inicial que hayamos definido
        }
        return JSON.parse(serializedData); // Si encontramos con exito nuestro storage lo devolvemos.
    } catch (error) {
        console.log('error al cargar el estado desde el localstorage');
        return undefined; // Si ocurre algun error, devuelvo undefined para cargar el state inicial.
    }
}
export const saveState = (state: any) => {
    try {
        let serializedData = JSON.stringify(state);
        localStorage.setItem('state', serializedData);
    } catch (error) {
        console.log('error al guardar en el localstorage');
        // Acá podemos capturar o crear cualquier log que deseemos en caso de que falle el salvado en el storage.    
    }
}