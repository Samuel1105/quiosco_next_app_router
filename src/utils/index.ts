export function formatCurrency(amount : number){
    return new Intl.NumberFormat('es-BO', {
        style: 'currency',
        currency: 'BOB'
    }).format(amount)
}

export function getImagePath(imagenPath : string) {
    const cloundinaryBaseUrl = 'https://res.cloudinary.com'
    if(imagenPath.startsWith(cloundinaryBaseUrl)){
        return imagenPath
    }else{
        return `/products/${imagenPath}.jpg`
    }
}