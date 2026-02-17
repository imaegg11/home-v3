export function Search() {
    return (
        <input id="search-bar" type="text" autoComplete="off" autoFocus placeholder="Search"
            className="text-accent-10 bg-bg w-full h-10 border-2 border-gs-85 select-none rounded-3xl px-6 transition focus-within:outline-none focus-within:shadow-[0_1px_6px_0_var(--shadow-color)] hover:shadow-[0_1px_6px_0_var(--shadow-color)]"
        ></input>
    )
}