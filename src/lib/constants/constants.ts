export const separatorOptions: {[key: number]: string} = {
    0: '/',
    1: '-',
    2: '.'
}

export const dateFormat: { [key: string]: string } = {
ddmmyyyy: 'dd-MM-yyyy',
mmddyyyy: 'MM-dd-yyyy',
yyyymmdd: 'yyyy-MM-dd',
ddmmyy: 'dd-MM-yy',
mmddyy: 'MM-dd-yy',
yymmdd: 'yy-MM-dd'
};

export const priorityOptions = [
    {
        name: 'High',
        value: 3
    },
    {
        name: 'Medium',
        value: 2
    },
    {
        name: 'Low',
        value: 1
    },
    {
        name: 'None',
        value: 0
    }
];

export const priorityColors: { [key: number]: string } = {
    0: 'border-white',
    1: 'border-green-500',
    2: 'border-yellow-500',
    3: 'border-red-500'
};
    