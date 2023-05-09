const indexFound = (array, id) => {
    const index = array.findIndex(obj => obj.id === id);
    return index
};

export default indexFound;