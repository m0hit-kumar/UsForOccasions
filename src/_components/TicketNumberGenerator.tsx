
export const GenerateTicketNumbers = () => {
    const ToBePick = Array.from(Array(100).keys(), item => item + 1);
    const PickedNumber = new Set();
    while (PickedNumber.size < 15) {
        const newNumber = Math.floor(Math.random() * ToBePick.length);

        if (newNumber !== 0 && !PickedNumber.has(newNumber)) {
            PickedNumber.add(newNumber);
        }
    }

    return PickedNumber
}
export const ToInt = (mySet: any) => {
    return [...mySet].filter(element => typeof element === 'number');
}

export const GenerateTicketGird = () => {
    const rowCount = Array.from(Array(8).keys());

    const row1 = new Set()
    const row2 = new Set()
    const row3 = new Set()
    while (row1.size != 5) { row1.add(Math.floor(Math.random() * rowCount.length)) }
    while (row2.size != 5) { row2.add(Math.floor(Math.random() * rowCount.length)) }
    while (row3.size != 5) { row3.add(Math.floor(Math.random() * rowCount.length)) }
    return [ToInt(row1), ToInt(row2), ToInt(row3)];
}

export function FillTambolaTicket():number[] {
    const [row1, row2, row3] = GenerateTicketGird();
    const pickedNumbers = Array.from(GenerateTicketNumbers());
     const grid1 = new Array(9).fill(0);
    const grid2 = new Array(9).fill(0);
    const grid3 = new Array(9).fill(0);
    for (let j = 0; j < 5; j++) {
        const columnIndex = row1[j];
        grid1[columnIndex] = pickedNumbers.slice(0, 5)[j];
    }

    for (let j = 0; j < 5; j++) {
        const columnIndex = row2[j];
        grid2[columnIndex] = pickedNumbers.slice(5, 10)[j];
    }
    for (let j = 0; j < 5; j++) {
        const columnIndex = row3[j];
        grid3[columnIndex] = pickedNumbers.slice(10, 16)[j];
    }
    return grid1.concat(grid2, grid3)
};