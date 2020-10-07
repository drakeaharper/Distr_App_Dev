console.log("Icons made by Freepik https://www.flaticon.com/authors/freepik")

if (vm.browserCookies['darkMode'] === undefined) {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        vm.darkModeActivate()
    } else {
        vm.darkModeDeactivate()
    }
} else if (vm.browserCookies['darkMode'] === 'true') {
    vm.darkModeActivate()
} else {
    vm.darkModeDeactivate()
}

vm.initializeGame()
