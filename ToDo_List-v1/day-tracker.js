exports.findDay = () => {
    const today = new Date();
    const options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };
    return (today.toLocaleDateString("en-US", options));

};
exports.weekDay = () => {
    const today = new Date();
    const options = {
        weekday: "long"
    };
    return (today.toLocaleDateString("en-US", options));
}