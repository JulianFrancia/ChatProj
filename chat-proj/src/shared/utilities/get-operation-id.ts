export function GetOperationId(model: string, operation: string) {
    const mdl = ToTitleCase(model).replace(/\s/g, '');
    const op = ToTitleCase(operation).replace(/\s/g, '');

    return {
        title: '',
        operationId: `${mdl}_${op}`,
    };
}

function ToTitleCase(str: string): string {
    return str
        .toLowerCase()
        .split(' ')
        .map(word => word.replace(word[0], word[0].toUpperCase()))
        .join(' ');
}
