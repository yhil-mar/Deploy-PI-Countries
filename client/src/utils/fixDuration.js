const fixDuration = (newActivity) => {
    newActivity.duration = Number(newActivity.duration);
    return newActivity;
};

export default fixDuration;