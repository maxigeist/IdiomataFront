
/**
 * Waits for a certain period of time
 * 
 * @param {number} milliseconds Time to wait
 */
export function delay(milliseconds){
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    });
}