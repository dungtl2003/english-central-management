const capitalizeWord = function (label: string | null | undefined): string {
    if (!label || label.trim() === " ") {
        return "#";
    }

    const labels: string[] = label.split(" ");

    if (labels.length > 0) {
        const firstWord: string = labels[0].toLocaleLowerCase();
        labels.shift();
        let capitalizedSecondWord: string = "";
        labels.forEach((word) => {
            capitalizedSecondWord +=
                word.charAt(0).toUpperCase() + word.slice(1);
        });

        return `${firstWord}${capitalizedSecondWord}`;
    }

    return "#";
};

export default capitalizeWord;
