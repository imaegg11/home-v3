export const setRootVar = (variable, value) => {
    document.documentElement.style.setProperty(`--${variable}`, value);
}