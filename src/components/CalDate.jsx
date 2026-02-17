import { createSignal, onMount, onCleanup } from "solid-js"

export function CalDate() {
    const [ date, setDate ] = createSignal(get_date());

    onMount(() => {
        const interval = setInterval(() => {
            setDate(get_date());
        }, 1000);

        onCleanup(() => clearInterval(interval));
    });

    return (
        <p>{date()}</p>
    )
}

function get_date() {
    const current_date = new Date();
    const dates = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const months_long = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const months_short = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

    let date = current_date.getDay();

    let month = current_date.getMonth();
    let day = current_date.getDate();
    let year = current_date.getFullYear();
    
    return `${dates[date]}, ${months_short[month]}${["June", "July"].includes(months_short[month]) ? "" : "."} ${day}, ${year}`;
}