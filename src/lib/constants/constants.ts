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


export const weekdayMap: { [key: number]: string } = {
    0: 'sunday',
    1: 'monday',
    2: 'tuesday',
    3: 'wednesday',
    4: 'thursday',
    5: 'friday',
    6: 'saturday'
};

export const monthMap: { [key: number]: string } = {
    0: 'january',
    1: 'february',
    2: 'march',
    3: 'april',
    4: 'may',
    5: 'june',
    6: 'july',
    7: 'august',
    8: 'september',
    9: 'october',
    10: 'november',
    11: 'december'
};

export const periods = [
    {
        name: 'Today',
        timeframe: 'day',
        current: true
    },
    {
        name: 'Yesterday',
        timeframe: 'day',
        current: false
    },
    {
        name: 'This week',
        timeframe: 'week',
        current: true
    },
    {
        name: 'Last week',
        timeframe: 'week',
        current: false
    },
    {
        name: 'This month',
        timeframe: 'month',
        current: true
    },
    {
        name: 'Last month',
        timeframe: 'month',
        current: false
    },
    {
        name: 'This year',
        timeframe: 'year',
        current: true
    },
    {
        name: 'Last year',
        timeframe: 'year',
        current: false
    },
    {
        name: 'All time',
        timeframe: 'all',
        current: true
    }
];