const Footer = () => {
    return (
        <footer className=" bottom-0 left-0 z-20 w-full p-4 bg-white border-t border-gray-200 shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-900 dark:border-gray-600">
            <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 <a href="https://github.com/dharam-gfx" className="text-gray-900 p-0 hover:text-purple-500 dark:text-white dark:hover:text-purple-500 transition-colors">Dharam_gfx</a>. All Rights Reserved.
            </span>
            <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-900 p-0 hover:text-purple-500 dark:text-white dark:hover:text-purple-500 transition-colors sm:mt-0">
                <li>
                    <a href="/" className=" me-4 md:me-6">Home</a>
                </li>
            </ul>
        </footer>
    )
}

export default Footer