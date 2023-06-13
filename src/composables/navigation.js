import { capitalizeFirstLetter } from "@/composables/helpers";

/**
 * @param { vue-route } route
 * @returns { array }
 */
export const createBreadcrumbs = (route) => {


    if(route.name != import.meta.env.VITE_MODULE_ADMIN_DASHBOARD_NAME){

        let breadcrumbs = [];

        const pathArr = route.fullPath.split("/").filter(Boolean)

        pathArr.map(function(str){
            if(str != import.meta.env.VITE_MODULE_ADMIN_NAME){
                
                const title = capitalizeFirstLetter(str)

                const crumb = {
                    title: title,
                    current: route.name == title ? true : false,
                }
                
                breadcrumbs.push(crumb)
            }
        })
        return breadcrumbs
    }
}

/**
 * @param { vue-routes } routes
 * @returns { array }
 */
export const createNavigation = (currentRoute, routes) => {


    let navigation = []   

    routes.map(function(route) {
        if(route.meta.module == 'admin')
        {

            const link = {
                name: route.name,
                href: route.path,
                icon: route.meta.icon,
                current: currentRoute.meta.nav == route.meta.nav ? true : false,
            }
            
            navigation.push(link)
        }
    })
    

    return navigation
}