import '../style.css';


export default function sidebar () {
    return `
        <nav class="sidebar">
            <ul>
                <li>
                    <a href="/" data-navigo>
                        <i class="fa-solid nav-icon fa-house"></i>
                        Home
                    </a>
                </li>

                <li>
                    <a href="/explore" data-navigo>
                        <i class="fa-solid nav-icon fa-compass"></i>
                        Explore
                    </a>
                </li>

                <li>
                    <a href="/library" data-navigo>
                        <i class="fa-solid nav-icon fa-bookmark"></i>
                        Library
                    </a>
                </li>

                <li>
                    <a href="/premium" data-navigo>
                        <i class="fa-solid nav-icon fa-crown"></i>
                        Premium
                    </a>
                </li>
                                
                <li>
                    <a href="/login" data-navigo>
                        <i class="fa-solid fa-user"></i>
                        Login
                    </a>
                </li>
            </ul>
        </nav>
    `
}

