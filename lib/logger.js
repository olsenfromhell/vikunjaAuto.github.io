function decoratePage(page) {
    const {name} = page;
    const requiredToDecorate = Object.getOwnPropertyNames(page.prototype)
        .filter(prop => {
            if(prop === 'constructor') {
                return false
            }
            const descriptor = Object.getOwnPropertyDescriptor(page.prototype, prop)
            return !!descriptor.value;
        })

    requiredToDecorate.forEach(prop => {
        const originalProp = page.prototype[prop]
        page.prototype[prop] = async function(...args) {
            let message = `${name} execute ${prop}`;
            if(name.includes('Fragment')) {
                message = `\t${message}`;
            }
            console.log(message)
            return originalProp.call(this, ...args);
        }
    })
}

export default decoratePage;
