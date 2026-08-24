export function truncate3(n) {
    const [whole, decimal = ''] = String(n).split('.');
    const digits = (whole + decimal).slice(0, 3);

    if (whole.length >= 3) return Number(digits);

    const result = `${digits.slice(0, whole.length)}.${digits.slice(whole.length)}`;
    return Number(result);
}