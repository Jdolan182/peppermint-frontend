/**
 * @param { vue-routes } routes
 * @returns { array }
 */
export const createNavigation = (currentRoute, routes, module) => {


    let navigation = []   

    routes.map(function(route) {
        if(route.meta.module == module && !(route.meta.excludeFromNav))
        {

            const link = {
                name: route.meta.nav,
                href: route.path,
                icon: route.meta.icon,
                current: currentRoute.meta.nav == route.meta.nav ? true : false,
            }
            
            navigation.push(link)
        }
    })
    

    return navigation
}